import React, { Fragment, useState } from "react";
import { Box, Button, Chip, Divider, Typography } from "@mui/material";
import { TextField, CircularProgress } from "@mui/material";
import ImageDropzone from "../../../components/ImageDropZone";
import AdminLayout from "../../../layouts/Admin/AdminLayout";
import uploadFileToBlob from "../../../scripts/azureBlob";
import { useRouter } from "next/router";
import axios from "axios";

import { useAuth } from "../../../contexts/Section";

const styles = {
  container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 10,
    marginBottom: 10,
  },
};

export default function Addmedia() {
  const {showSnackbar} = useAuth()
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const target = event.target;
    const data = {
      title: target["media-title"].value,
      content: target["media-content"].value,
      images: [],
    };
    setLoading(true);

    for (const file of files) {
      let url = await uploadFileToBlob(file);
      data.images.push({
        name: file.name,
        url: url,
      });
    }

    try {
      const response = await axios.post("/media/create", data);
      console.log(response);
      showSnackbar(response.data.message, "success")
      setTimeout(() => {
        router.push("/manage/media");
      }, 4000);
    } catch (e) {
      console.log(e);
      showSnackbar(e.message, "error")

      setTimeout(() => {
        router.push("/manage/media/add");
      }, 4000);
    }
  };

  return (
    <Fragment>
      <Box sx={{ width: "100%" }} m={3}>
        <Divider>
          <Chip label="เนื้อหา" color="primary"></Chip>
        </Divider>
      </Box>
      <Box container componet="div" sx={{ width: "75%", mx: "auto" }}>
        <form onSubmit={handleSubmit}>
          <Box
            component="div"
            spacing={2}
            sx={{ width: "83%", mx: "auto", p: 2 }}
          >
            <TextField
              id="media-title"
              label="ชื่อหัวข้อประชาสัมพันธ์"
              multiline
              maxRows={4}
              fullWidth
              required
            />
          </Box>

          <Box container sx={{ width: "83%", mx: "auto" }}>
            <TextField
              id="media-content"
              label="เนื้อหาข่าวประชาสัมพันธ์"
              multiline
              minRows={5}
              maxRows={15}
              fullWidth
              required
            />
          </Box>
          <Box sx={{ width: "100%" }} m={3}>
            <Divider>
              <Chip label="รูปภาพ" color="primary"></Chip>
            </Divider>
          </Box>
          <Box container sx={{ width: "83%", mx: "auto" }}>
            <ImageDropzone files={files} setFiles={setFiles} />
          </Box>
          <Box
            spacing={2}
            sx={{ width: "83%", mx: "auto", px: 2 }}
            style={styles.container}
          >
            <Box sx={{ m: 1, position: "relative" }}>
              <Button variant="contained" disabled={loading} type="submit">
                <Typography variant="p">บันทึก</Typography>
              </Button>
              {loading && (
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
              )}
            </Box>
          </Box>
        </form>
      </Box>
    </Fragment>
  );
}

Addmedia.getLayout = function getLayout(page) {
  return <AdminLayout title="เพิ่มข่าวประชาสัมพันธ์">{page}</AdminLayout>;
};
