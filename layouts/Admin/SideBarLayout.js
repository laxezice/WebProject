import * as React from "react";

import { Box, Button } from "@mui/material";
import Sidebar from "../../components/Sidebar";
import BaseLayout from "../BaseLayout";

import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useAuth } from "../../contexts/Section";

import CircularProgress from "@mui/material/CircularProgress";
import Link from "next/link";

export default function SideBarLayout({ children }) {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user?.isAdmin) {
      if (user?.isAdmin === false) {
        router.replace("/");
      }
    }
  }, [user?.isAdmin]);

  return (
    <BaseLayout>
      <Box sx={{ height: "94%" }}>
        {user?.isAdmin ? (
          <Box sx={{ display: "flex", height: "100%" }} m={0} p={0}>
            <Box sx={{ width: "15%" }}>
              <Sidebar />
            </Box>
            <Box sx={{ width: "85%", overflowY: "auto" }}>{children}</Box>
          </Box>
        ) : (
          <Box
            sx={{
              display: "flex",
              height: "100%",
              alignItems: "center",
              justifyContent: "center",
            }}
            m={0}
            p={0}
          >
            <CircularProgress />
            <Box>
              <Link href="/">
                <Button>กลับสู่หน้าแรก</Button>
              </Link>
            </Box>
          </Box>
        )}
      </Box>
    </BaseLayout>
  );
}
