var _selecting_item = null;

function addADay() {
  _itinerary.addADay();
  updateItinerary();
}

function removeADay() {
  _itinerary.removeADay();
  updateItinerary();
}

function selectPriceItem(id_token) {
  if(_selecting_item == id_token)
      return;
  cancelEditing(_selecting_item);

  $('#'+id_token).find('span.itemName').addClass('selectItem');
  $('#'+id_token).append('<input id="'+id_token+'_btn" type="button" class="removeItemBtn" value="刪除" onclick="deletePriceItem(\''+id_token+'\')" />');
  _selecting_item = id_token;
}

function deletePriceItem(id_token) {
  // cancelEditing(id_token);
  _selecting_item = null;
  removeItemByTokenId(id_token);
  updateItinerary();
}

function addPriceItem(id_token, priceItem) {
  addItemByTokenId(id_token, priceItem);
}

function cancelEditing(id_token) {
  $('#'+id_token+'_btn').remove();
  $('#'+id_token).find('span.itemName').removeClass('selectItem');
}

function removeItemByTokenId(token_id) {
  var tokenArr = token_id.split('_');
  var lastToken = tokenArr.pop();
  var obj = digObjByTokenArr(_itinerary ,tokenArr);
  if(obj.constructor === Array) {
    obj.splice(lastToken, 1);
  }else{
    obj[lastToken] = null;
  }
}

function addItemByTokenId(token_id, priceItem) {
  var tokenArr = token_id.split('_');
  var lastToken = tokenArr.pop();
  var obj = digObjByTokenArr(_itinerary ,tokenArr);
  if(obj[lastToken].constructor === Array) {
    var sameItem = getSameItem(obj[lastToken], priceItem);
    if(sameItem) {
      sameItem.num += priceItem.num;
    }else {
      obj[lastToken].push(priceItem);
    }
  }else{
    // obj[lastToken] = priceItem;
    console.log('addItemByTokenId: error ocurred.')
  }
}

function getSameItem(list, item) {
  for(var i=0; i<list.length; i++) {
    if(list[i].name == item.name)
      return list[i];
  }
  return null;
}

function digObjByTokenArr(obj, tokenArr) {
  if(tokenArr.length < 1) {
    return obj;
  }
  var token = tokenArr.shift();
  //console.log('token:'+token);
  if(tokenArr.length < 1) {
    return obj[token];
  }
  return digObjByTokenArr(obj[token], tokenArr);
}


// function getValueByTokenId(token_id) {
//   var tokenArr = token_id.split('_');
//   return digObjByTokenArr(_itinerary ,tokenArr);
// }
