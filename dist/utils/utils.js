"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CryptoJS = require("crypto-js");
const properties_1 = require("../configs/properties");
const ifaces = require('os').networkInterfaces();
let overrideToken = 'WNWMZuALG8hAsoRReHwARamspRQg';
class Utils {
    constructor() {
        this.jwtSecret = '';
    }
    clone(objectToBeCloned) {
        return JSON.parse(JSON.stringify(objectToBeCloned));
    }
    getIp() {
        let ip = 'localhost';
        Object.keys(ifaces).forEach(function (ifname) {
            let alias = 0;
            ifaces[ifname].forEach(function (iface) {
                if ('IPv4' !== iface.family || iface.internal !== false) {
                    return;
                }
                if (ifname === 'Ethernet') {
                    ip = iface.address;
                    console.log(`Get ip from: Ethernet`);
                }
                else if (ifname === 'Wi-Fi') {
                    ip = iface.address;
                    console.log(`Get ip from: Wi-Fi`);
                }
                if (alias >= 1) {
                    console.log(ifname + ':' + alias, iface.address);
                }
                else {
                    ip = iface.address;
                    console.log(ifname, iface.address);
                }
                ++alias;
            });
        });
        console.log(`Current ip: ${ip}`);
        return ip;
    }
    getRandom(min, max) {
        return Math.random() * (max - min) + min;
    }
    getToken() {
        return overrideToken;
    }
    printHeaders(req) {
        const specialHeaders = [
            'authorization',
            'authentication-token',
            'language-code',
            'group-sso',
            'content-type',
            'deviceUID',
            'pricePlanId'
        ];
        for (const header in req.headers) {
            if (req.headers[header]) {
                const special = specialHeaders.indexOf(header) > -1
                    ? '    <<<<<<<<<<<<<<<<<<<<<<<   <<<<<<'
                    : '';
                console.log("Header '" + header + "': " + req.headers[header] + special);
            }
        }
    }
    random(min, max) {
        return Math.random() * (max - min) + min;
    }
    updateToken() {
        console.log(overrideToken);
        overrideToken =
            new Date().getHours().toString() + '-' + this.random(0, 1000000);
        console.log(overrideToken);
        console.log('-----------------------------------------------------');
        console.log('-----------------------------------------------------');
        console.log('>>> new token: ' + overrideToken);
        console.log('-----------------------------------------------------');
        console.log('-----------------------------------------------------');
        setTimeout(() => {
            this.updateToken();
        }, properties_1.properties().expiresIn * 1000);
    }
    generateJWTSecretToken() {
        const base64url = source => {
            let encodedSource = CryptoJS.enc.Base64.stringify(source);
            encodedSource = encodedSource.replace(/=+$/, '');
            encodedSource = encodedSource.replace(/\+/g, '-');
            encodedSource = encodedSource.replace(/\//g, '_');
            return encodedSource;
        };
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
        const signature = base64url(CryptoJS.HmacSHA256(`${encodedHeader}.${encodedData}`, secret));
        this.jwtSecret = `${encodedHeader}.${encodedData}.${signature}`;
        return this.jwtSecret;
    }
    getJWTSecretToken() {
        return this.jwtSecret;
    }
}
exports.Utils = Utils;
