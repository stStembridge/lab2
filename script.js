 $(document).ready(function() {
     $( "#cityField" ).keyup(function() {
 
    
    
 var url = "http://bioresearch.byu.edu/cs260/jquery/getcity.cgi?q="+$("#cityField").val();
$.getJSON(url,function(data) {
    var everything;
    everything = "<ul>";
    $.each(data, function(i,item) {
      everything += "<li> "+data[i].city;
    });
    everything += "</ul>";
    $("#txtHint").html(everything);
  })
  .done(function() { console.log('getJSON request succeeded!'); })
  .fail(function(jqXHR, textStatus, errorThrown) { 
    console.log('getJSON request failed! ' + textStatus); 
    console.log("incoming "+jqXHR.responseText);
  })
  .always(function() { console.log('getJSON request ended!');
  
  });
  
});
$("#weatherButton").click(function(e){
  var value = $("#cityField").val();
  console.log(value);
   $("#displayCity").text(value);
 
    var myurl= "http://api.openweathermap.org/data/2.5/forecast?id=524901&APPID=e215eba5a5089ba124142d9d44985841&q=";
          myurl += value +",usa";
         console.log(myurl);
           e.preventDefault();
          $.ajax({
            url : myurl,
    dataType : "json",
        success : function(parsed_json) {
            var location = parsed_json['city']['name'];
          
            console.log(parsed_json);
            //console.log(location);
            var current = parsed_json['list'].length - 1;
            console.log(current);
            var weather = parsed_json['list'][0]['weather'][0]['description'];
            var temp = parsed_json['list'][0]['main']['temp'];
            var temp_min = parsed_json['list'][0]['main']['temp_min'];
             var temp_max = parsed_json['list'][0]['main']['temp_max'];
            var cels = temp - 273.15;
            var cels_min = temp_min - 273.15;
            var cels_max = temp_max - 273.15;
            var fahr = (temp*9/5) - 459.67;
            var fahr_low = (temp_min*9/5) - 459.67;
            var fahr_high = (temp_max*9/5) - 459.67;
             var weather_icon = parsed_json['list'][0]['weather'][0]['icon'];
            var humidity = parsed_json['list'][0]['main']['humidity'];
             var wind_speed = parsed_json['list'][0]['wind']['speed'];
            var everything = "<img src=\"http://openweathermap.org/img/w/" + weather_icon + ".png\"/>"
             everything += "<ul>";
            everything += "<li>Location: " + location + "</li>";
            everything += "<li>Weather: " + weather + "</li>";
            everything += "<li>Temperature: " + Math.round(fahr) + " \xB0F (" + Math.round(cels) + " \xB0C)</li>";
            everything += "<li>Humidity: "+ humidity + "%</li>";
         // everything += "<li>Low: " + Math.round(fahr_low) + " &#8457; | High: " + Math.round(fahr_high) + " &#8457;";
            everything += "<li>Wind: " + wind_speed + " mph";
            everything += "</ul>";
            $("#weather").html(everything);
              e.preventDefault();
          }
          });
        });
//   });

  
   $("#searchButton").click(function(e){
  var value = $("#stackField").val();
  console.log(value);
  e.preventDefault();

  
    var myurl= "https://api.stackexchange.com/2.2/search?order=desc&sort=activity&intitle=";
          myurl += value +"&site=stackoverflow";
         console.log(myurl);
          e.preventDefault();
          
          $.ajax({
            url : myurl,
             dataType : "json",
             success : function(parsed_json) {
                console.log(parsed_json);
                var items = parsed_json["items"];
                console.log(items);
                var everything = "Searched Term: " + value + "<br><br><div id =\"results\"><strong>Results:</strong></div>";
                everything += "<ul>";
                var i = 0;
                $.each(items,function(i,item) {
                    everything += "<li> <a href=\"";
                    everything += items[i].link;
                    everything += "\">";
                    everything += items[i].title;
                    everything += "</a></li>";
                });
                everything += "</ul>";
                console.log(everything);
                $("#search").html(everything);
                e.preventDefault();
             }
             
          });
          
     });


   

});
