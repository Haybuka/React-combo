import React from "react";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import FormikControl from "./FormikControl";

const FormikContainer = () => {
  const dropdownOptions = [
    { key: "Select an option", value: "" },
    { key: "Mercedes", value: "benz" },
    { key: "Camry", value: "toyota" },
    { key: "Golf", value: "volks wagen" },
  ];

  const radioOptions = [
    { key: "Option 1", value: "rOption1" },
    { key: "Option 2", value: "rOption2" },
    { key: "Option 3", value: "rOption3" },
  ];

  const checkboxOptions = [
    {key : 'Option 1', value : 'cOption1'},
    {key : 'Option 2', value : 'cOption2'},
    {key : 'Option 3', value : 'cOption3'}
  ]


  const initialValues = {
    email: "",
    description: "",
    selectOption: "",
    radioOption: "",
    checkboxOption: [],
    birthDate : null
  };
  const validationSchema = Yup.object({
    email: Yup.string().required("Required").email("Invalid input field"),
    description: Yup.string().required("Required"),
    selectOption: Yup.string().required("Required"),
    radioOption: Yup.string().required("Required"),
    checkboxOption: Yup.array().required("Required"),
    birthDate : Yup.date().required('Required').nullable()
  });
  const onSubmit = (values) => console.log(values);

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {(formik) => {
        return (
          <Form>
            <FormikControl
              control="input"
              type="email"
              label="Email"
              name="email"
            />
            <FormikControl
              control="textarea"
              label="Descriptions"
              name="description"
            />
            <FormikControl
              control="select"
              type="select"
              label="Select Car Type"
              name="selectOption"
              options={dropdownOptions}
            />
            <FormikControl
              control="radio"
              label="Radio Topic"
              name="radioOption"
              options={radioOptions}
            />
             <FormikControl
              control="checkbox"
              label="Checkbox Topic"
              name="checkboxOption"
              options={checkboxOptions}
            />
                <FormikControl
              control="date"
              label="Pick a date"
              name="birthDate"
            />
            <button type="submit">Submit</button>
          </Form>
        );
      }}
    </Formik>
  );
};

export default FormikContainer;
