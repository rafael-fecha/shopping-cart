import * as CryptoJS from 'crypto-js';

export class Utils {
  private jwtSecret: string;

  constructor() {
    this.jwtSecret = '';
  }

  generateJWTSecretToken() {
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

    this.jwtSecret = `${encodedHeader}.${encodedData}.${signature}`;

    return this.jwtSecret;
  }

  getJWTSecretToken() {
    return this.jwtSecret;
  }
}
