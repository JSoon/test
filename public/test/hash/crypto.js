var express = require('express');
var router = express.Router();
var CryptoJS = require("crypto-js");

router.post('/crypto', function (req, res, next) {
    var body = req.body;
    console.log(body);
    
    var cipherText = body.text; // 密文
    var secretKey = body.secretKey; // 密钥
    
    var decryptBytes = CryptoJS.AES.decrypt(cipherText.toString(), secretKey);
    var decryptText = decryptBytes.toString(CryptoJS.enc.Utf8); // 解密后的明文

    res.json({
        success: true,
        cipherText: cipherText,
        decryptText: decryptText
    });
});

module.exports = router;