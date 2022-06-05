import React, { Fragment, useState } from "react";
import MediaPopup from "./MediaPopup";
import {
  DataGrid,
  gridPageCountSelector,
  gridPageSelector,
  useGridApiContext,
  useGridSelector,
} from "@mui/x-data-grid";
import Pagination from "@mui/material/Pagination";
import { styled } from "@mui/system";

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

const StyleTable = styled(DataGrid)({
  "& .MuiDataGrid-virtualScrollerContent": {
    paddingBottom: 8 * 8, // to compensate space between rows
    boxSizing: "content-box",
  },
  "& .MuiDataGrid-columnHeaders": {
    border: "none",
    backgroundColor: "#cbced4",
    fontColor : '#FFF'
  },
  "& .MuiDataGrid-row": {
    border: "none",
    borderRadius: 5,
    marginTop: 4,
    marginBottom: 4,
  },
  "& .MuiDataGrid-columnHeaderTitle" : {
    color : '#000'
  }
});

export default function MediaTable(props) {
  const [isMediaShow, setIsMediaShow] = useState(false);
  const [media, setMedia] = useState({});
  const { columns, rows, className, setSelected } = props;

  return (
    <Fragment>
      <div style={{ height: "65%", width: "100%", bgcolor: "primary" }}>
        <StyleTable
          keepMounted
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
          onRowDoubleClick={(data) => {
            setMedia(data.row);
            setIsMediaShow(true);
          }}
        />
      </div>

      {isMediaShow && (
        <MediaPopup
          isShow={isMediaShow}
          setIsShow={setIsMediaShow}
          media={media}
        />
      )}
    </Fragment>
  );
}
