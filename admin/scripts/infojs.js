var token = getCookie('webapitoken');
console.log("Token: ",token)
var user;
var url="towaretail.sandbox"; //Ocuparemos en este caso ${window.location.host}


var userSetting= {
    "url": `${window.location.protocol}//${url}.arcadier.io/api/v2/marketplaces`,
    "method": "GET",
    "timeout": 0,
    "headers": {
        "Content-Type": "application/json"
    }
}
$.ajax(userSetting).done(function (response){
    console.log("Response:"+response.Owner.ID);
    user=response.Owner.ID;
    obtainUserinfo();
})

function obtainUserinfo(){
    try{
        var settings = {
            "url": `${window.location.protocol}//${url}.arcadier.io/api/v2/users/${user}`, 
            "method": "GET", 
            "headers": { 
                "Content-Type": "application/json",
                //"Authorization": "Bearer " + token //notice the space character between "Bearer" and token
            }, 
            "data": "" //JSON object
        };
        $.ajax(settings).done(function(response) { 
            console.log(response.FirstName,response.LastName,response.Email);
            document.getElementById("inputName").placeholder=response.FirstName;
            document.getElementById("inputLastName").placeholder=response.LastName;
            document.getElementById("inputEmail").placeholder=response.Email;
        });
    
    }catch(e){
        console.log(e)
    }
}


function getCookie(name){
    var value = '; ' + document.cookie;
    var parts = value.split('; ' + name + '=');
    if (parts.length === 2) {
        return parts.pop().split(';').shift();
    }
}