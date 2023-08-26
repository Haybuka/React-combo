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

     const {
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

- Short hand with spread

<input
id="username"
type="text"
{...register('username', )}
className="block w-full my-1 border rounded-lg py-1 focus:border-gray-400 focus:outline-none px-2"
/>
// Create and use an error message component.
<ErrorMessage msg={errors.username?.message} />

### Validate

Provide single validate function for one rule
Provide object for multiple rule

    <input
            id="username" type="text"
            {...register("username", {
              required: {
                value: true,
                message: 'Username is required',
              },
            })}
            className="block w-full my-1 border rounded-lg py-1 focus:border-gray-400 focus:outline-none px-2"
          />
      // Create and use an error message component.
          <ErrorMessage msg={errors.username?.message}
      />

### Customizing Validation

- Validations can be customized

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

- Take note of nested objects, you need the dot notation to access their usage

      <div className="my-3">
        <label htmlFor="facebook">Facebook</label>
        <input
          id="facebook" type="text"
          className="block w-full my-1 border rounded-lg py-1 focus:border-gray-400 focus:outline-none px-2"
          {...register('social.facebook', {
            required: {
              value: true,
              message: 'Facebook Social is required',
            },
          })}
        />
        <ErrorMessage msg={errors.social?.facebook?.message} />
      </div>

- Take note of arrays, you need the dot notation to access their usage

     <div className="my-3">
            <label htmlFor="primary-phobe">Primary Phone Number</label>
            <input id="primary-phone" type="text" 
            className="block w-full my-1 border rounded-lg py-1 focus:border-gray-400 focus:outline-none px-2"
               {...register('phoneNumbers.0', {
                 required: {
                 value: true,
                 message: 'Primary Number is Required',
                },
              })}
            />
            <ErrorMessage msg={errors?.phoneNumbers?.[0]?.message} />
      </div>

### Previously saved data can be loaded as default value.

To load previously saved data, the default values is returned async

defaultValues : async () => {
const response = await fetch('https:jsonplaceholder.typicode.com/users/1');
const data = await response.json();
return {
username: data.name,
email: data.email,
channel: data.username,
...
};
},

### Dynamic Fields.

- `useFieldArray : works mainly with array of objects`

- `create an initial state as an array of object`

  - set initial values phNumbers: [{ number: '' }],

- `specify the field to use this as an array of fields, and point out the control.`

* const { fields, append, remove } = useFieldArray({
  name: 'phNumbers',
  control,
  });

- `useFieldArray, and destructure`

* create jsx , well, tsx

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
