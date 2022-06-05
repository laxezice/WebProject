import React, { Fragment, useEffect, useState } from "react";
import {
  Box,
  Button,
  CircularProgress,
  Select,
  InputLabel,
  MenuItem,
  FormControl,
} from "@mui/material";
import { styled } from "@mui/system";
import Popup from "../../Popup";
import axios from "axios";

const SelectControl = styled(FormControl)({
  width: "40%",
  marginLeft: 10,
});

const styles = {
  buttonContainer: {
    display: "flex",
    alignContent: "center",
  },
};

export default function ShareEmailPopup(props) {
  const { isShare, setIsShare, medias } = props;
  const [target, setTarget] = useState("");
  const [channels, setChannels] = useState([]);
  const [loading, setLoading] = useState({ loading: false, preloading: true });

  useEffect(async () => {
    let types = ["Mailing List"].toString();
    let response = await axios.get(`/channel/query?types=${types}`);
    setChannels(response.data.channels);
    setLoading({ ...loading, preloading: false });
  }, []);

  const handleClose = () => {
    setIsShare({ ...isShare, email: false });
  };

  const handleTarget = (event) => {
    setTarget(event.target.value);
  };

  const handleShare = async () => {
    setLoading({ ...loading, loading: true });
    try {
      const response = await axios.post("/media/share/email", {
        medias: medias.map((media) => media.id),
        channel: target,
      });
    } catch (e) {
      console.log(e.response.data);
      setLoading({ ...loading, loading: false });
    }
    handleClose();
  };

  return (
    <Fragment>
      {/* Select Channel popup */}
      <Popup
        title="แชร์ไปยัง email"
        width="md"
        openPopup={isShare.email}
        onClose={handleClose}
      >
        {loading.preloading ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <CircularProgress />
          </Box>
        ) : (
          <Box
            component="div"
            style={styles.buttonContainer}
            spacing={2}
            sx={{ mx: "auto", p: 1 }}
          >
            <SelectControl sx={{ m: 1 }}>
              <InputLabel id="channel-label">ช่องทางที่ต้องการแชร์</InputLabel>
              <Select
                labelId="channel-label"
                id="channel"
                value={target}
                label="ช่องทางที่ต้องการแชร์"
                onChange={handleTarget}
              >
                <MenuItem value={"user"}>ผู้ใช้ที่ติดตามข่าวสาร</MenuItem>
                {channels.map((channel) => (
                  <MenuItem key={channel.id} value={channel.id}>
                    {channel.name} - {channel.type}
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
                sx={{ position: "relative" }}
              >
                แชร์
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
              </Button>
            </Box>
          </Box>
        )}
      </Popup>
    </Fragment>
  );
}
