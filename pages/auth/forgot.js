import React, { useState, useRef } from "react";
import TextField from "@mui/material/TextField";
import { Button, Box, Typography, Alert } from "@mui/material";
import AuthLayout from "../../layouts/AuthLayout";
import Link from "next/link";
// icon
import { MdEmail } from "react-icons/md";
import { IoIosArrowBack } from "react-icons/io";

// network
import axios from "axios";
import { useAuth } from "../../contexts/Section";

// main code
const emailValidator =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export default function Formforgot() {
  //data
  const [emailHelper, setEmailHelper] = useState("");
  const [emailError, setEmailError] = useState(false);
  const {showSnackbar} = useAuth()
  // submit login
  const handleSubmit = async (event) => {
    event.preventDefault();
    let email = validateEmailAddress(event.target.email.value);
    if (!email) {
      var response;
      try {
        response = await axios.post("/auth/forgot", {
          email: event.target.email.value,
        });
        showSnackbar("Plase check your email.", "success")
        setEmailHelper("Plase check your email.");
      } catch (err) {
        console.log(err);
        // setEmailHelper(err);
        showSnackbar("Plase type again.", "error")
      }
    }
  };

  // validateEmailAddress
  const validateEmailAddress = (value) => {
    const email = value;
    if (email.trim == "") {
      setEmailHelper("Email Address is required");
      setEmailError(true);
      showSnackbar("Email Address is required.", "error")


      return true;
    } else if (!emailValidator.test(email)) {
      setEmailHelper("Email is not valid");
      setEmailError(true);
      showSnackbar("Email is not valid.", "error")

      return true;
    } else if (emailValidator.test(email)) {
      setEmailHelper("");
      setEmailError(false);
      return false;
    }
  };
  return (
    <>
      <Box
        sx={{
          height: "20%",
          width: "100%",
          display: "flex",
          justifyContent: "center",
          boxSizing: "border-box",
        }}
        mt={3}
        pl={2.5}
      >
        <img
          sx={{ height: "100%" }}
          src="https://www.it.kmitl.ac.th/wp-content/uploads/2017/12/it-logo.png"
          href="/"
        />
      </Box>
      <Typography
        variant="h5"
        mt={1}
        align="center"
        sx={{ color: " rgb(25, 118, 210)" }}
      >
        ลืมรหัสผ่าน
      </Typography>
      <Box mx="auto" pl={5} pr={5} sx={{ boxSizing: "border-box" }}>
        <form onSubmit={handleSubmit}>
          <TextField
            name="email"
            label="Email"
            variant="outlined"
            type="email"
            error={emailError}
            helperText={emailHelper}
            required
            fullWidth
            sx={{ marginTop: "10%" }}
            InputProps={{
              endAdornment: (
                <MdEmail color="rgba(0, 0, 0, 0.54)" size={20}></MdEmail>
              ),
            }}
          />
          <Box sx={{ display: "flex", flexDirection: "row-reverse" }} mt={3}>
            <Button type="submit" variant="outlined">
              ส่งอีเมล
            </Button>
          </Box>
          <Box
            sx={{
              position: "relative",
              bottom: 0,
              marginTop: "30%",
              color: " rgb(25, 118, 210)",
            }}
          >
            <Link href="/auth/login">
              <a>
                <IoIosArrowBack
                  size="2rem"
                  color="primary"
                  alt="Something"
                ></IoIosArrowBack>
              </a>
            </Link>
          </Box>
        </form>
      </Box>
    </>
  );
}

Formforgot.getLayout = function getLayout(page) {
  return <AuthLayout>{page}</AuthLayout>;
};
