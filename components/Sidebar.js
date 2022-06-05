import React, { Fragment, useEffect, useState } from "react";
import {
  Box,
  Typography,
  ToggleButtonGroup,
  ToggleButton,
} from "@mui/material";
import { IoGridOutline, IoBook, IoBookmarks, IoPeople } from "react-icons/io5";
import { FiShare } from "react-icons/fi";
import { BiNews } from "react-icons/bi";

import Link from "next/link";
import styles from "./Sidebar.module.css";
import { useRouter } from "next/router";

const Sidebar = (props) => {
  const [toggleSelect, setToggleSelect] = useState();
  const router = useRouter();
  const services = [
    {
      name: "หน้าหลัก",
      lk: "/manage/dashboard",
      icon: <IoGridOutline size={24}></IoGridOutline>,
      value: "dashboard",
    },
    {
      name: "หลักสูตร",
      lk: "/manage/program",
      icon: <IoBook size={24}></IoBook>,
      value: "program",
    },
    {
      name: "การอบรม",
      lk: "/manage/course",
      icon: <IoBookmarks size={24} />,
      value: "course",
    },
    {
      name: "ข่าวประชาสัมพันธ์",
      lk: "/manage/media",
      icon: <BiNews size={24}></BiNews>,
      value: "media",
    },
    {
      name: "ช่องทางประชาสัมพันธ์",
      lk: "/manage/channel",
      value: "channel",
      icon: <FiShare size={24}></FiShare>,
    },
  ];

  const account = [
    {
      name: "ผู้ดูแล",
      lk: "/manage/admin",
      icon: <IoPeople size={24}></IoPeople>,
      value: "admin",
    },
  ];

  const handleToggle = (event, value) => {
    setToggleSelect(value);
    router.push(`/manage/${value}`);
  };

  useEffect(() => {
    const findPath = router.pathname.substring(8);
    if (findPath.indexOf("/") >= 0) {
      const useFindPath = findPath.substring(0, findPath.indexOf("/"));
      setToggleSelect(useFindPath);
    } else {
      setToggleSelect(findPath.substring(0, 10));
    }
  }, [router]);
  return (
    <Fragment>
      <Box
        m={0}
        p={2}
        pt={12}
        sx={{
          width: "100%",
          height: "100%",
          overflow: "hidden",
          boxSizing: "border-box",
          boxShadow:
            "rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px",
          overflowY: "auto",
          bgcolor: "rgba(250, 250, 252, 1)",
        }}
      >
        <Box sx={{ color: "rgba(150, 150, 158, 1)" }}>
          <Typography variant="p" color="rgba(150, 150, 158, 1)">
            SERVICES
          </Typography>
        </Box>
        <ToggleButtonGroup
          orientation="vertical"
          value={toggleSelect}
          exclusive
          fullWidth
          sx={{ borderBlock: "none" }}
        >
          {services.map((e, index) => {
            return (
              <ToggleButton
                value={e.value}
                key={index}
                sx={{ border: "none" }}
                onClick={handleToggle}
              >
                <Box
                  sx={{ width: "30%", alignItems: "center", display: "flex" }}
                >
                  {e.icon}
                </Box>
                <Box
                  sx={{
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <Typography variant="overline" fontSize={15} noWrap>
                    {e.name}
                  </Typography>
                </Box>
              </ToggleButton>
            );
          })}

          <Box sx={{ color: "rgba(150, 150, 158, 1)" }} mt={3}>
            <Typography variant="p" color="rgba(150, 150, 158, 1)">
              ACCOUNT
            </Typography>
          </Box>

          {account.map((e, index) => {
            return (
              <Link href={e.lk} key={e.value}>
                <ToggleButton
                  value={e.value}
                  sx={{ border: "none" }}
                  aria-label="bold"
                >
                  <Box
                    sx={{ width: "30%", alignItems: "center", display: "flex" }}
                  >
                    {e.icon}
                  </Box>
                  <Box
                    sx={{
                      width: "100%",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <Typography variant="overline" fontSize={15} noWrap>
                      {e.name}
                    </Typography>
                  </Box>
                </ToggleButton>
              </Link>
            );
          })}
        </ToggleButtonGroup>
      </Box>
    </Fragment>
  );
};

export default Sidebar;
