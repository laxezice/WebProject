import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import {
  Button,
  Box,
  Typography,
  FormControl,
  Grid,
  IconButton,
} from "@mui/material";
import axios from "axios";
import Popup from "../../components/Popup";
import Forminformation from "../../components/Admin/Auth/Forminformation";
import AuthLayout from "../../layouts/AuthLayout";
import Link from "next/link";
//icon
import {
  MdVisibilityOff,
  MdVisibility,
  MdPeopleAlt,
  MdEmail,
} from "react-icons/md";
import { IoIosArrowBack } from "react-icons/io";
import { useAuth } from "../../contexts/Section";

export default function Formregister() {
  const {showSnackbar} = useAuth()
  const emailValidator =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const passwordValidator = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;
  const usernameValidator =
    /^[a-zA-Z0-9]+([a-zA-Z0-9](_|-| )[a-zA-Z0-9])*[a-zA-Z0-9]+$/;
  const [openPopup, setOpenPopup] = useState(false);

  // -------- username ------
  const [username, setUsername] = useState("")
  const [usernameHelper, setUsernameHelper] = useState("");
  const [usernameError, setUsernameError] = useState(false);
  // -------- password ------
  const [password, setPassword] = useState("")
  const [passwordHelper, setPasswordHelper] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // -------- email ------
  const [email, setEmail] = useState("")
  const [emailHelper, setEmailHelper] = useState("");
  const [emailError, setEmailError] = useState(false);


  const handleClickShowPassword = () => {
    // showPassword click icon
    if (!showPassword) {
      setShowPassword(true);
    }
    if (showPassword) {
      setShowPassword(false);
    }
  };

  const dataHeader = [
    // -------- data ------
    {
      name: "username",
      label: "Username",
      type: "text",
      helperText: usernameHelper,
      error: usernameError,
      iconTextF: (
        <MdPeopleAlt color="rgba(0, 0, 0, 0.54)" size={20}></MdPeopleAlt>
      ),
    },
    {
      name: "email",
      label: "Email",
      type: "email",
      helperText: emailHelper,
      error: emailError,
      iconTextF: <MdEmail color="rgba(0, 0, 0, 0.54)" size={20}></MdEmail>,
    },
    {
      name: "password",
      label: "Password",
      type: showPassword ? "text" : "password",
      error: passwordError,
      iconTextF: (
        <IconButton
          aria-label="toggle password visibility"
          edge="end"
          onClick={handleClickShowPassword}
        >
          {showPassword ? <MdVisibility /> : <MdVisibilityOff />}
        </IconButton>
      ),
    },
    {
      name: "confirmPassword",
      label: "Confirm Password",
      type: showPassword ? "text" : "password",
      helperText: passwordHelper,
      error: passwordError,
      iconTextF: (
        <IconButton
          aria-label="toggle password visibility"
          edge="end"
          onClick={handleClickShowPassword}
        >
          {showPassword ? <MdVisibility /> : <MdVisibilityOff />}
        </IconButton>
      ),
    },
  ];

  // ------- when submit form -------
  const handleSubmit = async (event) => {
    event.preventDefault();

    var usernameCheck = validateUsername(event.target.username.value);
    var emailCheck = validateEmailAddress(event.target.email.value);
    var passwordCheck = validatePassword(event.target.password.value);
    var confirmPasswordCheck = validateConfirmPassword(
      event.target.password.value,
      event.target.confirmPassword.value
    );

    var checkEvery = [
      usernameCheck,
      emailCheck,
      passwordCheck,
      confirmPasswordCheck,
    ];
    // ------- if input pass open popup -------
    var check = checkEvery.every((i) => {
      setUsername(event.target.username.value)
      setEmail(event.target.email.value)
      setPassword(event.target.password.value)
      return i === true;
    });

    if (check) {
      try {
        const responseCheck = 0;
        const response = await axios.post("/auth/check", {
          username: event.target.username.value,
          email: event.target.email.value,
        });
        if (!response.data.response.username) {
          setUsernameHelper(
            "can't use is username or username has already used"
          );
          setUsernameError(true);
          showSnackbar( "can't use is username or username has already used", "error")
          responseCheck++;
        }
        if (!response.data.response.email) {
          setEmailHelper("can't use is email or email has already used");
          showSnackbar( "can't use is email or email has already used", "error")

          setEmailError(true);
          responseCheck++;
        }
        if (responseCheck == 0) {
          setOpenPopup(true);
        }
      } catch (error) {
        /* if (response.data.error.message === "username has already taken"){
          setUsernameHelper(response.data.error.message);
          setUsernameError(true)
        }*/
        // เอา ข้อความจาก backend มาแสดง
      }
    }
  };

  const validateUsername = (value) => {
    // validateUsername
    const username = value;
    if (username.trim === "") {
      setUsernameHelper("Username is required");
      setUsernameError(true);
      showSnackbar("Username is required", "error")

      return false;
    } else if (!usernameValidator.test(username)) {
      setUsernameHelper("Username is not valid");
      showSnackbar("Username is not valid", "error")

      setUsernameError(true);
      return false;
    }
    return true;
  };

  const validateEmailAddress = (value) => {
    // validateEmailAddress
    const email = value;
    if (email.trim == "") {
      setEmailHelper("Email Address is required");
      setEmailError(true);
      showSnackbar("Email Address is required", "error")
      return false;
    } else if (!emailValidator.test(email)) {
      setEmailHelper("Email is not valid");
      setEmailError(true);
      showSnackbar("Email is not valid", "error")
      return false;
    }
    return true;
  };

  const validatePassword = (value) => {
    // validatePassword
    const password = value;
    if (password.trim === "") {
      setPasswordHelper("Password is required");
      setPasswordError(true);
      showSnackbar("Password is required", "error")

      return false;
    } else if (!passwordValidator.test(password)) {
      setPasswordHelper(
        "Password must contain at least 8 characters, 1 number, 1 upper and 1 lowercase!"
      );
      showSnackbar("Password must contain at least 8 characters, 1 number, 1 upper and 1 lowercase!", "error")
      setPasswordError(true);
      return false;
    }
    return true;
  };

  const validateConfirmPassword = (password, confirmPassword) => {
    // validateConfirmPassword
    if (password !== confirmPassword) {
      setPasswordHelper("Password does not match Confirmation");
      setPasswordError(true);
      showSnackbar("Password does not match Confirmation", "error")

      return false;
    }
    return true;
  };
  return (
    <Box sx={{ mx: "auto" }} p={4} pt={0}>
      <Box
        sx={{
          width: "100%",
          height: "20%",
          boxSizing: "border-box",
          color: " rgb(25, 118, 210)",
        }}
        pt={3}
        mb={3}
      >
        <Typography variant="h4" align="center">
          สมัครสมาชิก
        </Typography>
      </Box>
      <form onSubmit={handleSubmit} autoComplete="off">
        <FormControl variant="outlined">
          <Grid container spacing={2} mb={0}>
            {dataHeader.map((data, i) => {
              return (
                <Grid item xs={12} key={i}>
                  <TextField
                    sx={{ width: "100%", height: "100%" }}
                    size="normal"
                    name={data.name}
                    label={data.label}
                    type={data.type}
                    required
                    fullWidth
                    helperText={data.helperText}
                    error={data.error}
                    InputProps={{
                      endAdornment: data.iconTextF,
                    }}
                  />
                </Grid>
              );
            })}
          </Grid>
          <Box
            sx={{
              width: "100%",
              height: "100%",
              display: "flex",
              justifyContent: "flex-end",
            }}
            mt={2}
          >
            <Button
              sx={{ width: "50%", height: "100%" }}
              variant="outlined"
              color="primary"
              size="sm"
              type="submit"
              accessKey="enter"
              fullWidth
            >
              <Typography variant="p" noWrap>
                สมัครสมาชิก
              </Typography>
            </Button>
          </Box>
        </FormControl>
      </form>
      <Box
        sx={{
          position: "relative",
          bottom: 0,
          marginTop: "10%",
          color: "rgb(25, 118, 210)",
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
      <Popup title="ข้อมูลสมาชิก" openPopup={openPopup} width={"md"}>
        <Forminformation
          username={username}
          password={password}
          email={email}
        />
      </Popup>
    </Box>
  );
}

Formregister.getLayout = function getLayout(page) {
  return <AuthLayout>{page}</AuthLayout>;
};
