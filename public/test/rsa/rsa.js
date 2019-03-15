//#region 客户端加密

var pk = $('#J_PublicKey').val();
// 1. 去掉公钥加密key
var pkSecKeyL = pk.slice(-1); // 公钥加密key长度
pk = pk.slice(0, -1); // 去掉公钥加密key长度字段
var pkSecKey = pk.slice(-pkSecKeyL); // 公钥间加密key
pk = pk.slice(0, -pkSecKeyL); // 去掉公钥加密key
// 2. 去掉公钥间隔符
var pkGapL = pk.slice(0, 1); // 公钥间隔符长度
pk = pk.slice(1); // 去掉公钥间隔符长度字段
var pkGap = pk.slice(-pkGapL); // 公钥间隔符
pk = pk.slice(0, -pkGapL); // 去掉公钥间隔符，得到加密后的公钥

// 解密公钥
var decryptBytes  = CryptoJS.AES.decrypt(pk, pkSecKey); // 解密后的公钥
var decryptText = decryptBytes.toString(CryptoJS.enc.Utf8); // 解密后的公钥明文
console.log(pkGap);
var publicKey = decryptText.replace(new RegExp(pkGap, 'g'), '\n'); // 还原公匙
console.log(publicKey);



$('#J_EncryptBtn').click(function () {

    // 使用公匙对明文进行加密
    var encrypt = new JSEncrypt();
    // var publicKey = $.trim($('#J_PublicKey').val());
    
    var msg = $.trim($('#J_Msg').val());
    if (!msg) {
        return;
    }
    debugger;
    encrypt.setPublicKey(publicKey);
    var encryptedMsg = encrypt.encrypt(msg);
    $('#J_EncryptedMsg').html(encryptedMsg);

});

//#endregion

//#region 服务端解密

$('#J_DecryptBtn').click(function () {

    $.ajax({
        method: 'POST',
        url: '/rsa/decrypt',
        data: {
            msg: $('#J_EncryptedMsg').html()
        }
    }).then(function (res) {
        if (!res || !res.success) {
            return;
        }

        $('#J_DecryptedMsg').html(res.decryptedMsg);
    }, function () {

    });

});

//#endregion