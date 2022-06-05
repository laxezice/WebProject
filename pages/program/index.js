import React, { useState } from "react";
import Headers from "../../components/User/Home/Header";
import {
  Box,
  Container,
  Grid,
  Typography,
  Pagination,
  TextField,
  Button,
  Divider,
} from "@mui/material";
import MediaCard from "../../components/User/Home/Mediacard";
import HomeLayout from "../../layouts/HomeLayout";
import Link from "next/link";
// icon
import { MdPlayArrow } from "react-icons/md";
import Footer from "../../components/User/Home/Footer";

import axios from "axios";
import { useAuth } from "../../contexts/Section";

const Program = (props) => {
  const bannerImag = "https://kaijeaw.in.th/wp-content/uploads/2020/04/ai.jpg";
  const textHeader = "หลักสูตร";
  const pathName = "program";

  const [pages, setPages] = useState(1);
  const [programData, setProgramData] = useState(props.data.programs);

  const handleChange = async (event, value) => {
    setPages(value);
    try {
      const response = await axios.get(
        `https://pr-project-api.herokuapp.com/public/${pathName}/find?page=${value}`
      );
      setProgramData(response.data.programs);
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
          imags="https://www.it.kmitl.ac.th/wp-content/themes/itkmitl2017wp/img/course-hero.jpg"
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
        p={3}
      >
        {/* img and tad */}
        <Box
          sx={{
            bgcolor: "#4d80dbf2",
            width: "100% ",
            height: "30vh",
            position: "relative",
          }}
          mb={5}
        >
          <Box position="absolute" width="100%" height="100%">
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
            <Link href="/program">หลักสูตร</Link>
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
        >
          <Typography variant="h5" color="#000" ml={3}>
            <pre>หลักสูตร</pre>
          </Typography>
        </Box>

        <Box sx={{ height: "82%", width: "100%", display: "flex" }}>
          {/* card menu */}
          <Grid
            container
            sx={{
              width: "80%",
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
              {programData?.map((e, index) => {
                const findimage = (e) => {
                  const findImage = e?.contents.findIndex(
                    (e) => e.type === "image"
                  );
                  if (findImage !== -1) {
                    return e.contents[findImage].url;
                  }
                };
                return (
                  <MediaCard
                    herder={e.engName}
                    key={e.engName}
                    description={e.thaiName}
                    id={e.id}
                    pathName={pathName}
                    imgs={
                      findimage(e) ||
                      "https://kaijeaw.in.th/wp-content/uploads/2020/04/ai.jpg"
                    }
                    viewed={e.viewed[0]?.view ? e.viewed[0].view : 0}
                  />
                );
              })}

              <Grid item xs={12} mt={2} mb={5}>
                <Box sx={{ position: "relative" }}>
                  <Pagination
                    count={props.data.totalPages}
                    size="large"
                    color="primary"
                    sx={{ position: "absolute", right: "0px" }}
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

Program.getLayout = function getLayout(page) {
  return <HomeLayout>{page}</HomeLayout>;
};
export default Program;

export const getServerSideProps = async () => {
  const res = await fetch(
    "https://pr-project-api.herokuapp.com/public/program/find"
  );
  const data = await res.json();
  return {
    props: {
      data: data,
    },
  };
};
