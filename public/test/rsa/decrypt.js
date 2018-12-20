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