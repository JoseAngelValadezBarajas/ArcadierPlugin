//Constructor
var vbGateway =document.currentScript.src;
function testPlugin(){
    var re = /([a-f0-9]{8}(?:-[a-f0-9]{4}){3}-[a-f0-9]{12})/i;
    this.packageId = re.exec(vbGateway.toLowerCase())[1];
    this.customFieldPrefix = this.packageId.replace(/-/g, "");
    this.packagePath = vbGateway.replace('/scripts/script.js', '').trim();
    this.currentUrl = window.location.href.toLowerCase();
    //To Load InfoHTML
    if(document.getElementById('infoTable')){
        this.obtainTableWithAuth();
    }
    //To Load ProductsHTML
    if(document.getElementById('productos')){
        this.getProducts();
    }

}
//End of Constructor


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
        $.ajax(settings).done(function(response) { 
            document.getElementById(`toast-container`).style.display="inline";
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
        document.getElementById(`toast-container`).style.display="inline";
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
            document.getElementById(`toast-container`).style.display="inline";
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
testPlugin.prototype.obtainTableWithAuth=function(){
    var tokenTable = this.getCookie('webapitoken');
    var customTableDir="users"; 
    try{
        var settings = {
            "url": `${window.location.protocol}//${window.location.host}/api/v2/plugins/${packageId.value}/custom-tables/${customTableDir}/`, 
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
            document.getElementById(`toast-container`).style.display="inline";
        });
    location.reload(); 
}
//End ConfigsHtmlFunctions

//E-Mail functions
testPlugin.prototype.SendEmail=function(){
    var token,userId,id0,name0,price0,id1,name1,price1;
    var objData = {data: "plugin",};
    $.ajax({
        url: `${window.location.protocol}//${window.location.host}/admin/plugins/${packageId.value}/Token.php`,
        method: 'POST',
        data: JSON.stringify(objData),
        success: function(result) 
        {
            var respond = jQuery.parseJSON(result);
            token=respond.Token;
            userId=respond.Id;
            var settings = {
                "url": `${window.location.protocol}//${window.location.host}/api/v2/items/`,
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
                var from=document.getElementById("forEmail").value;
                var to=document.getElementById("toEmail").value;
                var body = document.getElementById("bodyEmail").value;
                var subject=document.getElementById("subject").value;
                    var settings = {
                        "url": `${window.location.protocol}//${window.location.host}/api/v2/admins/${userId}/emails`, 
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
                        document.getElementById(`toast-container`).style.display="inline";
                        location.reload();
                    }); 
            })
        }});
}
//End E-Mail functions

//Products functions
testPlugin.prototype.getProducts=function(){
    var settings = {
        "url": `${window.location.protocol}//${window.location.host}/api/v2/items/`,
        "method": "GET",
        "timeout": 0,
        "headers": {
            "Content-Type": "application/json"
        }
    };
    $.ajax(settings).done(function (response){
        response.Records.forEach (product  =>{
            document.getElementById("productosinfo").innerHTML+=
            `<tr id=${product.ID}>
                <td>${product.MerchantDetail.DisplayName}</td>
                <td>${product.Categories[0].Name}</td>
                <td>${product.Name}</td>
                <td>${product.CurrencyCode}</td>
                <td>${product.Price}</td>
                <td>${product.BuyerDescription}</td>
            </tr>  
            `;
        })
    })
    $('th').click(function() {
        var table = $(this).parents('table').eq(0)
        var rows = table.find('tr:gt(0)').toArray().sort(comparer($(this).index()))
        this.asc = !this.asc
        if (!this.asc) {
          rows = rows.reverse()
        }
        for (var i = 0; i < rows.length; i++) {
          table.append(rows[i])
        }
        setIcon($(this), this.asc);
      })
  
      function comparer(index) {
        return function(a, b) {
          var valA = getCellValue(a, index),
            valB = getCellValue(b, index)
          return $.isNumeric(valA) && $.isNumeric(valB) ? valA - valB : valA.localeCompare(valB)
        }
      }
  
      function getCellValue(row, index) {
        return $(row).children('td').eq(index).html()
      }
  
      function setIcon(element, asc) {
        $("th").each(function(index) {
          $(this).removeClass("sorting");
          $(this).removeClass("asc");
          $(this).removeClass("desc");
        });
        element.addClass("sorting");
        if (asc) element.addClass("asc");
        else element.addClass("desc");
      }
}
//End Products fucntions

//Load Constructor
var myPlugin = undefined;
$(document).ready(() => {
    myPlugin = new testPlugin();
});




