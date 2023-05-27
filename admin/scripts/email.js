var url=window.location.host; //Ocuparemos en este caso ${window.location.host}
var token;
var userId;

function sendEmail(){
    var from=document.getElementById("forEmail").value;
    var to=document.getElementById("toEmail").value;
    var body=document.getElementById("bodyEmail").value;
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
                "Body": body,
                "Subject": subject
              })
        };
        $.ajax(settings).done(function(response) { 
            console.log(response)
        });
    
}

var clientId = "X2BRHz9VGnJqwnc9IIdkadvReJQOvgHBoM0Z9p3M";
var secretClientId = "Tn4oefIwZZ_YZivuWSEwV0wusu2A1BlrZSPE5oIVADNNkxT14Bb";
var userSettings ={
    "url": `https://${window.location.host}/token`,
    "method": "POST",
    "timeout": 0,
    "headers": {
        "Content-Type": "application/x-www-form-urlencoded"
    },
    "data": {
        "client_id": clientId,
        "client_secret": secretClientId,
        "grant_type": "client_credentials",
        "scope": "admin"
    }
};
$.ajax(userSettings).done(function(response) { 
    token=response.access_token;
    userId=response.UserId;
});

