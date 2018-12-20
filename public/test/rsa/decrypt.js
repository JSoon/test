var express = require('express');
var router = express.Router();
var NodeRSA = require('node-rsa');
var fs = require('fs');
var path = require('path');

router.post('/decrypt', function (req, res, next) {
    var body = req.body;
    console.log(body);

    // 读取私钥
    fs.readFile(path.join(__dirname, "./private.pem"), (err, data) => {
        if (err) {
            res.status(500).json({
                success: false
            });
            return;
        }

        // 创建私钥对象
        var privateKey = new NodeRSA(data.toString());
        privateKey.setOptions({
            // 这里需要指定RSA padding模式为pkcs1，这是因为前端jsencrypt库采用了pkcs1，而后端node-rsa默认使用的pkcs1_oaep
            // https://stackoverflow.com/questions/33837617/node-rsa-errors-when-trying-to-decrypt-message-with-private-key
            encryptionScheme: 'pkcs1'
        });

        // 对数据进行解密
        var decryptedMsg = privateKey.decrypt(body.msg, 'utf8');

        res.json({
            success: true,
            encryptedMsg: body.msg,
            decryptedMsg: decryptedMsg
        });
    });
});

module.exports = router;