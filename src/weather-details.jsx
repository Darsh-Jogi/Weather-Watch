import CurrentWeather from "./current-weather.jsx"
import WeatherOptions from "./weather-options.jsx"
import DailyandHourlyWeather from "./daily-and-hourly-weather.jsx"
import { useState, useEffect } from "react"
import WeatherMapLayers from "./Weather-map-layers.jsx"

function WeatherDetails({ selected_Location_data_obj, location_deatils_obj, Map_Weather_layer_function_obj, weather_map_styles, weather_layers_styles}) {
    let [active_weather_slide, set_active_weather_slide] = useState(0)
    let [current_weather_data, set_current_weather_data] = useState({
        Location_information: {
            Location_display_name: "",
            Location_display_state: "",
            Location_display_country: ""
        },
        Location_current_Weather: {
            Temperature: "",
            Precipitation: "",
            Rain: "",
            Relative_humidity: "",
            Cloud_cover: "",
            Snowfall: "",
            Surface_pressure: "",
            Sealevel_Pressure: "",
            Wind_speed: "",
            Wind_direction: "",
            Time: "",
            Interval: "",
            Precipitation_intger: ""
        }
    })

    let [active_weather_options_style, set_active_weather_options_style] = useState([
        {
            border: "3px solid rgb(68 13 108)",
            borderRadius: "7px",
            color: "rgb(55 14 93)",
            backgroundColor: "#f0d8ff"
        },
        {
            border: "3px solid #3b1359",
            borderRadius: "7px",
            color: "#3b1359",
        },
        {
            border: "3px solid #3b1359",
            borderRadius: "7px",
            color: "#3b1359",
        }
    ])

    let fetchdata = async () => {
        let Current_Location_data_URL = `https://api.open-meteo.com/v1/forecast?latitude=${selected_Location_data_obj["Latitude"]}&longitude=${selected_Location_data_obj["Longitude"]}&current=temperature_2m,relative_humidity_2m,precipitation,rain,snowfall,cloud_cover,pressure_msl,surface_pressure,wind_speed_10m,wind_direction_10m&hourly=temperature_2m,relative_humidity_2m,dew_point_2m,rain,snowfall,pressure_msl,surface_pressure,cloud_cover,cloud_cover_high,wind_speed_80m,wind_direction_80m,temperature_80m&daily=temperature_2m_max,precipitation_sum,rain_sum,snowfall_sum,wind_speed_10m_max&timezone=auto`

        let Current_data_fetch = await fetch(Current_Location_data_URL)
        let Current_data_parse = await Current_data_fetch.json()

        let Display_current_weather_data_obj = {
            Location_information: {
                Location_display_name: selected_Location_data_obj["Location_Name"],
                Location_display_state: selected_Location_data_obj["State"],
                Location_display_country: selected_Location_data_obj["country"]
            },
            Location_current_Weather: {
                Temperature: `${Current_data_parse["current"]["temperature_2m"]} ${Current_data_parse["current_units"]["temperature_2m"]}`,
                Precipitation: `${Current_data_parse["current"]["precipitation"]} ${Current_data_parse["current_units"]["precipitation"]}`,
                Rain: `${Current_data_parse["current"]["rain"]} ${Current_data_parse["current_units"]["rain"]}`,
                Relative_humidity: `${Current_data_parse["current"]["relative_humidity_2m"]} ${Current_data_parse["current_units"]["relative_humidity_2m"]}`,
                Cloud_cover: `${Current_data_parse["current"]["cloud_cover"]} ${Current_data_parse["current_units"]["cloud_cover"]}`,
                Snowfall: `${Current_data_parse["current"]["snowfall"]} ${Current_data_parse["current_units"]["snowfall"]}`,
                Surface_pressure: `${Current_data_parse["current"]["surface_pressure"]} ${Current_data_parse["current_units"]["surface_pressure"]}`,
                Sealevel_Pressure: `${Current_data_parse["current"]["pressure_msl"]} ${Current_data_parse["current_units"]["pressure_msl"]}`,
                Wind_speed: `${Current_data_parse["current"]["wind_speed_10m"]} ${Current_data_parse["current_units"]["wind_speed_10m"]}`,
                Wind_direction: `${Current_data_parse["current"]["wind_direction_10m"]} ${Current_data_parse["current_units"]["wind_direction_10m"]}`,
                Time: `${Current_data_parse["current"]["time"]}`,
                Interval: `${Current_data_parse["current"]["interval"]}`,
                Precipitation_intger: Current_data_parse["current"]["precipitation"]
            }
        }

        set_current_weather_data(Display_current_weather_data_obj)

        // console.log("this is the current data of selected location on search")
        // console.log(Current_data_parse)
        // console.log("and this is the Display_current_weather_data_obj")
        // console.log(Display_current_weather_data_obj)
        return Current_data_parse
    }

    let Weather_slides_array = [
        <CurrentWeather Current_weather_data_obj={current_weather_data} location_deatils={location_deatils_obj} />,
        <DailyandHourlyWeather selected_weather_obj_data={selected_Location_data_obj} current_location_obj_data={location_deatils_obj} Current_weather_data_obj={current_weather_data} />,
        <WeatherMapLayers current_fetched_data={current_weather_data} current_location_data={location_deatils_obj} Map_weather_function_obj={Map_Weather_layer_function_obj} Map_styles={weather_map_styles} Layer_styles={weather_layers_styles}/>
    ]

    useEffect(() => {
        fetchdata()
    }, [selected_Location_data_obj])

    function Switch_weather_data(Weatherslide) {
        if (Weatherslide == "Current_weather_data") {
            let New_style_array_obj = [
                {
                    border: "3px solid rgb(68 13 108)",
                    borderRadius: "7px",
                    color: "rgb(55 14 93)",
                    backgroundColor: "#f0d8ff"
                },
                {
                    border: "3px solid #3b1359",
                    borderRadius: "7px",
                    color: "#3b1359",
                },
                {
                    border: "3px solid #3b1359",
                    borderRadius: "7px",
                    color: "#3b1359",
                }
            ]
            set_active_weather_slide(0)
            set_active_weather_options_style(New_style_array_obj)
        }
        else if (Weatherslide == "Daily-and-Hourly-Weather_data") {
            let New_style_array_obj = [
                {
                    border: "3px solid #3b1359",
                    borderRadius: "7px",
                    color: "#3b1359",
                },
                {
                    border: "3px solid rgb(68 13 108)",
                    borderRadius: "7px",
                    color: "rgb(55 14 93)",
                    backgroundColor: "#f0d8ff"
                },
                {
                    border: "3px solid #3b1359",
                    borderRadius: "7px",
                    color: "#3b1359",
                }
            ]
            set_active_weather_slide(1)
            set_active_weather_options_style(New_style_array_obj)
        }
        else if(Weatherslide == "Weather-map-data"){
            let New_style_array_obj = [
                {
                    border: "3px solid #3b1359",
                    borderRadius: "7px",
                    color: "#3b1359",
                },
                {
                    border: "3px solid #3b1359",
                    borderRadius: "7px",
                    color: "#3b1359",
                },
                {
                    border: "3px solid rgb(68 13 108)",
                    borderRadius: "7px",
                    color: "rgb(55 14 93)",
                    backgroundColor: "#f0d8ff"
                }
            ]
            set_active_weather_slide(2)
            set_active_weather_options_style(New_style_array_obj)
        }
    }

    return (
        <div className="weather-deatils-container">
            <div className="weather-layer">
                <WeatherOptions change_weather_data={Switch_weather_data} style_object1={active_weather_options_style[0]} style_object2={active_weather_options_style[1]} style_object3={active_weather_options_style[2]}/>
                {Weather_slides_array[active_weather_slide]}
            </div>
        </div>
    )
}

export default WeatherDetails