import React from "react";
const Header = ({ title, subtitle }) => {
  return (
    <div className="flex items-center justify-between px-6 py-7 bg-[#FBFBFB]">
      <div>
        <h1 className="text-[#101828] text-3xl font-bold">{title}</h1>
        <p className="text-[#6A7282] text-base font-normal mt-1">{subtitle}</p>
      </div>
    </div>
  );
};

export default Header;
