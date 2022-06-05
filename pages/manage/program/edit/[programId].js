import React, { Fragment, useEffect, useState } from "react";
import { Box } from "@mui/material";
import { CircularProgress } from "@mui/material";
import AdminLayout from "../../../../layouts/Admin/AdminLayout";
import { useRouter } from "next/router";
import axios from "axios";
import ProgramForm from "../../../../components/Admin/Program/ProgramForm";

export default function EditProgram() {
  const [preload, setPreload] = useState(true);
  const [program, setProgram] = useState(false);

  const router = useRouter();
  const { programId } = router.query;

  useEffect(async () => {
    if (router.isReady) {
      let result = await axios.get(`/program/${programId}`);
      setProgram(result.data.program);
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
          <ProgramForm program={program} />
        </Fragment>
      )}
    </Fragment>
  );
}

EditProgram.getLayout = function getLayout(page) {
  return <AdminLayout title="แก้ไขหลักสูตร">{page}</AdminLayout>;
};
