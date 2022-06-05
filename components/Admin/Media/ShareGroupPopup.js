import React, { Fragment, useEffect, useState } from "react";
import {
  Box,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  OutlinedInput,
  Chip,
  Checkbox,
  Typography,
  CircularProgress,
  Button,
} from "@mui/material";
import Popup from "../../Popup";
import axios from "axios";
import { styled } from "@mui/system";
import FacebookPreview from "./FacebookPreview";

const SelectControl = styled(FormControl)({
  width: "40%",
  marginLeft: 10,
});

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const styles = {
  select: {
    width: "40%",
    marginLeft: 10,
  },
  buttonContainer: {
    display: "flex",
    alignContent: "center",
  },
};

export default function ShareGroupPopup(props) {
  const { isShare, setIsShare, medias } = props;
  const [channels, setChannels] = useState([]);
  const [targets, setTargets] = useState([]);
  const [profile, setProfile] = useState("");
  const [loading, setLoading] = useState({ preloading: true, loading: false });

  const handleClose = () => {
    setIsShare({ ...isShare, group: false });
  };

  useEffect(async () => {
    let types = ["Facebook Page", "Facebook Group"].toString();
    let response = await axios.get(`/channel/query?types=${types}`);
    setChannels(response.data.channels);
    setLoading({ ...loading, preloading: false });
  }, []);

  const handleProfile = (event) => {
    setProfile(event.target.value);
  };

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setTargets(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  const handleShare = async () => {
    if (targets.length > 0) {
      setLoading({ ...loading, loading: true });
      let data = {
        medias: medias.map((media) => media.id),
        channels: targets,
        profile: profile,
        type: "page",
      };

      try {
        const response = await axios.post("/media/share/group", data);
      } catch (e) {
        console.log(e.response.data);
      }
      setLoading({ ...loading, loading: false });
      handleClose();
    }
  };

  return (
    <Fragment>
      {/* Select Channel popup */}
      <Popup
        title="เลือกช่องทางประชาสัมพันธ์"
        width="xl"
        openPopup={isShare.group}
        onClose={handleClose}
      >
        {loading.preloading && (
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <CircularProgress />
          </Box>
        )}
        {!loading.preloading && (
          <>
            <Box
              component="div"
              style={styles.buttonContainer}
              spacing={2}
              sx={{ mx: "auto", p: 1 }}
            >
              <FormControl sx={{ m: 1, width: "50%" }}>
                <InputLabel id="demo-multiple-chip-label">
                  ช่องทางที่ต้องการแชร์
                </InputLabel>
                <Select
                  labelId="demo-multiple-chip-label"
                  id="demo-multiple-chip"
                  multiple
                  value={targets}
                  onChange={handleChange}
                  input={
                    <OutlinedInput
                      id="select-multiple-chip"
                      label="ช่องทางที่ต้องการแชร์"
                    />
                  }
                  renderValue={(selected) => (
                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                      {selected.map((value) => (
                        <Chip key={value} label={value} />
                      ))}
                    </Box>
                  )}
                  MenuProps={MenuProps}
                >
                  {channels
                    .filter((channel) => channel.type === "Facebook Group")
                    .map((channel) => (
                      <MenuItem key={channel.id} value={channel.id}>
                        <Checkbox checked={targets.indexOf(channel.id) > -1} />
                        {channel.name} - {channel.type}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>
              <SelectControl sx={{ m: 1 }}>
                <InputLabel id="page-label">โปรไฟล์การแชร์</InputLabel>
                <Select
                  labelId="page-label"
                  id="page"
                  value={profile}
                  label="โปรไฟล์การแชร์"
                  onChange={handleProfile}
                >
                  {channels
                    .filter((channel) => channel.type === "Facebook Page")
                    .map((channel) => (
                      <MenuItem key={channel.id} value={channel.id}>
                        {channel.name}
                      </MenuItem>
                    ))}
                </Select>
              </SelectControl>
              <Box
                sx={{ m: 1, position: "relative" }}
                style={styles.buttonContainer}
              >
                <Button
                  variant="contained"
                  disabled={loading.loading}
                  onClick={handleShare}
                >
                  แชร์
                </Button>
                {loading.loading && (
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
            {medias.map((media) => (
              <Box
                key={media.id}
                component="div"
                spacing={2}
                sx={{ mx: "auto", p: 1, borderBottom: "1px solid #DADADA" }}
              >
                <Typography variant="h5">{media.title}</Typography>
                <FacebookPreview media={media} />
              </Box>
            ))}
          </>
        )}
      </Popup>
    </Fragment>
  );
}
