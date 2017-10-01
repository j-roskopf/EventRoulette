function search(){
  $("#tableContainer").hide();
  $("#feelingLuckyContainer").hide();

  var lat = $("#latitude").val();
  var lon = $("#longitude").val();
  var rad = $("#radius").val();
  var sort = $("#sortBy").find(":selected").text()

  $.ajax({
      url: "./php/search.php",
	  type: "POST",
	  dataType: "json",
	  data: {lat: lat, lon: lon, rad: rad, sort: sort},
      success: function(results){
          parseData(results);
          $("#load").button('reset');
          $("#lucky").button('reset');
          $("#tableContainer").show();

      },
	  failure: function(results, err, res){
		  alert("Failed - :(");
		  $("#load").button('reset');
          $("#lucky").button('reset');
          $("#feelingLuckyContainer").show();
	  }
  });

}
function parseData(data){
  var table = document.getElementById("table");

  //clear the old results - set to 1 to keep the header fields
  $("#table").find("tr:not(:first)").remove();

  $("#tableContainer").show();

  var category;
  var coverPicture;
  var description;
  var distance;
  var endTime;
  var id;
  var name;
  var profilePicture;
  var coverPicture;
  var startTime;
  var timeFromNow;
  var attending;
  var declined;
  var maybe;
  var noreply;
  var venueAbout;
  var venueCategory;
  var venueCoverPicture;
  var venueLocationCity;
  var venueLocationState;
  var venueLocationStreet;
  var venueLocationZip;
  var venueName;

  for(var i = data.events.length-1; i >= 0; i--){
    category = data.events[i].category;
    coverPicture = data.events[i].coverPicture;
    description = data.events[i].description;
    distance = data.events[i].distance; //meters
    endTime = data.events[i].endTime;
    id = data.events[i].id;
    name = data.events[i].name;
    profilePicture = data.events[i].profilePicture;
    startTime = data.events[i].startTime;
    timeFromNow = data.events[i].timeFromNow;

    if(data.events[i].stats){
      attending = data.events[i].stats.attending;
      declined = data.events[i].stats.declined;
      maybe = data.events[i].stats.maybe;
      noreply = data.events[i].stats.noreply;
    }


    if(data.events[i].venue){

      if(data.events[i].venue.about){
        venueAbout = data.events[i].venue.about;
      }

      venueCategory = data.events[i].venue.category;
      venueCoverPicture = data.events[i].venue.coverPicture;

      venueLocationCity = data.events[i].venue.location.city;
      venueLocationState = data.events[i].venue.location.state;
      venueLocationStreet = data.events[i].venue.location.street;
      venueLocationZip = data.events[i].venue.location.zip;

      venueName = data.events[i].venue.name;
    }


    //add after header
    var row = table.insertRow(1);

    //event description - make display in modal!
    var descriptionCell = row.insertCell(0);
    descriptionCell.innerHTML = description;

    var attendingCell = row.insertCell(0);
    attendingCell.innerHTML = attending + " / " + declined + " / " + maybe + " /  " + noreply;

    //event address
    var address = row.insertCell(0);
    address.innerHTML = venueLocationStreet + " " + venueLocationCity + " " + venueLocationZip;

    //event name
    var nameCell = row.insertCell(0);
    nameCell.innerHTML = venueName;

    //event start time
    var eventStartTime = row.insertCell(0);
    var startDate = new Date(startTime);
    eventStartTime.innerHTML = startDate.toString();

    //event name
    var eventNameCell = row.insertCell(0);
    eventNameCell.innerHTML = name;

    //icon
    var icon = row.insertCell(0);
    icon.innerHTML = '<img src="'+profilePicture+'" style="width:200px;height:200px;"></a>';

    //icon
    var icon = row.insertCell(0);
    var link = "https://www.facebook.com/events/" + id;
    icon.innerHTML = '<a href="'+link+'"><img src="images/facebook.png" style="width:32px;height:32px;"></a>';
  }
}

function feelingLucky(){
  $("#tableContainer").hide();
  $("#feelingLuckyContainer").hide();
  
  var lat = $("#latitude").val();
  var lon = $("#longitude").val();
  var rad = $("#radius").val();
  var sort = $("#sortBy").find(":selected").text()

  $.ajax({
      url: "./php/search.php",
	  type: "POST",
	  dataType: "json",
	  data: {lat: lat, lon: lon, rad: rad, sort: sort},
      success: function(results){
          displayFeelingLucky(results);
          $("#load").button('reset');
          $("#lucky").button('reset');
          $("#feelingLuckyContainer").show();

      },
	  failure: function(results, err, res){
		  alert("Failed - :(");
		  $("#load").button('reset');
          $("#lucky").button('reset');
          $("#feelingLuckyContainer").show();

	  }
  });
}

function displayFeelingLucky(data){
  var table = document.getElementById("feelingLuckyTable");

  //clear the old results - set to 1 to keep the header fields
  $("#feelingLuckyTable").find("tr:not(:first)").remove();

  var category;
  var coverPicture;
  var description;
  var distance;
  var endTime;
  var id;
  var name;
  var profilePicture;
  var coverPicture;
  var startTime;
  var timeFromNow;
  var attending;
  var declined;
  var maybe;
  var noreply;
  var venueAbout;
  var venueCategory;
  var venueCoverPicture;
  var venueLocationCity;
  var venueLocationState;
  var venueLocationStreet;
  var venueLocationZip;
  var venueName;

  category = data.events[0].category;
  coverPicture = data.events[0].coverPicture;
  description = data.events[0].description;
  distance = data.events[0].distance; //meters
  endTime = data.events[0].endTime;
  id = data.events[0].id;
  name = data.events[0].name;
  profilePicture = data.events[0].profilePicture;
  startTime = data.events[0].startTime;
  timeFromNow = data.events[0].timeFromNow;

  if(data.events[0].stats){
    attending = data.events[0].stats.attending;
    declined = data.events[0].stats.declined;
    maybe = data.events[0].stats.maybe;
    noreply = data.events[0].stats.noreply;
  }

  if(data.events[0].venue){
    if(data.events[0].venue.about){
      venueAbout = data.events[0].venue.about;
    }
    venueCategory = data.events[0].venue.category;
    venueCoverPicture = data.events[0].venue.coverPicture;
    venueLocationCity = data.events[0].venue.location.city;
    venueLocationState = data.events[0].venue.location.state;
    venueLocationStreet = data.events[0].venue.location.street;
    venueLocationZip = data.events[0].venue.location.zip;
    venueName = data.events[0].venue.name;
  }

  //add after header
  var row = table.insertRow(1);

  //event description - make display in modal!
  var descriptionCell = row.insertCell(0);
  descriptionCell.innerHTML = description;

  var attendingCell = row.insertCell(0);
  attendingCell.innerHTML = attending + " / " + declined + " / " + maybe + " /  " + noreply;

  //event address
  var address = row.insertCell(0);
  address.innerHTML = venueLocationStreet + " " + venueLocationCity + " " + venueLocationZip;

  //event name
  var nameCell = row.insertCell(0);
  nameCell.innerHTML = venueName;

  //event start time
  var eventStartTime = row.insertCell(0);
  var startDate = new Date(startTime);
  eventStartTime.innerHTML = startDate.toString();

  //event name
  var eventNameCell = row.insertCell(0);
  eventNameCell.innerHTML = name;

  //icon
  var icon = row.insertCell(0);
  icon.innerHTML = '<img src="'+coverPicture+'" style="width:200px;height:200px;"></a>';

  //icon
  var icon = row.insertCell(0);
  var link = "https://www.facebook.com/events/" + id;
  icon.innerHTML = '<a href="'+link+'"><img src="images/facebook.png" style="width:32px;height:32px;"></a>';

  //set the image
  $("#feelingLuckyImage").attr("src",coverPicture);
}
