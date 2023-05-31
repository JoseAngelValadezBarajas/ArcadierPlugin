var plugin="0db2bace-59df-4070-ad98-d0e2821b8851";

var objData = {
    user: "plugin",};
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
