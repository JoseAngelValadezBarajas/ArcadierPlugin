var url=window.location.host; 
var token;
var userId;
var id0,name0,price0,id1,name1,price1;

function sendEmail(){
    ObtainToken();
    ObtainItemData();
    var from=document.getElementById("forEmail").value;
    var to=document.getElementById("toEmail").value;
    var body = document.getElementById("bodyEmail").value;
    var subject=document.getElementById("subject").value;
        var settings = {
            "url": `${window.location.protocol}//${url}/api/v2/admins/${userId}/emails`, 
            "method": "POST", 
            "headers": { 
                "Content-Type": "application/json",
                "Authorization": "Bearer "+token //notice the space character between "Bearer" and token
            }, 
            "data": JSON.stringify({
                "From": from,
                "To": to,
                "Body": `<h2 style=\"color:blue\">Se muestran el formato de este email:</h2><br><h3>${body}</h3><br><table><thead><tr><th>id</th> <th>name</th> <th>price</th></tr></thead><tbod><tr><td>${id0}</td><td>${name0}</td><td>${price0}</td></tr><tr><td>${id1}</td><td>${name1}</td><td>${price1}</td></tr> </tbody></table>`,
                "Subject": subject
              })
        };
        $.ajax(settings).done(function(response) { 
            console.log(response);
        });   
}

function ObtainItemData(){
    var url=window.location.host;
    var settings = {
        "url": `${window.location.protocol}//${url}/api/v2/items/`,
        "method": "GET",
        "timeout": 0,
        "headers": {
            "Content-Type": "application/json"
        }
    };
    $.ajax(settings).done(function (response){
      id0=response.Records[0].ID;
      name0=response.Records[0].Name;
      price0=response.Records[0].Price;
      id1=response.Records[1].ID;
      name1=response.Records[1].Name;
      price1=response.Records[1].Price;
    }) 
}

function ObtainToken(){
    var plugin="0db2bace-59df-4070-ad98-d0e2821b8851";
    var objData = {data: "plugin",};
    $.ajax({
        url: `${window.location.protocol}//${window.location.host}/admin/plugins/${plugin}/Token.php`,
        method: 'POST',
        data: JSON.stringify(objData),
        success: function(result) 
        {
            var respond = jQuery.parseJSON(result);
            token=respond.Token;
            userId=respond.Id;
        }});

}
































