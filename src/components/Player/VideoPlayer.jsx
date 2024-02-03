import React, { useEffect, useState } from "react";
import { BsSkipEnd } from "react-icons/bs";
import { MdPlayDisabled, MdPlayArrow } from "react-icons/md";
// import { BiFullscreen } from "react-icons/bi";
import Hls from "hls.js/dist/hls.js";
import plyr from "plyr";
import "plyr/dist/plyr.css";
import toast from "react-hot-toast";

const VideoPlayer = ({ sources, internalPlayer, setInternalPlayer, title, type, banner, totalEpisodes, currentEpisode, malId }) => {
  var path = window.location.pathname.split("/play/");
  const slug = path[1];
  const episode = path[2];

  let src = sources;
  const [player, setPlayer] = useState(null);
  const [autoPlay, setAutoplay] = useState(false);

  function skipIntro() {
    player.forward(85);
  }

  function updateAutoplay(data) {
    toast.success(`Autoplay ${data ? "Enabled" : "Disabled"}`, {
      position: "top-center",
    });
    localStorage.setItem("autoplay", data);
    setAutoplay(data);
  }

  // function fullScreenHandler() {
  //   const video = document.getElementById("player");

  //   if (!document.fullscreenElement) {
  //     if (video.requestFullscreen) {
  //       video.requestFullscreen();
  //     } else if (video.webkitRequestFullscreen) {
  //       video.webkitRequestFullscreen();
  //     } else if (video.msRequestFullscreen) {
  //       video.msRequestFullscreen();
  //     }
  //   } else {
  //     if (document.exitFullscreen) {
  //       document.exitFullscreen();
  //     } else if (document.webkitExitFullscreen) {
  //       document.webkitExitFullscreen();
  //     } else if (document.msExitFullscreen) {
  //       document.msExitFullscreen();
  //     }
  //   }
  // }

  useEffect(() => {
    if (!localStorage.getItem("autoplay")) {
      localStorage.setItem("autoplay", false);
    } else {
      setAutoplay(localStorage.getItem("autoplay") === "true");
    }
    const video = document.getElementById("player");
    let flag = true;

    const defaultOptions = {
      captions: { active: true, update: true, language: "en" },
      controls: ["play-large", "rewind", "play", "fast-forward", "progress", "current-time", "duration", "mute", "volume", "settings", "fullscreen"],
    };

    if (type === "mp4") {
      video.removeAttribute("crossOrigin");
      const player = new plyr(video, defaultOptions);
      player.source = {
        type: "video",
        title: "Example title",
        poster: banner,
        sources: [
          {
            src: src,
            type: "video/mp4",
          },
        ],
      };
    }
    if (Hls.isSupported()) {
      const hls = new Hls();
      hls.loadSource(src);
      hls.attachMedia(video);

      hls.on(Hls.Events.MANIFEST_PARSED, function (event, data) {
        const availableQualities = hls.levels.map((l) => l.height);
        availableQualities.unshift(0);
        defaultOptions.quality = {
          default: 0,
          options: availableQualities,
          forced: true,
          onChange: (e) => updateQuality(e),
        };
        hls.on(Hls.Events.LEVEL_SWITCHED, function (event, data) {
          var span = document.querySelector(".plyr__menu__container [data-plyr='quality'][value='0'] span");
          if (hls.autoLevelEnabled) {
            span.innerHTML = `Auto (${hls.levels[data.level].height}p)`;
          } else {
            span.innerHTML = `Auto`;
          }
        });
        let player = new plyr(video, defaultOptions);
        setPlayer(new plyr(video, defaultOptions));
        let plyer;
        var button = document.createElement("button");
        button.classList.add("skip-button");
        button.innerHTML = "Skip Intro";
        button.addEventListener("click", function () {
          player.forward(85);
        });
        player.on("ready", () => {
          plyer = document.querySelector(".plyr__controls");
          document.querySelector(".plyr__video-wrapper").addEventListener("click", () => {
            let regexp = /android|iphone|kindle|ipad/i;
            if (regexp.test(navigator.userAgent) && getComputedStyle(player.elements.controls).opacity === "1") {
              player.togglePlay();
            }
          });

          var tapedTwice = false;
          function tapHandler(event) {
            if (!tapedTwice) {
              tapedTwice = true;
              setTimeout(function () {
                tapedTwice = false;
              }, 300);
              return false;
            }
            event.preventDefault();
            //action on double tap goes below
            player.fullscreen.toggle();
          }
          document.querySelector(".plyr__video-wrapper").addEventListener("touchstart", tapHandler);
        });

        player.on("enterfullscreen", (event) => {
          plyer.appendChild(button);
          window.screen.orientation.lock("landscape");
        });

        player.on("exitfullscreen", (event) => {
          var skipButton = document.querySelector(".skip-button");
          if (skipButton) {
            skipButton.remove();
          }
          window.screen.orientation.lock("portrait");
        });

        player.on("timeupdate", function (e) {
          var time = player.currentTime,
            lastTime = localStorage.getItem(title);
          if (time > lastTime) {
            localStorage.setItem(title, Math.round(player.currentTime));
          }
        });

        player.on("ended", function () {
          localStorage.removeItem(title);
          console.log(currentEpisode + " _ " + totalEpisodes);
          console.log(episode + " _ " + slug);

          if (localStorage.getItem("autoplay") === "true" && parseInt(currentEpisode) !== parseInt(totalEpisodes)) {
            window.location.replace(`http://localhost:3000/play/${malId}/${slug}/${parseInt(episode) + 1}`);
          }
        });

        player.on("play", function (e) {
          if (flag) {
            var lastTime = localStorage.getItem(title);
            if (lastTime !== null && lastTime > player.currentTime) {
              player.forward(parseInt(lastTime));
            }
            flag = false;
          }
        });

        player.on("seeking", (event) => {
          localStorage.setItem(title, Math.round(player.currentTime));
        });
      });
      hls.attachMedia(video);
      window.hls = hls;

      function updateQuality(newQuality) {
        if (newQuality === 0) {
          window.hls.currentLevel = -1;
          console.log("Auto quality selection");
        } else {
          window.hls.levels.forEach((level, levelIndex) => {
            if (level.height === newQuality) {
              console.log("Found quality match with " + newQuality);
              window.hls.currentLevel = levelIndex;
            }
          });
        }
      }
    } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
      video.src = src;
      const defaultOptions = {
        captions: { active: true, update: true, language: "en" },
        controls: ["play-large", "rewind", "play", "fast-forward", "progress", "current-time", "duration", "mute", "volume", "settings", "fullscreen"],
      };
      let player = new plyr(video, defaultOptions);
      setPlayer(new plyr(video, defaultOptions));
      let plyer;
      var button = document.createElement("button");
      button.classList.add("skip-button");
      button.innerHTML = "Skip Intro";
      button.addEventListener("click", function () {
        player.forward(85);
      });
      player.on("ready", () => {
        plyer = document.querySelector(".plyr__controls");
      });

      player.on("enterfullscreen", (event) => {
        plyer.appendChild(button);
        window.screen.orientation.lock("landscape");
      });

      player.on("exitfullscreen", (event) => {
        document.querySelector(".skip-button").remove();
        window.screen.orientation.lock("portrait");
      });

      player.on("timeupdate", function (e) {
        var time = player.currentTime,
          lastTime = localStorage.getItem(title);
        if (time > lastTime) {
          localStorage.setItem(title, Math.round(player.currentTime));
        }
        if (player.ended) {
          localStorage.removeItem(title);
        }
      });

      player.on("play", function (e) {
        if (flag) {
          var lastTime = localStorage.getItem(title);
          if (lastTime !== null && lastTime > player.currentTime) {
            player.forward(parseInt(lastTime));
          }
          flag = false;
        }
      });

      player.on("seeking", (event) => {
        localStorage.setItem(title, Math.round(player.currentTime));
      });
    } else {
      const player = new plyr(video, defaultOptions);
      player.source = {
        type: "video",
        title: "Example title",
        sources: [
          {
            src: src,
            type: "video/mp4",
          },
        ],
      };
    }
  }, []);

  return (
    <div
      className="mb-4"
      style={{
        marginBottom: "1rem",
        "--plyr-color-main": "#7676FF",
      }}
    >
      <div className="flex justify-between items-center bg-gray-900 py-2 px-4 rounded-t-lg border border-gray-700 mt-4 mb-4 font-semibold">
        <p className="text-white">nnime Player</p>
        <div className="flex">
          {autoPlay ? (
            <div className="tooltip">
              <button title="Disable Autoplay" onClick={() => updateAutoplay(false)}>
                <MdPlayArrow />
              </button>
            </div>
          ) : (
            <div className="tooltip">
              <button title="Enable Autoplay" onClick={() => updateAutoplay(true)}>
                <MdPlayDisabled />
              </button>
            </div>
          )}
          {/* <div className="tooltip">
            <button title="Full Screen" onClick={fullScreenHandler}>
              <BiFullscreen />
            </button>
          </div> */}
          <div className="tooltip">
            <button title="Skip Intro" onClick={() => skipIntro()}>
              <BsSkipEnd />
            </button>
          </div>
        </div>
      </div>
      <video
        id="player"
        playsInline
        crossOrigin="anonymous"
        data-poster={banner}
        className="w-full"
        style={{
          aspectRatio: 16 / 9,
        }}
      ></video>
    </div>
  );
};

export default VideoPlayer;
