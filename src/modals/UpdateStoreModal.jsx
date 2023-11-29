"use client";
import React from "react";
import { Modal } from "react-responsive-modal";
import StoreForm from "../components/StoreForm";
import "react-responsive-modal/styles.css";

const UpdateStoreModal = ({ open, handleClose, store, mode }) => {
  return (
    <Modal open={open} onClose={handleClose} center>
      <StoreForm handleClose={handleClose} store={store} mode={mode} />
    </Modal>
  );
};

export default UpdateStoreModal;
