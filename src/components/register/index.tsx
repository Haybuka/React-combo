import { Controller, useForm } from 'react-hook-form';
import ErrorMessage from '../login/errorMessage';
import { yupResolver } from '@hookform/resolvers/yup';
import { zodResolver } from '@hookform/resolvers/zod';
import * as yup from 'yup';
import { z } from 'zod';
import { DevTool } from '@hookform/devtools';
import InputComponents from '../input';

type FormValues = {
  username: string;
  email: string;
  password: string;
};

const yupSchema = yup
  .object({
    username: yup.string().required('Username is required'),
    email: yup
      .string()
      .email('Email format is not valid')
      .required('Email is required'),
    // age: yup.number().positive().integer().required(),
  })
  .required();

const zodSchema = z.object({
  username: z.string().nonempty('Zod username is required'),
  password: z.string().nonempty('Zod password is required'),
  email: z
    .string()
    .nonempty('Zod Email is required')
    .email('Zod Email format is not valid'),
});
const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm({
    defaultValues: {
      username: '',
      email: '',
      password: '',
    },
    resolver: zodResolver(zodSchema),
  });

  const handleFormSubmit = (values: FormValues) => {};
  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} noValidate>
      {/* <div className="my-3 w-full">
        <label htmlFor="username">Username</label>
        <input
          id="username"
          type="text"
          {...register('username')}
          className="block w-full my-1 border rounded-lg py-1 focus:border-gray-400 focus:outline-none px-2"
        />

        <ErrorMessage msg={errors.username?.message} />
      </div> */}
      {/* <div className="my-3 w-full">
        <label htmlFor="username">Email</label>
        <input
          id="email"
          type="text"
          {...register('email')}
          className="block w-full my-1 border rounded-lg py-1 focus:border-gray-400 focus:outline-none px-2"
        />

        <ErrorMessage msg={errors.email?.message} />
      </div> */}
      {/* <Controller
        name="email"
        control={control}
        rules={{ required: true }}
        render={({ field }) => <InputComponents {...field} />}
      /> */}
      <InputComponents
        control={control}
        name="username"
        rules={{ required: true }}
      />
      <InputComponents
        control={control}
        name="email"
        rules={{ required: true }}
      />
      <InputComponents
        control={control}
        name="password"
        rules={{ required: true }}
      />
      <button>Register</button>
      <DevTool control={control} />
    </form>
  );
};

export default Register;
