import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Link from "next/link";
import {
  Button,
  Typography,
  MenuItem,
  Menu,
  IconButton,
  ListItemIcon,
} from "@mui/material";
import Tooltip from "@mui/material/Tooltip";

//icon
import { VscAccount } from "react-icons/vsc";
import { BiLogOut } from "react-icons/bi";
import { MdManageAccounts } from "react-icons/md";

//context
import { useAuth } from "../contexts/Section";
import { Router, useRouter } from "next/router";

export default function Appbar(props) {
  const { user, logout } = useAuth();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const router = useRouter();
  const NavLinkName = [
    {
      engName: "Homepage",
      name: "หน้าแรก",
      links: "/",
    },
    {
      engName: "Program",
      name: "หลักสูตร",
      links: "/program",
    },
    {
      engName: "Course",
      name: "การอบรม",
      links: "/course",
    },
    {
      engName: "Media",
      name: "ข่าวประชาสัมพันธ์",
      links: "/media",
    },
    {
      engName: "Search",
      name: "ค้นหา",
      links: "/search",
    },
  ];
  const handleLogout = () => {
    logout();
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleProfile = () => {
    handleClose();
    router.push(`/profile/${user.username}`);
  };

  const MenuUser = (
    <Menu
      id="menu-appbar"
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      keepMounted
      transformOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      open={Boolean(anchorEl)}
      onClose={handleClose}
    >
      <MenuItem onClick={handleProfile}>
        <ListItemIcon>
          <VscAccount color="#000" size={20}></VscAccount>
          <Typography variant="p" color="#000" ml={2}>
            ประวัติส่วนบุคคล
          </Typography>
        </ListItemIcon>
      </MenuItem>

      <MenuItem onClick={handleLogout}>
        <ListItemIcon>
          <BiLogOut color="#000" size={20}></BiLogOut>
          <Typography variant="p" color="#000" ml={2}>
            ออกจากระบบ
          </Typography>
        </ListItemIcon>
      </MenuItem>
    </Menu>
  );

  const MenuAdmin = (
    <Menu
      id="menu-appbar"
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      keepMounted
      transformOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      open={Boolean(anchorEl)}
      onClose={handleClose}
    >
      <MenuItem onClick={handleProfile}>
        <ListItemIcon>
          <VscAccount color="#000" size={20}></VscAccount>
          <Typography variant="p" color="#000" ml={2}>
            ประวัติส่วนบุคคล
          </Typography>
        </ListItemIcon>
      </MenuItem>
      <MenuItem>
        <MdManageAccounts color="#000" size={20}></MdManageAccounts>
        <Link href="/manage/dashboard">
          <Typography variant="p" ml={2}>
            หน้าผู้ดูแล
          </Typography>
        </Link>
      </MenuItem>
      <MenuItem onClick={handleLogout}>
        <ListItemIcon>
          <BiLogOut color="#000" size={20}></BiLogOut>
          <Typography variant="p" color="#000" ml={2}>
            ออกจากระบบ
          </Typography>
        </ListItemIcon>
      </MenuItem>
    </Menu>
  );

  const childrenPopUp = (
    <Box sx={{ width: "100%", height: "100%", bgcolor: "red" }}></Box>
  );

  return (
    <AppBar sx={{ bgcolor: "#021433", width: "100%" }}>
      <Box pl={5}>
        <Toolbar disableGutters>
          <Box sx={{ display: "flex", alignItems: "center", flexGrow: 3 }}>
            <Link href="/">
              <img
                src="https://www.it.kmitl.ac.th/wp-content/uploads/2017/12/it-logo.png"
                style={{ width: "3%", height: "100%", marginRight: "2%" }}
                href="/"
              />
            </Link>
            {NavLinkName.map((e, index) => (
              <Button
                sx={{ color: "#FFF" }}
                key={index}
                onClick={() => {
                  router.push(`${e.links}`);
                }}
              >
                <Typography noWrap>{e.name}</Typography>
              </Button>
            ))}
          </Box>
          <Box
            sx={{
              display: "flex",
              textAlign: "center",
              flexWrap: "nowrap",
              alignItems: "center",
            }}
            mr={3}
          >
            {user ? (
              <>
                <Typography variant="p" color="#fff">
                  {user.username}
                </Typography>
                <div>
                  <IconButton
                    size="large"
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    onClick={handleMenu}
                    color="inherit"
                  >
                    <VscAccount />
                  </IconButton>
                  {user?.isAdmin ? MenuAdmin : MenuUser}
                </div>
              </>
            ) : (
              <>
                <Link href="/auth/login" style={{ color: "#e8eaf6" }}>
                  <Tooltip title="Login" placement="top">
                    <Button variant="outlined" sx={{ bgcolor: "#FFF" }}>
                      <Typography noWrap>เข้าสู่ระบบ</Typography>
                    </Button>
                  </Tooltip>
                </Link>
              </>
            )}
          </Box>
        </Toolbar>
      </Box>
    </AppBar>
  );
}
