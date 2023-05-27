var token = getCookie('webapitoken');

function sendUserConfig()
{
    var url=window.location.host; 
    var div1=document.getElementById("inputDiv1").value;
    var div2=document.getElementById("inputDiv2").value;
    var user=document.getElementById("inputUser").value;
        var settings = {
            "url": `${window.location.protocol}//${url}/api/v2/plugins/0db2bace-59df-4070-ad98-d0e2821b8851/custom-tables/configs/rows`, 
            "method": "POST", 
            "headers": { 
                "Content-Type": "application/json",
                "Authorization": "Bearer "+token //notice the space character between "Bearer" and token
            }, 
            "data": JSON.stringify({
                "userId": user,
                "colorDiv1": div1,
                "colorDiv2": div2,
              })
        };
        $.ajax(settings).done(function(response) { 
            console.log(response)
        });  
    
}



function getCookie(name){
    var value = '; ' + document.cookie;
    var parts = value.split('; ' + name + '=');
    if (parts.length === 2) {
        return parts.pop().split(';').shift();
    }
}

