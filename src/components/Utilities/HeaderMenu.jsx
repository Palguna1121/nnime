import React from "react";

const HeaderMenu = ({ title }) => {
  return <div className="flex justify-center items-center py-8">{title ? <h1 className="text-3xl md:text-4xl font-semibold text-white mb-4 md:mb-6 mx-5">{title}</h1> : null}</div>;
};

export default HeaderMenu;
