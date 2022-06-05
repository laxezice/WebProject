import React from "react";
import { useDropzone } from "react-dropzone";
import { BiCloudUpload } from "react-icons/bi";
import { Box, Button } from "@mui/material";
import { parse } from "papaparse";
import EmailTable from "./EmailTable";

export default function CsvUploader(props) {
  const { data, setData } = props;
  const styles = {
    uploadIcon: {
      width: 50,
      height: 50,
    },
  };

  const dropContaner = {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "20px",
    borderWidth: 2,
    borderRadius: 2,
    borderColor: "#eeeeee",
    borderStyle: "dashed",
    backgroundColor: "#fafafa",
    color: "#bdbdbd",
    outline: "none",
    height: 150,
    transition: "border .24s ease-in-out",
  };

  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    accept: "text/csv",
    multiple: false,
    onDrop: async (acceptedFiles) => {
      let file = acceptedFiles[0];
      let text = await file.text();
      let result = parse(text);
      let list = result.data.map((d) => {
        let li = { email: d[0] };
        if (d.length > 1) {
          li.name = d[1];
        }
        return li;
      });
      setData(list);
    },
  });

  const clearData = () => {
    setData([]);
  };

  return (
    <Box>
      {data.length <= 0 ? (
        <div style={dropContaner} {...getRootProps()}>
          <input {...getInputProps()} />
          <p>วางไฟล์หรือคลิกที่นี่เพื่อเลือกไฟล์(.csv เท่านั้น)</p>
          <BiCloudUpload style={styles.uploadIcon} />
        </div>
      ) : (
        <EmailTable list={data} clear={clearData} />
      )}
    </Box>
  );
}
