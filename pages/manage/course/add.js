import React, { Fragment } from "react";
import AdminLayout from "../../../layouts/Admin/AdminLayout";
import CourseForm from "../../../components/Admin/Course/CourseForm";

export default function AddCourse() {
  return (
    <Fragment>
      <CourseForm />
    </Fragment>
  );
}

AddCourse.getLayout = function getLayout(page) {
  return <AdminLayout title="เพิ่มการอบรม">{page}</AdminLayout>;
};
