import React, { Fragment, useState, useEffect } from "react";
import { Box, Button, IconButton, CircularProgress } from "@mui/material";
import { BiEditAlt, BiTrash, BiShareAlt, BiPlus } from "react-icons/bi";
import Link from "next/link";
import SelectChannelPopup from "../../../components/Admin/Media/SelectChannelPopup";
import axios from "axios";
import MediaTable from "../../../components/Admin/Media/MediaTable";
import AdminLayout from "../../../layouts/Admin/AdminLayout";
import { useRouter } from "next/router";
import ShareMenu from "../../../components/Admin/Media/ShareMenu";
import ShareEmailPopup from "../../../components/Admin/Media/ShareEmailPopup";
import ShareWebPopup from "../../../components/Admin/Media/ShareWebPopup";
import ShareGroupPopup from "../../../components/Admin/Media/ShareGroupPopup";
import ShareHistoryPopup from "../../../components/Admin/Media/ShareHistoryPopup";
import moment from "moment";
import DeletePopup from "../../../components/Admin/Program/DeletePopup";

const styles = {
  container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 15,
    marginBottom: 10,
    width: "100%",
  },
  container2: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 20,
    marginBottom: 10,
    width: "100%",
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
  share: {
    backgroundColor: "#47d147",
  },
};

export default function Media() {
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState([]);
  const [deleteData, setDeleteData] = useState({ open: false, id: "" });
  const [shareMedia, setShareMedia] = useState([]);
  const [medias, setMedias] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [isShare, setIsShare] = useState({
    social: false,
    email: false,
    website: false,
    group: false,
    history: false,
  });

  const router = useRouter();

  const retriveData = async () => {
    setLoading(true);
    const response = await axios.get("/media/list");
    setMedias(response.data.medias);
    setLoading(false);
  };

  useEffect(async () => {
    await retriveData();
  }, []);

  const isShareClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const shareHandle = (id) => {
    setShareMedia([id]);
  };

  const multiShare = () => {
    setShareMedia(selected);
  };

  const openDeletePopup = (open) => {
    setDeleteData({ ...deleteData, open: open });
  };

  const deleteHandle = async (id) => {
    const response = await axios.delete(`/media/${id}`);
    retriveData();
  };

  const columns = [
    {
      field: "id",
      headerName: "ลำดับ",
      flex: 0.2,
      headerAlign: "center",
    },
    {
      field: "title",
      headerName: "หัวข้อประชาสัมพันธ์",
      flex: 0.4,
      headerAlign: "center",
    },
    {
      field: "createdAt",
      headerName: "วัน/เดือน/ปี",
      flex: 0.15,
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
        if (selected.length < 1) {
          return (
            <Fragment>
              <IconButton
                aria-label="Edit"
                size="small"
                style={styles.edit}
                onClick={() => {
                  router.push(`/manage/media/edit/${data.id}`);
                }}
              >
                <BiEditAlt color="#FFFFFF" />
              </IconButton>
              <IconButton
                aria-label="Delete"
                size="small"
                style={styles.delete}
                onClick={() => {
                  setDeleteData({ id: data.id, open: true });
                }}
              >
                <BiTrash color="#FFFFFF" />
              </IconButton>
              <IconButton
                aria-label="Share"
                size="small"
                style={styles.share}
                onClick={(e) => {
                  shareHandle(data.id);
                  isShareClick(e);
                }}
              >
                <BiShareAlt color="#FFFFFF" />
              </IconButton>
            </Fragment>
          );
        }
      },
      flex: 0.15,
    },
  ];

  return (
    <Fragment>
      {loading ? (
        <Box></Box>
      ) : (
        <Box container componet="div" style={styles.container}>
          <Link href="/manage/media/add" style={{ textDecoration: "none" }}>
            <Button
              variant="contained"
              style={styles.add}
              startIcon={<BiPlus />}
              color="primary"
            >
              เพิ่ม
            </Button>
          </Link>
        </Box>
      )}

      {selected.length >= 1 ? (
        <Box
          container
          componet="div"
          sx={{ marginTop: "3%" }}
          style={styles.container2}
        >
          <IconButton
            aria-label="Delete"
            style={styles.delete}
            onClick={(e) => {
              console.log(e);
            }}
          >
            <BiTrash color="#FFFFFF" />
          </IconButton>
          <IconButton
            aria-label="Share"
            style={styles.share}
            onClick={(e) => {
              isShareClick(e);
              multiShare();
            }}
          >
            <BiShareAlt color="#FFFFFF" />
          </IconButton>
        </Box>
      ) : (
        <Box container componet="div" style={styles.container}></Box>
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
          <Box
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              justifyItems: "center",
            }}
            pt={20}
          >
            <CircularProgress size={50} />
          </Box>
        ) : (
          <MediaTable
            rows={medias}
            columns={columns}
            setSelected={setSelected}
          ></MediaTable>
        )}
      </Box>

      {/* Pop up */}
      {isShare.social && (
        <SelectChannelPopup
          isShare={isShare}
          setIsShare={setIsShare}
          medias={medias.filter((media) => shareMedia.indexOf(media.id) != -1)}
        />
      )}
      {isShare.email && (
        <ShareEmailPopup
          isShare={isShare}
          setIsShare={setIsShare}
          medias={medias.filter((media) => shareMedia.indexOf(media.id) != -1)}
        />
      )}
      {isShare.website && (
        <ShareWebPopup
          isShare={isShare}
          setIsShare={setIsShare}
          medias={medias.filter((media) => shareMedia.indexOf(media.id) != -1)}
        />
      )}
      {isShare.group && (
        <ShareGroupPopup
          isShare={isShare}
          setIsShare={setIsShare}
          medias={medias.filter((media) => shareMedia.indexOf(media.id) != -1)}
        />
      )}
      {isShare.history && (
        <ShareHistoryPopup
          isShare={isShare}
          setIsShare={setIsShare}
          medias={medias.filter((media) => shareMedia.indexOf(media.id) != -1)}
        />
      )}
      {deleteData.open && (
        <DeletePopup
          open={deleteData.open}
          setOpen={openDeletePopup}
          title={"ยืนยันการลบข่าวประชาสัมพันธ์"}
          text={`คุณต้องการลบข่าวประชาสัมพันธ์ ${deleteData.id} หรือไม่`}
          handler={() => {
            deleteHandle(deleteData.id);
          }}
        />
      )}

      {/* menu */}
      <ShareMenu
        anchorEl={anchorEl}
        setAnchorEl={setAnchorEl}
        isShare={isShare}
        setIsShare={setIsShare}
        mutiple={shareMedia.length > 1}
      />
    </Fragment>
  );
}

Media.getLayout = function getLayout(page) {
  return <AdminLayout title="ข่าวประชาสัมพันธ์">{page}</AdminLayout>;
};
