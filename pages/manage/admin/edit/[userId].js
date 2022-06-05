import React, { Fragment, useEffect, useState } from "react";
import AdminForm from "../../../../components/Admin/Auth/AdminForm";
import AdminLayout from "../../../../layouts/Admin/AdminLayout";
import { Box, CircularProgress } from "@mui/material";
import { useRouter } from "next/router";
import axios from "axios";

export default function EditAdmin() {
  const router = useRouter();
  const { userId } = router.query;
  const [preload, setPreload] = useState(true);
  const [admin, setAdmin] = useState({});

  useEffect(async () => {
    if (router.isReady) {
      let result = await axios.get(`/auth/user/${userId}`);
      setAdmin(result.data.user);
      setPreload(false);
    }
  }, [router.isReady]);

  return (
    <Fragment>
      {preload ? (
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            marginTop: 10,
            marginBottom: 10,
          }}
        >
          <CircularProgress />
        </Box>
      ) : (
        <Fragment>
          <AdminForm userData={admin} />
        </Fragment>
      )}
    </Fragment>
  );
}

EditAdmin.getLayout = function getLayout(page) {
  return <AdminLayout title="แก้ไขดูแล">{page}</AdminLayout>;
};
