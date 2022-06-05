import React, { useState } from "react";
import TextField from "@mui/material/TextField";
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

const Forminformation = (props) => {
  const { username, password, email } = props;
  const {showSnackbar} = useAuth()
  const router = useRouter();
  const [userData, setUserData] = useState();
  
  // -------- status check every true ----------
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
  const [confirm, setConfirm] = useState(false);
  // snackbars
  const [errBirthday, setErrBirthday] = useState(false);
  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(new Date(event.target.birthday.value));
    setUserData({
      ...userData,
      username: username,
      password: password,
      email: email,
      birthday: new Date(event.target.birthday.value),
      title: titleData[event.target.title.value],
      name: event.target.name.value,
      surname: event.target.surname.value,
      sex: event.target.gender.value,
      education: {
        graduated: event.target.graduated.value,
        detail: event.target.detail.value,
      },
      isSubcribe: event.target.subcribe.value === "on" ? true : false,
    });

    try {
      const response = await axios.post("/auth/register", { ...userData });
      showSnackbar("Register is success.", "success")
      router.push("/auth/login");
    } catch (err) {
      console.log(err);
      showSnackbar(err.message, "error")
      setConfirm(true);
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
        <form onSubmit={handleSubmit} autoComplete="off">
          <FormControl fullWidth required>
            <InputLabel>คำนำหน้าชื่อ (Title)</InputLabel>
            <Select sx={{ marginBottom: 3 }} name="title" label="คำนำหน้าชื่อ">
              {titleData.map((e, index) => {
                return (
                  <MenuItem value={index} key={e}>
                  {e}
                </MenuItem>
                )
                
              })}
            </Select>
            <TextField
              sx={{ marginBottom: 3 }}
              name="name"
              label="ชื่อ (Name)"
              required
            />
            <TextField
              name="surname"
              label="นามสกุล (Surname)"
              sx={{ marginBottom: 3 }}
              required
            />
            <FormLabel id="gender">เพศ (Gender)</FormLabel>
            <RadioGroup
              sx={{ marginBottom: 3 }}
              row
              name="gender"
              defaultValue="female"
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
            >
              {graduatedSelec.map((e) => (
                <MenuItem value={e} key={e}>{e}</MenuItem>
              ))}
            </Select>
            <TextField
              sx={{ marginBottom: 3 }}
              name="detail"
              type="text"
              label="รายละเอียดเพิ่มเติม (Detail)"
              fullWidth
            />
          </FormControl>

          <FormControlLabel
            control={<Checkbox defaultChecked name="subcribe" />}
            label=" คุณต้องการติดตามข่าวสารหรือไม่ ?"
          />

          <Box
            sx={{ display: "flex", justifyContent: "flex-end", width: "100%" }}
          >
            {!confirm ? (
              <Button type="submit" variant="outlined" sx={{ width: "15%" }}>
                บันทึก
              </Button>
            ) : (
              <Button
                type="submit"
                variant="contained"
                color="primary"
                sx={{ width: "30%" }}
              >
                กดอีกครั้งเพื่อบันทึก
              </Button>
            )}
          </Box>
        </form>
      </Box>
    </>
  );
};
export default Forminformation;
