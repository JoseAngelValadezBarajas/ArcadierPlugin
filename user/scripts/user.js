    function validateInfo()
    {
        var user = $('#inputUser').val();
        var pass = $('#inputPass').val();
        var loginarray= `{user:${user},pass:${pass}}`;
        console.log(loginarray);
        $.ajax({
        data: {loginarray},
        url: "https://towaretail.sandbox.arcadier.io/user/plugins/0db2bace-59df-4070-ad98-d0e2821b8851/user.php",
        type: "post",
        success:  function (response) {
            response = JSON.parse(response);
            response.Records.forEach(element => {
                if(element.userId ===user){
                    if(element.pass ===pass){
                        console.log("Entre");
                    }
                    else{
                        console.log("Error en Usuario o Contraseña");
                    }
                }else{
                    console.log("Error en Usuario o Contraseña");
                }

            });
        }
        });
    }