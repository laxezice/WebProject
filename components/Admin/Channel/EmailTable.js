import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  Button,
} from "@mui/material";

export default function EmailTable(props) {
  const { list, clear } = props;

  return (
    <Box>
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="left">Email</TableCell>
              <TableCell align="left">
                <Box sx={{ m: 1, position: "relative", position: "relative" }}>
                  Name{" "}
                  <Button
                    variant="contained"
                    sx={{
                      background: "#cbced4",
                      color: "#000",
                      position: "absolute",
                      top: "50%",
                      transform: "translateY(-50%)",
                      right: 0,
                    }}
                    onClick={clear}
                  >
                    ล้าง
                  </Button>
                </Box>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {list.map((row) => (
              <TableRow key={row.email}>
                <TableCell align="left">{row.email}</TableCell>
                <TableCell align={row.name ? "left" : "center"}>
                  {row.name || "-"}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
