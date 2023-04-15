## Formik Usage and Notes (Youtube Form Component)

Points about the Field component

1. by default, it renders input
2. It hooks up the field props to formik (handleblur,handleChange,value)
3. Takes in normal attributes as a normal input would
4. A different element other than input can be added as in "comments" field in Code using the "as" keyword

- The as props can take several values including other component in other to decide what element to render if it isnt input

5. Render Props Pattern : gives more fine grained control over rendering of props field, used as in address in formik sample. It is mostly used when rendering custom form fields

- Render props pattern uses a function as children to the component in opening and closing tags
- console logging props (line 54) from the child function will expose 3 objects(field,form & meta) which can be further used to hook up formik
- To hook the field with formik, we need to spread the Field props (this takes care of name,value,handleChange and handleBlur props).

6. ErrorMessage props is as its name, but it renders a text, instesd of a stylable element. In other to style this, we pass in a component (and in this render props as children) as we did in youTube forms, the name input.

### Grouping Values as Object

To group data as object, depending as the Api demands (data : {...values}), first step

1. Create the said object in initial values (as we have socials on line 12)
2. Create corresponding field inputs
3. Set name attribute to the object values you wish to access

### Grouping input Values as Array

To group data as array, depending as the Api demands (phoneNumber :['','']), first step

1. Create the said array in initial values (as we have phone Numbers on line 16)
2. Create corresponding field inputs
3. Set name attribute to the array values index you wish to access

Write custom validations as you like to handle both using renderprops

### Field Array (Field Array component under Formik)

- Rendering an array of field components
  You know how google form does its work where you click plus and a new field turns up for you to populate with a type you set, well this is formiks response to that. You can use Field array to set up dynamic field choices.

#steps

1. Import FieldArray from formik

```
import { Formik, Field, Form, ErrorMessage, FieldArray } from "formik";

```

2. Set up one initial value of a field as an array

```
const initialValues = { username: [""] };

```

3. Use render prop approach on field array in other to look through for other available methods, also pass in name of field to match.

- push adds to the field value array
- remove, removes from array
- on the form destructured, values of the field can be accessed and passed into Field component

```
<FieldArray name="username">
  {
    (fieldArrayProps) => {
       const { push, remove, form } = fieldArrayProps;
              const { values } = form;
              const { username } = values;
              return (
                <div> Field Array</div>
              )
    }
  }
</FieldArray>
```

4. Map through the value array already destructured from values, and Set up Field from formik, name of field matches an index value.

```
<FieldArray name="username">
            {(fieldArrayProps) => {
              // console.log(fieldArrayProps);
              const { push, remove, form } = fieldArrayProps;
              const { values } = form;
              const { username } = values;
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
                      </div>

                    </section>
                  ))}
                </div>
              );
            }}
          </FieldArray>
```

5. Wire up push and remove in other to increase or decrease fields. Also conditional button for remove if field index is less than one

```
<FieldArray name="username">
            {(fieldArrayProps) => {
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
```

6. Have fun with project, and utilize error message.

### Fast Field component (use with caution), Used mainly for performance optimization

It helps to

- Render error to only affected fields (onBlur), as opposed to the conventional logging at once.
- Optimize the Field component to reduce page re-renders..

```
  import {FastField} from 'Formik';
```

- Usage

```
    <div className="form-control">
        <label htmlFor="channel">Channel</label>
        <FastField type="text" id="channel" name="channel" />
        <ErrorMessage name="channel" />
      </div>
```

- Validate on Change(or on Blur) instructs formik not to run validation for change or blur events. It still retains validate on submit

  ````
   <Formik validateOnChange={false}>

   </Formik>
   ```

  ````

## Disabling submit

Disabling submit csn be done in 2 ways

1. Checking when button is clicked.
   To use this way, make sure your formik element use the render props approach

```
 <Formik>
   {formik => {
    console.log(formik)
    return (
      <Form>
         <div className="form-control">
              <label htmlFor="email">E-mail</label>
              <Field type="email" id="email" name="email" />
              <ErrorMessage name="email">
                {(errorMsg) => <p className="error">{errorMsg}</p>}
              </ErrorMessage>
          </div>
          <button type="submit" disabled={!formik.isValid}>Submit</button>

      </Form>
    )
   }}
 </Formik>

```

This approach gives us access to the formik props on a parent level, and we can make use of the isValid property on said props to conditionally control the form submission through button click.

2.  There is a prop called 'dirty', this refers to the initial state of the app when its first mounted. If no values have changed onMount (or onBlur), dirty is false. This value changes to true when a field value is altered.
    The dirty method can be used, but it has a drawback for when you use it with a preloaded value. It requires interaction for it to track.

3.  Disabling button for Api call usage(Typical use), This requires the isSubmitting boolean props to be chained in button onSubmit. You can pass it in as a value to the onSubmit Handler. You can control this usage using the SetSubmitting after api call is done. The submit takes in a second value, which we can pull the setSubmitting and isSubmitting from

```
const onSubmit = (values,onSubmitProps) => {
  console.log(onSubmitProps)
  const {setSubmitting} = onSubmitProps

  setSubmitting(false)
}


//in Form Return

<button type="submit" disabled={formik.isSubmitting}>Submit</button>


```

### Loading Saved data

Used when loading data to pre-fill form data from an api.

Methods to note while reading corresponding code in YoutubeForm component.

- enableReinitialize ( so it supports reinitialize)
- initialValues takes in the initial from statically typed, or from formValues loaded from api

```
  const savedValues = {
    name: "Paschal",
    email: "p@p.com",
    channel: "Youtubes",
    comments: "I am legend.",
    address: "",
    social: {
      facebook: "",
      twitter: "",
    },
    phoneNumbers: ["", ""],
  };

  const [formValues,setFormValues] = useState('')

<Formik
   initialValues={formValues || initialValues}
   validationSchema={validationSchema}
   onSubmit={onSubmit}
   validateOnMount={true}
   enableReinitialize
 >

</Formik>
```

### Reset

To reset form after submission

```
const onSubmit = (values,onSubmitProps) => {
  console.log(onSubmitProps)
  const {setSubmitting,resetForm} = onSubmitProps

  setSubmitting(false)
  resetForm()
}

```

### Intermediate schema with yup

- Full work can be found in registeration component

```

  const options = [
    { key: "Email", value: "emailmoc" },
    { key: "Telephone", value: "telephonemoc" },
  ];
  const initialValues = {
    email: "",
    password: "",
    confirmPassword: "",
    modeOfContact: "",
    phone: "",
  };

// This schema checks for the values above
// the confirm password validates the password
//mode of contact determines if the phone number field is required.

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid field type")
      .required("Email field is required"),
    password: Yup.string().required("Password field is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), ""], "Passwords must match")
      .required("Required"),
    modeOfContact: Yup.string().required("Required"),
    phone: Yup.string().when("modeOfContact", {
      is: "telephonemoc",
      then: Yup.string().required("Required"),
    }),
  });
```
