import React, { useState } from "react";
import Headers from "../../components/User/Home/Header";
import {
  Box,
  Container,
  Grid,
  Typography,
  Pagination,
} from "@mui/material";
//component
import MediaCard from "../../components/User/Home/Mediacard";
import HomeLayout from "../../layouts/HomeLayout";
import Link from "next/link";
import Footer from "../../components/User/Home/Footer";
//icon
import { MdPlayArrow } from "react-icons/md";
import axios from "axios";

const Course = (props) => {
  const bannerImag =
    "https://vistapointe.net/images/it-4.jpg";
  const textHeader = "การอบรม";
  const pathName = "course";
  const [courseData, setCourseData] = useState(props.data.courses);
  const [pages, setPages] = useState(1);

  const handleChange = async (event, value) => {
    setPages(value);
    try {
      const response = await axios.get(
        `https://pr-project-api.herokuapp.com/public/course/find?page=${value}`
      );
      setCourseData(response.data.courses);
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
        <Headers textHeader={textHeader} imags="https://vistapointe.net/images/it-4.jpg"></Headers>
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

        {/* tab page */}
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
            <Link href="/course">การอบรม</Link>
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
              <pre>การอบรม</pre>
            </Typography>
          </Box>
          <Box sx={{ width: "20%" }}>
            
          </Box>
        </Box>

        <Box sx={{ height: "82%", width: "100%", display: "flex" }}>
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
              {courseData?.map((e, index) => {
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
                    key={e.id}
                    herder={e.title}
                    description={e.description}
                    id={e.id}
                    pathName={pathName}
                    viewed={e.viewed[0]?.view ? e.viewed[0].view : 0}
                    imgs={
                      findimage(e) ||
                      "https://kaijeaw.in.th/wp-content/uploads/2020/04/ai.jpg"
                    }
                  />
                );
              })}

              <Grid item xs={12} mt={2} mb={5}>
                <Box sx={{ position: "relative" }}>
                  <Pagination
                    // count={courseData.totalPage}
                    count={props.data.totalPages}
                    defaultPage={1}
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
      <Footer />
    </Box>
  );
};

Course.getLayout = function getLayout(page) {
  return <HomeLayout>{page}</HomeLayout>;
};

export default Course;

export const getServerSideProps = async () => {
  const res = await fetch(
    "https://pr-project-api.herokuapp.com/public/course/find?page=1"
  );
  const data = await res.json();
  return {
    props: {
      data: data,
    },
  };
};
