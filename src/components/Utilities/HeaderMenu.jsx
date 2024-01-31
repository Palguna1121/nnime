import React from "react";

const HeaderMenu = ({ title }) => {
  return <div className="flex justify-center items-center py-8">{title ? <h1 className="text-2xl mx-5">{title}</h1> : null}</div>;
};

export default HeaderMenu;
