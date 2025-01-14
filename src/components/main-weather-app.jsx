import { useState, useEffect } from "react"
import Searchbar from "./search-bar.jsx"
import WhetherContainer from "./weather-container.jsx"
import WeatherDetails from "./weather-details.jsx"
function MainWeatherapp() {
    let [active_weather_map, set_active_weather_map] = useState("")
    let [active_weather_layer, set_active_weather_layer] = useState("")
    let [weather_map_style_obj, set_weather_map_style_obj] = useState({
        default_style: { border: "2px solid #3b1359" },
        satelite_style: {}
    })
    let [weather_layer_style_obj, set_weather_layer_style_obj] = useState({
        default_layer: {},
        temperature: {},
        precipitation: {},
        clouds: {},
        sealevel_pressure: {},
        wind_speed: {},
    })
    let [inputvalue, setinputvalue] = useState("")
    let [searchobject, setsearchobject] = useState({})
    let [inputlength, setinputlength] = useState(0)
    let [selected_location_obj, set_selected_location_obj] = useState({
        Latitude: 21.1959,
        Location_Name: "Surat",
        Longitude: 72.8302,
        State: "Gujarat",
        country: "India",
        unique_id: 1255364
    })
    let [location_coordinates, set_location_coordinates] = useState({
        Latitude: 22,
        Longitude: 79,
    })
    let [Location_details_only_obj, set_Location_deatils_only_obj] = useState({
        location_name: "Surat",
        location_state: "Gujarat",
        location_country: "India"
    })

    function handleinputvalue(eventobj) {
        let new_value = eventobj.target.value
        setinputvalue(new_value)
    }

    let convertlocation = async () => {
        let Location_url = `https://geocoding-api.open-meteo.com/v1/search?name=${inputvalue}&count=100&language=en&format=json`
        let Locaiton_response = await fetch(Location_url)
        let Locaiton_data = await Locaiton_response.json()
        setsearchobject(Locaiton_data)
        setinputlength(inputvalue.length)
    }

    let showsuggestionbox = async () => {
        if ((inputvalue.length >= 2) && (searchobject["results"])) {
            let box_element = document.querySelector(".Search-sugesstion-container")
            box_element.style.display = "block"
        }
        else if (inputvalue.length <= 1) {
            let box_element = document.querySelector(".Search-sugesstion-container")
            box_element.style.display = "none"
        }
    }

    function ChangeInputvalue(eventobj) {
        let target_element = eventobj.target
        let Location_data_string = target_element.getAttribute('data-locationdeatils')
        let Location_data_obj = JSON.parse(Location_data_string)
        setinputvalue(Location_data_obj["Location_Name"])
        set_selected_location_obj(Location_data_obj)
        // console.log("this is the area value inside the ChangeInputvalue function")
        // console.log(Location_data_obj)
        // console.log(typeof (Location_data_obj))
    }

    function Search_Input_location() {
        // console.log("this is the inside the Serach input location (search button click) function")
        let box_element = document.querySelector(".Search-sugesstion-container")
        box_element.style.display = "none"
        let new_location_coordinates = {
            Latitude: selected_location_obj["Latitude"],
            Longitude: selected_location_obj["Longitude"]
        }
        let New_location_obj = {
            location_name: selected_location_obj["Location_Name"],
            location_state: selected_location_obj["State"],
            location_country: selected_location_obj["country"]
        }
        set_location_coordinates(new_location_coordinates)
        set_Location_deatils_only_obj(New_location_obj)
    }

    let All_Weather_Map_layers_links = {
        default_map: {
            link: "",
            attribute: ""
        },
        Satelite_map: {
            link: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
            attribute: "Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community"
        },
        default_layer: {
            link: "",
            attribute: ""
        },
        temperature: {
            link: "https://tile.openweathermap.org/map/temp_new/{z}/{x}/{y}.png?appid=294c0822a7bd7ba9c6fcfcc693c5f284",
            attribute: "&copy; <a href='https://openweathermap.org/'>OpenWeatherMap</a>"
        },
        precipitation: {
            link: "https://tile.openweathermap.org/map/precipitation_new/{z}/{x}/{y}.png?appid=294c0822a7bd7ba9c6fcfcc693c5f284",
            attribute: "&copy; <a href='https://openweathermap.org/'>OpenWeatherMap</a>"
        },
        clouds: {
            link: "https://tile.openweathermap.org/map/clouds_new/{z}/{x}/{y}.png?appid=294c0822a7bd7ba9c6fcfcc693c5f284",
            attribute: "&copy; <a href='https://openweathermap.org/'>OpenWeatherMap</a>"
        },
        sealevel_pressure: {
            link: "https://tile.openweathermap.org/map/pressure_new/{z}/{x}/{y}.png?appid=294c0822a7bd7ba9c6fcfcc693c5f284",
            attribute: "&copy; <a href='https://openweathermap.org/'>OpenWeatherMap</a>"
        },
        wind_speed: {
            link: "https://tile.openweathermap.org/map/wind_new/{z}/{x}/{y}.png?appid=294c0822a7bd7ba9c6fcfcc693c5f284",
            attribute: "&copy; <a href='https://openweathermap.org/'>OpenWeatherMap</a>"
        },
        aa: () => { }
    }

    function Change_Map_weather_layer(Change_data_type) {
        if (Change_data_type == "Default_Map") {
            let New_weather_map = All_Weather_Map_layers_links["default_map"]["link"]
            let New_map_style_obj = {
                default_style: { border: "2px solid #3b1359" },
                satelite_style: {}
            }
            set_active_weather_map(New_weather_map)
            set_weather_map_style_obj(New_map_style_obj)
        }
        else if (Change_data_type == "Satelite_Map") {
            let New_weather_map = All_Weather_Map_layers_links["Satelite_map"]["link"]
            let New_map_style_obj = {
                default_style: {},
                satelite_style: { border: "2px solid #3b1359" }
            }
            set_active_weather_map(New_weather_map)
            set_weather_map_style_obj(New_map_style_obj)
        }
        else if (Change_data_type == "Default_Layer") {
            let New_weather_layer = All_Weather_Map_layers_links["default_layer"]["link"]
            let New_layer_style_obj = {
                default_layer: { border: "2px solid #3b1359" },
                temperature: {},
                precipitation: {},
                clouds: {},
                sealevel_pressure: {},
                wind_speed: {},
            }
            set_active_weather_layer(New_weather_layer)
            set_weather_layer_style_obj(New_layer_style_obj)
        }
        else if (Change_data_type == "Temperature") {
            let New_weather_layer = All_Weather_Map_layers_links["temperature"]["link"]
            let New_layer_style_obj = {
                default_layer: {},
                temperature: { border: "2px solid #3b1359" },
                precipitation: {},
                clouds: {},
                sealevel_pressure: {},
                wind_speed: {},
            }
            set_active_weather_layer(New_weather_layer)
            set_weather_layer_style_obj(New_layer_style_obj)
        }
        else if (Change_data_type == "Precipitation") {
            let New_weather_layer = All_Weather_Map_layers_links["precipitation"]["link"]
            let New_layer_style_obj = {
                default_layer: {},
                temperature: {},
                precipitation: { border: "2px solid #3b1359" },
                clouds: {},
                sealevel_pressure: {},
                wind_speed: {},
            }
            set_active_weather_layer(New_weather_layer)
            set_weather_layer_style_obj(New_layer_style_obj)
        }
        else if (Change_data_type == "Clouds") {
            let New_weather_layer = All_Weather_Map_layers_links["clouds"]["link"]
            let New_layer_style_obj = {
                default_layer: {},
                temperature: {},
                precipitation: {},
                clouds: { border: "2px solid #3b1359" },
                sealevel_pressure: {},
                wind_speed: {},
            }
            set_active_weather_layer(New_weather_layer)
            set_weather_layer_style_obj(New_layer_style_obj)
        }
        else if (Change_data_type == "Sealevel_Pressure") {
            let New_weather_layer = All_Weather_Map_layers_links["sealevel_pressure"]["link"]
            let New_layer_style_obj = {
                default_layer: {},
                temperature: {},
                precipitation: {},
                clouds: {},
                sealevel_pressure: { border: "2px solid #3b1359" },
                wind_speed: {},
            }
            set_active_weather_layer(New_weather_layer)
            set_weather_layer_style_obj(New_layer_style_obj)
        }
        else if (Change_data_type == "Wind_Speed") {
            let New_weather_layer = All_Weather_Map_layers_links["wind_speed"]["link"]
            let New_layer_style_obj = {
                default_layer: {},
                temperature: {},
                precipitation: {},
                clouds: {},
                sealevel_pressure: {},
                wind_speed: { border: "2px solid #3b1359" },
            }
            set_active_weather_layer(New_weather_layer)
            set_weather_layer_style_obj(New_layer_style_obj)
        }
    }
    let WeatherMapfunctions = {
        default_map: () => { Change_Map_weather_layer("Default_Map") },
        satelite_map: () => { Change_Map_weather_layer("Satelite_Map") },
        default_layer: () => { Change_Map_weather_layer("Default_Layer") },
        temperature_layer: () => { Change_Map_weather_layer("Temperature") },
        precipitation_layer: () => { Change_Map_weather_layer("Precipitation") },
        clouds_layer: () => { Change_Map_weather_layer("Clouds") },
        sealevel_pressure_layer: () => { Change_Map_weather_layer("Sealevel_Pressure") },
        wind_speed_layer: () => { Change_Map_weather_layer("Wind_Speed") }
    }

    useEffect(() => {
        convertlocation()
        showsuggestionbox()
    }, [inputvalue])

    // console.log("this is the searchobj")
    // console.log(searchobject)

    // console.log("this is the selected_location_obj")
    // console.log(selected_location_obj)
    // console.log("this is the location_coordinates")
    // console.log(location_coordinates)

    return (
        <div className="main-weather-container">
            <Searchbar updated_input_value={inputvalue} input_handler={handleinputvalue} search_obj={searchobject} enterd_input_length={inputlength} select_input_func={ChangeInputvalue} serach_location={Search_Input_location} />
            <WhetherContainer location_obj={location_coordinates} Weather_current_layer={active_weather_layer} Map_current_layer={active_weather_map} />
            <WeatherDetails selected_Location_data_obj={selected_location_obj} location_deatils_obj={Location_details_only_obj} Map_Weather_layer_function_obj={WeatherMapfunctions} weather_map_styles={weather_map_style_obj} weather_layers_styles={weather_layer_style_obj} />
        </div>
    )
}
export default MainWeatherapp