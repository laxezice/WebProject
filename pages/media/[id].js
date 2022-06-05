import React, { useState } from "react";
import { useRouter } from "next/router";
import HomeLayout from "../../layouts/HomeLayout";
import Headers from "../../components/User/Home/Header";
import { Box, Container, Divider, Grid, Typography } from "@mui/material";
import Footer from "../../components/User/Home/Footer";
import moment from "moment";
import FormatContent from "../../components/Admin/Media/FormatContent";

const Media = (props) => {
  const router = useRouter();
  const { data } = props;
  const [mediaData, setMediaData] = useState(data);
  const [dataTime, setDateTime] = useState(
    moment(mediaData?.createdAt).format("DD MMM YY")
  );
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
          textHeader={mediaData.title}
          imags="https://kaijeaw.in.th/wp-content/uploads/2020/04/ai.jpg"
        ></Headers>
      </Box>
      <Container
        maxWidth="xl"
        sx={{
          overflow: "hidden",
          bgcolor: "#FFF",
          marginTop: "5%",
          marginBottom: "5%",
          boxSizing: "border-box",
          padding: "3%",
        }}
      >
        <Typography
          variant="h4"
          color="rgb(0, 102, 204)"
          mb={3}
          sx={{ fontSize: "1.5em", fontWeight: "bold" }}
        >
          <span>{mediaData.title}</span>
        </Typography>
        <Box pl={3} pb={3} sx={{ color: "#a6a6a6", display: "flex" }}>
          <Box>{dataTime}</Box>
        </Box>
        <Divider></Divider>
        <Box sx={{ width: "100%", boxSizing: "border-box" }} mx="auto" p={3}>
          <FormatContent content={mediaData.content} />
        </Box>
        <Container>
          <Grid container columnSpacing={{ xs: 12, sm: 3, mb: 8 }}>
            {mediaData.images.map((e, index) => {
              return (
                <Grid item xs={6} key={index}>
                  <img src={e.url} height="100%" width="100%"></img>
                </Grid>
              );
            })}
          </Grid>
        </Container>
      </Container>
      <Footer></Footer>
    </Box>
  );
};

Media.getLayout = function getLayout(page) {
  return <HomeLayout>{page}</HomeLayout>;
};

export default Media;

export const getServerSideProps = async (context) => {
  const id = context.params.id;
  const res = await fetch(
    `https://pr-project-api.herokuapp.com/public/media/${id}`
  );
  const data = await res.json();

  return {
    props: {
      data: data.media,
    },
  };
};
