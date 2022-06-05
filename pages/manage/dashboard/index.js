import React, { Fragment, useEffect, useState } from "react";
import { Box, CircularProgress, Typography, Button, Grid, Divider, Chip } from "@mui/material";
import axios from "axios";
import moment from "moment";
import AdminLayout from "../../../layouts/Admin/AdminLayout";
import { useAuth } from "../../../contexts/Section";
import LineChartDb from "../../../components/Admin/Dashboard/LineChart";
import StyleTable from "../../../components/Admin/Channel/StyleDataTable";

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

export default function Overview(props) {
  const { showSnackbar } = useAuth();
  const [loading, setLoading] = useState(true);
  const [mediasData, setMediasData] = useState(props.data.medias);
  const [coursesData, setCoursesData] = useState(props.data.courses);
  const [programsData, setProgramsData] = useState(props.data.programs);
  const [views, setViews] = useState({
    course: 0,
    media: 0,
    program: 0,
  });

  const columns = [
    {
      field: "id",
      headerName: "ลำดับ",
      flex: 0.1,
      headerAlign: "center",
    },
    {
      field: "username",
      headerName: "ชื่อหัวข้อ",
      flex: 0.4,
      headerAlign: "center",
      valueGetter: (data) => {
        return `${data.row.title ? data.row.title : data.row.thaiName}`;
      },
    },
    {
      field: "view",
      headerName: "จำนวนผู้เข้าชม",
      flex: 0.1,
      headerAlign: "center",
      valueGetter : (data) => {
        return `${data.row.viewed[0] ? data.row.viewed[0].view : 0}`
      }
    },
  ];

  const checkData = () => {
    if ((mediasData, coursesData, programsData)) {
      const mediasDataView = mediasData.map((e, index) => {
        console.log(index);
        if (e.viewed[index]) {
          console.log(e.viewed[index].view);
          return e.viewed[index].view;
        } else {
          return 0;
        }
      });
      console.log(mediasDataView);
      setLoading(false);
    }
  };
  useEffect(() => {
    checkData();
  }, []);

  return (
    <>
      {loading ? (
        <>
          <Box sx={{ display: "flex", justifyContent: "center" }} mt={6}>
            <CircularProgress />
          </Box>
          <Box sx={{ display: "flex", justifyContent: "center" }} mt={4}>
            <Button variant="outlined">กลับไปหน้าแรก</Button>
          </Box>
        </>
      ) : (
        <Box sx={{ width: "100%", height: "100%" }}>
          <Typography variant="h5" mb={5} mt={6} color="#2D569E">
            กราฟแสดงจำนวนผู้เข้าชม
          </Typography>
          <Grid container columnSpacing={{ xs: 12, mb: 6, sm: 4 }} mt={3}>
            <Grid item xs={6}>
              <LineChartDb></LineChartDb>
            </Grid>
            <Grid item xs={12} mb={5}>
              <Box mb={3} mt={5}>
              <Divider><Chip label={"หลักสูตร"} color="info"></Chip></Divider>
              </Box>
              <StyleTable
                rows={programsData}
                columns={columns}
                style={styles.root}
              ></StyleTable>
            </Grid>
            <Grid item xs={12} mb={5}>
            <Box mb={3} mt={5}>
              <Divider><Chip label={"การอบรม"} color="info"></Chip></Divider>
              </Box>
              <StyleTable
                rows={coursesData}
                columns={columns}
                style={styles.root}
              ></StyleTable>
            </Grid>
            <Grid item xs={12} mb={5}>
            <Box mb={3} mt={5}>
              <Divider><Chip label={"ข่าวประชาสัมพันธ์"}  color="info"></Chip></Divider>
              </Box>
              <StyleTable
                rows={mediasData}
                columns={columns}
                style={styles.root}
              ></StyleTable>
            </Grid>
          </Grid>
        </Box>
      )}
    </>
  );
}

Overview.getLayout = function getLayout(page) {
  return <AdminLayout title="หน้าหลัก">{page}</AdminLayout>;
};

export const getServerSideProps = async () => {
  const res = await fetch("https://pr-project-api.herokuapp.com/statistic");
  const data = await res.json();
  return {
    props: {
      data: data,
    },
  };
};
