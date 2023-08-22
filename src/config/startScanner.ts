import { Html5QrcodeScanner } from 'html5-qrcode';
import { decodedTextType } from '../App';
import { CodeScannerType } from '../components/scanner';

const startScanner = (
  handleScanResult: CodeScannerType['handleScanResult']
) => {
  const scanSuccess = (decodedText: decodedTextType, decodedResult: any) => {
    handleScanResult(decodedText);
  };
  const scanError = (error: any) => {
    // handle the scanned code as you like, for example:
    // console.log(`Code error = ${error}`);
    // scanner.pause();
  };
  const scanner = new Html5QrcodeScanner(
    'reader',
    {
      qrbox: {
        width: 300,
        height: 300,
      },
      fps: 20,
    },
    false
  );

  scanner.render(scanSuccess, scanError);
};

export default startScanner;
