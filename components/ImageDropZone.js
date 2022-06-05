import React, { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { BiCloudUpload } from "react-icons/bi";
import { createStyles, makeStyles } from "@mui/styles";
import { Box, IconButton } from "@mui/material";
import { BiX } from "react-icons/bi";
import ImageLightBox from "./ImageLightBox";

const useStyles = makeStyles((theme) =>
  createStyles({
    uploadIcon: {
      width: 50,
      height: 50,
    },
    thumbsContainer: {
      display: "flex",
      flexDirection: "row",
      flexWrap: "wrap",
      marginTop: 16,
    },
    box: {
      position: "relative",
      display: "inline-flex",
      borderRadius: 2,
      border: "1px solid #eaeaea",
      marginBottom: 8,
      marginRight: 8,
      width: 100,
      height: 100,
      padding: 4,
      boxSizing: "border-box",
      overflow: "hidden",
    },
    img: {
      display: "block",
      width: "auto",
      height: "100%",
    },
    xBtn: {
      position: "absolute",
      right: 5,
      top: 5,
      background: "rgba(0,0,0,.8)",
      color: "#fff",
      border: 0,
      borderRadius: "50%",
      cursor: "pointer",
      width: 20,
      height: 20,
      padding: 0,
    },
    xIcon: {
      width: 15,
      height: 15,
    },
    preview: {
      heigth: "60vh",
      width: "auto",
    },
  })
);

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

function ImageDropzone(props) {
  const { files, setFiles } = props;
  const [openPreview, setOpenPreview] = useState(false);
  const [startPreview, setStartPreview] = useState(0);
  const classes = useStyles();

  const assignUrl = (files) => {
    files.map((file) => {
      if (file.store === "local") {
        file.preview = URL.createObjectURL(file);
      } else {
        file.preview = file.url;
      }
    });
    return files;
  };

  const getFilesUrl = () => {
    let images = files.map((file) => {
      if (file.store === "local") {
        return URL.createObjectURL(file);
      } else {
        return file.url;
      }
    });
    return images;
  };

  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/*",
    onDrop: (acceptedFiles) => {
      acceptedFiles.map((file) => {
        file.store = "local";
      });
      let newFiles = assignUrl(acceptedFiles);
      setFiles([...files, ...newFiles]);
    },
  });

  useEffect(() => {
    // Make sure to revoke the data uris to avoid memory leaks
    files.forEach((file) => URL.revokeObjectURL(file.preview));
  }, [files]);

  useEffect(() => {
    assignUrl(files);
    setFiles([...files]);
  }, []);

  const removeImage = (index) => {
    files.splice(index, 1);
    let newFiles = assignUrl(files);
    setFiles([...newFiles]);
  };

  const handleOpenPreview = (index) => {
    setStartPreview(index);
    setOpenPreview(true);
  };

  return (
    <section className="container">
      <Box className={classes.thumbsContainer}>
        {files.map((file, index) => {
          return (
            <Box className={classes.box} key={index}>
              <img
                className={classes.img}
                src={file.preview}
                onClick={() => {
                  handleOpenPreview(index);
                }}
              />
              <IconButton
                className={classes.xBtn}
                onClick={() => {
                  removeImage(index);
                }}
              >
                <BiX color="#FFFFFF" className={classes.xIcon} />
              </IconButton>
            </Box>
          );
        })}
      </Box>
      <Box>
        <div style={dropContaner} {...getRootProps()}>
          <input {...getInputProps()} />
          <p>Drag & drop some files here, or click to select files</p>
          <BiCloudUpload className={classes.uploadIcon} />
        </div>
      </Box>

      {/* preview full image */}
      {openPreview && (
        <ImageLightBox
          images={getFilesUrl()}
          start={startPreview}
          setOpen={setOpenPreview}
        />
      )}
    </section>
  );
}

export default ImageDropzone;
