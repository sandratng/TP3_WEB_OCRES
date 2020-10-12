// Fonction appelée lors du click du bouton
function start() {
  // Création de l'objet apiWeather
  const apiWeather = new API_WEATHER();
  // Appel de la fonction fetchTodayForecast

  apiWeather
    .fetchTodayForecast()
    .then(function (response) {
      // Récupère la donnée d'une API
      const data = response.data;

      // On récupère l'information principal
      const main = data.weather[0].main;
      const description = data.weather[0].description;
      const temp = data.main.temp;
      const icon = apiWeather.getHTMLElementFromIcon(data.weather[0].icon);

      // Modifier le DOM
      document.getElementById("today-forecast-main").innerHTML = main;
      document.getElementById(
        "today-forecast-more-info"
      ).innerHTML = description;
      document.getElementById("icon-weather-container").innerHTML = icon;
      document.getElementById("today-forecast-temp").innerHTML = `${temp}°C`;
      
    })
    .catch(function (error) {
      // Affiche une erreur
      console.error(error);
    });

  getThreeDayForecast(apiWeather)
    .then(response => {

      // Récupère la donnée d'une API
      const data = response.data;

      const list = data.list;

      list.map((weatherData, index) => {
        // On récupère l'information principal
        const main = weatherData.weather[0].main;
        const description = weatherData.weather[0].description;
        const temp = weatherData.temp.day;
        const icon = apiWeather.getHTMLElementFromIcon(weatherData.weather[0].icon);
  
        // Modifier le DOM
        document.getElementById(`today-${index}-forecast-main`).innerHTML = main;
        document.getElementById(
          `today-${index}-forecast-more-info`
        ).innerHTML = description;
        document.getElementById(`today-${index}-icon-weather-container`).innerHTML = icon;
        document.getElementById(`today-${index}-forecast-temp`).innerHTML = `${temp}°C`;
      })

    })
  ;
}

function getThreeDayForecast(apiWeather) {
  return apiWeather.fetchThreeDayForecast();
}
