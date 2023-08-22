import React from 'react';

type ButtonType = {
  text: string;
  handleClick: () => void;
};

const Button = ({ text, handleClick }: ButtonType) => {
  return (
    <button
      onClick={handleClick}
      className="px-6 bg- py-2 rounded-full bg-[#13274F] text-white uppercase"
    >
      {text}
    </button>
  );
};

export default Button;
