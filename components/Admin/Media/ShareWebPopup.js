import React, { Fragment, useEffect, useState } from "react";
import {
  Box,
  Typography,
  Button,
  CircularProgress,
  Select,
  FormControl,
  MenuItem,
  InputLabel,
  IconButton,
} from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import Popup from "../../Popup";
import axios from "axios";
import { BiNavigation, BiCheckCircle } from "react-icons/bi";
import FormatContent from "./FormatContent";

export default function ShareWebPopup(props) {
  const { isShare, setIsShare, medias } = props;
  const [target, setTarget] = useState("");
  const [channels, setChannels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isCopy, setIsCopy] = useState(false);

  useEffect(async () => {
    let types = ["Website"].toString();
    let response = await axios.get(`/channel/query?types=${types}`);
    setChannels(response.data.channels);
    setLoading(false);
  }, []);

  const origin =
    typeof window !== "undefined" && window.location.origin
      ? window.location.origin
      : "";

  const media = medias[0];
  const url = `${origin}/media/${media.id}`;

  const handleClose = () => {
    setIsShare({ ...isShare, website: false });
  };

  const handleCopy = async () => {
    let data = await navigator.clipboard.writeText(
      media.content + "\n" + "ดูเพิ่มเติม" + " : " + url
    );
    setIsCopy(true);
  };

  const handleTarget = async (event) => {
    setTarget(event.target.value);
    setIsCopy(false);
  };

  return (
    <Fragment>
      {/* Select Channel popup */}
      <Popup
        title="แชร์ไปยัง website อื่นๆ"
        width="lg"
        openPopup={isShare.website}
        onClose={handleClose}
      >
        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <CircularProgress />
          </Box>
        ) : (
          <Fragment>
            <Box
              sx={{ display: "flex", marginBottom: 2, position: "relative" }}
            >
              <FormControl sx={{ width: "50%" }}>
                <InputLabel id="channel-target">เว็บไซต์</InputLabel>
                <Select
                  labelId="channel-target"
                  id="target"
                  value={target}
                  label="เว็บไซต์"
                  onChange={handleTarget}
                >
                  {channels.map((channel) => (
                    <MenuItem key={channel.id} value={channel.url}>
                      {channel.name} - {channel.type}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <Box
                sx={{
                  position: "relative",
                  width: "50%",
                }}
              >
                <Box sx={{ position: "absolute", right: 0 }}>
                  <IconButton
                    aria-label="Copy"
                    size="md"
                    sx={{
                      background: isCopy ? "#47d147" : "#DADADA",
                      borderRadius: 1,
                      position: "relative",
                      "&:hover": { backgroundColor: "#47d147" },
                    }}
                    onClick={handleCopy}
                  >
                    {isCopy ? (
                      <BiCheckCircle color="#ffffff" />
                    ) : (
                      <ContentCopyIcon />
                    )}
                  </IconButton>
                  <a  rel="noreferrer" target="_blank" href={target}>
                    <IconButton
                      aria-label="Navigate"
                      size="md"
                      sx={{
                        background: "#DADADA",
                        borderRadius: 1,
                        mx: 1,
                      }}
                    >
                      <BiNavigation color="#000000" />
                    </IconButton>
                  </a>
                </Box>
              </Box>
            </Box>
            <Typography
              variant="h5"
              sx={{
                mb: 1,
                pb: 1,
                fontWeight: 600,
                borderBottom: "1px solid #DADADA",
              }}
            >
              {media.title}
            </Typography>
            <Typography variant="h6">
              <FormatContent content={media.content} />
            </Typography>
            <Typography variant="h6" sx={{ mb: 3 }}>
              ดูเพิ่มเติม : {url}
            </Typography>
          </Fragment>
        )}
      </Popup>
    </Fragment>
  );
}
