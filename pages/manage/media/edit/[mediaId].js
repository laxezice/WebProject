import React, { Fragment, useEffect, useState } from "react";
import { Box, Button, Divider, Chip } from "@mui/material";
import { TextField, CircularProgress } from "@mui/material";
import ImageDropzone from "../../../../components/ImageDropZone";
import MediaLayout from "../../../../layouts/Admin/AdminLayout";
import uploadFileToBlob from "../../../../scripts/azureBlob";
import { useRouter } from "next/router";
import axios from "axios";
import { useAuth } from "../../../../contexts/Section";

const styles = {
  container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 10,
    marginBottom: 10,
  },
};

export default function Editmedia() {
  const {showSnackbar} = useAuth()
  const [files, setFiles] = useState([]);
  const [media, setMedia] = useState({});
  const [preLoading, setPreLoading] = useState(true);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { mediaId } = router.query;
  useEffect(async () => {
    if (router.isReady) {
      let result = await axios.get(`/media/${mediaId}`);
      let data = result.data.media;
      setMedia(data);
      setFiles([...data.images]);
      setPreLoading(false);
    }
  }, [router.isReady]);

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
      if (file.store === "local") {
        let url = await uploadFileToBlob(file);
        data.images.push({
          name: file.name,
          url: url,
        });
      } else {
        data.images.push(file);
      }
    }

    try {
      const response = await axios.put(`/media/${mediaId}`, data);
      showSnackbar(response.data.message, "success")
      setTimeout(() => {
        router.push("/manage/media");
      }, 4000);
    } catch (e) {
      showSnackbar(e.message, "error")
      setTimeout(() => {
        router.push(`/manage/media/${mediaId}`);
      }, 4000);
    }
  };

  return (
    <Fragment>
      <Box container componet="div" sx={{ width: "75%", mx: "auto" }}>
        {!preLoading && (
          <form onSubmit={handleSubmit}>
            <Box sx={{ width: "100%" }} m={3}>
              <Divider>
                <Chip label="เนื้อหา" color="primary"></Chip>
              </Divider>
            </Box>
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
                defaultValue={media.title}
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
                defaultValue={media.content}
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
                  บันทึก
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
        )}
        {preLoading && (
          <Box
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              justifyItems: "center",
            }}
            pt={20}
          >
            <CircularProgress size={50} />
          </Box>
        )}
      </Box>
    </Fragment>
  );
}

Editmedia.getLayout = function getLayout(page) {
  return <MediaLayout>{page}</MediaLayout>;
};
