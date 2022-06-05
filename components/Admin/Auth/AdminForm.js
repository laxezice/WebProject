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
import axios from "axios";
import { useRouter } from "next/router";
import Moment from "moment";
import { useAuth } from "../../../contexts/Section";

export default function AdminForm(props) {
  const { userData } = props;
  const { showSnackbar } = useAuth();
  const router = useRouter();
  const [user, setUser] = useState(userData || {});

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
  const [errBirthday, setErrBirthday] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    let user = {
      birthday: new Date(event.target.birthday.value),
      title: titleData[event.target.title.value],
      name: event.target.name.value,
      surname: event.target.surname.value,
      sex: event.target.gender.value,
    };

    try {
      let response;
      if (userData) {
        response = await axios.put(`/auth/admin/edit/${userData.id}`, {
          ...user,
        });
        showSnackbar("edit is success.", "success");
      } else {
        response = await axios.post("/auth/admin/add", { ...user });
        showSnackbar("add is success.", "success");
      }

      router.push("/manage/admin");
    } catch (err) {
      console.log(err);
      showSnackbar(err.message, "error");
      setConfirm(true);
    }
    return true;
  };

  return (
    <>
      {/* ---------name surname thai------------- */}
      <Box containe p={2} mt={0}>
        <form onSubmit={handleSubmit} autoComplete="off">
          {!userData && (
            <>
              <Box mb={2}>
                <Typography variant="h6" mb={2}>
                  ข้อมูลการเข้าสู่ระบบ (Auth Information)
                </Typography>
                <Divider></Divider>
              </Box>
              <FormControl fullWidth required>
                <TextField
                  name="email"
                  label="อีเมล (Email)"
                  sx={{ marginBottom: 3 }}
                  defaultValue={user.email || ""}
                  required
                />
                <TextField
                  sx={{ marginBottom: 3 }}
                  name="username"
                  label="ชื่อบัญชี (Username)"
                  defaultValue={user.username || ""}
                  required
                />

                <TextField
                  name="password"
                  label="รหัสผ่าน (Password)"
                  sx={{ marginBottom: 3 }}
                  required
                />
              </FormControl>
            </>
          )}

          <Box mb={2}>
            <Typography variant="h6" mb={2}>
              ข้อมูลส่วนตัว (Personal Information)
            </Typography>
            <Divider></Divider>
          </Box>

          <FormControl fullWidth required>
            <InputLabel>คำนำหน้าชื่อ (Title)</InputLabel>
            <Select
              sx={{ marginBottom: 3 }}
              name="title"
              label="คำนำหน้าชื่อ"
              defaultValue={titleData.indexOf(user.title)}
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
              sx={{ marginBottom: 3 }}
              name="name"
              label="ชื่อ (Name)"
              defaultValue={user.name || ""}
              required
            />
            <TextField
              name="surname"
              label="นามสกุล (Surname)"
              sx={{ marginBottom: 3 }}
              defaultValue={user.surname || ""}
              required
            />
            <FormLabel id="gender">เพศ (Gender)</FormLabel>
            <RadioGroup
              sx={{ marginBottom: 3 }}
              row
              name="gender"
              defaultValue={user.sex || "female"}
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
              defaultValue={
                user.birthday
                  ? Moment(user.birthday).format("YYYY-MM-DD")
                  : Moment(new Date()).format("YYYY-MM-DD")
              }
              onChange={(event) => {
                if (event.target.value) {
                  var today = new Date();
                  const fullYead = Moment(today).format("YYYY");
                  const findRealBd =
                    Number(fullYead) -
                    Number(Moment(event.target.value).format("YYYY"));
                  if (findRealBd > 5 && findRealBd > 0) {
                    setUser({
                      ...user,
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
}
