import React from 'react';
import { useForm } from 'react-hook-form';
import { DevTool } from '@hookform/devtools';
import ErrorMessage from './errorMessage';

type FormValues = {
  username: string;
  email: string;
  channel: string;
};

const Login = () => {
  const form = useForm<FormValues>({
    defaultValues: {
      username: '',
      email: '',
      channel: '',
    },
  });
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = form;
  // const {name,ref,onChange,onBlur} = register("username")

  //Devtool states
  //Touch - Whether field has being interacted with
  //Dirty - Whether ield value has changed

  //Validate
  //Provide single validate function for one rule
  // Provide object for multiple rule

  //Default Values
  // -Specifying default values mean we can skip passing in the field type before the useForm

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
        <button className="text-center block w-full rounded-lg py-1 bg-blue-800 text-white">
          Submit
        </button>
      </form>
      <DevTool control={control} />
    </>
  );
};

export default Login;
