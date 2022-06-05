import React, { Fragment, useEffect, useState } from "react";
import {
  Box,
  CircularProgress,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
  Paper,
  Typography,
} from "@mui/material";
import Popup from "../../Popup";
import axios from "axios";
import moment from "moment";

export default function ShareHistoryPopup(props) {
  const { isShare, setIsShare, medias } = props;
  const [media, setMedia] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleClose = () => {
    setIsShare({ ...isShare, history: false });
  };

  useEffect(async () => {
    let response = await axios.get(`/media/${medias[0].id}`);
    setMedia(response.data.media);
    setLoading(false);
  }, []);

  return (
    <Fragment>
      {/* Select Channel popup */}
      <Popup
        title="ประวัติการแชร์"
        width="xl"
        openPopup={isShare.history}
        onClose={handleClose}
      >
        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <CircularProgress />
          </Box>
        ) : (
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell align="left">Share History</TableCell>
                    <TableCell align="left">Time</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {media.shareHistory.map((history) => (
                    <TableRow key={history.id}>
                      <TableCell align="left">
                        Share To {history.type} ({history.channel?.name} :{" "}
                        {history?.channel?.id})
                        {(history.type === "Facebook Page" ||
                          history.type === "Facebook Group") && (
                          <a
                            rel="noreferrer"
                            href={`https://www.facebook.com/${history.postId}`}
                            target="_blank"
                          >
                            <Typography sx={{ mx: 1, color: "#385898" }}>
                              View Post
                            </Typography>
                          </a>
                        )}
                      </TableCell>
                      <TableCell align="left">
                        {moment(history.createdAt)
                          .utcOffset("+0700")
                          .format("DD/MM/YYYY HH:mm")}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        )}
      </Popup>
    </Fragment>
  );
}
