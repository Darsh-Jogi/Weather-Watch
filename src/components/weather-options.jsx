function WeatherOptions({change_weather_data, style_object1, style_object2, style_object3}){
    return(
        <div className="weather-options-container">
            <div className="weather-options">
                <div className="current-weather" onClick={()=>{
                    change_weather_data("Current_weather_data")
                }} style={style_object1}>
                    <h4>Current Weather</h4>
                </div>
                <div className="Daily-and-hourly-weather" onClick={()=>{
                    change_weather_data("Daily-and-Hourly-Weather_data")
                }} style={style_object2}>
                    <h4>Weather Forcast</h4>
                </div>
                <div className="Weahter-Map-Layers" onClick={()=>{
                    change_weather_data("Weather-map-data")
                }} style={style_object3}>
                    <h4>Weather Layers</h4>
                </div>
            </div>
        </div>
    )
}

export default WeatherOptions