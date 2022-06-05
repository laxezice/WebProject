import React, { useEffect, useRef, useState } from "react";
import TextField from "@mui/material/TextField";
import { Button, Box, Typography, IconButton } from "@mui/material";
// import { NavLink, useNavigate } from "react-router-dom";
import { useRouter } from "next/router";
import axios from "axios";
import { useAuth } from "../../contexts/Section";
import AuthLayout from "../../layouts/AuthLayout";
import { MdVisibilityOff, MdVisibility, MdPeopleAlt } from "react-icons/md";

const styled = {
  boxCenterFlex: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
  },
};

export default function Formresetpassword() {
  // values
  let router = useRouter();
  const { showSnackbar } = useAuth();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const [errBox, setErrBox] = useState(false);
  const [token, setToken] = useState();
 
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
    if (password === confirmPassword && router) {
      try {
        const response = await axios.put("/auth/resetPassword", {
          resetToken: `Bearer ${token}`,
          password: password,
          confirmPassword: confirmPassword,
        });
        showSnackbar("Password had change", "success")
        router.push("/auth/login");

      } catch (err) {
        console.log(err);
        showSnackbar("Password had change", "error")
      }
    }
  };

  useEffect(() => {
    setToken(router.query.token);
  }, [router]);

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
        variant="h6"
        mt={1}
        align="center"
        sx={{ color: " rgb(25, 118, 210)" }}
      >
        เปลี่ยนรหัสผ่านผู้ใช้งาน
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
              name="password"
              label="New password"
              value={password}
              inputProps={{ style: { fontSize: "100%" } }}
              variant="outlined"
              type={showPassword ? "text" : "password"}
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
          <Box mt={3} mb={3}>
            <TextField
              name="confirmPassword"
              label="Confirm password"
              value={confirmPassword}
              variant="outlined"
              type={showPassword ? "text" : "password"}
              helperText={errMsg}
              fullWidth
              required
              error={errBox}
              onChange={(e) => setConfirmPassword(e.target.value)}
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
                ยืนยัน
              </Typography>
            </Button>
          </Box>
        </Box>
        {/* </form> */}
      </Box>

    </Box>
  );
}

Formresetpassword.getLayout = function getLayout(page) {
  return <AuthLayout>{page}</AuthLayout>;
};
