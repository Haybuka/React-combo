import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import TextError from "./TextError";
const YoutubeForm = () => {
  const initialValues = {
    name: "",
    email: "",
    channel: "",
    comments: "",
    address: "",
    social: {
      facebook: "",
      twitter: "",
    },
    phoneNumbers: ["", ""],
  };

  const onSubmit = (values) => {
    console.log(values);
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Required"),
    email: Yup.string().email("Invalid emails format").required("Required"),
    channel: Yup.string().required("Required"),
    comments: Yup.string().required("Required"),
    address: Yup.string().required("Required"),
  });

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
      validateOnMount={true}
    >
      {(formik) => {
        console.log('in formik props', formik)

        return (
          <Form>
            <div className="form-control">
              <label htmlFor="name">Name</label>
              <Field type="text" id="name" name="name" />
              <ErrorMessage
                name="name"
                className="error"
                component={TextError}
              />
            </div>

            <div className="form-control">
              <label htmlFor="email">E-mail</label>
              <Field type="email" id="email" name="email" />
              <ErrorMessage name="email">
                {(errorMsg) => <p className="error">{errorMsg}</p>}
              </ErrorMessage>
            </div>

            <div className="form-control">
              <label htmlFor="channel">Channel</label>
              <Field type="text" id="channel" name="channel" />
              <ErrorMessage name="channel" />
            </div>

            <div className="form-control">
              <label htmlFor="address">Address</label>
              <Field type="text">
                {(props) => {
                  //   console.log(props);
                  const { field, form, meta } = props;
                  //   console.log(meta);
                  return (
                    <div>
                      <input type="text" id="address" {...field} />
                      {/* {meta.touched && meta.error ? <p>{meta.error.address}</p> : null} */}
                    </div>
                  );
                }}
              </Field>
              <ErrorMessage name="address" />
            </div>
            <div className="form-control">
              <label htmlFor="facebook">Facebook</label>
              <Field type="text" id="facebook" name="social.facebook" />
              <ErrorMessage name="facebook" />
            </div>
            <div className="form-control">
              <label htmlFor="twitter">Twitter</label>
              <Field type="text" id="twitter" name="social.twitter" />
              <ErrorMessage name="twitter" />
            </div>
            <div className="form-control">
              <label htmlFor="primaryPh">Primary Phone Number</label>
              <Field type="text" id="primaryPh" name="phoneNumbers[0]" />
            </div>
            <div className="form-control">
              <label htmlFor="secondaryPh">Secondary Phone Number</label>
              <Field type="text" id="secondaryPh" name="phoneNumbers[1]" />
            </div>
            <div className="form-control">
              <label htmlFor="comments">Comments</label>
              <Field as="textarea" type="text" id="comments" name="comments" />
              <ErrorMessage name="comments" />
            </div>
            <button type="submit" disabled={!formik.isValid}>Submit</button>
          </Form>
        );
      }}
    </Formik>
  );
};

export default YoutubeForm;
