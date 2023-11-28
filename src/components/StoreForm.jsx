"use client";
import React, { forwardRef } from "react";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { useStoreData } from "../contexts/StoreContext";

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

  // form layout
  const fieldLayoutClassName = "grid grid-cols-1 md:grid-cols-2 mb-6";
  const fieldClassName = "w-full p-2 border rounded";
  const labelClassName = "text-sm font-medium leading-6 text-gray-900";
  const errorClassName = "text-red-500 text-xs mt-1";

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

  return (
    <div className="container mx-auto bg-white p-8 mt-10 rounded shadow-md md:max-w-2xl">
      <Formik
        initialValues={initialValues}
        validationSchema={storeSchema}
        onSubmit={(values, { resetForm }) => {
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
        {({
          errors,
          touched,
          isSubmitting,
          handleChange,
          values,
          setFieldValue,
        }) => (
          <Form>
            {/* Store Name */}
            <div className={fieldLayoutClassName}>
              <label htmlFor="storeName" className={labelClassName}>
                Store Name
              </label>
              <Field
                type="text"
                id="storeName"
                name="storeName"
                className={fieldClassName}
              />
              {errors.storeName && touched.storeName && (
                <div className={errorClassName}>{errors.storeName}</div>
              )}
            </div>

            {/* Country */}
            <div className={fieldLayoutClassName}>
              <label htmlFor="country" className={labelClassName}>
                Country
              </label>
              <Field
                type="text"
                id="country"
                name="country"
                className={fieldClassName}
              ></Field>
              {errors.country && touched.country && (
                <div className={errorClassName}>{errors.country}</div>
              )}
            </div>

            {/* State */}
            <div className={fieldLayoutClassName}>
              <label htmlFor="state" className={labelClassName}>
                State
              </label>
              <Field
                type="text"
                id="state"
                name="state"
                className={fieldClassName}
              />
              {errors.state && touched.state && (
                <div className={errorClassName}>{errors.state}</div>
              )}
            </div>

            {/* Address */}
            <div className={fieldLayoutClassName}>
              <label htmlFor="address" className={labelClassName}>
                Address
              </label>
              <Field
                type="text"
                id="address"
                name="address"
                className={fieldClassName}
              />
              {errors.address && touched.address && (
                <div className={errorClassName}>{errors.address}</div>
              )}
            </div>

            {/* Phone */}
            <div className={fieldLayoutClassName}>
              <label htmlFor="phone" className={labelClassName}>
                Phone
              </label>
              <Field
                type="text"
                id="phone"
                name="phone"
                className={fieldClassName}
              />
              {errors.phone && touched.phone && (
                <div className={errorClassName}>{errors.phone}</div>
              )}
            </div>

            {/* Maximum Discount Rate */}
            <div className={fieldLayoutClassName}>
              <label htmlFor="discountRateMax" className={labelClassName}>
                Maximum Discount Rate
              </label>
              <Field
                type="number"
                id="discountRateMax"
                name="discountRateMax"
                className={fieldClassName}
              />
              {errors.discountRateMax && touched.discountRateMax && (
                <div className={errorClassName}>{errors.discountRateMax}</div>
              )}
            </div>

            {/* Maximum Bonus Rate */}
            <div className={fieldLayoutClassName}>
              <label htmlFor="bonusRateMax" className={labelClassName}>
                Maximum Bonus Rate
              </label>
              <Field
                type="number"
                id="bonusRateMax"
                name="bonusRateMax"
                className={fieldClassName}
              />
              {errors.bonusRateMax && touched.bonusRateMax && (
                <div className={errorClassName}>{errors.bonusRateMax}</div>
              )}
            </div>

            {/* Description */}
            <div className={fieldLayoutClassName}>
              <label htmlFor="description" className={labelClassName}>
                Description
              </label>
              <Field
                type="text"
                id="description"
                name="description"
                rows={3}
                className={fieldClassName}
              />
              {errors.description && touched.description && (
                <div className={errorClassName}>{errors.description}</div>
              )}
            </div>

            <div className="mt-6 flex items-center justify-end gap-x-6">
              {store && (
                <button
                  type="button"
                  className="text-sm font-semibold leading-6 text-gray-900"
                  onClick={handleClose}
                >
                  Cancel
                </button>
              )}
              <button
                type="submit"
                className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
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
