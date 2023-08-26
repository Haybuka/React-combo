import React from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { DevTool } from '@hookform/devtools';
import ErrorMessage from './errorMessage';

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

const Login = () => {
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
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = form;

  // * Arrays
  // declare type
  // add to initial value object
  // use dot notation (not bracket) in register to access arrays index.
  //

  // Dynamic fields
  // - useFieldArray : works mainly with array of objects
  // create an initial state as an array of object
  // specify the field to use this as an array of fields - useFieldArray, and destructure.
  // create jsx , well, tsx

  const { fields, append, remove } = useFieldArray({
    name: 'phNumbers',
    control,
  });

  const onSubmit = (data: FormValues) => {
    console.log('form submitted', data);
  };
  return (
    <>
      <form className="w-[600px] " onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className="my-3">
          <label htmlFor="username">Username</label>
          <input
            id="username"
            type="text"
            {...register('username', {
              required: {
                value: true,
                message: 'Username is required',
              },
            })}
            className="block w-full my-1 border rounded-lg py-1 focus:border-gray-400 focus:outline-none px-2"
          />

          <ErrorMessage msg={errors.username?.message} />
        </div>
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
        <div className="my-3">
          <label htmlFor="channel">Channel</label>
          <input
            id="channel"
            type="text"
            {...register('channel', {
              required: {
                value: true,
                message: 'Channel is required',
              },
            })}
            className="block w-full my-1 border rounded-lg py-1 focus:border-gray-400 focus:outline-none px-2"
          />
          <ErrorMessage msg={errors.channel?.message} />
        </div>
        <div className="my-3">
          <label htmlFor="twitter">Twitter</label>
          <input
            id="twitter"
            type="text"
            {...register('social.twitter', {
              required: {
                value: true,
                message: 'Twiter Social is required',
              },
            })}
            className="block w-full my-1 border rounded-lg py-1 focus:border-gray-400 focus:outline-none px-2"
          />
          <ErrorMessage msg={errors.social?.twitter?.message} />
        </div>
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
        <div className="my-3">
          <label htmlFor="secondary-phobe">Secondary Phone Number</label>
          <input
            id="secondary-phone"
            type="text"
            {...register('phoneNumbers.1')}
            className="block w-full my-1 border rounded-lg py-1 focus:border-gray-400 focus:outline-none px-2"
          />
        </div>

        <section>
          <aside className="border rounded-md relative my-10">
            <label className="absolute -top-3 bg-white px-3 left-0">
              Field Array : List of phone numbers
            </label>
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
          </aside>
        </section>
        <div className="my-3">
          <label htmlFor="age">age</label>
          <input
            id="age"
            type="number"
            {...register('age', {
              valueAsNumber: true,
              required: {
                value: true,
                message: 'age is required',
              },
            })}
            className="block w-full my-1 border rounded-lg py-1 focus:border-gray-400 focus:outline-none px-2"
          />
          <ErrorMessage msg={errors.age?.message} />
        </div>
        <button className="text-center block w-full rounded-lg py-1 bg-blue-800 text-white">
          Submit
        </button>
      </form>
      <DevTool control={control} />
    </>
  );
};

export default Login;
