import React from "react";
import { Box, Button, Divider, Typography } from "@mui/material";
import HomeLayout from "../layouts/HomeLayout";
import Carousel from "../components/User/Home/Carousel";
import Link from "next/link";
import MenuCarousel from "../components/User/Home/MenuCarousel";
import Footer from "../components/User/Home/Footer";

export default function Home(props) {
  return (
    <Box sx={{ width: "100%", height: "100%" }}>
      <Box
        sx={{
          boxSizing: "border-box",
        }}
      >
        <Carousel data={props.data.medias}></Carousel>
      </Box>

      {/* second content */}
      <Box
        sx={{
          width: "100%",
          height: "auto",
          boxSizing: "border-box",
          bgcolor: "#011433",
        }}
      >
        <Box sx={{ height: "50%" }} p={3}>
          <Typography variant="h5" color="#FFF" noWrap mb={2}>
            หลักสูตร
          </Typography>
          <Divider sx={{ bgcolor: "#FFF" }} />

          <MenuCarousel data={props.data.programs} pathName={"program"} />

          <Box
            sx={{
              display: "flex",
              width: "100%",
              flexDirection: "row-reverse",
              boxSizing: "border-box",
            }}
            pr={5}
          >
            <Link href="/program">
              <Button variant="outlined" sx={{ color: "#FFF" }}>
                ดูเพิ่มเติ่ม ...
              </Button>
            </Link>
          </Box>
        </Box>

        <Box sx={{ height: "50%", bgcolor: "#FFF" }} p={3}>
          <Typography variant="h5" color="#000" noWrap mb={2}>
            การอบรม
          </Typography>
          <Divider sx={{ bgcolor: "#000" }} />
          <MenuCarousel data={props.data.courses} pathName={"course"} />

          <Box
            sx={{
              display: "flex",
              width: "100%",
              flexDirection: "row-reverse",
              boxSizing: "border-box",
            }}
            pr={5}
          >
            <Link href="/course">
              <Button variant="outlined">ดูเพิ่มเติ่ม ...</Button>
            </Link>
          </Box>
        </Box>

        <Box sx={{ height: "50%" }} p={3}>
          <Typography variant="h5" color="#FFF" noWrap mb={2}>
            ข่าว/ ประชาสัมพันธ์
          </Typography>
          <Divider sx={{ bgcolor: "#FFF" }} />
          <MenuCarousel data={props.data.medias} pathName={"media"} />
          <Box
            sx={{
              display: "flex",
              width: "100%",
              flexDirection: "row-reverse",
              boxSizing: "border-box",
            }}
            pr={5}
          >
            <Link href="/media">
              <Button variant="outlined" sx={{ color: "#FFF" }}>
                ดูเพิ่มเติ่ม ...
              </Button>
            </Link>
          </Box>
        </Box>
      </Box>
      <Footer></Footer>
    </Box>
  );
}

Home.getLayout = function getLayout(page) {
  return <HomeLayout>{page}</HomeLayout>;
};

export const getServerSideProps = async () => {
  const dataFind = await fetch(
    "https://pr-project-api.herokuapp.com/public/find"
  );
  const data = await dataFind.json();
  return {
    props: {
      data: data,
    },
  };
};
