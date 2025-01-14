import WeatherMap from "./weather-map.jsx"
import WeatherDetails from "./weather-details.jsx"
function WhetherContainer({ location_obj, Weather_current_layer, Map_current_layer}) {
    return (
        <div className="Weather-info-container">
            <WeatherMap location_coordinates_obj={location_obj} Active_map_layer={Map_current_layer} Active_weather_layer={Weather_current_layer}/>
        </div>
    )
}

export default WhetherContainer