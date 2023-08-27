import React, { useEffect } from 'react';
import { useForm, useFieldArray, FieldErrors } from 'react-hook-form';
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
  dob: Date;
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
      dob: new Date(),
    },
    mode: 'onBlur',
  });
  const {
    register,
    control,
    handleSubmit,
    formState: {
      errors,
      isDirty,
      isValid,
      isSubmitting,
      isSubmitted,
      isSubmitSuccessful,
      submitCount,
    },
    watch,
    getValues,
    setValue,
    reset,
  } = form;

  const { fields, append, remove } = useFieldArray({
    name: 'phNumbers',
    control,
  });

  const onSubmit = (data: FormValues) => {
    console.log('form submitted', data);
  };

  useEffect(() => {
    //careful not to call reset method in the on submit though
    // use the isSubmitSuccessful flag to check if form submit was successful, then reset inside a useEffect hook

    isSubmitSuccessful && reset();
  }, [isSubmitSuccessful, reset]);

  const handleGetValues = () => {
    // Get values accesses field values without triggering a re-render
    // it is just like watch, but without the re-render
    // changing a field value will not trigger the get values method
    // you can get specific value by passing a field name or an array of field name to the getValues method.
    console.log(getValues());
    console.log(getValues('username'));
    console.log(getValues(['username', 'email']));
  };

  const handleSetValues = () => {
    //Sets a registered fields value programatically on an action e.g click, page load or so
    //code commented below is first step and it sets the username field from whatevr it was to iron man

    // setValue('username', 'Iron man');

    //Calling set value does not affect the state of the field, such as dirty touched or validation.
    // To change a field state asif a suer is interacting, a third argument is needed.
    setValue('username', 'Iron man', {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });
  };
  //  Watch keeps track of fields incase they are needed to be rendered on UI
  // const watchUsername = watch('username');
  // const watchOthers = watch(['email', 'channel']);
  // const watchAll = watch();

  const handleSubmitError = (error: FieldErrors<FormValues>) => {
    // perfect place to return custom error messages.
    console.log({ error });
  };

  // when a field is disabled through hook form, value for that field becomes undefined and the validation cancels
  // fields can also be conditionally disabled.

  return (
    <>
      <form
        className="w-[800px] uppercase text-sm"
        onSubmit={handleSubmit(onSubmit, handleSubmitError)}
        noValidate
      >
        {/* <h2>watching Username : {watchUsername}</h2>
        <h2>watching email and channel : {watchOthers}</h2>
        <h2>watching all fields : {JSON.stringify(watchAll)}</h2> */}
        <section className="flex items-center gap-2">
          <div className="my-3 w-full">
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
          <div className="my-3 w-full">
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
        </section>

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
        <section className="flex items-center gap-2">
          <div className="my-3 w-full">
            <label htmlFor="twitter">Twitter</label>
            <input
              id="twitter"
              type="text"
              {...register('social.twitter', {
                disabled: watch('channel') === '',
                required: {
                  value: true,
                  message: 'Twiter Social is required',
                },
              })}
              className="block w-full my-1 border rounded-lg py-1 focus:border-gray-400 focus:outline-none px-2"
            />
            <ErrorMessage msg={errors.social?.twitter?.message} />
          </div>
          <div className="my-3 w-full">
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
        </section>
        <section className="flex items-center gap-2 my-3">
          <div className="w-full">
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
          <div className="w-full">
            <label htmlFor="secondary-phone">Secondary Phone Number</label>
            <input
              id="secondary-phone"
              type="text"
              {...register('phoneNumbers.1')}
              className="block w-full my-1 border rounded-lg py-1 focus:border-gray-400 focus:outline-none px-2"
            />
          </div>
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
                      <button
                        type="button"
                        onClick={() => remove(index)}
                        className="bg-red-100 text-red-600 px-4 py-2 rounded-xl text-sm"
                      >
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
          <label htmlFor="date">Date of Birth</label>
          <input
            id="date"
            type="date"
            {...register('dob', {
              valueAsDate: true,
              required: {
                value: true,
                message: 'date is required',
              },
            })}
            className="block w-full my-1 border rounded-lg py-1 focus:border-gray-400 focus:outline-none px-2"
          />
          <ErrorMessage msg={errors.dob?.message} />
        </div>

        <section className="flex justify-between items-center gap-2">
          <button
            type="button"
            onClick={handleGetValues}
            className="text-center block w-full rounded-lg py-2 text-blue-600 bg-blue-100"
          >
            Get values
          </button>
          <button
            className="text-center block w-full rounded-lg py-2 text-blue-600 bg-blue-100"
            disabled={!isDirty || !isValid || isSubmitting}
          >
            Submit
          </button>
          <button
            type="button"
            onClick={handleSetValues}
            className="text-center block w-full rounded-lg py-2 text-blue-600 bg-blue-100"
          >
            Set values
          </button>
        </section>
      </form>
      <DevTool control={control} />
    </>
  );
};

export default Login;
