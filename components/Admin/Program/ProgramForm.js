import React, { Fragment, useState, useEffect } from "react";
import { Box, Button, Typography, Divider, Chip } from "@mui/material";
import { TextField, CircularProgress } from "@mui/material";
import uploadFileToBlob from "../../../scripts/azureBlob";
import { useRouter } from "next/router";
import axios from "axios";
import PreviewPopup from "../../../components/Admin/Program/PreviewPopup";
import ContentEditor from "../Course/ContentEditor";

const styles = {
  container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 10,
    marginBottom: 10,
  },
};

export default function ProgramForm(props) {
  const { program } = props;
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState(false);
  const [contents, setContents] = useState(program?.contents || []);
  const [data, setData] = useState({
    thaiName: program?.thaiName || "",
    engName: program?.engName || "",
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

    let programData = {
      ...data,
      contents: contentsData,
    };

    try {
      if (program) {
        const response = await axios.put(`/program/${program.id}`, programData);
      } else {
        const response = await axios.post(`/program/create`, programData);
      }
      router.push("/manage/program");
    } catch (e) {
      console.log(e);
      setLoading(false);
    }
  };

  const setProgramData = (key, value) => {
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
            id="program-thai-name"
            label="ชื่อหลักสูตร"
            multiline
            maxRows={2}
            fullWidth
            required
            sx={{ pb: 2 }}
            defaultValue={data.thaiName}
            onChange={(e) => {
              setProgramData("thaiName", e.target.value);
            }}
          />
          <TextField
            id="program-eng-name"
            label="ชื่อหลักสูตร(English)"
            multiline
            maxRows={2}
            fullWidth
            required
            sx={{ pb: 2 }}
            defaultValue={data.engName}
            onChange={(e) => {
              setProgramData("engName", e.target.value);
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
          program={{ ...data, contents: contents }}
        />
      )}
    </Fragment>
  );
}
