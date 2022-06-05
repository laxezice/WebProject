import React, { Fragment, useState, useEffect } from "react";
import { Box, Button, CircularProgress, IconButton } from "@mui/material";
import { BiEditAlt, BiTrash, BiPlus, BiWorld } from "react-icons/bi";
import StyleTable from "../../../components/Admin/Channel/StyleDataTable";
import AddchannelPopup from "../../../components/Admin/Channel/AddChannelPopup";
import {
  FaFacebookSquare,
  FaFacebookMessenger,
  FaLine,
  FaUserFriends,
} from "react-icons/fa";
import { IoMdMail } from "react-icons/io";
import axios from "axios";
import EditchannelPopup from "../../../components/Admin/Channel/EditChannelPopup";
import AdminLayout from "../../../layouts/Admin/AdminLayout";
import moment from "moment";
import DeletePopup from "../../../components/Admin/Program/DeletePopup";

const styles = {
  container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 10,
    marginBottom: 10,
  },
  edit: {
    backgroundColor: "#2D569E",
    marginRight: 10,
  },
  delete: {
    backgroundColor: "#FF4D4D",
    marginRight: 10,
  },
  share: {
    backgroundColor: "#47d147",
  },
  add: {
    backgroundColor: "#2D569E",
    color: "#FFF",
    margin: "10",
  },
  icon: {
    width: "auto",
    height: "50%",
    marginRight: 5,
  },
};

export default function Channel() {
  const [selected, setSelected] = useState([]);
  const [isAdd, setIsAdd] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [loading, setLoading] = useState(true);
  const [channel, setChannel] = useState({});
  const [channels, setChannels] = useState([]);
  const [deleteData, setDeleteData] = useState({ open: false, id: "" });
  //const {showSnackbar} = useAuth()

  const retriveData = async () => {
    setLoading(true);
    const response = await axios.get("/channel/list");
    setChannels(response.data.channels);
    setLoading(false);
  };

  const openDeletePopup = (open) => {
    setDeleteData({ ...deleteData, open: open });
  };

  useEffect(async () => {
    retriveData();
  }, []);

  const selectLogo = (type) => {
    if (type == "Facebook Page") {
      return <FaFacebookSquare style={styles.icon} />;
    } else if (type == "Facebook Chatbot") {
      return <FaFacebookMessenger style={styles.icon} />;
    } else if (type == "Facebook Group") {
      return <FaUserFriends style={styles.icon} />;
    } else if (type == "Line Chatbot") {
      return <FaLine style={styles.icon} />;
    } else if (type == "Website") {
      return <BiWorld style={styles.icon} />;
    } else if (type == "Mailing List") {
      return <IoMdMail style={styles.icon} />;
    }
  };

  const deleteHandle = async (id) => {
    const response = await axios.delete(`/channel/${id}`);
    retriveData();
  };

  const editHandle = (channel) => {
    setChannel(channel);
    setIsEdit(true);
  };

  const columns = [
    {
      field: "id",
      headerName: "ลำดับ",
      flex: 0.1,
      headerAlign: "center",
    },
    {
      field: "name",
      headerName: "ชิ่อช่องทางประชาสัมพันธ์",
      flex: 0.3,
      headerAlign: "center",
    },
    {
      field: "type",
      headerName: "ชนิดของช่องทาง",
      flex: 0.2,
      headerAlign: "center",
      renderCell: (data) => {
        return (
          <Fragment>
            {selectLogo(data.value)}
            <p>{data.value}</p>
          </Fragment>
        );
      },
    },
    {
      field: "createdAt",
      headerName: "วัน/เดือน/ปี",
      flex: 0.2,
      headerAlign: "center",
      valueGetter: (data) => {
        return moment(data.row.createdAt)
          .utcOffset("+0700")
          .format("DD/MM/YYYY HH:mm");
      },
    },
    {
      field: "Action",
      headerAlign: "center",
      renderCell: (data) => {
        return (
          <Fragment>
            <IconButton
              aria-label="Edit"
              size="small"
              style={styles.edit}
              onClick={() => {
                editHandle(data.row);
              }}
            >
              <BiEditAlt color="#FFFFFF" />
            </IconButton>
            <IconButton
              aria-label="Delete"
              size="small"
              style={styles.delete}
              onClick={async () => {
                setDeleteData({ id: data.id, open: true });
              }}
            >
              <BiTrash color="#FFFFFF" />
            </IconButton>
          </Fragment>
        );
      },
      flex: 0.1,
    },
  ];

  return (
    <Fragment>
      {loading ? (
        <Box mb={6}></Box>
      ) : (
        <Box
          container
          componet="div"
          sx={{
            width: "100%",
          }}
          style={styles.container}
        >
          <Button
            variant="contained"
            style={styles.add}
            startIcon={<BiPlus />}
            disabled={loading}
            color="primary"
            onClick={() => {
              setIsAdd(true);
            }}
          >
            เพิ่ม
          </Button>
        </Box>
      )}

      <Box
        container
        componet="div"
        sx={{
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
          display: "flex",
        }}
      >
        {loading ? (
          <CircularProgress />
        ) : (
          <StyleTable
            rows={channels}
            columns={columns}
            style={styles.root}
            setSelected={setSelected}
          />
        )}
      </Box>

      {/* popup */}
      {isAdd && (
        <AddchannelPopup
          isAdd={isAdd}
          setIsAdd={setIsAdd}
          refresh={retriveData}
          // setSnackbar={setSnackbar}
        />
      )}

      {isEdit && (
        <EditchannelPopup
          isEdit={isEdit}
          setIsEdit={setIsEdit}
          refresh={retriveData}
          channel={channel}
          // setSnackbar={setSnackbar}
        />
      )}

      {deleteData.open && (
        <DeletePopup
          open={deleteData.open}
          setOpen={openDeletePopup}
          title={"ยืนยันการลบช่องทางประชาสัมพันธ์"}
          text={`คุณต้องการลบช่องทางประชาสัมพันธ์ ${deleteData.id} หรือไม่`}
          handler={() => {
            deleteHandle(deleteData.id);
          }}
        />
      )}
    </Fragment>
  );
}

Channel.getLayout = function getLayout(page) {
  return <AdminLayout title="ช่องทางประชาสัมพันธ์">{page}</AdminLayout>;
};
