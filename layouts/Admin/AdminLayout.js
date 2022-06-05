import React, { Fragment, useState } from "react";
import { Box } from "@mui/material";
import Controls from "../../components/Controls/Controls";
import SideBarLayout from "./SideBarLayout";

export default function AdminLayout(props) {
  return (
        <SideBarLayout>
          <Box container componet="div" sx={{ width: "75%", mx: "auto" }}>
            <Controls.Header headerName={props.title}></Controls.Header>
            {props.children}
          </Box>
        </SideBarLayout>
  );
}
