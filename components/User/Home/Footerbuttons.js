import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import ButtonBase from "@mui/material/ButtonBase";
import Typography from "@mui/material/Typography";
import Link from "next/link";

const images = [
  {
    url: "https://images.pexels.com/photos/5965857/pexels-photo-5965857.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
    title: "หลักสูตร",
    width: "30%",
    link: "/program",
  },
  {
    url: "https://images.pexels.com/photos/8171204/pexels-photo-8171204.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
    title: "การอบรม",
    width: "40%",
    link: "/course",
  },
  {
    url: "https://images.pexels.com/photos/177557/pexels-photo-177557.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
    title: "ข่าวประชาสัมพันธ์",
    width: "30%",
    link: "/media",
  },
];

const ImageButton = styled(ButtonBase)(({ theme }) => ({
  position: "relative",
  height: "100%",
  [theme.breakpoints.down("sm")]: {
    width: "100% !important", // Overrides inline-style
    height: 100,
  },
  "&:hover, &.Mui-focusVisible": {
    zIndex: 1,
    "& .MuiImageBackdrop-root": {
      opacity: 0.15,
    },
    "& .MuiImageMarked-root": {
      opacity: 0,
    },
    "& .MuiTypography-root": {
      border: "4px solid currentColor",
    },
  },
}));

const ImageSrc = styled("span")({
  position: "absolute",
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  backgroundSize: "cover",
  backgroundPosition: "center 40%",
});

const Image = styled("span")(({ theme }) => ({
  position: "absolute",
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: theme.palette.common.white,
}));

const ImageBackdrop = styled("span")(({ theme }) => ({
  position: "absolute",
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  backgroundColor: theme.palette.common.black,
  opacity: 0.4,
  transition: theme.transitions.create("opacity"),
}));

const ImageMarked = styled("span")(({ theme }) => ({
  height: 3,
  width: 18,
  backgroundColor: theme.palette.common.white,
  position: "absolute",
  bottom: -2,
  left: "calc(50% - 9px)",
  transition: theme.transitions.create("opacity"),
}));

export default function Footerbuttons() {
  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        minWidth: 300,
        width: "100%",
        height: "100%",
      }}
    >
      {images.map((image, index) => (
        <Link href={image.link} key={index}>
          <ImageButton
            focusRipple
            style={{
              width: image.width,
            }}
          >
            <ImageSrc style={{ backgroundImage: `url(${image.url})` }} />
            <ImageBackdrop className="MuiImageBackdrop-root" />
            <Image>
              <Typography
                component="span"
                variant="subtitle1"
                color="inherit"
                sx={{
                  position: "relative",
                  p: 4,
                  pt: 2,
                  pb: (theme) => `calc(${theme.spacing(1)} + 6px)`,
                }}
              >
                {image.title}
                <ImageMarked className="MuiImageMarked-root" />
              </Typography>
            </Image>
          </ImageButton>
        </Link>
      ))}
    </Box>
  );
}
