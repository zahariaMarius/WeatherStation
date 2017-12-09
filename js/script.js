/**
 * @Author: Zaharia Laurentiu Jr Marius
 * @Date:   2017-11-30T09:25:57+01:00
 * @Email:  laurentiu.zaharia@edu.itspiemonte.it
 * @Project: WeatherStation
 * @Filename: script.js
 * @Last modified by:   Zaharia Laurentiu Jr Marius
 * @Last modified time: 2017-12-07T12:22:43+01:00
 */

//prova push da ubuntu bitch

 // $("#input-station-name").on("keyup", function() {
 //   var value = $(this).val().toLowerCase();
 //   $(".stationName").filter(function() {
	//    //console.log($(this).index(".headerAccordion"));
	//    //$(".accordion").toggle($(this).text().toLowerCase().indexOf(value) > -1)
	//  //$(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
	//  //console.log($(this).index('.header'));
	//  if ($(this).text().toLowerCase().indexOf(value) > -1) {
	//  	console.log("index: " + $(this).index('.headerAccordion'));
	// 	var a = $(this).index('.headerAccordion');
	// 	$('.accordion').eq(a).show();
	// 	//$('.accordion')[a].toggle($(this).text().toLowerCase().indexOf(value) > -1);
	// }else {
	// 	var a = $(this).index('.headerAccordion');
	// 	$('.accordion').eq(a).hide();
	// }
	//  //console.log("cazzo");
	//  //console.log($(this).text().toLowerCase().indexOf(value));
 // });
 // });
 //
 // $("#select-country").on("change", function() {
 //   var value = $(this).val().toLowerCase();
 //   console.log(value);
 //   $(".headerAccordion").filter(function() {
	//   //console.log($(this).index(".headerAccordion"));
	//   //$(".accordion").toggle($(this).text().toLowerCase().indexOf(value) > -1)
	// //$(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
	// //console.log($(this).index('.header'));
	// if ($(this).text().toLowerCase().indexOf(value) > -1) {
	//    console.log("index: " + $(this).index('.headerAccordion'));
	//    var a = $(this).index('.headerAccordion');
	//    $('.accordion').eq(a).show();
	//    //$('.accordion')[a].toggle($(this).text().toLowerCase().indexOf(value) > -1);
 //   }else {
	//    console.log("nessuno");
	//    var a = $(this).index('.headerAccordion');
	//    $('.accordion').eq(a).hide();
 //   }
	// //console.log("cazzo");
	// //console.log($(this).text().toLowerCase().indexOf(value));
 // });
 // });



/**
 * [selectedItem array that contain all opened accordion and it's heigth]
 * @type {Array}
 *
 */
var selectedItem = [];

/**
 * [getApiData get all json weather data from API]
 * @return {[type]} [description]
 */
function getApiWeatherData() {
	$.ajax({
		url: 'https://www.torinometeo.org/api/v1/realtime/data/',
		type: 'GET',
		dataType: 'JSON',
	})
	.done(function(weatherData) {
		console.log("success");
		console.log(weatherData);
		$('#accordionContainer').empty();
		getLastUpdate();
		createAccordions(weatherData);
		//addEventListenerToAccordion(weatherData);
	})
	.fail(function(error) {
		console.log(error);
		console.log(error.status);
		console.log(error.statusText);
		//display the error data into page
	})
	.always(function() {
		console.log("ajax call complete");
	});

	//var refreshData = setTimeout(getApiWeatherData, 15000);
}

/**
 * [createAccordions function that create all accordion for how many weather detections returns]
 * @param  {[Array]} weatherData [all detections received]
 * @return {[type]}             [description]
 */
function createAccordions(weatherData) {
	for (var item in weatherData) {
		if (weatherData.hasOwnProperty(item)) {
			createAccordion(weatherData[item]);
		}
	}
}

/**
 * [createAccordion function that create the accordion div]
 * @param  {[Object]} singleWeatherData [object that contain sigle weather data]
 * @return {[type]}                   [description]
 */
function createAccordion(singleWeatherData) {
	/**
	 * [accordionContainer call from DOM accordionContainer div]
	 * @type {[type]}
	 */
	var accordionContainer = $('#accordionContainer');

	/**
	 * [accordionDiv that contain the header and body]
	 * @type {[type]}
	 */
	var accordionDiv = $('<div></div>').addClass('accordion');

	/**
	 * [headerAccordionDiv is the header of accordion]
	 * @type {[type]}
	 */
	var headerAccordionDiv = craeteHeaderAccordion(singleWeatherData);
	/**
	 * [bodyAccordionDiv is the body of accordion]
	 * @type {[type]}
	 */

	//append the header and body to accordion
	accordionDiv.append(headerAccordionDiv);
	//append accordion to container
	accordionContainer.append(accordionDiv);
}

/**
 * [craeteHeaderAccordion function that create the header div of accordion div]
 * @param  {[Object]} singleWeatherData [object that contain sigle weather data]
 * @return {[type]}                   [header div]
 */
function craeteHeaderAccordion(singleWeatherData) {
	/**
	 * [headerAccordionDiv create headerAccordionDiv that contain the main informations]
	 * @type {[type]}
	 */
	var headerAccordionDiv = $('<div></div>').addClass('headerAccordion');

	/**
	 * [nationFlag create nationFlag]
	 * @type {[type]}
	 */
	var nationFlag = getFlagImage(singleWeatherData);


	var stationName = $('<p>' + singleWeatherData.station.name + '</p>').addClass('stationName');

	var weatherIcon = getWeatherIcon(singleWeatherData);

	var temperature = $('<p>' + singleWeatherData.temperature + '</p>');
	temperature.addClass('temperature');
	var temperatureMax = singleWeatherData.temperature_max;
	var temperatureMin = singleWeatherData.temperature_min;
	var relativeHumidity = singleWeatherData.relative_humidity;
	var windStrength = singleWeatherData.wind_strength;

	headerAccordionDiv.html("Max: " + temperatureMax + " Min: " +
						temperatureMin + ", umidità: " + relativeHumidity
						+ ", vento: " + windStrength).prepend(nationFlag,
						stationName).append(weatherIcon, temperature);

	headerAccordionDiv.click(function(event) {
		if (checkIfBodyAccordionNotExist($(this))) {
			createBodyAccordionEventListener($(this), singleWeatherData);
		}
		applyBodyAccordionAnimation($(this));
	});
	return headerAccordionDiv;
}

/**
 * [applyBodyAccordionAnimation function that aplly the animation on body]
 * @param  {[type]} header [header element clicked]
 * @return {[type]}        [description]
 */
function applyBodyAccordionAnimation(header) {
	var bodyAccordion = header.next('.bodyAccordion');
	console.log("bodyAccordion");
	console.log(bodyAccordion.prop("scrollHeight"));
		if(bodyAccordion[0].style.maxHeight) {
			bodyAccordion[0].style.maxHeight = null;
		}else {
			bodyAccordion[0].style.maxHeight = bodyAccordion[0].scrollHeight + "px";
		}
}

/**
 * [checkIfBodyAccordionExist function that check if the requested body already exist]
 * @param  {[type]} header [header element clicked]
 * @return {[type]}        [description]
 */
function checkIfBodyAccordionNotExist(header) {
	var flag = false;
	if (header.next('.bodyAccordion').length == 0) {
		flag = true;
	}
	return flag;
}

/**
 * [createBodyAccordionEventListener function that create a body of the accordion header clicked and append it to accordion]
 * @param  {[type]} header            [header clicked]
 * @param  {[Object]} singleWeatherData [single weather object]
 * @return {[type]}                   [description]
 */
function createBodyAccordionEventListener(header, singleWeatherData) {
	var index = header.index('.headerAccordion');
	console.log(index);
	var bodyAccordionDiv = createBodyAccordion(singleWeatherData);
	$('.accordion')[index].append(bodyAccordionDiv[0]);
}

/**
 * [createBodyAccordion function that create the body div of accordion div]
 * @param  {[Object]} singleWeatherData [object that contain sigle weather data]
 * @return {[type]}                   [body div]
 */

function createBodyAccordion(singleWeatherData) {
	/**
	 * [bodyAccordionDiv create bodyAccordionDiv that contain the descriptions]
	 * @type {[type]}
	 */
	var bodyAccordionDiv = $('<div></div>').addClass('bodyAccordion');
	var pLocation = $('<p> Località: ' + singleWeatherData.station.city + ' in provincia di ' + singleWeatherData.station.province.name + ', ' + singleWeatherData.station.region.name + ' in ' + singleWeatherData.station.nation.name + '  </p>');
	var imageWebcam = getWebcamImage(singleWeatherData);
	var pClimate = $('<p> Clima: ' + singleWeatherData.station.climate + '</p>')
	var pDescription = $("<p> Descrizione della stazione: " + singleWeatherData.station.description + "</p>");
	bodyAccordionDiv.append(pLocation, pDescription, pClimate, imageWebcam);
	return bodyAccordionDiv;
}

/**
 * [getFlagImage function that return the image element containing image flag]
 * @param  {[Object]} singleWeatherData [object that contain sigle weather data]
 * @return {[type]}                   [description]
 */
function getFlagImage(singleWeatherData) {
	switch (singleWeatherData.station.nation.name) {
		case "Italia":
			return $('<img></img>').addClass('nationFlag').attr({src: 'media/italy_flag.jpg', alt: 'italy'});
		case "Francia":
			return $('<img></img>').addClass('nationFlag').attr({src: 'media/france_flag.jpeg', alt: 'france'});
		case "Svizzera":
			return $('<img></img>').addClass('nationFlag').attr({src: 'media/swiss_flag.jpg', alt: 'swiss'});
		default:
			return $('<img></img>').addClass('nationFlag').attr({src: 'media/no_flag_avaible.jpeg', alt: 'no image avaible'});
	}
}

/**
 * [getWeatherIcon function that return the img element containing weather icon]
 * @param  {[Objec]} singleWeatherData [object that contain sigle weather data]
 * @return {[type]}                   [description]
 */
function getWeatherIcon(singleWeatherData) {
	if ((singleWeatherData.hasOwnProperty("weather_icon")) && (singleWeatherData.weather_icon != null)) {
		return $('<img></img>').addClass('weatherIcon').attr('src', singleWeatherData.weather_icon.icon);
	}
}

/**
 * [checkIfAccordionIsOpen function that control if accordio was open, if true remain open]
 * @param  {[Int]} accordionIndex [index of created accordion]
 * @return {[type]}                [description]
 */
function checkIfAccordionIsOpen(accordionIndex) {
	var flag = false;
	for (var index in selectedItem) {
		if (selectedItem.hasOwnProperty(index)) {
			if (accordionIndex == index) {
				flag = true;
			}
		}
	}
	return flag;
}

/**
 * [getLastUpdate function to print the last date of the page's refresh]
 * @return {[type]} [description]
 */
function getLastUpdate(){
	var formatDate = new Date();
	var date = $('p.lastUpdate')
	date.html(formatDate.toUTCString());
	var divDate = $('div#divDate');
	divDate.append(date);
}

/**
 * [getWebcamImage  function to get the webcam image]
 * @param  {[Object]} singleWeatherData [description]
 * @return {[type]}                   [description]
 */
function getWebcamImage(singleWeatherData){
	if (singleWeatherData.station['webcam'] == ""){
		return $('<p>').html('there is no image for this weather station').addClass('imageNotFound');
	}else{
		return $('<img>').addClass('webcamImg').attr('src', singleWeatherData.station['webcam']);
	}
}

//call the function that get the weather data
getApiWeatherData();
