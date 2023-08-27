import React from 'react';

type ErrorMessageType = {
  msg: string | any;
};
const ErrorMessage = ({ msg }: ErrorMessageType) => {
  return <p className="text-red-600 uppercase text-[12px]">{msg}</p>;
};

export default ErrorMessage;
