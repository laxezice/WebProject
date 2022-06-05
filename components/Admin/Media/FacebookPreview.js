import React, { Fragment, useState } from "react";
import { Box, Avatar, Typography } from "@mui/material";
import { HiDotsHorizontal } from "react-icons/hi";
import { boxSizing } from "@mui/system";
import FormatContent from "./FormatContent";

export default function FacebookPreview(props) {
  const { media } = props;
  const [hide, setHide] = useState(media.content.length <= 450 ? false : true);

  const origin =
    typeof window !== "undefined" && window.location.origin
      ? window.location.origin
      : "";
  const url = `${origin}/media/${media.id}`;

  let content = media.content;
  console.log(media.content);
  if (hide) {
    content = media.content.slice(0, 450) + "...";
    console.log("hide");
  } else {
    content = media.content + "\n" + "\nดูรายละเอียดเพื่มเติมที่ :\n\n";
    console.log("not hide");
  }

  return (
    <Fragment>
      <Box
        sx={{
          width: 500,
          height: 600,
          overflow: "hidden",
          boxShadow: "0 1px 2px rgba(0, 0, 0, 0.2)",
          borderRadius: 3,
          bgcolor : '#FFF'
        }}
      >
        <Box
          sx={{
            p: 2,
            pt: "12px",
            pb: 0,
            display: "flex",
            alignItems: "flex-start",
            mb: "12px",
          }}
        >
          <Avatar sx={{ m: 0, mr: 2, width: 40, height: 40 }} />
          <Box sx={{ width: 400 }}>
            <Typography sx={{ fontWeight: 800, fontSize: 15 }}>
              Facebook Page
            </Typography>
          </Box>
          <Box
            sx={{
              width: 36,
              height: 36,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <HiDotsHorizontal size={24} color="#65676B" />
          </Box>
        </Box>
        <Box>
          <Box sx={{ p: 2, pt: 0.5, fontWeight: 500, fontSize: 15 }}>
            <FormatContent content={content} />
            {!hide ? (
              <Typography
                sx={{ fontWeight: 500, fontSize: 15, color: "#385898" }}
              >
                <a>{url}</a>
              </Typography>
            ) : (
              <Typography
                sx={{ fontWeight: 500, fontSize: 15, color: "#385898" }}
                onClick={() => {
                  setHide(false);
                }}
              >
                <a>ดูเพิ่มเติม</a>
              </Typography>
            )}
          </Box>

          <Box>
            {media.images.length > 0 && (
              <Box sx={{ width: 500, height: 375, objectFit: "cover" }}>
                <img
                  src={media.images[0].url}
                  style={{ width: "100%", height: "100%" }}
                />
              </Box>
            )}
          </Box>
        </Box>
      </Box>
    </Fragment>
  );
}
