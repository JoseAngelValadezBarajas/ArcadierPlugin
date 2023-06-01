var vbGateway =document.currentScript.src;

function testPlugin(){
    var re = /([a-f0-9]{8}(?:-[a-f0-9]{4}){3}-[a-f0-9]{12})/i;
    this.packageId = re.exec(vbGateway.toLowerCase())[1];
    this.customFieldPrefix = this.packageId.replace(/-/g, "");
    this.packagePath = vbGateway.replace('/scripts/script.js', '').trim();
    this.currentUrl = window.location.href.toLowerCase();
    //To Load InfoHTML
    if(document.getElementById('infoTable')){
        var customTable="users";
        this.obtainTableWithAuth(customTable);
    }
}


//InfoHtmlFunctions
testPlugin.prototype.sendNewUser= function (){
    var tokenTable = this.getCookie('webapitoken');
    var customTableDir="users";
    var inputUser=document.getElementById("inputUser").value;
    var inputPass=document.getElementById("inputPass").value;
    var inputUrl=document.getElementById("inputUrl").value;
        var settings = {
            "url": `${window.location.protocol}//${window.location.host}/api/v2/plugins/${packageId.value}/custom-tables/${customTableDir}/rows`, 
            "method": "POST", 
            "headers": { 
                "Content-Type": "application/json",
                "Authorization": "Bearer "+tokenTable //notice the space character between "Bearer" and token
            }, 
            "data": JSON.stringify({
                "pass": inputPass,
                "userId": inputUser,
                "Url": inputUrl
              })
        };
        console.log(settings);
        $.ajax(settings).done(function(response) { 
            console.log(response)
        }); 
    location.reload();
}

testPlugin.prototype.updateUser= function(userId){
    var tokenTable = this.getCookie('webapitoken');
    var customTableDir="users";
    var user =document.getElementById(`userIdUserRow${userId}`).innerText;
    var urlUser  =document.getElementById(`userUrlRow${userId}`).innerText;
    var rowId=userId;
    var settings = {
        "url": `${window.location.protocol}//${window.location.host}/api/v2/plugins/${packageId.value}/custom-tables/${customTableDir}/rows/${rowId}`, 
        "method": "PUT", 
        "headers": { 
            "Content-Type": "application/json",
            "Authorization": "Bearer " + tokenTable //notice the space character between "Bearer" and token
        }, 
        "data": JSON.stringify({
            "userId": user,
            "Url": urlUser
          }),
    };
    $.ajax(settings).done(function (response) {
        console.log(response);
      }); 
    location.reload();
}

testPlugin.prototype.deleteUser=function(userId){
    var tokenTable = this.getCookie('webapitoken');
    var customTableDir="users";
    if (confirm(`Sure to delete User?`)) {
        var rowId=userId;
        var settings = {
            "url": `${window.location.protocol}//${window.location.host}/api/v2/plugins/${packageId.value}/custom-tables/${customTableDir}/rows/${rowId}`, 
            "method": "DELETE", 
            "headers": { 
                "Content-Type": "application/json",
                "Authorization": "Bearer " + tokenTable //notice the space character between "Bearer" and token
            },
    
        };
        $.ajax(settings).done(function (response) {
            console.log(response);
          }); 
      } else {
        
      }
      location.reload();
}

testPlugin.prototype.getCookie=function(name){
    var value = '; ' + document.cookie;
    var parts = value.split('; ' + name + '=');
    if (parts.length === 2) {
        return parts.pop().split(';').shift();
    }
}

testPlugin.prototype.obtainTableWithAuth=function(customTable){
    var tokenTable = this.getCookie('webapitoken');
    var url=window.location.host;
    var customTableDir=customTable; 
    try{
        var settings = {
            "url": `${window.location.protocol}//${url}/api/v2/plugins/${packageId.value}/custom-tables/${customTableDir}/`, 
            "method": "GET", 
            "headers": { 
                "Content-Type": "application/json",
                "Authorization": "Bearer " + tokenTable //notice the space character between "Bearer" and token
            }, 
            "data": "" //JSON object
        };
        $.ajax(settings).done(function(response) { 
            response.Records.forEach (user  =>{
                console.log(user)
                document.getElementById("usersInfo").innerHTML+=
                `<tr id=${user.Id}>
                    <td contenteditable='true' id="userIdRow${user.Id}">${user.Id}</td>
                    <td contenteditable='true'id="userIdUserRow${user.Id}">${user.userId}</td>
                    <td contenteditable='true' id="userUrlRow${user.Id}">${user.Url}</td>
                    <td><button class="Update" id=deleteButton onClick="myPlugin.updateUser('${user.Id}')"  data-toggle="modal" data-target="#UpdateModal">Update</button></td>
                    <td><button class="delete" id=deleteButton onClick="myPlugin.deleteUser('${user.Id}')"  data-toggle="modal" data-target="#DeleteModal">Delete</button></td>
                 </tr>  
                `;
            })
        });
    
    }catch(e){
        console.log(e)
    }
}
//End InfoHtmlFunctions

//ConfigsHtmlFunctions
testPlugin.prototype.sendUserConfig=function(){ 
    var tokenTable = this.getCookie('webapitoken');
    var customTableDir="configs";
    var div1=document.getElementById("inputDiv1").value;
    var div2=document.getElementById("inputDiv2").value;
    var user=document.getElementById("inputUser").value;
        var settings = {
            "url": `${window.location.protocol}//${window.location.host}/api/v2/plugins/${packageId.value}/custom-tables/${customTableDir}/rows`, 
            "method": "POST", 
            "headers": { 
                "Content-Type": "application/json",
                "Authorization": "Bearer "+tokenTable //notice the space character between "Bearer" and token
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
//End ConfigsHtmlFunctions

var myPlugin = undefined;
$(document).ready(() => {
    myPlugin = new testPlugin();
});