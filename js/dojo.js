const _default_url = 'data/default.json';
const _base_url = 'data/base.json';

var _itinerary = null;
var _accommodationOptions = [];
var _classOptions = [];
var _ticketOptions = [];
var _rentalOptions = [];
var _busOptions = [];
var _otherOptions = [];

function Itinerary() {
  this.days = [];
  // this.bus = {inbound:null, outbound:null};
  this.others = [];
  this.people = 1;
  this.firstDate = null;
  // this.numOfDay = 1;
  this.addADay = function() {
    var itineraryDate = new ItineraryDate();
    itineraryDate.parent = this;
    itineraryDate.date = this.firstDate.addDays(this.days.length);

    this.days.push(itineraryDate);
  };

  this.removeADay = function() {
    if(this.days.length < 2)
      return;
    this.days.pop();
  };

  this.initByJson = function(jsonData) {
    var itineraryDateList = jsonData.days;
    for(var i = 0;i<itineraryDateList.length;i++) {
      var itineraryDate = new ItineraryDate();
      itineraryDate.parent = this;
      itineraryDate.date = this.firstDate.addDays(i);

      itineraryDate.bus = this.getPIListFromJson(itineraryDateList[i].bus);
      itineraryDate.accommodation = this.getPIListFromJson(itineraryDateList[i].accommodation);
      itineraryDate.rentals = this.getPIListFromJson(itineraryDateList[i].rentals);
      itineraryDate.class = this.getPIListFromJson(itineraryDateList[i].class);
      itineraryDate.liftTicket = this.getPIListFromJson(itineraryDateList[i].lift_ticket);
      itineraryDate.others = this.getPIListFromJson(itineraryDateList[i].others);

      this.days.push(itineraryDate);
    }

    this.others = this.getPIListFromJson(jsonData.others);
  };

  this.getPIListFromJson = function(json) {
    var list = [];
    if(json)
      for(var j = 0;j<json.length;j++) {
        list.push(this.getPIFromJson(json[j]));
      }
    return list;
  }

  this.getPIFromJson = function(json) {
    var item = null;
    if(json) {
        item = new PriceItem(json.name);
        item.price = json.price;
        item.unit = json.unit;
        item.num = this.people;
        item.info = json.info;
    }
    return item;
  }

  this.calPrice = function() {
    var price = 0;

    for(var i = 0;i<this.days.length;i++) {
      price += this.days[i].calPrice();
    }

    for(var i = 0;i<this.others.length;i++) {
      price += this.others[i].calPrice();
    }

    return price;
  };
}

function ItineraryDate(itinerary, date) {
  this.parent = itinerary;
  this.date = date;
  this.accommodation = [];
  this.rentals = [];
  this.class = [];
  this.liftTicket = [];
  this.bus = [];
  this.others = [];

  this.calPrice = function() {
    var price = 0;

    // if(this.accommodation) {
    //   price += this.accommodation.calPrice();
    // }

    // if(this.bus) {
    //   price += this.bus.calPrice();
    // }

    for(var i = 0;i<this.accommodation.length;i++) {
      price += this.accommodation[i].calPrice();
    }

    for(var i = 0;i<this.bus.length;i++) {
      price += this.bus[i].calPrice();
    }

    for(var i = 0;i<this.rentals.length;i++) {
      price += this.rentals[i].calPrice();
    }

    for(var i = 0;i<this.class.length;i++) {
      price += this.class[i].calPrice();
    }

    for(var i = 0;i<this.liftTicket.length;i++) {
      price += this.liftTicket[i].calPrice();
    }

    for(var i = 0;i<this.others.length;i++) {
      price += this.others[i].calPrice();
    }

    return price;
  };
}

function PriceItem(name) {
  this.name = name;
  this.price = 0;
  this.unit = '';
  this.num = 1;
  this.info = "";

  this.calPrice = function() {
    return this.price*this.num;
  }
}

/*** Loaders ***/
function loadDefault(itinerary) {
  $.ajax({
    dataType: 'json',
    url: _default_url,
    async: false,
    //data: data,
    success: function (data) {
      itinerary.initByJson(data);
    }
  });
}

function loadBase() {
  // console.log('loadBase');
  $.ajax({
    dataType: 'json',
    url: _base_url,
    async: false,
    //data: data,
    success: function (data) {
      initOptionsByJson(data);
    }
  });
}

/*** Parser ***/
function initOptionsByJson(data) {
  // console.log('in'+data);
  for(var i =0;i<data.bus.length;i++) {
    _busOptions.push(initItemByJson(data.bus[i]));
  }

  for(var i =0;i<data.accommodation.length;i++) {
    _accommodationOptions.push(initItemByJson(data.accommodation[i]));
  }

  for(var i =0;i<data.class.length;i++) {
    _classOptions.push(initItemByJson(data.class[i]));
  }

  for(var i =0;i<data.ticket.length;i++) {
    _ticketOptions.push(initItemByJson(data.ticket[i]));
  }

  for(var i =0;i<data.rental.length;i++) {
    _rentalOptions.push(initItemByJson(data.rental[i]));
  }

  for(var i =0;i<data.other.length;i++) {
    _otherOptions.push(initItemByJson(data.other[i]));
  }
}

function initItemByJson(jsonItem) {
  var item = new PriceItem(jsonItem.name);
  // item.name = ;
  item.price = jsonItem.price;
  item.info = jsonItem.info;
  item.unit = jsonItem.unit;
  // console.log(item.unit);
  return item;
}

/*** Tools ***/
Date.prototype.addDays = function(days)
{
    var dat = new Date(this.valueOf());
    dat.setDate(dat.getDate() + days);
    return dat;
}
