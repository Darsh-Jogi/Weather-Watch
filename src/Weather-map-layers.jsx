import Current_location_data from "./current-location-data"
function WeatherMapLayers({ current_fetched_data, current_location_data, Map_weather_function_obj, Map_styles, Layer_styles }) {
    function Display_weather_icon() {
        let weather_icons = [
            "./assets/Weather-icons/rain-cloud.png",
            "./assets/Weather-icons/heavy-rain.png",
            "./assets/Weather-icons/light-rain.png",
            "./assets/Weather-icons/no-rain.png",
            "./assets/Weather-icons/windy-weather.png",
            "./assets/Weather-icons/moderate-rain.png",
            "./assets/Weather-icons/smiling-sun.png",
        ]

        let precipitation_value = current_fetched_data["Location_current_Weather"]["Precipitation_intger"]

        if ((precipitation_value >= 0.1) && (precipitation_value <= 0.5)) {
            return weather_icons[0]
        }
        else if ((precipitation_value >= 0.6) && (precipitation_value <= 1.1)) {
            return weather_icons[2]
        }
        else if ((precipitation_value >= 1.2) && (precipitation_value <= 1.6)) {
            return weather_icons[5]
        }
        else if ((precipitation_value >= 1.7) && (precipitation_value <= 2.1)) {
            return weather_icons[1]
        }
        else if (precipitation_value < 0.1) {
            return weather_icons[3]
        }
    }
    return (
        <div className="Main-Weather-layers-container">
            <div className="Main-weather-layer-content">
                <div className="Weather-map-layers-container">
                    <div className="weather-layer-heading">
                        <h2>Select Weather Layer</h2>
                    </div>
                    <Current_location_data imgsrc={Display_weather_icon()} location_name={current_location_data["location_name"]} location_state={current_location_data["location_state"]} location_country={current_location_data["location_country"]} />
                    <div className="weather-map-layer-content">
                        <div className="map-layer-container">
                            <div className="map-layer-heading">
                                <h3>Select Map</h3>
                            </div>
                            <div className="map-layer-content">
                                <div className="default-weather-layer" onClick={Map_weather_function_obj["default_map"]}>
                                    <div className="defualt-layer-img" style={Map_styles["default_style"]}>
                                        <img src="./assets/Weather-icons/default-layer-map.png" alt="" />
                                    </div>
                                    <div className="default-layer-heading">
                                        <p>Default Map</p>
                                    </div>
                                </div>
                                <div className="satelite-weather-layer" onClick={Map_weather_function_obj["satelite_map"]}>
                                    <div className="satelite-layer-img" style={Map_styles["satelite_style"]}>
                                        <img src="./assets/Weather-icons/earth-satelite-layer.jpg" alt="" />
                                    </div>
                                    <div className="satelite-layer-heading">
                                        <p>Satelite Map</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="weather-layers-container">
                            <div className="weather-layer-content">
                                <div className="weather-layer-heading">
                                    <h3>Select Weather Layer</h3>
                                </div>
                                <div className="Weather-layers-all">
                                    <div className="Default-weather-layer" onClick={Map_weather_function_obj["default_layer"]}>
                                        <div className="Default-layer-img" style={Layer_styles["default_layer"]}>
                                            <img src="./assets/Weather-icons/defualt-layer.png" alt="" />
                                        </div>
                                        <div className="Default-layer-heading">
                                            <p>Default</p>
                                        </div>
                                    </div>
                                    <div className="Temperature-weather-layer" onClick={Map_weather_function_obj["temperature_layer"]}>
                                        <div className="Temperature-layer-img" style={Layer_styles["temperature"]}>
                                            <img src="./assets/Weather-icons/temperature-layer.jpg" alt="" />
                                        </div>
                                        <div className="Temperature-layer-heading">
                                            <p>Temperature</p>
                                        </div>
                                    </div>
                                    <div className="Precipitation-weather-layer" onClick={Map_weather_function_obj["precipitation_layer"]}>
                                        <div className="Precipitation-layer-img" style={Layer_styles["precipitation"]}>
                                            <img src="./assets/Weather-icons/precipitation-layer.jpg" alt="" />
                                        </div>
                                        <div className="Precipitation-layer-heading">
                                            <p>Precipitation</p>
                                        </div>
                                    </div>
                                    <div className="Clouds-weather-layer" onClick={Map_weather_function_obj["clouds_layer"]}>
                                        <div className="Clouds-layer-img" style={Layer_styles["clouds"]}>
                                            <img src="./assets/Weather-icons/cloud_layer.jpg" alt="" />
                                        </div>
                                        <div className="Clouds-layer-heading">
                                            <p>Clouds</p>
                                        </div>
                                    </div>
                                    <div className="Sea_level_pressure-weather-layer" onClick={Map_weather_function_obj["sealevel_pressure_layer"]}>
                                        <div className="Sea_level_pressure-layer-img" style={Layer_styles["sealevel_pressure"]}>
                                            <img src="./assets/Weather-icons/pressure-layer.jpg" alt="" />
                                        </div>
                                        <div className="Sea_level_pressure-layer-heading">
                                            <p>Sealevel pressure</p>
                                        </div>
                                    </div>
                                    <div className="Wind-speed-weather-layer" onClick={Map_weather_function_obj["wind_speed_layer"]}>
                                        <div className="Wind-speed-layer-img" style={Layer_styles["wind_speed"]}>
                                            <img src="./assets/Weather-icons/wind-speed-layer.jpg" alt="" />
                                        </div>
                                        <div className="Wind-speed-layer-heading">
                                            <p>Wind Speed</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default WeatherMapLayers