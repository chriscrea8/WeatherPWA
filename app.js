window.addEventListener('load', ()=> {
    let long;
    let lat;
    let temperatureDescription = document.querySelector('.temperature-description');
    let temperatureDegree = document.querySelector('.temperature-degree');
    let locationTimezone = document.querySelector('.location-timezone');
    let temperatureSection = document.querySelector('.temperature');
    const temperatureSpan = document.querySelector('.temperature span');



    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position => {
            long = position.coords.longitude;
            lat = position.coords.latitude;

            const api = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&%20exclude={part}&appid=d0c786381ad88420c57e28e0799a3093`;

            fetch(api)
            .then(response => {
                return response.json();
            })
            .then(data => {
                console.log(data);
                const {temp} = data.current;
                const {description} = data.current.weather[0];
                const {main} = data.current.weather[0];

                console.log(main);

                //set DOM elements from the API
                temperatureDegree.textContent = temp;
                temperatureDescription.textContent = description;
                locationTimezone.textContent = data.timezone;

                //Celsius to Farenheit
                let celsius = (temp - 32) * (5 / 9);

                //set icons
                setIcons(main, document.querySelector('.icon'));

                //change temperature degree
                temperatureSection.addEventListener('click', () => {
                    if (temperatureSpan.textContent === "F") {
                        temperatureSpan.textContent = "C";
                        temperatureDegree.textContent = Math.floor(celsius);
                    } else {
                        temperatureSpan.textContent = "F";
                        temperatureDegree.textContent = Math.floor(temp);
                    }
                });
            });
        });               
    }

    function setIcons (icon, iconID){
        const skycons = new Skycons({color: "white"});
        const currentIcon = icon.replace(/ /g, "_").toUpperCase();
        skycons.play();
        return skycons.set(iconID, Skycons[currentIcon]);
    }

});