import { Box, Button, Grid, Typography } from "@mui/material";
import { maxHeight } from "@mui/system";
import React, { useEffect, useState } from "react";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import Image from "next/image";
import axios from "axios";
import { useRouter } from 'next/router'

const handleDragStart = (e) => e.preventDefault();

const Carousel = (props) => {
  const {data} = props
  const [mediaData, setMediaData] = useState(data)
  const router = useRouter()
  const items = mediaData.map((e, index) => {
    return (
      <Box
      key={index}
      onDragStart={handleDragStart}
      onClick={() => {
        router.push(`/media/${e.id}`)
      }}
      sx={{
        display: "flex",
        overflow: "hidden",
        width: "100%",
        height: "50vh",
        textAlign: "center",
        marginRight: "5%",
        boxShadow:
          "rgba(0, 0, 0, 0.2) 0px 12px 28px 0px, rgba(0, 0, 0, 0.1) 0px 2px 4px 0px, rgba(255, 255, 255, 0.05) 0px 0px 0px 1px inset",
      }}
    >
      <img
        style={{
          width: "50%",
          height: "100%",
          objectFit: "cover",
          borderRadius: "50",
          maxHeight: "100%",
          maxWidth: "100%",
        }}
        src={e.images[0] ? e.images[0].url : "https://kaijeaw.in.th/wp-content/uploads/2020/04/ai.jpg"}
      />
      <Box
        sx={{ width: "50%", bgcolor: "#000917", boxSizing: "border-box" }}
        p={5}
      >
        <a>
        <Typography variant="h3" textAlign="left" color="#FFF">
       {e.title}
        </Typography>
        </a>
      </Box>

    </Box>
  )})



  return (
    <Box sx={{ boxSizing: "border-box", overflow: "hidden" }}>
      <AliceCarousel
        mouseTracking
        items={items}
        infinite
        autoPlay
        stopAutoPlayOnHover
        controlsStrategy="alternate"
        disableButtonsControls
        animationDuration={10000}
        activeIndex={5}
        disableDotsControls
      />
    </Box>
  );
};
export default Carousel;
