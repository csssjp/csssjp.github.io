function presentDateInDiv(id_token, itineraryDate, idx) {
  divStr = "<div id='"+id_token+"' class='dayDiv'>";
  divStr += "<table border='0' style='width: 100%; border-spacing: 0px;'><tr>";
  divStr += "<td valign='top' class='dayLabel'>第 "+idx+" 天</td>";
  divStr += "<td valign='top' class='dayContent'>";
  divStr += "<div class='dayDateLabel'>"+$.datepicker.formatDate('yy/mm/dd', itineraryDate.date)+"</div>";
  divStr += "<div class='dayDetails'>"+presentDayDetail(id_token, itineraryDate)+"</div>";
  divStr += "</td>";
  divStr += "<td valign='top' class='dayContent' style='width: 80px;' >";
  divStr += "<div class='dayDateLabel' style='color:#e6e6e6;'>addButton</div>";
  divStr += "<input type='button' class='addItemBtn' onclick='showAddItemWindow(\""+id_token+"\")' value='加入'/></td>";
  divStr += "</tr></table>";
  divStr += "</div>";
  return divStr;
}

function presentOthers(id_token, itinerary) {
  var str = "";
  str += presentListItem(id_token, itinerary.others, 'othersColor', 'icon_locker.png');
  //console.log(str);
  return str;
}

function presentDayDetail(id_token, itineraryDate) {
  var str = "";
  str += presentListItem(id_token+'_bus', itineraryDate.bus, 'busColor', 'icon_bus.png');
  str += presentListItem(id_token+'_accommodation', itineraryDate.accommodation, 'accommColor', 'icon_home.png');
  str += presentListItem(id_token+'_class', itineraryDate.class, 'classColor', 'icon_class.png');
  str += presentListItem(id_token+'_liftTicket', itineraryDate.liftTicket, 'liftTicketColor', 'icon_ticket.png');
  str += presentListItem(id_token+'_rentals', itineraryDate.rentals, 'rentalsColor', 'icon_rental.png');
  return str;
}

function presentSingleItem(id_token, priceItem, styleText, icon) {
  var str = "";
  if(priceItem) {
    var iconSnippet = "";
    var eventSnippet = "onclick='selectPriceItem(\""+id_token+"\");'";

    str += "<div id='"+id_token+"' class='itemBlock'>";

    if(icon) {
      str += "<img class='itemIcon' src='image/"+icon+"' />";
      iconSnippet = "style='padding-left:30px'";
    }
    str += "<span class='item itemName "+styleText+"' "+iconSnippet+" "+eventSnippet+">"+priceItem.name;
    if(priceItem.info) {
      str += "  <img src='image/icon_info.png' class='itemInfoIcon' title='"+priceItem.info+"' />";
    }
    str += "</span><span class='item itemNum'>"+priceItem.num+priceItem.unit+"</span></div>";
  }
  return str;
}

function presentListItem(id_token, priceItemList, styleText, icon) {
  var str = "";
  for(var i=0; i< priceItemList.length; i++) {
    str += presentSingleItem(id_token+'_'+i, priceItemList[i], styleText, icon);
  }
  return str;
}

function applyTooltipEffect() {
  $('.itemInfoIcon').hover(function(){
        // Hover over code
        var title = $(this).attr('title');
        $(this).data('tipText', title).removeAttr('title');
        $('<p class="tooltip"></p>')
        .text(title)
        .appendTo('body')
        .fadeIn('slow');
  }, function() {
          // Hover out code
          $(this).attr('title', $(this).data('tipText'));
          $('.tooltip').remove();
  }).mousemove(function(e) {
          var mousex = e.pageX + 20; //Get X coordinates
          var mousey = e.pageY + 10; //Get Y coordinates
          $('.tooltip')
          .css({ top: mousey, left: mousex })
  });
}

function showAddItemWindow(id_token) {
  var window_id = id_token+'_additem';
  var windowHtml = '<div id="'+window_id+'" class="addItemWindow">';
  windowHtml += '<table><tr>';
  windowHtml += '<td><div onclick="showItemList(\'bus\', \''+id_token+'\');" class="addOptionImg" style="background-image: url(\'image/icon_bus.png\');" ><div class="addOptionImgText">機場巴士</div></div></td>';
  windowHtml += '<td><div onclick="showItemList(\'accommodation\', \''+id_token+'\');" class="addOptionImg" style="background-image: url(\'image/icon_home.png\');" ><div class="addOptionImgText">住宿</div></div></td>';
  windowHtml += '<td><div onclick="showItemList(\'class\', \''+id_token+'\');" class="addOptionImg" style="background-image: url(\'image/icon_class.png\');" ><div class="addOptionImgText">課程</div></div></td>';
  windowHtml += '</tr><tr>';
  windowHtml += '<td><div onclick="showItemList(\'rentals\', \''+id_token+'\');" class="addOptionImg" style="background-image: url(\'image/icon_rental.png\');" ><div class="addOptionImgText">器材租賃</div></div></td>';
  windowHtml += '<td><div onclick="showItemList(\'liftTicket\', \''+id_token+'\');" class="addOptionImg" style="background-image: url(\'image/icon_ticket.png\');" ><div class="addOptionImgText">雪票</div></div></td>';
  windowHtml += '<td><div class="addOptionImg" style="background-image: url(\'image/icon_empty.png\'); color: rgb(67, 164, 210);" onclick="hideAddItemWindow(\''+window_id+'\');"><div class="addOptionImgText">取消</div></div></td>';
  windowHtml += '</tr></table>';
  var position = $('#'+id_token).position();
  applyModalEffect();
  $(windowHtml).css({ top: position.top, left: position.left+150 }).appendTo('body').fadeIn('fast');
}

function showAddItemWindowSpecial(id_token) {
  var window_id = '_additem';
  var windowHtml = '<div id="'+window_id+'" class="addItemWindow">';
  windowHtml += '<table><tr>';
  windowHtml += '<td><div onclick="showItemList(\'others\', \'\');" class="addOptionImg" style="background-image: url(\'image/icon_locker.png\');" ><div class="addOptionImgText">雪具保管</div></div></td>';
  windowHtml += '<td><div  class="addOptionImg"  ></div></td>';
  windowHtml += '<td><div  class="addOptionImg"  ></div></td>';
  windowHtml += '</tr><tr>';
  windowHtml += '<td><div  class="addOptionImg"  ></div></td>';
  windowHtml += '<td><div  class="addOptionImg"  ></div></td>';
  windowHtml += '<td><div class="addOptionImg" style="background-image: url(\'image/icon_empty.png\'); color: rgb(67, 164, 210);" onclick="hideAddItemWindow(\''+window_id+'\');"><div class="addOptionImgText">取消</div></div></td>';
  windowHtml += '</tr></table>';
  var position = $('#'+id_token).position();
  applyModalEffect();
  $(windowHtml).css({ top: position.top, left: position.left+150 }).appendTo('body').fadeIn('fast');
}

function hideAddItemWindow(window_id) {
  removeModalEffect();
  $('#'+window_id).remove();
}

function applyModalEffect() {
  $('<div id="modalBG" class="modal">').appendTo('body').fadeIn('fast');
}

function removeModalEffect() {
  $('#modalBG').remove();
}

function showItemList(type, id_token) {
  var optionList = getGlobalInstanceByType(type);
  var window_id = id_token+'_additem';

  var selectHtml = '<select id="'+window_id+'_select" size="8" style="font-size: 15px; min-width: 200px; margin-bottom: 10px;">';
  for(var i=0;i<optionList.length;i++) {
    var selectStr = "";
    if(i==0) {
      selectStr='selected';
    }
    selectHtml += '<option value="'+type+':'+i+'" '+selectStr+' data-unit="'+optionList[i].unit+'">'+optionList[i].name+'</option>';
  }
  selectHtml += '</select>';

  var numHtml = '<div>';
  numHtml += '<span style="font-size: 18px; ">數量：</span>';
  numHtml += '<input type="number" id="'+window_id+'_num" style="height: 20px; width: 40px; font-size: 18px;"  min="1" max="99" value="1" ></input>';
  numHtml += '<span id="option_unit" style="font-size: 18px; "> '+optionList[0].unit+'</span>';
  numHtml += '</div>';


  var windowHtml = '<table><tr>';
  windowHtml += '<td rowspan="2"><div style="min-width:220px" >'+selectHtml+numHtml+'</div></td>';
  windowHtml += '<td><div class="addOptionImg" style="background-image: url(\'image/icon_empty.png\'); color: rgb(67, 164, 210);" onclick="addItemOnClick(\''+id_token+'\');"><div class="addOptionImgText">加入</div></div></td>';
  windowHtml += '</tr><tr>';
  windowHtml += '<td><div class="addOptionImg" style="background-image: url(\'image/icon_empty.png\'); color: rgb(67, 164, 210);" onclick="hideAddItemWindow(\''+window_id+'\');"><div class="addOptionImgText">取消</div></div></td>';
  windowHtml += '</tr></table>';

  $('#'+window_id).html(windowHtml);

  $('#'+window_id+'_num').on("change", function() {
      var val = Math.abs(parseInt(this.value, 10) || 1);
      this.value = val > 99 ? 99 : val;
  });

  $('#'+window_id+'_select').on("change", function() {
    var unitStr = $(this).find(':selected').data('unit');
    // console.log(unitStr);
    $('#option_unit').html(' '+unitStr);
  });

  $('#'+window_id+'_select').focus();
}

function addItemOnClick(id_token) {
  var window_id = id_token+'_additem';
  var objToken = $('#'+window_id+'_select').val();
  var token = objToken.split(':');
  var type = token[0];
  var idx = token[1];
  var obj  = getGlobalInstanceByType(type)[idx];
  var num = $('#'+window_id+'_num').val();

  var item = new PriceItem(obj.name);
  item.price = obj.price;
  item.unit = obj.unit;
  item.info = obj.info;
  item.num = parseInt(num);
  //console.log(id_token);
  var target_token = id_token+'_'+type;
  if(id_token == '') {
    target_token = type;
  }
  addPriceItem(target_token, item);
  hideAddItemWindow(window_id);
  updateItinerary();
}

function getGlobalInstanceByType(type) {
  if(type == 'bus') {
    return _busOptions;
  }else if(type == 'accommodation') {
    return _accommodationOptions;
  }else if(type == 'class') {
    return _classOptions;
  }else if(type == 'rentals') {
    return _rentalOptions;
  }else if(type == 'liftTicket') {
    return _ticketOptions;
  }else if(type == 'others') {
    return _otherOptions;
  }
}

// function itemObjToString(priceItem) {
//   var objStr = "{ 'name' : '"+priceItem.name+"', 'price' : '"+priceItem.price+"'";
//   if(priceItem.info) {
//       objStr += ", 'info' : '"+priceItem.info+"'";
//   }
//   objStr += "}";
//   return objStr;
// }
