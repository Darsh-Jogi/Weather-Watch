import Current_location_data from "./current-location-data"
function CurrentWeather({ Current_weather_data_obj, location_deatils }) {


    // console.log("this is the inside the CurreWeather Component and the Current_weather_Data_obj (object as prop) is")
    // console.log(location_deatils)

    let Current_weather_items = [
        {
            Item_name: "Temperature",
            Item_data: Current_weather_data_obj["Location_current_Weather"]["Temperature"]
        },
        {
            Item_name: "Precipitation",
            Item_data: Current_weather_data_obj["Location_current_Weather"]["Precipitation"]
        },
        {
            Item_name: "Rain",
            Item_data: Current_weather_data_obj["Location_current_Weather"]["Rain"]
        },
        {
            Item_name: "Relative humidity",
            Item_data: Current_weather_data_obj["Location_current_Weather"]["Relative_humidity"]
        },
        {
            Item_name: "Cloud cover",
            Item_data: Current_weather_data_obj["Location_current_Weather"]["Cloud_cover"]
        },
        {
            Item_name: "Snowfall",
            Item_data: Current_weather_data_obj["Location_current_Weather"]["Snowfall"]
        },
        {
            Item_name: "Surface pressure",
            Item_data: Current_weather_data_obj["Location_current_Weather"]["Surface_pressure"]
        },
        {
            Item_name: "Sealevel Pressure",
            Item_data: Current_weather_data_obj["Location_current_Weather"]["Sealevel_Pressure"]
        },
        {
            Item_name: "Wind speed",
            Item_data: Current_weather_data_obj["Location_current_Weather"]["Wind_speed"]
        },
        {
            Item_name: "Wind direction",
            Item_data: Current_weather_data_obj["Location_current_Weather"]["Wind_direction"]
        }
    ]

    let Current_weather_icons = [
        "src/assets/Weather-icons/temperature.png",
        "src/assets/Weather-icons/Precipitation.png",
        "src/assets/Weather-icons/Rain.png",
        "src/assets/Weather-icons/Humidity.png",
        "src/assets/Weather-icons/Cloud_cover.png",
        "src/assets/Weather-icons/Snow-fall.png",
        "src/assets/Weather-icons/Surface_pressure.png",
        "src/assets/Weather-icons/Sealevel-pressure.png",
        "src/assets/Weather-icons/Wind_speed.png",
        "src/assets/Weather-icons/Wind_direction.png",
    ]

    let Current_weather_items_elements = []

    function Render_current_weather_items() {
        for (let index = 0; index < Current_weather_items.length; index++) {
            Current_weather_items_elements.push(
                <div key={index+(index*2)} className="current-weather-variable">
                    <img src={Current_weather_icons[index]} alt="" />
                    <div className="current-weather-deatils">
                        <span className="current-weather-item">{Current_weather_items[index]["Item_name"]}</span>
                        <span className="current-weather-item-unit">{Current_weather_items[index]["Item_data"]}</span>
                    </div>
                </div>
            )
        }
        return Current_weather_items_elements
    }

    function Display_weather_icon() {
        let weather_icons = [
            "./src/assets/Weather-icons/rain-cloud.png",
            "./src/assets/Weather-icons/heavy-rain.png",
            "./src/assets/Weather-icons/light-rain.png",
            "./src/assets/Weather-icons/no-rain.png",
            "./src/assets/Weather-icons/windy-weather.png",
            "./src/assets/Weather-icons/moderate-rain.png",
            "./src/assets/Weather-icons/smiling-sun.png",
        ]

        let precipitation_value = Current_weather_data_obj["Location_current_Weather"]["Precipitation_intger"]

        if ((precipitation_value >= 0.1) && (precipitation_value < 1)) {
            return weather_icons[0]
        }
        else if ((precipitation_value >= 1) && (precipitation_value < 2)) {
            return weather_icons[2]
        }
        else if ((precipitation_value >= 2) && (precipitation_value < 3)) {
            return weather_icons[5]
        }
        else if ((precipitation_value >= 3) && (precipitation_value < 4)) {
            return weather_icons[1]
        }
        else if (precipitation_value >= 4) {
            return weather_icons[1]
        }
        else if (precipitation_value < 0.1) {
            return weather_icons[3]
        }
    }
    return (
        <div className="current-weather-container">
            <div className="current-weather-content">
                <div className="current-weather-heading">
                    <h2>Current Weather</h2>
                </div>
                <div className="current-weather-variables-container">
                    <div className="current-weather-variables-content">
                        <Current_location_data imgsrc={Display_weather_icon()} location_name={location_deatils["location_name"]} location_state={location_deatils["location_state"]} location_country={location_deatils["location_country"]}/>
                        <div className="current-weather-variables-All">
                           {Render_current_weather_items()}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CurrentWeather