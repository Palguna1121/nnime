import axios from "axios";
import Link from "next/link";

const AnimeList = async ({ query, perPage }) => {
  const res = await axios({
    url: process.env.NEXT_PUBLIC_BASE_URL,
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    data: {
      query: query,
      variables: {
        page: 1,
        perPage: perPage,
      },
    },
  });

  const animeDetails = res.data.data.Page;

  return (
    <div className="grid md:grid-cols-6 grid-cols-2 gap-10 mx-8 mb-8">
      {animeDetails?.media?.map((data, index) => (
        <div key={index} className="group">
          <Link href={`/anime/${data.idMal}`} as={`/anime/${data.idMal}`} passHref>
            <div className="text-sm text-white">
              <img alt={data.title.romaji} src={data.coverImage.extraLarge} className="rounded-xl object-cover opacity-[0.65] transition-opacity group-hover:opacity-100 h-[150px] w-full duration-500 sm:h-[250px]" />
              <div className="text-left p-2 px-3">
                <p className="text-base font-semibold text-white lg:text-xl md:text-lg">{data.title.romaji.length > 20 ? `${data.title.romaji.slice(0, 20)}...` : data.title.romaji}</p>
              </div>
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default AnimeList;
