var user;
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
