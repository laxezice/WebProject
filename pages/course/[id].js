import React, { useState } from "react";
import { useRouter } from "next/router";
import HomeLayout from "../../layouts/HomeLayout";
import CourseViewer from "../../components/Admin/Course/CourseViewer";
import Headers from "../../components/User/Home/Header";
import { Box, Container, Divider, Typography } from "@mui/material";
import Footer from "../../components/User/Home/Footer";

const Course = (props) => {
  const router = useRouter();
  const { id } = router.query;
  const { data } = props;
  const [courseData, setCourseData] = useState(data);
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
        <Headers textHeader={courseData.title} imags="https://vistapointe.net/images/it-4.jpg"></Headers>
      </Box>

      <Container
        maxWidth="xl"
        sx={{
          overflow: "hidden",
          bgcolor: "#FFF",
          marginTop: "5%",
          marginBottom: "5%",
          paddingTop : '3%',
          paddingBottom : '3%',
          boxSizing: "border-box",
          borderRadius: 2,

        }}
      >

        <Typography
          variant="h4"
          color="rgb(0, 102, 204)"
          mb={3}
          sx={{ fontSize: "1.5em", fontWeight: "bold", alignItems: "center" }}
          textAlign="center"
        >
          <a>
            <span>{courseData.title}</span>
          </a>
        </Typography>
        <Divider></Divider>
        <CourseViewer course={courseData}></CourseViewer>
      </Container>
      <Footer></Footer>
    </Box>
  );
};

Course.getLayout = function getLayout(page) {
  return <HomeLayout>{page}</HomeLayout>;
};

export default Course;

export const getServerSideProps = async (context) => {
  const id = context.params.id;
  const res = await fetch(
    `https://pr-project-api.herokuapp.com/public/course/${id}`
  );
  const data = await res.json();

  return {
    props: {
      data: data.course,
    },
  };
};
