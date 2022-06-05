import React, { Fragment, useState } from "react";
import Popup from "../../Popup";
import axios from "axios";
import ChannelForm from "./ChannelForm";
import { useAuth } from "../../../contexts/Section";

const EditchannelPopup = (props) => {
  const {showSnackbar} = useAuth()
  const { isEdit, setIsEdit, refresh, channel } = props;
  const [type, setType] = useState(channel.type || "");
  const [loading, setLoading] = useState(false);

  const handleClose = () => {
    setIsEdit(false);
  };

  const handleSubmit = async (data) => {
    setLoading(true);
    try {
      const response = await axios.put(`/channel/${channel.id}`, data);
      setLoading(false);
      setIsEdit(false);
      showSnackbar("Edit Channel Success", "success")
      refresh();
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Fragment>
      {/* Add Channel popup */}
      <Popup
        title={`แก้ไขช่องทาง ${channel.name} - ${channel.id}`}
        width="md"
        openPopup={isEdit}
        onClose={handleClose}
      >
        <ChannelForm
          channel={channel}
          loading={loading}
          onSubmit={handleSubmit}
        />
      </Popup>
    </Fragment>
  );
};

export default EditchannelPopup;
