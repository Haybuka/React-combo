import React from "react";
import { useFormik } from "formik";
import * as Yup from 'yup'
const YoutubeForm = () => {
  const initialValues = { name: "", email: "", channel: "" };

  const onSubmit = (values) => {
    console.log(values);
  };

  //validate wil later be replaced by validationSchema from yup
  const validate = (values) => {
    //must match values.name,values.email,values.channel
    // error object must return errors.name,errors.email,errors.channel
    //values should be a string
    let errors = {};

    if (!values.name) {
      errors.name = "Required";
    }

    if (!values.email) {
      errors.email = "Required";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
    ) {
      errors.email = "Invalid email format";
    }

    if (!values.channel) {
      errors.channel = "Required";
    }
    return errors;
  };

  const validationSchema = Yup.object({
    name : Yup.string().required('Required'),
    email : Yup.string().email('Invalid emails format').required('Required'),
    channel : Yup.string().required('Required'),
  })
  const formik = useFormik({
    initialValues,
    onSubmit,
    // validate,
    validationSchema
  });

  const { handleChange, handleBlur, values, handleSubmit,errors,touched,getFieldProps } = formik;
   
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="form-control">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
    {...getFieldProps('name')}
          />
          {touched.name && errors.name && (<p className="error">{errors.name}</p>)}
        </div>

        <div className="form-control">
          <label htmlFor="email">E-mail</label>
          <input
            type="email"
            id="email"
            name="email"
            {...getFieldProps('email')}

          />
          {touched.email && errors.email && (<p className="error">{errors.email}</p>)}

        </div>

        <div className="form-control">
          <label htmlFor="channel">Channel</label>
          <input
            type="text"
            id="channel"
            name="channel"
            {...getFieldProps('channel')}


          />
          {touched.channel && errors.channel && (<p className="error">{errors.channel}</p>)}

        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default YoutubeForm;
