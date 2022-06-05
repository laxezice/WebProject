import React, { Fragment } from "react";
import { MenuItem, Menu } from "@mui/material";
import Popup from "../../Popup";

const ShareMenu = (props) => {
  const { anchorEl, setAnchorEl, isShare, setIsShare, mutiple } = props;

  const open = Boolean(anchorEl);

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClick = (type) => {
    switch (type) {
      case 0:
        setIsShare({ ...isShare, social: true });
        break;
      case 1:
        setIsShare({ ...isShare, email: true });
        break;
      case 2:
        setIsShare({ ...isShare, website: true });
        break;
      case 3:
        setIsShare({ ...isShare, group: true });
        break;
      case 4:
        setIsShare({ ...isShare, history: true });
        break;
    }
    setAnchorEl(null);
  };

  return (
    <Fragment>
      <Menu
        id="share-menu"
        aria-labelledby="share-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <MenuItem
          onClick={() => {
            handleClick(0);
          }}
        >
          Page & Chatbot
        </MenuItem>

        <MenuItem
          onClick={() => {
            handleClick(3);
          }}
        >
          Facebook Group
        </MenuItem>

        <MenuItem
          onClick={() => {
            handleClick(1);
          }}
        >
          Email
        </MenuItem>

        {!mutiple && (
          <MenuItem
            onClick={() => {
              handleClick(2);
            }}
          >
            Other Website
          </MenuItem>
        )}
        {!mutiple && (
          <MenuItem
            onClick={() => {
              handleClick(4);
            }}
          >
            Share History
          </MenuItem>
        )}
      </Menu>
    </Fragment>
  );
};

export default ShareMenu;
