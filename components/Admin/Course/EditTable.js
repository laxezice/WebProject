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

export default function EditableTable(props) {
  const { index, contents, setContents } = props;

  let content = contents[index];

  const tableIntialize = () => {
    content.row = Number(content.row);
    content.column = Number(content.column);
    let data = content.content;
    if (content.row < data.length) {
      data.splice(content.row);
    }

    for (let i = 0; i < content.row; i++) {
      if (!data[i]) {
        data[i] = [];
        for (let j = 0; j < content.column; j++) {
          data[i].push("");
        }
      } else {
        if (data[i].length > content.column) {
          data[i].splice(content.column);
        } else if (data[i].length < content.column) {
          for (let j = data[i].length; j < content.column; j++) {
            data[i].push("");
          }
        }
      }
    }
  };

  const setRow = (event) => {
    content.row = event.target.value;
    updataTable();
  };

  const setColumn = (event) => {
    content.column = event.target.value;
    updataTable();
  };

  const setData = (row, column, data) => {
    content.content[row][column] = data;
  };

  const updataTable = () => {
    setContents([...contents]);
  };

  const isNumeric = (str) => {
    return !isNaN(str) && !isNaN(parseFloat(str));
  };

  const validateSize = () => {
    const isNumber = isNumeric(content.row) && isNumeric(content.column);
    const isZero = content.row != 0 && content.column != 0;
    return isNumber && isZero;
  };

  return (
    <Box>
      <Box sx={{ padding: 2 }}>
        <TextField
          label="จำนนวนแถว"
          placeholder="จำนนวนแถว"
          defaultValue={content.row}
          sx={{ marginRight: 5 }}
          onChange={setRow}
        />
        <TextField
          label="จำนนวนหลัก"
          placeholder="จำนนวนหลัก"
          defaultValue={content.column}
          onChange={setColumn}
        />
      </Box>

      {validateSize() && (
        <TableContainer component={Paper}>
          {tableIntialize()}
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                {content.content[0].map((column, c) => (
                  <TableCell align="left" key={c}>
                    <TextField
                      placeholder="content"
                      multiline
                      maxRows={10}
                      fullWidth
                      onChange={(event) => {
                        setData(0, c, event.target.value);
                      }}
                      defaultValue={column}
                    />
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {content.content.slice(1).map((row, r) => (
                <TableRow key={r}>
                  {row.map((column, c) => (
                    <TableCell align="left" key={c}>
                      <TextField
                        placeholder="content"
                        multiline
                        maxRows={10}
                        fullWidth
                        onChange={(event) => {
                          setData(r + 1, c, event.target.value);
                        }}
                        defaultValue={column}
                      />
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
}
