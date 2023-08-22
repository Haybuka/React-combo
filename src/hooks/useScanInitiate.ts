import { useState } from 'react';

const useScanInitiate = () => {
  const [initiate, setInitiate] = useState(false);

  const startInitiateScan = () => {
    setInitiate((prev) => true);
  };

  const stopInitiateScan = () => {
    setInitiate((prev) => false);
  };
  return {
    initiate,
    startInitiateScan,
    stopInitiateScan,
  };
};

export default useScanInitiate;
