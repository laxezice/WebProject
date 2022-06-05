import React, { useEffect, useRef, useState } from "react";
import TextField from "@mui/material/TextField";
import { Button, Box, Typography, IconButton } from "@mui/material";
// import { NavLink, useNavigate } from "react-router-dom";
import { useRouter } from "next/router";
import axios from "axios";
import { useAuth } from "../../contexts/Section";
import AuthLayout from "../../layouts/AuthLayout";
import Link from "next/link";
import { MdVisibilityOff, MdVisibility, MdPeopleAlt } from "react-icons/md";

const styled = {
  boxCenterFlex: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
  },
};

export default function Formlogin() {
  // values
  const { login, showSnackbar } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const [errBox, setErrBox] = useState(false);

  // const [snackbar, setSnackbar] = useState({
  //   open: true,
  //   text: "awdawdwad",
  //   severity: "info",
  // });

  let router = useRouter();

  const handleClickShowPassword = () => {
    if (!showPassword) {
      setShowPassword(true);
    }

    if (showPassword) {
      setShowPassword(false);
    }
  };

  //functions
  const handleSubmit = async (event) => {
    // submit login
    event.preventDefault();
    let response;
    try {
      response = await axios.post("/auth/login", {
        username: "testadmin",
        password: "12345678",
      });
      if (response.status === 200) {
        setErrMsg("");
        setErrBox(false);
      }
      login(response.data.response);
      showSnackbar("Login is success.", "success");
      router.push("/");
    } catch (err) {
      var errCheck = 0;
      if (err.response?.status === 400) {
        setErrMsg("password is incorrect");
        showSnackbar("password is incorrect.", "error");
        errCheck++;
      } else if (err.response?.status === 404) {
        setErrMsg("User not found");
        showSnackbar("User not foundt.", "error");
        errCheck++;
      }
      if (errCheck > 0) {
        setErrBox(true);
        errCheck = 0;
      } else {
        setErrBox(false);
      }
    }
  };

  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        display: "block",
        position: "inherit",
        boxSizing: "border-box",
      }}
      p={3}
    >
      <Box sx={{ height: "20%" }} style={styled.boxCenterFlex} pl={1}>
        <img src="https://www.it.kmitl.ac.th/wp-content/uploads/2017/12/it-logo.png" />
      </Box>
      <Typography
        variant="h5"
        mt={1}
        align="center"
        sx={{ color: " rgb(25, 118, 210)" }}
      >
        ยินดีต้อนรับ
      </Typography>
      <Box style={styled.boxCenterFlex} sx={{ height: "50%", width: "100%" }}>
        <Box
          sx={{ width: "100%", height: "100%", boxSizing: "border-box" }}
          p={5}
          pt={0}
        >
          {/* <form onSubmit={handleSubmit}> */}
          <Box mt={3}>
            <TextField
              sx={{ height: "100%" }}
              name="username"
              label="Username"
              value={username}
              inputProps={{ style: { fontSize: "100%" } }}
              variant="outlined"
              type="text"
              fullWidth
              required
              error={errBox}
              onChange={(e) => setUsername(e.target.value)}
              InputProps={{
                endAdornment: (
                  <MdPeopleAlt
                    color="rgba(0, 0, 0, 0.54)"
                    size={20}
                  ></MdPeopleAlt>
                ),
              }}
            />
          </Box>
          <Box mt={3} mb={3}>
            <TextField
              name="password"
              label="Password"
              value={password}
              variant="outlined"
              type={showPassword ? "text" : "password"}
              helperText={errMsg}
              fullWidth
              required
              error={errBox}
              onChange={(e) => setPassword(e.target.value)}
              InputProps={{
                endAdornment: (
                  <IconButton
                    aria-label="toggle password visibility"
                    edge="end"
                    onClick={handleClickShowPassword}
                  >
                    {showPassword ? <MdVisibility /> : <MdVisibilityOff />}
                  </IconButton>
                ),
              }}
            />
          </Box>

          <Box sx={{ display: "flex", flexDirection: "row-reverse" }}>
            <Button type="submit" variant="outlined" onClick={handleSubmit}>
              <Typography variant="p" noWrap>
                เข้าสู่ระบบ
              </Typography>
            </Button>
          </Box>
        </Box>
        {/* </form> */}
      </Box>
      <Box
        sx={{
          flexDirection: "column",
          alignItems: "center",
          position: "relative",
          top: "10%",
        }}
        style={styled.boxCenterFlex}
      >
        <Link href="/auth/register">
          <a style={{ color: "#1976d2" }}>สมัครสมาชิก (Register)</a>
        </Link>
        <Link href="/auth/forgot">
          <a style={{ color: "#1976d2" }}>ลืมรหัสผ่าน (Forgot password)</a>
        </Link>
      </Box>
    </Box>
  );
}

Formlogin.getLayout = function getLayout(page) {
  return <AuthLayout>{page}</AuthLayout>;
};
