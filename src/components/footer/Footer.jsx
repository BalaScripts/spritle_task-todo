import React from "react";
import { Card, useMediaQuery, useTheme } from "@mui/material";
import SocialIcons from "./icons/SocialIcons";


function Footer() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));


  return (
    <>
      <Card className="!bg-[#31363F] !flex flex-wrap justify-center !p-4 items-center">
        {isMobile ? (
          <div className="flex w-full justify-between items-center !text-white ">
             <div className="hidden sm:block md:block lg:block">Contact Us : +91 9566901830</div>
          <div className="!flex flex-wrap items-center ">
            <div>Follow Us : </div>
            <div><SocialIcons /></div>
            </div>
          </div>
        ) : (
      <div className="w-full font-serif !text-white !flex justify-between items-center">
        <div className="hidden sm:block md:block lg:block">Contact Us : +91 9566901830</div>
          <div className="!flex flex-wrap items-center ">
            <div>Follow Us : </div>
            <div><SocialIcons /></div>
            </div>
          </div>
          
        )}
      </Card>
    </>
  );
}

export default Footer;
