import React, { Fragment } from "react";
import AdminLayout from "../../../layouts/Admin/AdminLayout";
import ProgramForm from "../../../components/Admin/Program/ProgramForm";

export default function AddProgram() {
  return (
    <Fragment>
      <ProgramForm />
    </Fragment>
  );
}

AddProgram.getLayout = function getLayout(page) {
  return <AdminLayout title="เพิ่มหลักสูตร">{page}</AdminLayout>;
};
