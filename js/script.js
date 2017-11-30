/**
 * @Author: Zaharia Laurentiu Jr Marius
 * @Date:   2017-11-30T09:25:57+01:00
 * @Email:  laurentiu.zaharia@edu.itspiemonte.it
 * @Project: WeatherStation
 * @Filename: script.js
 * @Last modified by:   Zaharia Laurentiu Jr Marius
 * @Last modified time: 2017-11-30T12:56:00+01:00
 */

//call the function that get the weather data
GetApiData();

/**
 * [getApiData get all json weather data from API]
 * @return {[type]} [description]
 */
function getApiData() {
$.ajax({
	url: 'https://www.torinometeo.org/api/v1/realtime/data/',
	type: 'GET',
	dataType: 'JSON',
	progress: function(e) {
		//call the function that display the loading page
	}
})
.done(function(data) {
	console.log("success");
	console.log(data);
	console.log(data[105]);
	//call main function that fill all DOM
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
	/**
	 * [timer call the setTimeout for looping the GetApiData() function]
	 * @type {[type]}
	 */
	var timer = setTimeout(myFunction, 30000);
}
