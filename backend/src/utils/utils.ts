import * as CryptoJS from 'crypto-js';

interface Error {
  errorCode: number;
  description: string;
}

let jwtSecret = '';

export class Utils {
  constructor() {}

  generateJWTSecretToken(): void {
    const base64url = source => {
      // Encode in classical base64
      let encodedSource = CryptoJS.enc.Base64.stringify(source);

      // Remove padding equal characters
      encodedSource = encodedSource.replace(/=+$/, '');

      // Replace characters according to base64url specifications
      encodedSource = encodedSource.replace(/\+/g, '-');
      encodedSource = encodedSource.replace(/\//g, '_');

      return encodedSource;
    };

    // Defining our token parts
    const header = {
      alg: 'HS256',
      typ: 'JWT'
    };

    const data = {
      id: 1337,
      username: 'rafael.fecha'
    };

    const secret = 'My very confidential secret!!!';

    const stringifiedHeader = CryptoJS.enc.Utf8.parse(JSON.stringify(header));
    const encodedHeader = base64url(stringifiedHeader);

    const stringifiedData = CryptoJS.enc.Utf8.parse(JSON.stringify(data));
    const encodedData = base64url(stringifiedData);

    const signature = base64url(
      CryptoJS.HmacSHA256(`${encodedHeader}.${encodedData}`, secret)
    );

    jwtSecret = `${encodedHeader}.${encodedData}.${signature}`;
  }

  getJWTSecretToken(): string {
    return jwtSecret;
  }

  formatErrorInfo(errorCode: number, description: string): Error {
    return {
      errorCode: errorCode,
      description: description
    };
  }
}
