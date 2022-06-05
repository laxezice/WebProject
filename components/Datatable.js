import * as React from "react";
import {
  DataGrid,
  gridPageCountSelector,
  gridPageSelector,
  useGridApiContext,
  useGridSelector,
} from "@mui/x-data-grid";
import Pagination from '@mui/material/Pagination';

function CustomPagination() {
  const apiRef = useGridApiContext();
  const page = useGridSelector(apiRef, gridPageSelector);
  const pageCount = useGridSelector(apiRef, gridPageCountSelector);

  return (
    <Pagination
      color="primary"
      count={pageCount}
      page={page + 1}
      onChange={(event, value) => apiRef.current.setPage(value - 1)}
    />
  );
}

export default function DataTable(props) {
  const { columns, rows, className, setSelected } = props;

  return (
    <div style={{ height: "65%", width: "100%", bgcolor: "primary" }}>
      <DataGrid
        keepMounted
        className={className}
        headerHeight={70}
        rows={rows}
        columns={columns}
        disableSelectionOnClick
        checkboxSelection
        autoHeight
        pagination
        pageSize={8}
        rowsPerPageOptions={[8]}
        components={{
          Pagination: CustomPagination,
        }}
        onSelectionModelChange={(ids) => {
          setSelected([...ids]);
        }}
      />
    </div>
  );
}
