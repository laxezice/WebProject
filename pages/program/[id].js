import React, { useState } from "react";
import HomeLayout from "../../layouts/HomeLayout";
import CourseViewer from "../../components/Admin/Program/ProgramViewer";
import { Box, Container, Typography, Divider } from "@mui/material";
import Headers from "../../components/User/Home/Header";
import Footer from "../../components/User/Home/Footer";

const Program = (props) => {
  const { data } = props;
  const [programData, setProgramData] = useState(data);
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
        <Headers textHeader={programData.thaiName} imags="https://www.it.kmitl.ac.th/wp-content/themes/itkmitl2017wp/img/course-hero.jpg"></Headers>
      </Box>

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
            <span>{programData.thaiName}</span> 
          </a>
        </Typography>
        <Divider></Divider>
        <CourseViewer program={programData}></CourseViewer>
      </Container>
      <Footer></Footer>
      
    </Box>
  );
};

Program.getLayout = function getLayout(page) {
  return <HomeLayout>{page}</HomeLayout>;
};
export default Program;

export const getServerSideProps = async (context) => {
  const id = context.params.id;
  const res = await fetch(
    `https://pr-project-api.herokuapp.com/public/program/${id}`
  );
  const data = await res.json();

  return {
    props: {
      data: data.program,
    },
  };
};
