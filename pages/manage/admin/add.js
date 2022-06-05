import React, { Fragment } from "react";
import AdminForm from "../../../components/Admin/Auth/AdminForm";
import AdminLayout from "../../../layouts/Admin/AdminLayout";

export default function AddAdmin() {
  return (
    <Fragment>
      <AdminForm />
    </Fragment>
  );
}

AddAdmin.getLayout = function getLayout(page) {
  return <AdminLayout title="เพิ่มผู้ดูแล">{page}</AdminLayout>;
};
