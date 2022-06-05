import React, { useState } from "react";
import {
  Box,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Button,
  CircularProgress,
  listClasses,
} from "@mui/material";
import { TextField } from "@mui/material";
import { styled } from "@mui/system";
import CsvUploader from "./CsvUploader";

const SelectControl = styled(FormControl)({
  width: "40%",
  marginLeft: 10,
});

const TYPES = {
  FACEBOOK_PAGE: "Facebook Page",
  FACEBOOK_GROUP: "Facebook Group",
  LINE_CHATBOT: "Line Chatbot",
  WEBSITE: "Website",
  MAILING_LIST: "Mailing List",
};

export default function ChannelForm(props) {
  const { channel, loading, onSubmit } = props;
  const [type, setType] = useState(channel?.type || "");
  const [list, setList] = useState(channel?.list || []);

  const handleType = async (event) => {
    setType(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const target = event.target;
    const data = {
      name: target["channel-name"].value,
      type: type,
    };

    if (type === TYPES.WEBSITE) {
      data.url = target["channel-data"].value;
    } else if (type === TYPES.FACEBOOK_GROUP) {
      data.groupId = target["channel-data"].value;
    } else if (type === TYPES.MAILING_LIST) {
      data.list = list;
    } else {
      data.accessToken = target["channel-data"].value;
    }

    if (type === TYPES.FACEBOOK_PAGE) {
      data.pageId = target["channel-target"].value;
    }

    onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Box component="div" spacing={2} sx={{ mx: "auto", p: 1 }}>
        <TextField
          id="channel-name"
          label="ชื่อช่องทางการประชาสัมพันธ์"
          placeholder="ชื่อเพจ, ชื่อแชทบอท"
          multiline
          maxRows={2}
          fullWidth
          style={{ width: "50%" }}
          defaultValue={channel?.name || ""}
          required
        />

        <SelectControl>
          <InputLabel id="channel-type-label">
            ชนิดช่องทางการประชาสัมพันธ์
          </InputLabel>
          <Select
            labelId="channel-type-label"
            id="channel-type"
            value={type}
            label="ชนิดช่องทางการประชาสัมพันธ์"
            onChange={handleType}
          >
            {Object.values(TYPES).map((value) => (
              <MenuItem key={value} value={value}>
                {value}
              </MenuItem>
            ))}
          </Select>
        </SelectControl>
      </Box>

      <Box component="div" spacing={2} sx={{ mx: "auto", p: 1 }}>
        {type === TYPES.FACEBOOK_PAGE && (
          <TextField
            id="channel-target"
            label="Page Id"
            multiline
            maxRows={2}
            fullWidth
            defaultValue={channel?.pageId || ""}
            required
            sx={{ mb: 2 }}
          />
        )}

        {type === TYPES.MAILING_LIST ? (
          <CsvUploader data={list} setData={setList} />
        ) : type === TYPES.WEBSITE ? (
          <TextField
            id="channel-data"
            label="Website url"
            multiline
            mixRows={2}
            fullWidth
            defaultValue={channel?.url || ""}
            required
          />
        ) : type === TYPES.FACEBOOK_GROUP ? (
          <TextField
            id="channel-data"
            label="Group Id"
            fullWidth
            defaultValue={channel?.groupId || ""}
            required
          />
        ) : (
          <TextField
            id="channel-data"
            label="Access Token"
            mixRows={2}
            fullWidth
            defaultValue={channel?.accessToken || ""}
            required
          />
        )}
      </Box>

      <Box
        component="div"
        spacing={2}
        sx={{
          mx: "auto",
          p: 1,
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        <Box sx={{ m: 1, position: "relative" }}>
          <Button variant="contained" disabled={loading} type="submit">
            บันทึก
          </Button>
          {loading && (
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
    </form>
  );
}
