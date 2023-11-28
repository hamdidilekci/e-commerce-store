"use client";
import React from "react";
import Modal from "@mui/material/Modal";
import StoreForm from "../components/StoreForm";

const UpdateStoreModal = ({ open, handleClose, store }) => {
  return (
    <Modal open={open} onClose={handleClose}>
      <StoreForm handleClose={handleClose} store={store} />
    </Modal>
  );
};

export default UpdateStoreModal;
