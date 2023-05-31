function validateInfo() 
{
    var plugin="0db2bace-59df-4070-ad98-d0e2821b8851";
    var user = $('#inputUser').val();
    var pass = $('#inputPass').val();
        var objData = {
          user: user,
          pass: pass,
        };
        $.ajax({
            url: `${window.location.protocol}//${window.location.host}/user/plugins/${plugin}/user.php`,
            method: 'POST',
            data: JSON.stringify(objData),
            success: function(result) {
                var respond = jQuery.parseJSON(result);
                if(respond.access=="True"){
                    window.location.replace(`${window.location.protocol}//${window.location.host}/user/plugins/${plugin}/customer.html?${user}`);
                }     
            }});
}
