import React, { useState } from "react";
import Headers from "../../components/User/Home/Header";
import {
  Box,
  Container,
  Grid,
  TextField,
  Button,
  Typography,
} from "@mui/material";
import { AiOutlineSearch } from "react-icons/ai";
import InputAdornment from "@mui/material/InputAdornment";
import MediaCard from "../../components/User/Home/Mediacard";
import HomeLayout from "../../layouts/HomeLayout";
import Footer from "../../components/User/Home/Footer";
import { useAuth } from "../../contexts/Section";
import axios from "axios";

const Search = (props) => {
  const { showSnackbar } = useAuth();
  const textHeader = "ค้นหาข้อมูล";
  const [pathName, setPathName] = useState(["course", "media"]);
  const [allData, setAllData] = useState([
    props.data.courses,
    props.data.medias,
    props.data.programs,
  ]);

  const handleSearch = async (event) => {
    event.preventDefault();
    console.log(event.target.search.value);
    try {
      const response = await axios.get(
        `/public/find?search=${event.target.search.value}`
      );
      setAllData([
        response.data.courses,
        response.data.medias,
        response.data.programs,
      ]);
      showSnackbar(response.data.message, "success");
    } catch (err) {
      console.log(err);
      showSnackbar(err.message, "error");
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
        <Headers textHeader={textHeader}></Headers>
      </Box>
      {/*  icon menu card */}
      <Container
        maxWidth="100%"
        sx={{
          width: "90%",
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
        {/*  toggle Select and search bar */}
        <Box
          sx={{
            width: "100%",
            height: "auto",
            boxSizing: "border-box",
          }}
          mt={2}
          pb={3}
          ml={10}
          mb={3}
        >
          <Grid container spacing={3} columnSpacing={{ xs: 2, sm: 3, md: 4 }}>
            <Grid ttem xs={9}></Grid>
            <Grid item >
              <form onSubmit={handleSearch}>
                <TextField
                  name="search"
                  size="small"
                  sx={{
                    bgcolor: "#FFF",
                  }}
                  hiddenLabel
                  label="Search"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <AiOutlineSearch />
                      </InputAdornment>
                    ),
                  }}
                />
                <Button variant="contained" type="submit" ml={3}>
                  <Typography>ค้นหา</Typography>
                </Button>
              </form>
            </Grid>
          </Grid>
        </Box>

        <Box sx={{ display: "flex", width: "100%" }}>
          <Box
            sx={{ height: "70%", width: "100%", boxSizing: "border-box" }}
            ml={5}
          >
            {/* card menu */}
            <Grid
              container
              sx={{
                width: "100%",
                borderRadius: 1,
                height: "82%",
              }}
              ml={2}
            >
              <Grid
                container
                spacing={2}
                mb={4}
                columnSpacing={{ xs: 4, md: 3, sm: 2 }}
              >
                {allData.slice(0, 2).map((data, index) => {
                  return (
                    <>
                      {data.map((e) => {
                        return (
                          <MediaCard
                            key={e.id}
                            herder={e.title}
                            description={e?.content ? e.content : e.description}
                            id={e.id}
                            pathName={pathName[index]}
                            viewed={e.viewed[0] ? e.viewed[0].view : 0}
                            imgs={e?.images ? e?.images[0].url : null}
                          />
                        );
                      })}
                    </>
                  );
                })}
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
      <Footer></Footer>
    </Box>
  );
};

Search.getLayout = function getLayout(page) {
  return <HomeLayout>{page}</HomeLayout>;
};
export default Search;

export const getServerSideProps = async () => {
  const res = await fetch("https://pr-project-api.herokuapp.com/public/find");
  const data = await res.json();
  return {
    props: {
      data: data,
    },
  };
};
