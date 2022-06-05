import React, { useState } from "react";
import { Button, Box, Typography, Alert } from "@mui/material";
import HomeLayout from "./HomeLayout";

export default function AuthLayout({ children }) {
  return (
    <HomeLayout>
      <Box
        sx={{
          width: "100%",
          height: "100%",
          bgcolor: "#E9E6E6",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {/* login body */}
        <Box
          sx={{
            width: "50%",
            height: "60%",
            bgcolor: "#fff",
            borderRadius: "10px",
            display: "flex",
            overflow: "hidden",
            boxShadow: "0px 25px 50px -12px rgba(0, 0, 0, 0.25)",
          }}
        >
          <Box sx={{ width: "50%", height: "100%" }}>
            {/* img login */}
            <img
              src="https://images.unsplash.com/photo-1522770179533-24471fcdba45"
              style={{ objectFit: "cover", width: "100%", height: "100%" }}
            />
          </Box>
          {/* section 2 login */}
          <Box sx={{ width: "48%", height: "100%", mx: "auto", overflowY : 'auto' }}>
            {children}
          </Box>
        </Box>

        {/* body login */}
      </Box>
    </HomeLayout>
  );
}
