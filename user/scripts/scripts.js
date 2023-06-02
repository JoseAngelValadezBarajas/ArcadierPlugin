//Constructor
var vbGateway =document.currentScript.src;
function testPlugin(){
    var re = /([a-f0-9]{8}(?:-[a-f0-9]{4}){3}-[a-f0-9]{12})/i;
    this.packageId = re.exec(vbGateway.toLowerCase())[1];
    this.customFieldPrefix = this.packageId.replace(/-/g, "");
    this.packagePath = vbGateway.replace('/scripts/script.js', '').trim();
    this.currentUrl = window.location.href.toLowerCase();
    //To Load customerHTML
    if(document.getElementById('customerSpace')){
        this.obtainTableWithAuth();
    }


}
//End of Constructor

//CustomerHTML Functions
testPlugin.prototype.customerdashboard=function(){
    var objData = 
        {
        user: "plugin",
        };
        $.ajax({
        url: `${window.location.protocol}//${window.location.host}/user/plugins/${packageId.value}/customer.php`,
        method: 'POST',
        data: JSON.stringify(objData),
        success: function(result) 
        {
            var respond = jQuery.parseJSON(result);
            var respond2 = jQuery.parseJSON(respond);
            respond2.Records.forEach(product => {
                document.getElementById("userinfo").innerHTML+=
                `<tr id=${product.Id}>
                    <td>${product.name}</td>
                    <td>${product.address}</td>
                </tr>  
                `;
            });
        }});
    
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const userParam = urlParams.get('user');
    var settings = {
        "url": `${window.location.protocol}//${window.location.host}/api/v2/plugins/${packageId.value}/custom-tables/configs/`,
        "method": "GET",
        "timeout": 0,
      };
      
      $.ajax(settings).done(function (response) {
        response.Records.forEach(info=>{
            if(info.userId==userParam){
                document.getElementById(`exampleDiv1`).style.backgroundColor=info.colorDiv1;
                document.getElementById(`exampleDiv2`).style.backgroundColor=info.colorDiv2;
            }
        });
      });
}
//End CustomerHTML Functions

//IndexHTML Functions
testPlugin.prototype.ValidateInfo=function(){
    var user = $('#inputUser').val();
    var pass = $('#inputPass').val();
        var objData = {
          user: user,
          pass: pass,
        };
        $.ajax({
            url: `${window.location.protocol}//${window.location.host}/user/plugins/${packageId.value}/user.php`,
            method: 'POST',
            data: JSON.stringify(objData),
            success: function(result) {
                var respond = jQuery.parseJSON(result);
                if(respond.access=="True"){
                    window.location.replace(`${window.location.protocol}//${window.location.host}/user/plugins/${packageId.value}/customer.html?user=${user}`);
                }     
            }});
}
//End of IndexHTML Functions












//Load Constructor
var myPlugin = undefined;
$(document).ready(() => {
    myPlugin = new testPlugin();
});