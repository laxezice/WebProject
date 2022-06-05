import React, { Fragment, useState, useEffect } from "react";
import { Box, Button, Typography, Divider, Chip } from "@mui/material";
import { TextField, CircularProgress } from "@mui/material";
import { useRouter } from "next/router";
import PreviewPopup from "../../../components/Admin/Course/PreviewPopup";
import ContentEditor from "../../../components/Admin/Course/ContentEditor";
import uploadFileToBlob from "../../../scripts/azureBlob";
import axios from "axios";

const styles = {
  container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 10,
    marginBottom: 10,
  },
};

export default function CourseForm(props) {
  const { course } = props;
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState(false);
  const [contents, setContents] = useState(course?.contents || []);
  const [data, setData] = useState({
    title: course?.title || "",
    description: course?.description || "",
  });
  const router = useRouter();

  const handleSubmit = async () => {
    setLoading(true);

    const contentsData = contents.map((c) => {
      return { ...c };
    });
    for (let i = 0; i < contentsData.length; i++) {
      if (contentsData[i].type === "image" && contentsData[i].file) {
        contentsData[i].url = await uploadFileToBlob(contentsData[i].file);
        delete contentsData[i].file;
      }
      delete contentsData[i].id;
    }

    let courseData = {
      title: data.title,
      description: data.description,
      contents: contentsData,
    };

    try {
      if (course) {
        const response = await axios.put(
          `/course/edit/${course.id}`,
          courseData
        );
      } else {
        const response = await axios.post(`/course/createV2`, courseData);
      }
      router.push("/manage/course");
    } catch (e) {
      console.log(e);
      setLoading(false);
    }
  };

  const setCourseData = (key, value) => {
    data[key] = value;
    setData({ ...data });
  };

  return (
    <Fragment>
      <Box style={styles.container}>
        <Button
          sx={{ marginRight: 2 }}
          variant="contained"
          disabled={loading}
          onClick={() => {
            setPreview(true);
          }}
        >
          <Typography variant="p" disabled={loading}>
            ตัวอย่าง
          </Typography>
        </Button>
        <Box sx={{ position: "relative" }}>
          <Button variant="contained" disabled={loading} onClick={handleSubmit}>
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
      <Box sx={{ width: "100%" }} m={3}>
        <Divider>
          <Chip label="หัวข้อ" color="primary"></Chip>
        </Divider>
      </Box>
      <Box container componet="div" sx={{ width: "100%", marginBottom: 10 }}>
        <Box sx={{ marginTop: 2 }}>
          <TextField
            id="course-title"
            label="ชื่อหัวข้อการอบรม"
            multiline
            maxRows={2}
            fullWidth
            required
            sx={{ pb: 2 }}
            defaultValue={data.title}
            onChange={(e) => {
              setCourseData("title", e.target.value);
            }}
          />
          <TextField
            id="course-description"
            label="คำอธิบายการอบรม"
            multiline
            minRows={5}
            fullWidth
            required
            defaultValue={data.description}
            onChange={(e) => {
              setCourseData("description", e.target.value);
            }}
          />
        </Box>

        <Box sx={{ width: "100%" }} m={3}>
          <Divider>
            <Chip label="เนื้อหา" color="primary"></Chip>
          </Divider>
        </Box>
        <ContentEditor contents={contents} setContents={setContents} />
      </Box>

      {preview && (
        <PreviewPopup
          isShow={preview}
          setIsShow={setPreview}
          course={{ ...data, contents: contents }}
        />
      )}
    </Fragment>
  );
}
