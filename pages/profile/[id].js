import {
  Box,
  Typography,
  Divider,
  CircularProgress,
  Button,
} from "@mui/material";
import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { useAuth } from "../../contexts/Section";
import HomeLayout from "../../layouts/HomeLayout";
import Moment from "moment";

import { AiFillIdcard, AiFillBook } from "react-icons/ai";
import { IoMdPerson } from "react-icons/io";
import { FaBirthdayCake, FaUserGraduate } from "react-icons/fa";
import { MdMail } from "react-icons/md";
import { IoMaleFemale } from "react-icons/io5";
import Popup from "../../components/Popup";
import Editforminfomation from "../../components/Admin/Auth/Editforminfomation";

const Profile = (props) => {
  const { user, isLoadedCookie, setSnackbar, snackbar } = useAuth();
  const [userData, setUserData] = useState(props.data.profile);
  const [isLoading, setIsLoading] = useState(true);
  const [openPopup, setOpenPopup] = useState(false);
  const router = useRouter();
  useEffect(() => {
    if (props.data.profile && user) {
      setIsLoading(false);
    }

    if (!user && isLoadedCookie) {
      router.push("/auth/login");
    }
  }, [user, isLoadedCookie]);

  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        bgcolor: "#F0F0F0",
        backgroundImage: `url("/bg_profile.png")`,
        backgroundSize: "cover",
      }}
    >
      {isLoading ? (
        <CircularProgress
          size={24}
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            marginTop: "-12px",
            marginLeft: "-12px",
          }}
        />
      ) : (
        <Box
          Container
          sx={{
            width: "100%",
            height: "100%",
            display: "flex",
            justifyItems: "center",
            position: "relative",
            overflow: "hidden",
            boxSizing: "border-box",
          }}
          mx="auto"
        >
          {/* <img src="/bg_profile.png" width="100%"></img> */}
          <Box
            sx={{
              position: "absolute",
              height: "100%",
              width: "100%",
              boxSizing: "border-box",
              overflow: "hidden",
            }}
            p={5}
          >
            <Box
              sx={{
                width: "100%",
                display: "flex",
                flexDirection: "row-reverse",
              }}
              mb={1}
            >
              <Typography variant="h4" color="#051F5F">
                ข้อมูลส่วนตัว
              </Typography>
              <AiFillIdcard size={"40px"} color="#051F5F"></AiFillIdcard>
            </Box>
            <Box
              sx={{
                width: "100%",
                display: "flex",
                flexDirection: "row-reverse",
              }}
              mb={3}
            >
              <Typography variant="p" color="#051F5F">
                ID : {userData.id ? userData.id : "empty"}
              </Typography>
            </Box>

            {/* infomation */}
            <Box sx={{ width: "100%", height: "80%", display: "flex" }}>
              <Box
                sx={{ width: "60%", display: "flex", justifyContent: "center" }}
                pt={"5%"}
                pl={"10%"}
              >
                <Box>
                  <Typography variant="h3" color="#051F5F">
                    {userData.name ? userData.name : "empty"}
                  </Typography>
                  <Typography variant="h5" color="#00A8E7">
                    {userData.surname ? userData.surname : "empty"}
                  </Typography>
                </Box>
              </Box>
              <Divider orientation="vertical" flexItem></Divider>
              <Box sx={{ width: "40%" }} p={5}>
                <Box mb={4} sx={{ display: "flex" }}>
                  <IoMdPerson size={30} color="#051F5F"></IoMdPerson>
                  <Box ml={10}>
                    <Typography color="#00A8E7">
                      {userData.username ? userData.title + " " + userData.name + " " + userData.surname : "empty"}
                    </Typography>
                  </Box>
                </Box>

                <Box mb={4} sx={{ display: "flex" }}>
                  <FaBirthdayCake size={30} color="#051F5F"></FaBirthdayCake>
                  <Box ml={10}>
                    <Typography color="#00A8E7">
                      {userData.birthday
                        ? Moment(userData.birthday).format("DD / MMM / YYYY")
                        : "empty"}
                    </Typography>
                  </Box>
                </Box>

                <Box mb={4} sx={{ display: "flex" }}>
                  <MdMail size={30} color="#051F5F"></MdMail>
                  <Box ml={10}>
                    <Typography color="#00A8E7">
                      {userData.email ? userData.email : "empty"}
                    </Typography>
                  </Box>
                </Box>

                <Box mb={4} sx={{ display: "flex" }}>
                  <IoMaleFemale size={30} color="#051F5F"></IoMaleFemale>
                  <Box ml={10}>
                    <Typography color="#00A8E7">
                      {userData.sex ? userData.sex : "empty"}
                    </Typography>
                  </Box>
                </Box>

                <Box mb={4} sx={{ display: "flex" }}>
                  <FaUserGraduate size={30} color="#051F5F"></FaUserGraduate>
                  <Box ml={10}>
                    <Typography color="#00A8E7">
                      {userData.education.graduated
                        ? userData.education.graduated
                        : "empty"}
                    </Typography>
                  </Box>
                </Box>

                <Box mb={4} sx={{ display: "flex" }}>
                  <AiFillBook size={30} color="#051F5F"></AiFillBook>
                  <Box ml={10}>
                    <Typography color="#00A8E7">
                      {userData.education.detail
                        ? userData.education.detail
                        : "empty"}
                    </Typography>
                  </Box>
                </Box>
                <Box
                  mb={4}
                  sx={{ display: "flex", flexDirection: "row-reverse" }}
                >
                  <Button
                    variant="contained"
                    onClick={() => {
                      setOpenPopup(true)
                    }}
                  >
                    {" "}
                    แก้ไขข้อมูลส่วนตัว
                  </Button>
                </Box>
              </Box>
            </Box>
          </Box>
          <Popup title="ข้อมูลสมาชิก" openPopup={openPopup} width={"md"}>
            <Editforminfomation data={userData} setOpenPopup={setOpenPopup}/>
          </Popup>
        </Box>
      )}
    </Box>
  );
};

Profile.getLayout = function getLayout(page) {
  return <HomeLayout>{page}</HomeLayout>;
};

export default Profile;

export const getServerSideProps = async (contexts) => {
  const res = await fetch(
    `https://pr-project-api.herokuapp.com/auth/profile/${contexts.params.id}`
  );
  const data = await res.json();
  return {
    props: {
      data: data,
    },
  };
};
