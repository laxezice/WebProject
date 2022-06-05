import React, { Fragment, useState } from "react";
import Popup from "../../Popup";
import axios from "axios";
import ChannelForm from "./ChannelForm";
import { useAuth } from "../../../contexts/Section";

const AddchannelPopup = (props) => {
  const { isAdd, setIsAdd, refresh } = props;
  const [loading, setLoading] = useState(false);
  const {showSnackbar} = useAuth()
  const handleClose = () => {
    setIsAdd(false);
  };

  const handleSubmit = async (data) => {
    setLoading(true);
    console.log(data);
    try {
      const response = await axios.post("/channel/create", data);
      setIsAdd(false);
      showSnackbar("Add Channel Success", "success")
      refresh();
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Fragment>
      <Popup
        title="เพิ่มช่องทางประชาสัมพันธ์"
        width="md"
        openPopup={isAdd}
        onClose={handleClose}
      >
        <ChannelForm loading={loading} onSubmit={handleSubmit} />
      </Popup>
    </Fragment>
  );
};

export default AddchannelPopup;
