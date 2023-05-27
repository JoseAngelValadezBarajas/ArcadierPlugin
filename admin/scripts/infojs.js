var token = getCookie('webapitoken');
console.log("Token: ",token)
var user;
var url=window.location.host; //Ocuparemos en este caso ${window.location.host}
var customTable="users";
obtainTablewithAuth();

function obtainTablewithAuth(){
    try{
        var settings = {
            "url": `${window.location.protocol}//${url}/api/v2/plugins/0db2bace-59df-4070-ad98-d0e2821b8851/custom-tables/${customTable}/`, 
            "method": "GET", 
            "headers": { 
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token //notice the space character between "Bearer" and token
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
                    <td><button class="Update" id=deleteButton onClick="updateUser('${user.Id}')"  data-toggle="modal" data-target="#UpdateModal">Update</button></td>
                    <td><button class="delete" id=deleteButton onClick="deleteUser('${user.Id}')"  data-toggle="modal" data-target="#DeleteModal">Delete</button></td>
                 </tr>  
                `;
            })
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

function deleteUser(userId){
  if (confirm(`Sure to delete User?`)) {
    var rowId=userId;
    var settings = {
        "url": `${window.location.protocol}//${url}/api/v2/plugins/0db2bace-59df-4070-ad98-d0e2821b8851/custom-tables/${customTable}/rows/${rowId}`, 
        "method": "DELETE", 
        "headers": { 
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token //notice the space character between "Bearer" and token
        },

    };
    $.ajax(settings).done(function (response) {
        console.log(response);
      }); 
  } else {
    
  }
  location.reload();
}

function updateUser(userId){
    var user =document.getElementById(`userIdUserRow${userId}`).innerText;
    var urlUser  =document.getElementById(`userUrlRow${userId}`).innerText;
    var rowId=userId;
    var settings = {
        "url": `${window.location.protocol}//${url}/api/v2/plugins/0db2bace-59df-4070-ad98-d0e2821b8851/custom-tables/${customTable}/rows/${rowId}`, 
        "method": "PUT", 
        "headers": { 
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token //notice the space character between "Bearer" and token
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

function sendnewUser(){
    var inputUser=document.getElementById("inputUser").value;
    var inputPass=document.getElementById("inputPass").value;
    var inputUrl=document.getElementById("inputUrl").value;
        var settings = {
            "url": `${window.location.protocol}//${url}/api/v2/plugins/0db2bace-59df-4070-ad98-d0e2821b8851/custom-tables/${customTable}/rows`, 
            "method": "POST", 
            "headers": { 
                "Content-Type": "application/json",
                "Authorization": "Bearer "+token //notice the space character between "Bearer" and token
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

