import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import { createStyles, makeStyles } from "@mui/styles";
import {
  Button,
  Box,
  FormLabel,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Divider,
  Radio,
  RadioGroup,
  FormControlLabel,
  Typography,
} from "@mui/material";
import axios, { Axios } from "axios";
import { useRouter } from "next/router";
import Checkbox from "@mui/material/Checkbox";
import Moment from "moment";
import { useAuth } from "../../../contexts/Section";

const Editforminfomation = (props) => {
  const { data, setOpenPopup } = props;
  const { user, showSnackbar, logout } = useAuth();
  const router = useRouter();
  const [userData, setUserData] = useState(data);
  const [newUserData, setNewUserData] = useState(userData);
  // -------- status check every true ----------
  const [confirm, setConfirm] = useState(false);
  // snackbars
  const [errBirthday, setErrBirthday] = useState(false);
  const graduatedSelec = [
    "ปฐมศึกษา (Elementary School)",
    "มัธยมศึกษา (Middle and High School)",
    "การศึกษาวิชาชีพ (Vocational)",
    "การศึกษาวิชาชีพชั้นสูง (Higher Vocational)",
    "ปริญญาตรี (Bachelor's degree)",
    "ปริญญาโท (Master's degree)",
    "ปริญญาเอก ( Ph.D.)",
    "อื่นๆ (Other.)",
  ];
  const titleData = [
    "นางสาว (Miss)",
    "นาง (Mrs.)",
    "นาย (Mr.)",
    "ศาสตราจารย์ (Professor)",
    "ผู้ช่วยศาสตราจารย์ (Assistant Professor)",
    "อื่นๆ (Other.)",
  ];

  const handleSubmit = async (event) => {
    event.preventDefault();
    // setNewUserData({
    //   title: titleData[event.target.title.value],
    //   name: event.target.name.value,
    //   surname: event.target.surname.value,
    //   sex: event.target.surname.value,
    //   birthday: new Date(event.target.birthday.value),
    //   isSubcribe: event.target.subcribe.value === "on" ? true : false,
    //   education: {
    //     graduated: graduatedSelec[event.target.graduated.value],
    //     detail: event.target.detail.value,
    //   },
    // });

    console.log(userData);
    try {
      const response = await axios.put(
        "/auth/edit/profile",
        {
            title: titleData[event.target.title.value],
            name: event.target.name.value,
            surname: event.target.surname.value,
            sex: event.target.gender.value,
            birthday: new Date(event.target.birthday.value),
            isSubcribe: event.target.subcribe.value === "on" ? true : false,
            education: {
              graduated: event.target.graduated.value,
              detail: event.target.detail.value,
            },
        },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      setOpenPopup(false);
      showSnackbar("Edit infomation success.", "success")
      logout()
      showSnackbar("Please Login again for watch your infomation.", "info")

      router.push(`/profile/${router.query.id}`)
    } catch (err) {
      console.log(err);
      showSnackbar(e.message, "error")
    }
    return true;
  };

  return (
    <>
      {/* ---------name surname thai------------- */}
      <Box containe p={2} mt={0}>
        <Box mb={2}>
          <Typography variant="h6" mb={2}>
            ข้อมูลส่วนตัว (Personal Information)
          </Typography>
          <Divider></Divider>
        </Box>
        <form onSubmit={handleSubmit}>
          <FormControl fullWidth required>
            <InputLabel>คำนำหน้าชื่อ (Title)</InputLabel>
            <Select
              name="title"
              label="คำนำหน้าชื่อ"
              sx={{ marginBottom: 3 }}
              defaultValue={titleData.indexOf(userData.title)}
            >
              {titleData.map((e, index) => {
                return (
                  <MenuItem value={index} key={e}>
                    {e}
                  </MenuItem>
                );
              })}
            </Select>
            <TextField
              name="name"
              label="ชื่อ (Name)"
              defaultValue={userData.name}
              required
              sx={{ marginBottom: 3 }}
            />
            <TextField
              name="surname"
              label="นามสกุล (Surname)"
              defaultValue={userData.surname}
              required
              sx={{ marginBottom: 3 }}
            />
            <FormLabel id="gender">เพศ (Gender)</FormLabel>
            <RadioGroup
              sx={{ marginBottom: 3 }}
              row
              name="gender"
              defaultChecked
              defaultValue={userData.sex}
            >
              <FormControlLabel
                value="female"
                control={<Radio />}
                label="เพศหญิง (Female)"
              />
              <FormControlLabel
                value="male"
                control={<Radio />}
                label="เพศชาย (Male)"
              />
              <FormControlLabel
                value="other"
                control={<Radio />}
                label="อื่น (Other)"
              />
            </RadioGroup>
          </FormControl>

          <FormControl required sx={{ width: "100%" }}>
            <FormLabel>วันเกิด (Birthday)</FormLabel>
            <TextField
              sx={{ marginBottom: 3 }}
              name="birthday"
              type="date"
              required
              fullWidth
              defaultValue={Moment(userData.birthday).format("YYYY-MM-DD")}
              error={errBirthday}
              onChange={(event) => {
                if (event.target.value) {
                  var today = new Date();
                  const fullYead = Moment(today).format("YYYY");
                  const findRealBd =
                    Number(fullYead) -
                    Number(Moment(event.target.value).format("YYYY"));
                  if (findRealBd > 5 && findRealBd > 0) {
                    setUserData({
                      ...userData,
                      birthday: new Date(`${event.target.value}`),
                    });
                    setErrBirthday(false);
                  } else if (findRealBd < 5 && findRealBd < 0) {
                    setErrBirthday(true);
                  } else {
                    setErrBirthday(false);
                  }
                }
                return true;
              }}
            />
          </FormControl>
          <Box mb={2}>
            <Typography variant="h6" mb={2}>
              การศึกษา (Educations)
            </Typography>
            <Divider></Divider>
          </Box>

          <FormControl required sx={{ width: "100%", marginTop: "20" }}>
            <InputLabel>วุฒิการศึกษา (Graduated)</InputLabel>
            <Select
              sx={{ marginBottom: 3 }}
              name="graduated"
              label="วุฒิการศึกษา (Graduated)"
              defaultValue={userData.education.graduated}
            >
              {graduatedSelec.map((e) => {
                return (
                  <MenuItem value={e} key={e}>
                    {e}
                  </MenuItem>
                );
              })}
            </Select>
            <TextField
              sx={{ marginBottom: 3 }}
              name="detail"
              type="text"
              label="รายละเอียดเพิ่มเติม (Detail)"
              fullWidth
              defaultValue={userData.education.detail}
            />
          </FormControl>
          <FormControlLabel
            control={<Checkbox defaultChecked name="subcribe" />}
            label=" คุณต้องการติดตามข่าวสารหรือไม่ ?"
            sx={{ marginBottom: 3 }}
          />

          {!confirm ? (
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                width: "100%",
              }}
            >
              <Button
                type="submit"
                variant="outlined"
                sx={{ width: "15%", marginRight: "2%" }}
                mr={3}
              >
                บันทึก
              </Button>
              <Button
                variant="contained"
                color="error"
                sx={{ width: "15%" }}
                onClick={() => {
                  setOpenPopup(false);
                }}
              >
                ยกเลิก
              </Button>
            </Box>
          ) : (
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                width: "100%",
              }}
            >
              <Button
                type="submit"
                variant="contained"
                color="primary"
                sx={{ width: "15%" }}
              >
                บันทึก
              </Button>
            </Box>
          )}
        </form>
      </Box>
    </>
  );
};
export default Editforminfomation;
