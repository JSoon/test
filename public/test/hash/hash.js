const crypto = require('crypto');
const hash = crypto.createHash('md5');

const hashes = crypto.getHashes();
// console.log('Supported algorithms:', hashes);
// [ 'DSA',
//   'DSA-SHA',
//   'DSA-SHA1',
//   'DSA-SHA1-old',
//   'RSA-MD4',
//   'RSA-MD5',
//   'RSA-MDC2',
//   'RSA-RIPEMD160',
//   'RSA-SHA',
//   'RSA-SHA1',
//   'RSA-SHA1-2',
//   'RSA-SHA224',
//   'RSA-SHA256',
//   'RSA-SHA384',
//   'RSA-SHA512',
//   'dsaEncryption',
//   'dsaWithSHA',
//   'dsaWithSHA1',
//   'dss1',
//   'ecdsa-with-SHA1',
//   'md4',
//   'md4WithRSAEncryption',
//   'md5',
//   'md5WithRSAEncryption',
//   'mdc2',
//   'mdc2WithRSA',
//   'ripemd',
//   'ripemd160',
//   'ripemd160WithRSA',
//   'rmd160',
//   'sha',
//   'sha1',
//   'sha1WithRSAEncryption',
//   'sha224',
//   'sha224WithRSAEncryption',
//   'sha256',
//   'sha256WithRSAEncryption',
//   'sha384',
//   'sha384WithRSAEncryption',
//   'sha512',
//   'sha512WithRSAEncryption',
//   'shaWithRSAEncryption',
//   'ssl2-md5',
//   'ssl3-md5',
//   'ssl3-sha1',
//   'whirlpool' ]

const pwd = '123456';
hash.update(pwd);
console.log('hash md5', pwd, hash.digest('hex'));

const hmac = crypto.createHmac('sha256', 'a secret:');

hmac.update(pwd);
console.log('hmac sha256', pwd, hmac.digest('hex'));




// const path = require("path");
// const fs = require("fs");
// const publicKey = 'heheda';
// const privateKey = 'memeda';

// const encryptStringWithRsaPublicKey = function (toEncrypt, relativeOrAbsolutePathToPublicKey) {
//     // let absolutePath = path.resolve(relativeOrAbsolutePathToPublicKey);
//     // let publicKey = fs.readFileSync(absolutePath, "utf8");
//     let buffer = new Buffer(toEncrypt);
//     let encrypted = crypto.publicEncrypt(publicKey, buffer);
//     return encrypted.toString("base64");
// };

// const decryptStringWithRsaPrivateKey = function (toDecrypt, relativeOrAbsolutePathtoPrivateKey) {
//     // let absolutePath = path.resolve(relativeOrAbsolutePathtoPrivateKey);
//     // let privateKey = fs.readFileSync(absolutePath, "utf8");
//     let buffer = new Buffer(toDecrypt, "base64");
//     let decrypted = crypto.privateDecrypt(privateKey, buffer);
//     return decrypted.toString("utf8");
// };

// let encryptString = encryptStringWithRsaPublicKey('呵呵哒');
// let decryptString = decryptStringWithRsaPrivateKey(encryptString);

