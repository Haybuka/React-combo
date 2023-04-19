import React from "react";
import { Formik, Field, Form, ErrorMessage, FieldArray } from "formik";
import * as Yup from "yup";
const FieldArrays = () => {
  const initialValues = { username: [""] };
  const onSubmit = (values) => console.log(values);
  const validationSchema = Yup.object({
    username: Yup.string().required("Required field"),
  });

  return (
    <div>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
        validateOnChange={false}
        validateOnBlur={false}
      >
        <Form>
          <div className="form-control">
            <label htmlFor="name">Username</label>
            <FieldArray name="username">
              {(fieldArrayProps) => {
                // console.log(fieldArrayProps);
                const { push, remove, form } = fieldArrayProps;
                const { values } = form;
                const { username } = values;
                console.log(username);
                return (
                  <div>
                    {username.map((name, index) => (
                      <section key={index}>
                        <div>
                          <Field
                            name={`username[${index}]`}
                            id="username"
                            type="text"
                          />
                          {/* <ErrorMessage
                            name={`username[${index}]`}
                            className="error"
                          /> */}
                        </div>
                        <p className="button-group">
                          {index > 0 && (
                            <button onClick={() => remove(index)}>-</button>
                          )}
                          <button onClick={() => push(index)}>+</button>
                        </p>
                      </section>
                    ))}
                  </div>
                );
              }}
            </FieldArray>
          </div>

          <button type="submit">Submit</button>
        </Form>
      </Formik>
    </div>
  );
};

export default FieldArrays;
