import { Box, Divider, Grid, Typography } from "@mui/material";
import React from "react";
import Footerbuttons from "./Footerbuttons";
import Link from "next/link";
import { BsHexagonHalf } from "react-icons/bs";
import {
  AiFillFacebook,
  AiFillYoutube,
  AiOutlineTwitter,
} from "react-icons/ai";
import IconButton from "@mui/material/IconButton";

const Footer = () => {
  const data = [
    {
      name: "หลักสูตร",
      links: "/programse",
    },
    {
      name: "การอบรม",
      links: "/course",
    },
    {
      name: "ข่าวประชาสัมพันธ์",
      links: "/media",
    },
  ];

  const socialData = [
    {
      name: "Facebook",
      icon: <AiFillFacebook size={40}></AiFillFacebook>,
      links: "https://www.facebook.com/ITLadkrabang",
    },
    {
      name: "Youtube",
      icon: <AiFillYoutube size={40}></AiFillYoutube>,
      links: "https://www.youtube.com/user/itkmitl1",
    },
    {
      name: "Twitter",
      icon: <AiOutlineTwitter size={40}></AiOutlineTwitter>,
      links: "https://twitter.com/itkmitl",
    },
  ];

  return (
    <Box
      sx={{
        width: "100%",
        height: "46vh",
        bgcolor: "#151515",
        boxShadow:
          "rgba(50, 50, 93, 0.25) 0px 30px 60px -12px, rgba(0, 0, 0, 0.3) 0px 18px 36px -18px",
      }}
    >
      <Box sx={{ width: "100%", height: "14vh", bgcolor: "#FFF" }}>
        <Footerbuttons></Footerbuttons>
      </Box>
      <Box sx={{ width: "100%", height: "32vh", bgcolor: "#1a1a1af5" }}>
        <Grid
          container
          sx={{ boxSizing: "border-box", bgcolor: "#1a1a1af5" }}
          p={6}
          columnSpacing={{ xs: 8, sm: 4, md: 12 }}
          spacing={6}
        >
          <Grid item>
            <Box sx={{ width: "100%", height: "100%", color: "#666" }}>
              <img
                src="https://www.it.kmitl.ac.th/wp-content/uploads/2017/12/it-logo.png"
                style={{ width: "10%" }}
              ></img>
              <Typography>
                Faculty of Information Technology King Mongkut &apos; s
                Institute of Technology Ladkrabang
              </Typography>
              <Typography>
                1, Chalong Krung 1, Ladkrabang, Bangkok 10520
              </Typography>
              <Typography>+66 (0) 2723 4900</Typography>
              <Typography>+66 (0) 2723 4910</Typography>
            </Box>
          </Grid>
          <Grid item>
            <Box sx={{ width: "100%", height: "100%" }}>
              <Typography variant="h6" color="#FFF">
                NAVIGATION <BsHexagonHalf></BsHexagonHalf>
              </Typography>
              {data.map((e) => {
                return (
                  <Link href={e.links} key={e.links}>
                    <Box sx={{ color: "#666" }}>
                      <a>{e.name}</a>
                    </Box>
                  </Link>
                );
              })}
            </Box>
          </Grid>
          <Grid item>
            <Box sx={{ width: "100%", height: "100%" }}>
              <Box sx={{ color: "#FFF" }}>
                <Typography variant="h6">
                  SOCIAL MEDIA <BsHexagonHalf></BsHexagonHalf>
                </Typography>
                <Box sx={{ display: "flex" }}>
                  {socialData.map((e, index) => {
                    return (
                      <Link href={e.links} key={index}>
                        <IconButton
                          sx={{ color: "#FFF" }}
                          key={e.links}
                          alt={e.name}
                        >
                          {e.icon}
                        </IconButton>
                      </Link>
                    );
                  })}
                </Box>
              </Box>
            </Box>
          </Grid>
          <Grid item>
            <Box>
              <img src="https://qr-official.line.me/sid/L/026vtgcs.png" height={100}></img>
            </Box>
            <Typography fontSize={11} color="#FFF">ติดต่อสอบถามข้อมูลเพิ่มเติม</Typography>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default Footer;
