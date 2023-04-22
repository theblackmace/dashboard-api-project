window.onload = displayClock();
function displayClock(){
  var display = new Date().toLocaleTimeString();
  document.getElementById('time').textContent = display;
  setTimeout(displayClock, 1000); 
}

navigator.geolocation.getCurrentPosition(
    position => {
      fetch(`https://apis.scrimba.com/openweathermap/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=metric`)
        .then(response => {
            if(!response.ok) {
                throw Error("Error encountered while fetching the weather API response");
            }
            return response.json();
        })
        .then(data => {
            document.getElementById('weather').innerHTML = `
                <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png">
                <p id="temp">${Math.round(data.main.temp)}&#8451<p>
                <p id="city">${data.name}</p>
            `;
        })
        .catch(err => {
            console.error('Error encountered: '+err);
        })
    }, 
    error => {
      console.error('Unable to retrieve location: ' + error);
    }
);  

fetch('https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=nature')
    .then(response => response.json())
    .then(data => {
        document.body.style.backgroundImage = `url(${data.urls.regular})`;
        document.getElementById('author').textContent = `By ${data.user.name}`;
    })
    .catch(err => {
        console.log(err);
        document.body.style.backgroundImage = `url("https://images.unsplash.com/photo-1434725039720-aaad6dd32dfe?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxNDI0NzB8MHwxfHJhbmRvbXx8fHx8fHx8fDE2ODIxMjE1Nzc&ixlib=rb-4.0.3&q=80&w=1080")`;
    });


fetch('https://api.coingecko.com/api/v3/coins/biconomy')
    .then(response => {
        if(!response.ok) {
            throw Error("Something went wrong");
        }
        console.log('Response Status Code: '+response.status);
        return response.json();
    })
    .then(data => {
        document.getElementById('crypto').innerHTML = `
        <div id="crypto-top"><img src="${data.image.thumb}"><span><h2>${data.name}</h2></span></div>
        <div id="crypto-bottom"><p>Current Price: $${data.market_data.current_price.usd}</p><p>24h high: $${data.market_data.high_24h.usd}</p><p>24h low: $${data.market_data.low_24h.usd}</p></div>
        `
    })
    .catch(err => {
        console.error(err);
    })
