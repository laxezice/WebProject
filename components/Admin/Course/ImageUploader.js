import React from "react";
import { useDropzone } from "react-dropzone";
import { BiCloudUpload } from "react-icons/bi";
import { Box } from "@mui/material";

export default function ImageUploader(props) {
  const { index, contents, setContents } = props;
  let content = contents[index];

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
    accept: "image/*",
    multiple: false,
    onDrop: (acceptedFiles) => {
      content.file = acceptedFiles[0];
      content.url = URL.createObjectURL(acceptedFiles[0]);
      setContents([...contents]);
    },
  });

  return (
    <Box>
      <div style={dropContaner} {...getRootProps()}>
        <input {...getInputProps()} />
        <p>Drag & drop some files here, or click to select files</p>
        <BiCloudUpload style={styles.uploadIcon} />
      </div>
    </Box>
  );
}
