import { useController, UseControllerProps } from 'react-hook-form';
import ErrorMessage from '../login/errorMessage';

type FormValues = {
  username: string;
  email: string;
  password: string;
};

const InputComponents = (props: UseControllerProps<FormValues>) => {
  const {
    field,
    fieldState: { error },
  } = useController(props);

  const { name } = props;
  return (
    <div className="my-3 w-full">
      <label htmlFor={name}>{name}</label>
      <input
        id={name}
        {...field}
        // placeholder={name}
        className="block w-full my-1 border rounded-lg py-1 focus:border-gray-400 focus:outline-none px-2 uppercase"
      />

      <ErrorMessage msg={error?.message} />
    </div>
  );
};

export default InputComponents;
