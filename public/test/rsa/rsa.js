//#region 解析公钥

var rsaPK = $('#J_PublicKey').val();
console.log('rsaPK', rsaPK);

//#endregion

//#region 客户端加密

var encryptDataObj; // 加密传输数据对象

$('#J_EncryptBtn').click(function () {

    var msg = $.trim($('#J_Msg').val());
    if (!msg) {
        return;
    }

    encryptDataObj = dataEncrypting({
        raw: msg,
        rawType: 1,
        publicKey: rsaPK
    });
    console.log('encryptDataObj', encryptDataObj);

    // 显示密文
    $('#J_EncryptedMsg').html(encryptDataObj.data);

});

/**
 * @description 生成随机AES秘钥
 * 
 * @returns 随机秘钥串
 */
function generateAESKey() {
    var p = Math.random() * 1000;
    return CryptoJS.SHA256(p).toString();
}

/**
 * @description 数据加密，步骤如下
 * 
 * 1. 生成一串随机秘钥k1
 * 2. AES加密明文，key为k1
 * 3. RSA公匙加密k1
 * 
 * @param {object} opts 
 * @param {string} opts.raw         明文串
 * @param {number} opts.rawType     明文数据类型，1：plain text，2：object
 * @param {string} opts.publicKey   RSA公匙
 * 
 * @returns 加密传输数据对象
 */
function dataEncrypting(opts) {

    var rawData; // 明文

    // 处理明文
    if (opts.rawType === 1) {
        rawData = opts.raw;
    } else if (opts.rawType === 2) {
        rawData = JSON.stringify(opts.raw);
    }

    // 创建RSA加密对象
    var RSAEncrypt = new JSEncrypt();
    RSAEncrypt.setPublicKey(opts.publicKey);

    var ranSecKey = generateAESKey(); // 随机秘钥
    var encodedData = CryptoJS.AES.encrypt(rawData, ranSecKey).toString(); // 随机秘钥AES加密明文
    var encodedSecKey = RSAEncrypt.encrypt(ranSecKey); // RSA公钥加密随机秘钥

    // 返回密文等相关传输数据
    return {
        dataType: opts.rawType,
        data: encodedData,
        secKey: encodedSecKey
    };

}

//#endregion




//#region 服务端解密

$('#J_DecryptBtn').click(function () {

    $.ajax({
        method: 'POST',
        url: '/rsa/decrypt',
        data: encryptDataObj
    }).then(function (res) {
        if (!res || !res.success) {
            return;
        }

        $('#J_DecryptedMsg').html(res.rawData);
    }, function () {

    });

});

//#endregion