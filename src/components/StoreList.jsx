"use client";
import React, { useState } from "react";
import { DataGrid, GridToolbar, GridColDef } from "@mui/x-data-grid";
import { DeleteForever, Edit } from "@mui/icons-material";
import { IconButton, Tooltip } from "@mui/material";
import UpdateStoreModal from "../modals/UpdateStoreModal";
import { useStoreData } from "../contexts/StoreContext";
import Swal from "sweetalert2";

function StoreList() {
  const { rows, setRows } = useStoreData();
  const [selectedStoreToEdit, setSelectedStoreToEdit] = useState("");
  const [editModalOpen, setEditModalOpen] = useState(false);

  const handleDeleteStore = (id) => {
    const updatedRows = rows.filter((row) => row.id !== id);
    setRows(updatedRows);

    Swal.fire({
      icon: "success",
      title: "Success!",
      text: "Store deleted!",
    });
  };

  const handleCloseEditModal = (editedStore) => {
    if (editedStore) {
      const updatedRows = rows.map((row) => {
        if (row.id === editedStore.id) {
          return editedStore;
        } else {
          return row;
        }
      });
      setRows(updatedRows);
    }
    setEditModalOpen(false);
    setSelectedStoreToEdit("");
  };

  const columns = [
    { field: "storeName", headerName: "Store Name" },
    { field: "country", headerName: "Country" },
    {
      field: "state",
      headerName: "State",
    },
    {
      field: "address",
      headerName: "Address",
    },
    {
      field: "phone",
      headerName: "Phone",
    },
    {
      field: "discountRateMax",
      headerName: "Maximum Discount Rate",
      type: "number",
    },
    {
      field: "bonusRateMax",
      headerName: "Maximum Bonus Rate",
      type: "number",
    },
    {
      field: "description",
      headerName: "Description",
    },
    {
      field: "actions",
      headerName: "Actions",
      renderCell: ({ row }) => {
        return (
          <div>
            <Tooltip title="Delete Store">
              <IconButton
                onClick={() => {
                  handleDeleteStore(row.id);
                }}
              >
                <DeleteForever sx={{ color: "red" }} />
              </IconButton>
            </Tooltip>
            <Tooltip title="Edit Store">
              <IconButton
                onClick={() => {
                  setSelectedStoreToEdit(row);
                  setEditModalOpen(true);
                }}
              >
                <Edit sx={{ color: "green" }} />
              </IconButton>
            </Tooltip>
            <UpdateStoreModal
              open={editModalOpen}
              handleClose={handleCloseEditModal}
              store={selectedStoreToEdit}
            />
          </div>
        );
      },
    },
  ];

  const CustomNoRowsOverlay = () => {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100%",
          width: "100%",
        }}
      >
        <div>
          <p>No Stores Found</p>
        </div>
      </div>
    );
  };

  // create data table for storeForm's values
  return (
    <div className="max-w-full overflow-x-auto mt-24 table">
      <DataGrid
        autoHeight={true}
        getRowHeight={() => "auto"}
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
        checkboxSelection={true}
        density="comfortable"
        ignoreDiacritics={true}
        slots={{
          noRowsOverlay: CustomNoRowsOverlay,
          toolbar: GridToolbar,
        }}
      />
    </div>
  );
}

export default StoreList;
