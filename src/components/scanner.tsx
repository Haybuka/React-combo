import { useEffect } from 'react';
import { decodedTextType } from '../App';
import { Html5QrcodeScanner } from 'html5-qrcode';

export type CodeScannerType = {
  handleScanResult: (result: decodedTextType) => void;
  stopScan?: () => void;
};

const CodeScanner = ({ handleScanResult }: CodeScannerType) => {
  useEffect(() => {
    try {
      const scanSuccess = (
        decodedText: decodedTextType,
        decodedResult: any
      ) => {
        handleScanResult(decodedText);
        scanner.pause();
      };
      const scanError = (error: any) => {};
      const scanner = new Html5QrcodeScanner(
        'reader',
        {
          qrbox: {
            width: 300,
            height: 300,
          },
          fps: 20,
        },
        true
      );

      scanner.render(scanSuccess, scanError);
    } catch (error) {
      // console.log('error caught');
    }
  }, []);

  return <div id="reader"></div>;
};

export default CodeScanner;
