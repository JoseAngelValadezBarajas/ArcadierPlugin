var plugin="0db2bace-59df-4070-ad98-d0e2821b8851";

var objData = 
    {
    user: "plugin",
    };
    $.ajax({
    url: `${window.location.protocol}//${window.location.host}/user/plugins/${plugin}/customer.php`,
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
    "url": `${window.location.protocol}//${window.location.host}/api/v2/plugins/0db2bace-59df-4070-ad98-d0e2821b8851/custom-tables/configs/`,
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