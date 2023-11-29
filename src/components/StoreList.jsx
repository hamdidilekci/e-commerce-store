"use client";
import React, { useState } from "react";
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarFilterButton,
  useGridApiRef,
} from "@mui/x-data-grid";
// icons and MUI components
import { DeleteForever, Edit } from "@mui/icons-material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import AutoAwesomeTwoToneIcon from "@mui/icons-material/AutoAwesomeTwoTone";
import AddIcon from "@mui/icons-material/Add";
import { IconButton, Tooltip } from "@mui/material";

import UpdateStoreModal from "../modals/UpdateStoreModal";
import { useStoreData } from "../contexts/StoreContext";
import Swal from "sweetalert2";

function StoreList() {
  const { rows, setRows } = useStoreData();
  const [selectedStoreToEdit, setSelectedStoreToEdit] = useState("");
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [createStoreModalOpen, setCreateStoreModalOpen] = useState(false);

  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 3,
  });

  const firstElementIndex = paginationModel.page * paginationModel.pageSize;
  const lastElementIndex =
    Math.min(
      (paginationModel.page + 1) * paginationModel.pageSize,
      rows.length
    ) - 1;

  const apiRef = useGridApiRef();

  const handleNextPage = () => {
    apiRef.current.setPage(paginationModel.page + 1);
  };

  const handlePrevPage = () => {
    apiRef.current.setPage(Math.max(paginationModel.page - 1, 0));
  };

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

  const handleCreateStore = () => {
    setCreateStoreModalOpen(true);
    console.log("createStoreModalOpen");
  };

  const handleCloseCreateStoreModal = () => {
    setCreateStoreModalOpen(false);
  };

  const columns = [
    {
      field: "storeName",
      headerName: "Store Name",
      minWidth: 100,
      flex: 0.3,
    },
    { field: "country", headerName: "Country", flex: 0.3, minWidth: 100 },
    {
      field: "state",
      headerName: "State",
      flex: 0.3,
      minWidth: 100,
    },
    {
      field: "address",
      headerName: "Address",
      flex: 0.3,
      minWidth: 100,
    },
    {
      field: "phone",
      headerName: "Phone",
      flex: 0.3,
      minWidth: 100,
    },
    {
      field: "discountRateMax",
      headerName: "Max Discount Rate",
      flex: 0.2,
      minWidth: 80,
    },
    {
      field: "bonusRateMax",
      headerName: "Max Bonus Rate",
      flex: 0.2,
      minWidth: 80,
    },
    {
      field: "description",
      headerName: "Description",
      flex: 0.5,
      minWidth: 200,
      headerAlign: "center",
    },
    {
      field: "actions",
      headerName: "Actions",
      flex: 0.3,
      minWidth: 100,
      renderCell: ({ row }) => {
        return (
          <div>
            <Tooltip title="Delete Store">
              <IconButton
                onClick={() => {
                  handleDeleteStore(row.id);
                }}
              >
                <DeleteForever className="text-kirmizi" />
              </IconButton>
            </Tooltip>
            <Tooltip title="Edit Store">
              <IconButton
                onClick={() => {
                  setSelectedStoreToEdit(row);
                  setEditModalOpen(true);
                }}
              >
                <Edit className="text-yesil" />
              </IconButton>
            </Tooltip>
            <UpdateStoreModal
              open={editModalOpen}
              handleClose={handleCloseEditModal}
              store={selectedStoreToEdit}
              mode="modal"
            />
          </div>
        );
      },
    },
  ];

  const CustomNoRowsOverlay = () => {
    return (
      <div className="flex items-center justify-center h-full w-full">
        <p>No Stores Found</p>
      </div>
    );
  };

  function CustomToolbar() {
    return (
      <GridToolbarContainer>
        <GridToolbarFilterButton />
      </GridToolbarContainer>
    );
  }

  // create data table for storeForm's values
  return (
    <>
      {/* header of table */}
      <div className="mt-24 mb-6 flex items-center justify-between">
        <div>
          <span className="font-medium text-xl text-opacity-80">Stores</span>
          <IconButton>
            <AutoAwesomeTwoToneIcon className="bg-sari" />
          </IconButton>
        </div>
        <div>
          <div
            type="button"
            onClick={handleCreateStore}
            className="cursor-pointer rounded-md bg-mavi px-2 text-sm font-semibold text-beyaz shadow-sm hover:text-yesil focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-civit"
          >
            <IconButton>
              <AddIcon className="text-acikGri" />
            </IconButton>
            <span>Add Store</span>
          </div>
        </div>
        <UpdateStoreModal
          open={createStoreModalOpen}
          handleClose={handleCloseCreateStoreModal}
          store={""}
          mode="modal"
        />
      </div>
      <div className="max-w-full overflow-x-auto bg-beyaz">
        <DataGrid
          autoHeight={true}
          getRowHeight={() => "auto"}
          rows={rows}
          columns={columns}
          checkboxSelection={true}
          density="comfortable"
          ignoreDiacritics={true}
          disableDensitySelector={true}
          slots={{
            noRowsOverlay: CustomNoRowsOverlay,
            toolbar: CustomToolbar,
          }}
          pagination
          paginationModel={paginationModel}
          pageSizeOptions={[3, 6, 10, 15, 20, 30]}
          onPaginationModelChange={setPaginationModel}
          apiRef={apiRef}
          hideFooter={true}
        />

        <div className="flex items-center justify-between bg-acikGri pt-4">
          {rows.length !== 0 ? (
            <div className="text-sm">
              <p className="pt-1">
                Showing{" "}
                <span className="font-bold">{firstElementIndex + 1}</span> to{" "}
                <span className="font-bold">{lastElementIndex + 1}</span> of{" "}
                <span className="font-bold">{rows.length} results</span>
              </p>
            </div>
          ) : (
            <p className="text-sm">No Results</p>
          )}
          <div className="flex gap-x-6">
            {/* Add your "Previous" and "Next" buttons here */}
            <button
              type="button"
              className="rounded-md bg-beyaz px-3 py-2 text-xs font-semibold text-gri shadow-sm  hover:text-yesil focus-visible:outline"
              onClick={handlePrevPage}
            >
              <ArrowBackIcon className="text-sm" />
              Previous
            </button>
            <button
              type="submit"
              className="rounded-md bg-beyaz px-3 py-2 text-xs font-semibold text-mavi shadow-sm hover:text-yesil focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-civit"
              onClick={handleNextPage}
            >
              Next
              <ArrowForwardIcon className="text-sm" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default StoreList;
