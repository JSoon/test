var express = require('express');
var router = express.Router();
var NodeRSA = require('node-rsa');
var CryptoJS = require('crypto-js');
var fs = require('fs');
var path = require('path');
var xss = require('xss');

// rsa页
router.get('/', function (req, res, next) {
    // 读取公钥，并返还给前端页面保存
    fs.readFile(path.join(__dirname, "./public.pem"), (err, data) => {
        if (err) {
            res.status(500).json({
                success: false
            });
            return;
        }

        var publicKeyString = data.toString();

        res.render('rsa', {
            pk: publicKeyString
        });
    });
});

router.post('/decrypt', function (req, res, next) {

    // 读取私钥
    fs.readFile(path.join(__dirname, "./private.pem"), (err, data) => {
        if (err) {
            res.status(500).json({
                success: false
            });
            return;
        }

        var body = req.body;
        console.log(body);

        // 创建私钥对象
        var privateKey = new NodeRSA(data.toString());
        privateKey.setOptions({
            // 这里需要指定RSA padding模式为pkcs1，这是因为前端jsencrypt库采用了pkcs1，而后端node-rsa默认使用的pkcs1_oaep
            // https://stackoverflow.com/questions/33837617/node-rsa-errors-when-trying-to-decrypt-message-with-private-key
            encryptionScheme: 'pkcs1'
        });

        //#region 数据解密

        // 1. RSA秘钥解密AES随机秘钥
        var secKey = privateKey.decrypt(body.secKey, 'utf8');
        // 2. AES随机秘钥解密密文
        var rawData;
        var decryptedBytes = CryptoJS.AES.decrypt(body.data, secKey);
        var decryptedData = xss(decryptedBytes.toString(CryptoJS.enc.Utf8));
        if (body.dataType == 1) {
            // 解密plain text密文
            rawData = decryptedData;
        } else if (body.dataType == 2) {
            // 解密json密文
            rawData = JSON.parse(decryptedData);
        }

        //#endregion

        res.json({
            success: true,
            dataType: body.dataType,
            rawData: rawData
        });
    });
});

module.exports = router;