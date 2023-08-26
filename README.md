# Getting Started with React Hook Form with Samples

## Hook Form Devtool - development use

`
import { DevTool } from '@hookform/devtools';

Use on page end
<DevTool control={control} />

`
Touch - Whether field has being interacted with
Dirty - Whether ield value has changed

## `Usage`

### `Simple Format`

`const {
register,
control,
handleSubmit,
formState: { errors },
} = form;

const {name,ref,onChange,onBlur} = register("username")
<input
            id="username"
            type="text"
           name={name}
           ref={ref}
           onChange={onChange}
           onBlur={onBlur}
            className="block w-full my-1 border rounded-lg py-1 focus:border-gray-400 focus:outline-none px-2"
          />
`

Short hand with spread

` <input
            id="username"
            type="text"
            {...register('username', )}
            className="block w-full my-1 border rounded-lg py-1 focus:border-gray-400 focus:outline-none px-2"
          />
          // Create and use an error message component.
          <ErrorMessage msg={errors.username?.message} />
`

### Validate

Provide single validate function for one rule
Provide object for multiple rule

` <input
            id="username"
            type="text"
            {...register("username", {
              required: {
                value: true,
                message: 'Username is required',
              },
            })}
            className="block w-full my-1 border rounded-lg py-1 focus:border-gray-400 focus:outline-none px-2"
          />
          // Create and use an error message component.
          <ErrorMessage msg={errors.username?.message} />
`

### Customizing Validation

Validations can be customized
`

   <div className="my-3">
          <label htmlFor="mail">Email</label>
          <input
            id="mail"
            type="email"
            {...register('email', {
              pattern: {
                value:
                  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                message: 'Invalid email format',
              },
              validate: {
                notAdmin: (fieldValue) => {
                  return (
                    fieldValue !== 'admin@example.com' ||
                    'Enter a different email '
                  );
                },
                notBlackListed: (fieldValue) => {
                  return (
                    !fieldValue.endsWith('baddomain.com') ||
                    'Domain not supported'
                  );
                },
              },
            })}
            className="block w-full my-1 border rounded-lg py-1 focus:border-gray-400 focus:outline-none px-2"
          />
          <ErrorMessage msg={errors.email?.message} />
        </div>
  `

### Remember to set Default values

Default Values

- Specifying default values mean we can skip passing in the field type before the useForm
  Default value set also pops up on load.
  defaultValues: {
  username: 'TAP',
  email: '',
  channel: '',
  }

- If Ts is used, carefully type related fields
  `
  type FormValues = {
  username: string;
  email: string;
  channel: string;
  social: {
  twitter: string;
  facebook: string;
  };
  age: number;
  phoneNumbers: string[];
  phNumbers: { number: string }[];
  };

const form = useForm<FormValues>({
defaultValues: {
username: 'TAP',
email: '',
channel: '',
social: {
twitter: '',
facebook: '',
},
age: 0,
phoneNumbers: ['', ''],
phNumbers: [{ number: '' }],
},
});

`

- Take note of nested objects, you need the dot notation to access their usage
`
<div className="my-3">
        <label htmlFor="facebook">Facebook</label>
        <input
          id="facebook"
          type="text"
          {...register('social.facebook', {
            required: {
              value: true,
              message: 'Facebook Social is required',
            },
          })}
          className="block w-full my-1 border rounded-lg py-1 focus:border-gray-400 focus:outline-none px-2"
        />
        <ErrorMessage msg={errors.social?.facebook?.message} />
      </div>
`

- Take note of arrays, you need the dot notation to access their usage

`

<div className="my-3">
<label htmlFor="primary-phobe">Primary Phone Number</label>
<input
id="primary-phone"
type="text"
{...register('phoneNumbers.0', {
required: {
value: true,
message: 'Primary Number is Required',
},
})}
className="block w-full my-1 border rounded-lg py-1 focus:border-gray-400 focus:outline-none px-2"
/>
<ErrorMessage msg={errors?.phoneNumbers?.[0]?.message} />
</div>

`

### Previously saved data can be loaded as default value.

To load previously saved data, the default values is returned async
defaultValues : async () => {
const response = await fetch(
'https:jsonplaceholder.typicode.com/users/1'
);

     const data = await response.json();
     return {
       username: data.name,
       email: data.email,
       channel: data.username,
       ...
     };

},

### Dynamic Fields.

- useFieldArray : works mainly with array of objects

- create an initial state as an array of object

  - set initial values phNumbers: [{ number: '' }],

- specify the field to use this as an array of fields, and point out the control.

* const { fields, append, remove } = useFieldArray({
  name: 'phNumbers',
  control,
  });

- useFieldArray, and destructure.

* create jsx , well, tsx
`
 <div className="px-6 my-6">
            {fields.map((field, index) => {
              return (
                <div className="my-3" key={field.id}>
                  <label htmlFor="primary-phobe">
                    New Primary Phone Number
                  </label>
                  <input
                    id="primary-phone"
                    type="text"
                    {...register(`phNumbers.${index}.number` as const)}
                    className="block w-full my-1 border rounded-lg py-1 focus:border-gray-400 focus:outline-none px-2"
                  />
                  {index > 0 && (
                    <button type="button" onClick={() => remove(index)}>
                      Remove Number
                    </button>
                  )}
                </div>
              );
            })}
            <button
              type="button"
              className="text-center block w-full shadow-md py-2 rounded-lg"
              onClick={() => append({ number: '' })}
            >
              Add Number Fields
            </button>
  </div>
`

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
