import React from "react";
import { makeStyles } from "@mui/styles";
import { Box, Typography, Grid, Paper } from "@mui/material";
import { FaBook } from "react-icons/fa";

const useStyle = makeStyles({
  Paper: {
    height: "100%",
    width: "100%",
    display: "flex",
    overflow: "hidden",

    boxShadow: "0 0 20px 8px rgba(207, 205, 205, 0.56)",
  },
  cardUpdate: {
    height: "100%",
    bgcolor: "red",
  },
  ct: {
    textAlign: "center",
    display: "block",
    justifyContent: "center",
    alignItems: "center",
    margin: "auto",
    width: "40%",
  },
});

const dataCardUpdate = [
  {
    hCard: "หลักสูตร",
    number: "10",
    icon: <FaBook size={"60px"} color="rgba(13, 47, 90, 1)" />,
    cl: "rgba(13, 47, 90, 1)",
  },
  {
    hCard: "การอบรม",
    number: "10",
    icon: <FaBook size={"60px"} color="#3CCCA0" />,
    cl: "#3CCCA0",
  },
  {
    hCard: "ประชาสัมพันธ์",
    number: "10",
    icon: <FaBook size={"60px"} color="#3CBDCB" />,
    cl: "#3CBDCB",
  },
  {
    hCard: "4",
    number: "10",
    icon: <FaBook size={"60px"} color="#F7C443" />,
    cl: "#F7C443",
  },
];

const Cardupdate = () => {
  const classes = useStyle();
  return (
    <Box sx={{ display: "flex", width: "100%", height: "100%" }} p={2}>
      <Grid container spacing={2}>
        {dataCardUpdate.map((d) => (
          <Grid item xs={3} className={classes.cardUpdate} key={d.hCard}>
            <Paper className={classes.Paper}>
              <Box sx={{ width: "7%", bgcolor: `${d.cl}`, height: "100%" }} />
              <Box p={1} sx={{ width: "63%" }}>
                <Typography variant="h5" sx={{ color: `${d.cl}` }}>
                  {d.hCard}
                </Typography>
                <Typography variant="h4" sx={{ color: `${d.cl}` }}>
                  {d.number}
                </Typography>
              </Box>
              <Box className={classes.ct}>{d.icon}</Box>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};
export default Cardupdate;
