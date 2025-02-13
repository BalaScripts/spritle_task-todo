import React, { useState } from "react";
import { Avatar, Card, IconButton, useMediaQuery, useTheme } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

function Header() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [menuOpen, setMenuOpen] = useState(false);

  const handleMenuToggle = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <>
      <Card className="!bg-[#116D6E] !flex flex-wrap justify-between !p-4 items-center !sticky !top-0 !z-10">
        {isMobile ? (
          <div className="flex w-full justify-between items-center">
            <div className="!text-lg !font-bold !text-white">TASK MANAGER</div>
            <IconButton className="ml-auto" onClick={handleMenuToggle} size="large">
              <MenuIcon className="!text-white" />
            </IconButton>
          </div>
        ) : (
          <div className="flex justify-between items-center w-full !text-lg !font-bold !text-white">
            <div>TASK MANAGER</div>
            <div className="flex gap-2 items-center mr-2"><Avatar className="!bg-inherit"/>Balamurugan</div>
          </div>
          
        )}
      </Card>
    </>
  );
}

export default Header;
