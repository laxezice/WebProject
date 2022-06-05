import { Box, Typography, CardMedia, CardContent, Card } from "@mui/material";
import React, { useState } from "react";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import { CardActionArea } from "@mui/material";
import styles from "./MenuCarousel.module.css";
import Link from "next/link";

const handleDragStart = (e) => e.preventDefault();
const responsive = {
  0: { items: 2 },
  568: { items: 3 },
  1024: { items: 4 },
};

const MenuCarousel = (props) => {
  const { data, pathName } = props;

  const items = data.slice(0, 6).map((e, index) => {
    const findimage = (e) => {
      if (e?.images === undefined) {
        const findImage = e?.contents.findIndex((e) => e.type === "image");
        if (findImage !== -1) {
          return e.contents[findImage].url;
        }
      } else if(e?.images && e?.images[0]){
        return e?.images[0].url;
      }
      else {
        return ""
      }
    };

    return (
      <Link href={`/${pathName}/${e.id}`}
      key={index}>
        <Card sx={{ maxWidth: 380 }} className={styles.card}>
          <CardActionArea>
            <CardMedia
              sx={{ bgcolor: "#2D569E" }}
              component="img"
              height="200"
              image={
                findimage(e) ||
                "https://kaijeaw.in.th/wp-content/uploads/2020/04/ai.jpg"
              }
            />
            <CardContent sx={{ bgcolor: "#e4e4e4" }}>
              <Typography gutterBottom variant="h5" component="div">
                {e?.title ? e?.title : e?.engName}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {e?.description
                  ? e.description.substring(0, 200)
                  : e?.content?.substring(0, 100)}{" "}
                ..
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </Link>
    );
  });

  return (
    <Box sx={{ boxSizing: "border-box" }} mt={3} p={3}>
      <AliceCarousel
        className={styles}
        mouseTracking
        items={items}
        infinite
        responsive={responsive}
        stopAutoPlayOnHover
        controlsStrategy="alternate"
        disableButtonsControls
        animationDuration={3000}
        autoPlayInterval={5000}
      />
    </Box>
  );
};

export default MenuCarousel;
