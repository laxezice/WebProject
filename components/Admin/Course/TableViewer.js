import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  Button,
  Box,
} from "@mui/material";

export default function TableViewer(props) {
  const { content } = props;

  return (
    <Box>
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              {content.content[0].map((column, c) => (
                <TableCell align="left" key={c}>
                  {column}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {content.content.slice(1).map((row, r) => (
              <TableRow key={r}>
                {row.map((column, c) => (
                  <TableCell align="left" key={c}>
                    {column}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
