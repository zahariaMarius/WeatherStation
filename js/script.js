/**
 * @Author: Zaharia Laurentiu Jr Marius
 * @Date:   2017-11-30T09:25:57+01:00
 * @Email:  laurentiu.zaharia@edu.itspiemonte.it
 * @Project: WeatherStation
 * @Filename: script.js
 * @Last modified by:   Zaharia Laurentiu Jr Marius
 * @Last modified time: 2017-12-03T14:26:18+01:00
 */

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
		createAccordions(weatherData);
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
}

/**
 * [apllyAccordionAnimation function that aplly animation for all accordion created]
 * @return {[type]} [description]
 */
function applyAccordionAnimation() {
	var accordions = $('.headerAccordion');

	for (var i = 0; i < accordions.length; i++) {
		accordions[i].onclick = function() {
			this.classList.toggle("active");
			var bodyAccordion = this.nextElementSibling;
			if(bodyAccordion.style.maxHeight) {
				bodyAccordion.style.maxHeight = null;
			}else {
				bodyAccordion.style.maxHeight = bodyAccordion.scrollHeight + "px";
			}
		}
	}
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
	var accordionDiv = $('<div></div>').addClass('accordion')
	/**
	 * [headerAccordionDiv is the header of accordion]
	 * @type {[type]}
	 */
	var headerAccordionDiv = craeteHeaderAccordion(singleWeatherData);
	/**
	 * [bodyAccordionDiv is the body of accordion]
	 * @type {[type]}
	 */
	var bodyAccordionDiv = createBodyAccordion(singleWeatherData);

	//append the header and body to accordion
	accordionDiv.append(headerAccordionDiv, bodyAccordionDiv);
	//append accordion to container
	accordionContainer.append(accordionDiv);

	//call function that apply animation to accordion
	applyAccordionAnimation();
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

	var stationName = singleWeatherData.station.name;

	var weatherIcon = getWeatherIcon(singleWeatherData);

	var temperature = singleWeatherData.temperature;
	var temperatureMax = singleWeatherData.temperature_max;
	var temperatureMin = singleWeatherData.temperature_min;
	var relativeHumidity = singleWeatherData.relative_humidity;
	var windStrength = singleWeatherData.wind_strength;

	headerAccordionDiv.html("Nome stazione: " + stationName +
		" Temperatura:" + temperature + " Temperatura massima: " + temperatureMax +
		" Temperatura minima: " + temperatureMin + " Umidità: " + relativeHumidity+"%" +
		" Velocità vento: " + windStrength).append(weatherIcon, nationFlag);

	return headerAccordionDiv;
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
			return $('<img></img>').addClass('nationFlag').attr('src', 'media/italy_flag.jpg');
		case "Francia":
			return $('<img></img>').addClass('nationFlag').attr('src', 'media/france_flag.jpeg');
		case "Svizzera":
			return $('<img></img>').addClass('nationFlag').attr('src', 'media/swiss_flag.jpg');
		default:
			return $('<img></img>').addClass('nationFlag').attr('src', 'media/no_flag_avaible.jpg');
	}
}

/**
 * [getWeatherIcon function that return the img element containing weather icon]
 * @param  {[type]} singleWeatherData [object that contain sigle weather data]
 * @return {[type]}                   [description]
 */
function getWeatherIcon(singleWeatherData) {
	if ((singleWeatherData.hasOwnProperty("weather_icon")) && (singleWeatherData.weather_icon != null)) {
		return $('<img></img>').addClass('weatherIcon').attr('src', singleWeatherData.weather_icon.icon);
	}
}

//call the function that get the weather data
getApiWeatherData();
