import React from 'react';

type InfoTextType = {
  text: string;
};

const InfoText = ({ text }: InfoTextType) => {
  return (
    <div>
      <p className="uppercase text-sm my-6">{text}</p>
    </div>
  );
};

export default InfoText;
