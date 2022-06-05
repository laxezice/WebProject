import React, { Fragment, useEffect, useState } from "react";
import { Box } from "@mui/material";
import { CircularProgress } from "@mui/material";
import AdminLayout from "../../../../layouts/Admin/AdminLayout";
import { useRouter } from "next/router";
import axios from "axios";
import CourseForm from "../../../../components/Admin/Course/CourseForm";

export default function EditCourse() {
  const router = useRouter();
  const { courseId } = router.query;
  const [preload, setPreload] = useState(true);
  const [course, setCourse] = useState({});

  useEffect(async () => {
    if (router.isReady) {
      let result = await axios.get(`/course/${courseId}`);
      setCourse(result.data.course);
      setPreload(false);
    }
  }, [router.isReady]);

  return (
    <Fragment>
      {preload ? (
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            marginTop: 10,
            marginBottom: 10,
          }}
        >
          <CircularProgress />
        </Box>
      ) : (
        <Fragment>
          <CourseForm course={course} />
        </Fragment>
      )}
    </Fragment>
  );
}

EditCourse.getLayout = function getLayout(page) {
  return <AdminLayout title="แก้ไขการอบรม">{page}</AdminLayout>;
};
