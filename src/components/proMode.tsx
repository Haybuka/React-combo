import { Html5Qrcode } from 'html5-qrcode';
import useScanInitiate from '../hooks/useScanInitiate';
import Button from './button';
import InfoText from './info';
import { decodedTextType } from '../App';
import { useState } from 'react';

const ProMode = () => {
  const { initiate, startInitiateScan, stopInitiateScan } = useScanInitiate();
  const [scanResult, setScanResult] = useState<decodedTextType>(null);
  const [isSubmitting, setIssubmitting] = useState(false);

  const handleScan = (type: string) => {
    const html5QrCode = new Html5Qrcode('reader');
    const config = { fps: 10, qrbox: { width: 250, height: 250 } };
    const qrCodeSuccess = (decodedText: any, decodedResult: any) => {
      stopInitiateScan();
      setScanResult(decodedText);
      html5QrCode.stop();
    };
    const qrCodeError = (error: any) => {
      setIssubmitting(false);
    };

    if (type === 'start') {
      try {
        html5QrCode.start(
          { facingMode: { exact: 'environment' } },
          config,
          qrCodeSuccess,
          qrCodeError
        );
      } catch (error) {
        alert('no front camera detected');
        html5QrCode.start(
          { facingMode: 'environment' },
          config,
          qrCodeSuccess,
          qrCodeError
        );
      }
    } else {
      setIssubmitting(false);

      console.log('attempting to stop scanner');
    }
  };

  const handleScanStop = async () => {
    stopInitiateScan();
    window.location.reload();
  };
  const handleScanStart = () => {
    startInitiateScan();
    setIssubmitting(true);
    handleScan('start');
  };

  return (
    <section>
      <div id="reader" className=" overflow-hidden"></div>
      {scanResult && (
        <>
          <InfoText text={`bus code : ${scanResult}`} />
          {isSubmitting && <div className="loader"></div>}
        </>
      )}
      {initiate ? (
        <Button text={'Stop Scan'} handleClick={handleScanStop} />
      ) : (
        <>
          <InfoText text="Click the button to start scanning" />

          <Button text={'Scan a Bus'} handleClick={handleScanStart} />
        </>
      )}
    </section>
  );
};

export default ProMode;

// useEffect(() => {
//   // let html5QrCode = new Html5Qrcode('reader');
//   // Html5Qrcode.getCameras()
//   //   .then((devices) => {
//   //     if (devices && devices.length) {
//   //       let cameraId = devices[0].id;
//   //       setCameraId(cameraId);
//   //     }
//   //   })
//   //   .catch((err) => {
//   //     handle err
//   //   });

//   const qrCodeSuccessCallback = (decodedText: any, decodedResult: any) => {
//     /* handle success */
//     handleScanResult(decodedText);
//   };
//   const qrCodeErrorCallback = (error: any) => {
//     /* handle success */
//     // console.log(error);
//   };
//   const config = { fps: 10, qrbox: { width: 250, height: 250 } };

//   // If you want to prefer back camera
//   // html5QrCode.start(
//   //   { facingMode: 'environment' },
//   //   config,
//   //   qrCodeSuccessCallback,
//   //   qrCodeErrorCallback
//   // );

//   // html5QrCode.pause();
//   // if()
// }, []);
