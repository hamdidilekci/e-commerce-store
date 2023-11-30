"use client";
import React, { forwardRef } from "react";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { useStoreData } from "../contexts/StoreContext";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { IconButton } from "@mui/material";

// yup validation schema
const storeSchema = Yup.object().shape({
  storeName: Yup.string().required("Please enter a store name"),
  country: Yup.string().required("Please enter a country"),
  state: Yup.string(),
  address: Yup.string(),
  phone: Yup.string()
    .required("Please enter a phone number")
    .min(10, "Please enter at least 10 characters"),
  discountRateMax: Yup.number().integer().positive().default(0),
  bonusRateMax: Yup.number().integer().positive().default(0),
  description: Yup.string().max(
    500,
    "Description must be less than 500 characters"
  ),
});

const StoreForm = forwardRef((props, ref) => {
  const { handleClose, store } = props;
  const { rows, setRows } = useStoreData();

  // if edit modal open, set initial values as store values
  const initialValues = {
    storeName: store?.storeName || "",
    country: store?.country || "",
    state: store?.state || "",
    address: store?.address || "",
    phone: store?.phone || "",
    discountRateMax: store?.discountRateMax || 0,
    bonusRateMax: store?.bonusRateMax || 0,
    description: store?.description || "",
  };

  // form css
  const layoutClassName = "grid grid-cols-1 md:grid-cols-4 md:m-8 bg-beyaz";
  const labelClassName =
    "text-opacity-80 font-medium leading-6 text-gray-900 md:col-span-1";
  const fieldClassName =
    "w-full p-2 rounded border-light focus:ring-2 md:col-span-3";
  const errorClassName = "text-red-500 text-xs mt-1";

  return (
    <div className="max-w-full overflow-x-auto border rounded bg-beyaz">
      <div className="m-6 font-medium text-xl text-opacity-80">
        <IconButton>
          <KeyboardArrowDownIcon />
        </IconButton>
        <span>Store Managament</span>
        <hr />
      </div>
      <Formik
        initialValues={initialValues}
        validationSchema={storeSchema}
        onSubmit={(values, { resetForm }) => {
          console.log("--- form values ---", values);
          // if editing an existing store
          if (props.store) {
            const updatedRows = rows.map((row) =>
              row.id === props.store.id ? { ...values, id: row.id } : row
            );
            setRows(updatedRows);
          } else {
            // If adding a new store
            const newRow = { ...values, id: Date.now() };
            setRows([...rows, newRow]);
          }

          // Reset form
          resetForm();

          // Close modal
          handleClose();
        }}
      >
        {({ errors, touched, isSubmitting }) => (
          <Form>
            {/* Store Name */}
            <div className="grid grid-cols-1 md:grid-cols-4 md:m-8">
              <label htmlFor="storeName" className={labelClassName}>
                <span>Store Name</span>
              </label>
              <Field
                type="text"
                id="storeName"
                name="storeName"
                list="storeNameOptions"
                className={fieldClassName}
                autoComplete="off"
              />
              <datalist id="storeNameOptions">
                {rows?.map((row) => {
                  return (
                    <option value={row.storeName} key={row.id}>
                      {row.storeName}
                    </option>
                  );
                })}
              </datalist>
              {errors.storeName && touched.storeName && (
                <div className={errorClassName}>{errors.storeName}</div>
              )}
            </div>

            {/* Country */}
            <div className={layoutClassName}>
              <label htmlFor="country" className={labelClassName}>
                Country
              </label>
              <Field
                type="text"
                id="country"
                name="country"
                list="countryOptions"
                className={fieldClassName}
                autoComplete="off"
              />
              <datalist id="countryOptions">
                {rows?.map((row) => {
                  return (
                    <option value={row.country} key={row.id}>
                      {row.country}
                    </option>
                  );
                })}
              </datalist>
              {errors.country && touched.country && (
                <div className={errorClassName}>{errors.country}</div>
              )}
            </div>

            {/* State */}
            <div className={layoutClassName}>
              <label htmlFor="state" className={labelClassName}>
                State
              </label>
              <Field
                type="text"
                id="state"
                name="state"
                list="stateOptions"
                className={fieldClassName}
                autoComplete="off"
              />
              <datalist id="stateOptions">
                {rows?.map((row) => {
                  return (
                    <option value={row.state} key={row.id}>
                      {row.state}
                    </option>
                  );
                })}
              </datalist>
              {errors.state && touched.state && (
                <div className={errorClassName}>{errors.state}</div>
              )}
            </div>

            {/* Address */}
            <div className={layoutClassName}>
              <label htmlFor="address" className={labelClassName}>
                Address
              </label>
              <Field
                type="text"
                id="address"
                name="address"
                list="addressOptions"
                className={fieldClassName}
                autoComplete="off"
              />
              <datalist id="addressOptions">
                {rows?.map((row) => {
                  return (
                    <option value={row.address} key={row.id}>
                      {row.address}
                    </option>
                  );
                })}
              </datalist>
              {errors.address && touched.address && (
                <div className={errorClassName}>{errors.address}</div>
              )}
            </div>

            {/* Phone */}
            <div className={layoutClassName}>
              <label htmlFor="phone" className={labelClassName}>
                Phone
              </label>
              <Field
                type="text"
                id="phone"
                name="phone"
                list="phoneOptions"
                className={fieldClassName}
                autoComplete="off"
              />
              <datalist id="phoneOptions">
                {rows?.map((row) => {
                  return (
                    <option value={row.phone} key={row.id}>
                      {row.phone}
                    </option>
                  );
                })}
              </datalist>
              {errors.phone && touched.phone && (
                <div className={errorClassName}>{errors.phone}</div>
              )}
            </div>

            {/* Maximum Discount Rate */}
            <div className={layoutClassName}>
              <label htmlFor="discountRateMax" className={labelClassName}>
                Maximum Discount Rate
              </label>
              <Field
                type="number"
                id="discountRateMax"
                name="discountRateMax"
                list="discountRateMaxOptions"
                className={fieldClassName}
                autoComplete="off"
              />
              <datalist id="discountRateMaxOptions">
                {rows?.map((row) => {
                  return (
                    <option value={row.discountRateMax} key={row.id}>
                      {row.discountRateMax}
                    </option>
                  );
                })}
              </datalist>
              {errors.discountRateMax && touched.discountRateMax && (
                <div className={errorClassName}>{errors.discountRateMax}</div>
              )}
            </div>

            {/* Maximum Bonus Rate */}
            <div className={layoutClassName}>
              <label htmlFor="bonusRateMax" className={labelClassName}>
                Maximum Bonus Rate
              </label>
              <Field
                type="number"
                id="bonusRateMax"
                name="bonusRateMax"
                list="bonusRateMaxOptions"
                className={fieldClassName}
                autoComplete="off"
              />
              <datalist id="bonusRateMaxOptions">
                {rows?.map((row) => {
                  return (
                    <option value={row.bonusRateMax} key={row.id}>
                      {row.bonusRateMax}
                    </option>
                  );
                })}
              </datalist>
              {errors.bonusRateMax && touched.bonusRateMax && (
                <div className={errorClassName}>{errors.bonusRateMax}</div>
              )}
            </div>

            {/* Description */}
            <div className={layoutClassName}>
              <label htmlFor="description" className={labelClassName}>
                Description
              </label>
              <Field
                type="text"
                id="description"
                name="description"
                list="descriptionOptions"
                rows={3}
                className={fieldClassName}
                autoComplete="off"
              />
              <datalist id="descriptionOptions">
                {rows?.map((row) => {
                  return (
                    <option value={row.description} key={row.id}>
                      {row.description}
                    </option>
                  );
                })}
              </datalist>
              {errors.description && touched.description && (
                <div className={errorClassName}>{errors.description}</div>
              )}
            </div>
            {/* Buttons */}
            <div className="pt-4 flex items-center justify-end gap-x-6 bg-acikGri">
              {store && (
                <button
                  type="button"
                  className="rounded-md bg-gri px-12 py-2 text-sm font-semibold text-beyaz shadow-sm  hover:text-yesil focus-visible:outline"
                  onClick={handleClose}
                >
                  Cancel
                </button>
              )}
              <button
                type="submit"
                className="rounded-md bg-mavi px-12 py-2 text-sm font-semibold text-beyaz shadow-sm hover:text-yesil focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-civit"
                disabled={isSubmitting}
              >
                {store ? "Update" : "Save"}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
});

// eslint react/display-name
StoreForm.displayName = "StoreForm";

export default StoreForm;
