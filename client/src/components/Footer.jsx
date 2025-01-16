import React from "react";
import Logo from "../assets/PicturaLogo.png";
import { TiSocialFacebook } from "react-icons/ti";
import { TiSocialLinkedin } from "react-icons/ti";
import { TiSocialTwitter } from "react-icons/ti";
import { FaInstagram } from "react-icons/fa";;

const Footer = () => {
  return (
    <div className="flex items-center justify-between gap-4 py-3 mt-20">
      <img src={Logo} alt="" width={150} />
      <p className="flex-1 border-l border-stone-400 pl-4 text-sm text-gray-500 max-sm:hidden">
        © 2023 Pictura. All rights reserved
      </p>
      <div className="flex gap-2">
        <TiSocialFacebook size={35} className="text-blue-600" />
        <TiSocialLinkedin size={35} className="text-blue-900" />
        <TiSocialTwitter size={35} className="text-cyan-600" />
        <FaInstagram size={35} className="text-pink-600" />
      </div>
    </div>
  );
};

export default Footer;
