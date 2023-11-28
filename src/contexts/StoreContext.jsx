// store context for keeping StoreForm values and share between components
"use client";
import React, { createContext, useContext, useState } from "react";

const StoreDataContext = createContext();

export const useStoreData = () => {
  return useContext(StoreDataContext);
};

export const StoreDataProvider = ({ children }) => {
  const [rows, setRows] = useState([]);
  console.log("context rows", rows);
  return (
    <StoreDataContext.Provider
      value={{
        rows,
        setRows,
      }}
    >
      {children}
    </StoreDataContext.Provider>
  );
};
