import React, {useState } from "react";
import Headers from "../../components/User/Home/Header";
import {
  Box,
  Container,
  Grid,
  Typography,
  Pagination,
} from "@mui/material";
import Link from "next/link";
import Footer from "../../components/User/Home/Footer";

// page
import MediaCard from "../../components/User/Home/Mediacard";
import HomeLayout from "../../layouts/HomeLayout";
// icon
import { MdPlayArrow } from "react-icons/md";
import axios from "axios";

const Media = (props) => {
  const bannerImag = "https://thenextweb.com/files/2010/06/News.jpg";
  const textHeader = "ข่าวประชาสัมพันธ์";
  const pathName = "media";

  const [mediaData, setMediaData] = useState(props.data.medias);
  const [pages, setPages] = useState(props.data.medias.page);

  const handleChange = async (event, value) => {
    setPages(value)
    try {
      const response = await axios.get(
        `https://pr-project-api.herokuapp.com/public/${pathName}/find?page=${value}`
      );
      setMediaData(response.data.medias);
      setPages(response.data.page);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        overflowY: "auto",
        bgcolor: "#F0F0F0",
      }}
    >
      {/* header */}
      <Box sx={{ width: "100%", height: "20%" }}>
        <Headers
          textHeader={textHeader}
          imags="https://kaijeaw.in.th/wp-content/uploads/2020/04/ai.jpg"
        ></Headers>
      </Box>
      {/*  icon menu card */}
      <Container
        maxWidth="xl"
        sx={{
          overflow: "hidden",
          bgcolor: "#FFF",
          marginTop: "5%",
          marginBottom: "5%",
          paddingTop: "3%",
          paddingBottom: "3%",
          boxSizing: "border-box",
          borderRadius: 5,
        }}
      >
        {/* img and tad */}
        <Box
          sx={{ bgcolor: "#4d80dbf2", width: "100% ", height: "30vh" }}
          mb={5}
        >
          <img
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              borderRadius: "50",
              maxHeight: "100%",
              maxWidth: "100%",
            }}
            src={bannerImag}
          />
        </Box>
        <Box
          sx={{
            borderTop: "1px solid #4d80dbf2",
            borderBottom: "1px solid #4d80dbf2",
            width: "100% ",
            height: "4vh",
            display: "flex",
            alignItems: "center",
            color: "#4d80dbf2",
          }}
          mb={5}
        >
          <Box mr={2}>
            <Link href="/">
              <a>หน้าแรก</a>
            </Link>
          </Box>
          <MdPlayArrow />
          <Box ml={2}>
            <Link href="/media">ข่าวประชาสัมพันธ์</Link>
          </Box>
        </Box>
        {/*  toggle Select and search bar */}
        <Box
          sx={{
            width: "100%",
            height: "auto",
            display: "flex",
            boxSizing: "border-box",
          }}
          mt={2}
          pb={3}
        >
          <Box sx={{ width: "80%" }}>
            <Typography variant="h5" color="#000" mt={3} ml={3}>
              <pre>ข่าวประชาสัมพันธ์</pre>
            </Typography>
          </Box>
        </Box>

        <Box sx={{ height: "82%", width: "100%", display: "flex" }}>
          {/* card menu */}
          <Grid
            container
            sx={{
              width: "100%",
              borderRadius: 1,
              height: "82%",
            }}
            ml={2}
          >
            <Grid
              container
              spacing={2}
              mb={4}
              columnSpacing={{ xs: 4, sm: 2, md: 3 }}
            >
              {mediaData.map((e, index) => {
                return (
                  <MediaCard
                    key={e.id}
                    herder={e.title}
                    description={e.content}
                    imgs={e.images[0].url}
                    id={e.id}
                    pathName={pathName}
                    viewed={e.viewed[0]?.view ? e.viewed[0].view : 0}
                  />
                );
              })}

              <Grid item xs={12} mt={2} mb={5}>
                <Box sx={{ position: "relative" }}>
                  
                  <Pagination
                    defaultValue={1}
                    count={props.data.totalPages}
                    size="large"
                    color="primary"
                    sx={{ position: "absolute", right: "0px" }}
                    onChange={handleChange}
                  />
                </Box>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </Container>
      <Footer></Footer>
    </Box>
  );
};

Media.getLayout = function getLayout(page) {
  return <HomeLayout>{page}</HomeLayout>;
};

export default Media;

export const getServerSideProps = async () => {
  const res = await fetch(
    "https://pr-project-api.herokuapp.com/public/media/find"
  );
  const data = await res.json();
  return {
    props: {
      data: data,
    },
  };
};
