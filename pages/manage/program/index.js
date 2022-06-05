import React, { Fragment, useState, useEffect } from "react";
import { Box, Button, CircularProgress, IconButton } from "@mui/material";
import { BiEditAlt, BiTrash, BiPlus } from "react-icons/bi";
import StyleTable from "../../../components/Admin/Channel/StyleDataTable";
import axios from "axios";
import AdminLayout from "../../../layouts/Admin/AdminLayout";
import { useRouter } from "next/router";
import moment from "moment";
import DeletePopup from "../../../components/Admin/Program/DeletePopup";
import { useAuth } from "../../../contexts/Section";

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

export default function Program() {
  const { showSnackbar } = useAuth();
  const [selected, setSelected] = useState([]);
  const [loading, setLoading] = useState(true);
  const [programs, setPrograms] = useState([]);
  const [deleteData, setDeleteData] = useState({ open: false, id: "" });

  const router = useRouter();

  const retriveData = async () => {
    setLoading(true);
    const response = await axios.get("/program/list");
    setPrograms(response.data.programs);
    setLoading(false);
  };

  useEffect(async () => {
    retriveData();
  }, []);

  const openDeletePopup = (open) => {
    setDeleteData({ ...deleteData, open: open });
  };

  const deleteHandle = async (id) => {
    const response = await axios.delete(`/program/${id}`);
    showSnackbar(response.data.message, "success")
    retriveData();
  };

  const editHandle = (id) => {
    router.push(`/manage/program/edit/${id}`);
  };

  const columns = [
    {
      field: "id",
      headerName: "ลำดับ",
      flex: 0.1,
      headerAlign: "center",
    },
    {
      field: "thaiName",
      headerName: "ชิ่อภาษาไทย",
      flex: 0.3,
      headerAlign: "center",
    },
    {
      field: "engName",
      headerName: "ชิ่อภาษาอังกฤษ",
      flex: 0.3,
      headerAlign: "center",
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
                editHandle(data.id);
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
          onClick={() => {
            router.push("/manage/program/add");
          }}
        >
          เพิ่ม
        </Button>
      </Box>
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
            rows={programs}
            columns={columns}
            style={styles.root}
            setSelected={setSelected}
          />
        )}
      </Box>

      {deleteData.open && (
        <DeletePopup
          open={deleteData.open}
          setOpen={openDeletePopup}
          title={"ยืนยันการลบหลักสูตร"}
          text={`คุณต้องการลบหลักสูตร ${deleteData.id} หรือไม่`}
          handler={() => {
            deleteHandle(deleteData.id);
          }}
        />
      )}
    </Fragment>
  );
}

Program.getLayout = function getLayout(page) {
  return <AdminLayout title="หลักสูตร">{page}</AdminLayout>;
};
