import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CardActionArea from "@mui/material/CardActionArea";
import Typography from "@mui/material/Typography";
import { useRouter } from "next/router";
import { Grid, Box } from "@mui/material";

// icon
import { MdVisibility } from "react-icons/md";

export default function MediaCard(props) {
  const { herder, description, textLink, imgs, alts, id, pathName, viewed } =
    props;
  const router = useRouter();
  const handleCardClick = () => {
    router.push(`/${pathName}/${id}`);
  };
  return (
    <Grid item>
      <Card
        onClick={handleCardClick}
        sx={{
          maxWidth: 345,
          boxShadow: " rgba(100, 100, 111, 0.2) 0px 7px 29px 0pxt",
          overflow: "hidden",
          borderRadius: "10px",
          border: "none",
        }}
      >
        <CardActionArea>
          {imgs ? (
            <CardMedia
              sx={{ bgcolor: "#2D569E" }}
              component="img"
              height="160"
              image={imgs}
              alt={alts}
            />
          ) : (
            <CardMedia
              sx={{ bgcolor: "#2D569E" }}
              component="img"
              height="160"
              image="https://kaijeaw.in.th/wp-content/uploads/2020/04/ai.jpg"
              alt={alts}
            ></CardMedia>
          )}
          <CardContent sx={{ bgcolor: "#f7f7f7" }}>
            <Typography gutterBottom variant="h5" component="div">
              {herder}
            </Typography>
            {description && (
              <Typography variant="p" color="text.secondary">
                {description.substring(0, 200)} ...
              </Typography>
            )}
          </CardContent>
          <Box sx={{ width: "100%", display : 'flex', boxSizing : 'border-box', flexDirection : 'row-reverse', color : '#cbced4', alignItems : 'center' }} p={1}>
            <MdVisibility fontSize={26} ml={1}></MdVisibility>
            <Typography variant="p" mt={0.5} mr={1}>{viewed}</Typography>

          </Box>
        </CardActionArea>
      </Card>
    </Grid>
  );
}
