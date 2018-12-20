//#region 客户端加密

$('#J_EncryptBtn').click(function () {

    // Encrypt with the public key...
    var encrypt = new JSEncrypt();
    var publicKey = $.trim($('#J_PublicKey').val());
    
    var msg = $.trim($('#J_Msg').val());
    if (!msg) {
        return;
    }
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