import React from 'react';
import { useForm } from 'react-hook-form';
import { DevTool } from '@hookform/devtools';
import ErrorMessage from './errorMessage';
import { error } from 'console';

type FormValues = {
  username: string;
  email: string;
  channel: string;
  social: {
    twitter: string;
    facebook: string;
  };
  phoneNumbers: string[];
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
      phoneNumbers: ['', ''],
    },
  });
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = form;
  console.log(errors);
  // * simple format
  // const {name,ref,onChange,onBlur} = register("username")
  // using spread - {...register("username")}

  // * Devtool states
  //Touch - Whether field has being interacted with
  //Dirty - Whether ield value has changed

  // * Validate
  //Provide single validate function for one rule
  // Provide object for multiple rule

  // * Default Values
  // -Specifying default values mean we can skip passing in the field type before the useForm
  // Default value set also pops up on load.
  // defaultValues: {
  //   username: 'TAP',
  //   email: '',
  //   channel: '',
  // }
  // Previously saved data can be loaded as default value.
  // to load prev.saved data, the default values is returned async
  // defaultValues : async () => {
  //   const response = await fetch(
  //     'https://jsonplaceholder.typicode.com/users/1'
  //   );
  //   const data = await response.json();
  //   return {
  //     username: data.name,
  //     email: data.email,
  //     channel: data.username,
  //   };
  // },

  // * nested Objects
  // declare type
  // add to initial value object
  // use dot notation in register to access nested object types.
  // typescript will offer auto complete

  // * Arrays
  // declare type
  // add to initial value object
  // use dot notation (not bracket) in register to access arrays index.
  //

  const onSubmit = (data: FormValues) => {
    console.log('form submitted', data);
  };
  return (
    <>
      <form className="w-[400px] " onSubmit={handleSubmit(onSubmit)} noValidate>
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
          <p className="text-red-600"></p>
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
          {/* <p>{errors?.phoneNumbers[0]?.message}</p> */}
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
        <button className="text-center block w-full rounded-lg py-1 bg-blue-800 text-white">
          Submit
        </button>
      </form>
      <DevTool control={control} />
    </>
  );
};

export default Login;
