import { useEffect, useState } from "react"
import Current_location_data from "./current-location-data"
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

function DailyandHourlyWeather({ selected_weather_obj_data, current_location_obj_data, Current_weather_data_obj }) {
    let [daily_and_hourly_forcast_data, set_daily_and_hourly_forcast_data] = useState({
        Weather_daily_data: {
            Precipitation_7days_data: [0, 0, 0, 0, 0, 0, 0],
            Rain_7days_data: [0, 0, 0, 0, 0, 0, 0],
            Snowfall_7days_data: [0, 0, 0, 0, 0, 0, 0],
            Temperature_7days_data: [0, 0, 0, 0, 0, 0, 0],
            Windspeed_7days_data: [0, 0, 0, 0, 0, 0, 0],
            time_duration: ["", "", "", "", "", "", ""]
        },
        Weather_hourly_data: {
            temperature: [],
            cloud_cover: [],
            cloud_cover_high: [],
            dew_point: [],
            rain: [],
            sealevel_pressure: [],
            relative_humidity: [],
            snowfall: [],
            surface_pressure: [],
            wind_direction: [],
            wind_speed: [],
            time: [""]
        },
        weather_units: {
            Precipitation_Unit: "",
            Rain_unit: "",
            Snowfall_unit: "",
            Temperature_unit: "",
            Windspeed_unit: "",
            cloud_cover: "",
            cloud_cover_high: "",
            dew_point: "",
            sealevel_pressure: "",
            humidity: "",
            surface_pressure: "",
            wind_direction: "",
        }
    })
    let [switch_weather_data, set_switch_weather_data] = useState(0)
    let [Weather_data_option_style, set_weather_data_option_style] = useState([
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
    ])

    let date_and_time = daily_and_hourly_forcast_data["Weather_hourly_data"]["time"];
    let date_string = Current_weather_data_obj["Location_current_Weather"]["Time"].slice(0, 10);
    let time_string = Current_weather_data_obj["Location_current_Weather"]["Time"].slice(11, 16);
    let date_and_time_string = `${date_string} - ${time_string}`;

    // console.log("this is just down the date and gtime string and daily and housrly obj  is")
    // console.log(date_and_time_string)

    let [elements_array, set_elements_array] = useState([
        <div className="weather-data-item-container">
            <div className="weather-item-with-img">
                <img src="./src/assets/Weather-icons/temperature.png" alt="" />
                <h3> Temperature </h3>
            </div>
            <div className="live-hourly-data">
                <p className="temperature-time">{date_and_time_string}</p>
                <p className="temperature-data-unit">{Current_weather_data_obj["Location_current_Weather"]["Temperature"]}</p>
            </div>
            <div className="data-control-buttons">
                <button onClick={() => { Show_hourly_data("Temperature") }}>Forcast</button>
                <button onClick={() => { Stop_hourly_data("Temperature") }}>Pause</button>
                <button onClick={() => { restart_the_hourly_data("Temperature") }}>Restart</button>
            </div>
        </div>,
        <div className="weather-data-item-container">
            <div className="weather-item-with-img">
                <img src="./src/assets/Weather-icons/Cloud_cover.png" alt="" />
                <h3>Cloud Cover</h3>
            </div>
            <div className="live-hourly-data">
                <p className="Cloud_cover-time">{date_and_time_string}</p>
                <p className="Cloud_cover_data-unit">{Current_weather_data_obj["Location_current_Weather"]["Cloud_cover"]}</p>
            </div>
            <div className="data-control-buttons">
                <button onClick={() => { Show_hourly_data("Cloud-Cover") }}>Forcast</button>
                <button onClick={() => { Stop_hourly_data("Cloud-Cover") }}>Pause</button>
                <button onClick={() => { restart_the_hourly_data("Cloud-Cover") }}>Restart</button>
            </div>
        </div>,
        <div className="weather-data-item-container">
            <div className="weather-item-with-img">
                <img src="./src/assets/Weather-icons/Cloud-cover-high.png" alt="" />
                <h3>Cloud Cover High</h3>
            </div>
            <div className="live-hourly-data">
                <p className="Cloud-cover-high-time">{date_and_time_string}</p>
                <p className="Cloud-Cover-high-data-unit">{Current_weather_data_obj["Location_current_Weather"]["Cloud_cover"]}</p>
            </div>
            <div className="data-control-buttons">
                <button onClick={() => { Show_hourly_data("Cloud-Cover-High") }}>Forcast</button>
                <button onClick={() => { Stop_hourly_data("Cloud-Cover-High") }}>Pause</button>
                <button onClick={() => { restart_the_hourly_data("Cloud-Cover-High") }}>Restart</button>
            </div>
        </div>,
        <div className="weather-data-item-container">
            <div className="weather-item-with-img">
                <img src="./src/assets/Weather-icons/dew-point.png" alt="" />
                <h3>Dew Point</h3>
            </div>
            <div className="live-hourly-data">
                <p className="Dew-point-time">{date_and_time_string}</p>
                <p className="Dew-point-data-unit">25.8 °C</p>
            </div>
            <div className="data-control-buttons">
                <button onClick={() => { Show_hourly_data("Dew-Point") }}>Forcast</button>
                <button onClick={() => { Stop_hourly_data("Dew-Point") }}>Pause</button>
                <button onClick={() => { restart_the_hourly_data("Dew-Point") }}>Restart</button>
            </div>
        </div>,
        <div className="weather-data-item-container">
            <div className="weather-item-with-img">
                <img src="./src/assets/Weather-icons/Rain.png" alt="" />
                <h3>Rain</h3>
            </div>
            <div className="live-hourly-data">
                <p className="Rain-time">{date_and_time_string}</p>
                <p className="Rain-data-unit">{Current_weather_data_obj["Location_current_Weather"]["Rain"]}</p>
            </div>
            <div className="data-control-buttons">
                <button onClick={() => { Show_hourly_data("Rain") }}>Forcast</button>
                <button onClick={() => { Stop_hourly_data("Rain") }}>Pause</button>
                <button onClick={() => { restart_the_hourly_data("Rain") }}>Restart</button>
            </div>
        </div>,
        <div className="weather-data-item-container">
            <div className="weather-item-with-img">
                <img src="./src/assets/Weather-icons/Sealevel-pressure.png" alt="" />
                <h3>Sealevel Pressure</h3>
            </div>
            <div className="live-hourly-data">
                <p className="Sealevel-pressure-time">{date_and_time_string}</p>
                <p className="Sealevel-pressure-data-unit">{Current_weather_data_obj["Location_current_Weather"]["Sealevel_Pressure"]}</p>
            </div>
            <div className="data-control-buttons">
                <button onClick={() => { Show_hourly_data("Sealevel_Pressure") }}>Forcast</button>
                <button onClick={() => { Stop_hourly_data("Sealevel_Pressure") }}>Pause</button>
                <button onClick={() => { restart_the_hourly_data("Sealevel_Pressure") }}>Restart</button>
            </div>
        </div>,
        <div className="weather-data-item-container">
            <div className="weather-item-with-img">
                <img src="./src/assets/Weather-icons/Humidity.png" alt="" />
                <h3>Relative Humidity</h3>
            </div>
            <div className="live-hourly-data">
                <p className="Relative-humidity-time">{date_and_time_string}</p>
                <p className="Relative_humidity-data-unit">{Current_weather_data_obj["Location_current_Weather"]["Relative_humidity"]}</p>
            </div>
            <div className="data-control-buttons">
                <button onClick={() => { Show_hourly_data("Relative-Humidity") }}>Forcast</button>
                <button onClick={() => { Stop_hourly_data("Relative-Humidity") }}>Pause</button>
                <button onClick={() => { restart_the_hourly_data("Relative-Humidity") }}>Restart</button>
            </div>
        </div>,
        <div className="weather-data-item-container">
            <div className="weather-item-with-img">
                <img src="./src/assets/Weather-icons/Snow-fall.png" alt="" />
                <h3>Snow fall</h3>
            </div>
            <div className="live-hourly-data">
                <p className="Snowfall-time">{date_and_time_string}</p>
                <p className="Snowfall-data-unit">{Current_weather_data_obj["Location_current_Weather"]["Snowfall"]}</p>
            </div>
            <div className="data-control-buttons">
                <button onClick={() => { Show_hourly_data("Snowfall") }}>Forcast</button>
                <button onClick={() => { Stop_hourly_data("Snowfall") }}>Pause</button>
                <button onClick={() => { restart_the_hourly_data("Snowfall") }}>Restart</button>
            </div>
        </div>,
        <div className="weather-data-item-container">
            <div className="weather-item-with-img">
                <img src="./src/assets/Weather-icons/Surface_pressure.png" alt="" />
                <h3>Surface Pressure</h3>
            </div>
            <div className="live-hourly-data">
                <p className="Surface-pressure-time">{date_and_time_string}</p>
                <p className="Surface-pressure-data-unit">{Current_weather_data_obj["Location_current_Weather"]["Surface_pressure"]}</p>
            </div>
            <div className="data-control-buttons">
                <button onClick={() => { Show_hourly_data("Surface-Pressure") }}>Forcast</button>
                <button onClick={() => { Stop_hourly_data("Surface-Pressure") }}>Pause</button>
                <button onClick={() => { restart_the_hourly_data("Surface-Pressure") }}>Restart</button>
            </div>
        </div>,
        <div className="weather-data-item-container">
            <div className="weather-item-with-img">
                <img src="./src/assets/Weather-icons/Wind_speed.png" alt="" />
                <h3>Wind Speed</h3>
            </div>
            <div className="live-hourly-data">
                <p className="Wind-speed-time">{date_and_time_string}</p>
                <p className="wind-speed-data-unit">{Current_weather_data_obj["Location_current_Weather"]["Wind_speed"]}</p>
            </div>
            <div className="data-control-buttons">
                <button onClick={() => { Show_hourly_data("Wind-Speed") }}>Forcast</button>
                <button onClick={() => { Stop_hourly_data("Wind-Speed") }}>Pause</button>
                <button onClick={() => { restart_the_hourly_data("Wind-Speed") }}>Restart</button>
            </div>
        </div>,
        <div className="weather-data-item-container">
            <div className="weather-item-with-img">
                <img src="./src/assets/Weather-icons/Wind_direction.png" alt="" />
                <h3>Wind Direction</h3>
            </div>
            <div className="live-hourly-data">
                <p className="Wind-direction-time">{date_and_time_string}</p>
                <p className="Wind-direction-data-unit">{Current_weather_data_obj["Location_current_Weather"]["Wind_direction"]}</p>
            </div>
            <div className="data-control-buttons">
                <button onClick={() => { Show_hourly_data("Wind-Direction") }} >Forcast</button>
                <button onClick={() => { Stop_hourly_data("Wind-Direction") }}>Pause</button>
                <button onClick={() => { restart_the_hourly_data("Wind-Direction") }}>Restart</button>
            </div>
        </div>,
    ])

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


    let fetch_daily_and_hourly_data = async () => {
        let Current_location_weather_url = `https://api.open-meteo.com/v1/forecast?latitude=${selected_weather_obj_data["Latitude"]}&longitude=${selected_weather_obj_data["Longitude"]}&current=temperature_2m,relative_humidity_2m,precipitation,rain,snowfall,cloud_cover,pressure_msl,surface_pressure,wind_speed_10m,wind_direction_10m&hourly=temperature_2m,relative_humidity_2m,dew_point_2m,rain,snowfall,pressure_msl,surface_pressure,cloud_cover,cloud_cover_high,wind_speed_80m,wind_direction_80m,temperature_80m&daily=temperature_2m_max,precipitation_sum,rain_sum,snowfall_sum,wind_speed_10m_max&timezone=auto`

        let Current_location_weather_response = await fetch(Current_location_weather_url)
        let Current_location_weather_data = await Current_location_weather_response.json()

        // console.log("this is inside the daily and hourly component and also fetch daily and hourly function")
        // console.log(Current_location_weather_data)

        let Display_daily_and_hourly_weather_data_obj = {
            Weather_daily_data: {
                Precipitation_7days_data: Current_location_weather_data["daily"]["precipitation_sum"],
                Rain_7days_data: Current_location_weather_data["daily"]["rain_sum"],
                Snowfall_7days_data: Current_location_weather_data["daily"]["snowfall_sum"],
                Temperature_7days_data: Current_location_weather_data["daily"]["temperature_2m_max"],
                Windspeed_7days_data: Current_location_weather_data["daily"]["wind_speed_10m_max"],
                time_duration: Current_location_weather_data["daily"]["time"]
            },
            Weather_hourly_data: {
                temperature: Current_location_weather_data["hourly"]["temperature_2m"],
                cloud_cover: Current_location_weather_data["hourly"]["cloud_cover"],
                cloud_cover_high: Current_location_weather_data["hourly"]["cloud_cover_high"],
                dew_point: Current_location_weather_data["hourly"]["dew_point_2m"],
                rain: Current_location_weather_data["hourly"]["rain"],
                sealevel_pressure: Current_location_weather_data["hourly"]["pressure_msl"],
                relative_humidity: Current_location_weather_data["hourly"]["relative_humidity_2m"],
                snowfall: Current_location_weather_data["hourly"]["snowfall"],
                surface_pressure: Current_location_weather_data["hourly"]["surface_pressure"],
                wind_direction: Current_location_weather_data["hourly"]["wind_direction_80m"],
                wind_speed_80m: Current_location_weather_data["hourly"]["wind_speed_80m"],
                time: Current_location_weather_data["hourly"]["time"]
            },
            weather_units: {
                Precipitation_Unit: Current_location_weather_data["daily_units"]["precipitation_sum"],
                Rain_unit: Current_location_weather_data["daily_units"]["rain_sum"],
                Snowfall_unit: Current_location_weather_data["daily_units"]["snowfall_sum"],
                Temperature_unit: Current_location_weather_data["daily_units"]["temperature_2m_max"],
                Windspeed_unit: Current_location_weather_data["daily_units"]["wind_speed_10m_max"],
                cloud_cover: Current_location_weather_data["hourly_units"]["cloud_cover"],
                cloud_cover_high: Current_location_weather_data["hourly_units"]["cloud_cover_high"],
                dew_point: Current_location_weather_data["hourly_units"]["dew_point_2m"],
                sealevel_pressure: Current_location_weather_data["hourly_units"]["pressure_msl"],
                humidity: Current_location_weather_data["hourly_units"]["relative_humidity_2m"],
                surface_pressure: Current_location_weather_data["hourly_units"]["surface_pressure"],
                wind_direction: Current_location_weather_data["hourly_units"]["wind_direction_80m"],
            }
        }

        // console.log("this is the Display_daily_and_hourly_weather_data_obj dwon below")
        // console.log(Display_daily_and_hourly_weather_data_obj)

        set_daily_and_hourly_forcast_data(Display_daily_and_hourly_weather_data_obj)
    }

    useEffect(() => {
        fetch_daily_and_hourly_data()
    }, [selected_weather_obj_data])


    let Daily_weather_box_main_elements = []
    let All_days = ["Sunday", "Monday", "Tuseday", "Wednesday", "Thursday", "Friday", "Saturday"]
    let Daily_weather_box_icons = [
        "./src/assets/Weather-icons/temperature.png",
        "./src/assets/Weather-icons/Precipitation.png",
        "./src/assets/Weather-icons/Rain.png",
        "./src/assets/Weather-icons/Snow-fall.png",
        "./src/assets/Weather-icons/Wind_speed.png",
    ]
    function Render_daily_weather_box() {
        for (let index = 0; index < All_days.length; index++) {
            let Current_date_time = daily_and_hourly_forcast_data["Weather_daily_data"]["time_duration"][index]
            let date_chekcer = Current_date_time.slice(8, 9)
            let Myarray = []
            function Array_form() {
                if (date_chekcer == "0") {
                    let Year = parseInt(Current_date_time.slice(0, 4))
                    let Month = parseInt(Current_date_time.slice(6, 8)) - 1
                    let Day = parseInt(Current_date_time.slice(9, 11))
                    let formation_array = [Year, Month, Day]
                    // console.log("this is the formation array")
                    // console.log(formation_array)
                    for (let index = 0; index < formation_array.length; index++) {
                        Myarray.push(formation_array[index])
                    }
                }
                else if (date_chekcer !== "0") {
                    let Year = parseInt(Current_date_time.slice(0, 4))
                    let Month = parseInt(Current_date_time.slice(6, 8)) - 1
                    let Day = parseInt(Current_date_time.slice(8, 11))
                    let formation_array = [Year, Month, Day]
                    // console.log("this is the formation array")
                    // console.log(formation_array)
                    for (let index = 0; index < formation_array.length; index++) {
                        Myarray.push(formation_array[index])
                    }
                }
            }

            Array_form()

            let Fetchdate = new Date(Myarray[0], Myarray[1], Myarray[2])
            let Fetchday = Fetchdate.getDay()
            Daily_weather_box_main_elements.push(

                <div className="daily-weather-data-box">
                    <div className="day-and-date">
                        <h3>{All_days[Fetchday]}</h3>
                        <h3>{daily_and_hourly_forcast_data["Weather_daily_data"]["time_duration"][index]}</h3>
                    </div>
                    <div className="daily-weather-data-items">
                        <div className="daily-weather-item">
                            <div className="weather-icon-with-item">
                                <img src="./src/assets/Weather-icons/temperature.png" alt="" />
                                <p>Temperature</p>
                            </div>
                            <div className="daily-weather-fetched-data">
                                <p>{`${daily_and_hourly_forcast_data["Weather_daily_data"]["Temperature_7days_data"][index]} ${daily_and_hourly_forcast_data["weather_units"]["Temperature_unit"]}`}</p>
                            </div>
                        </div>
                        <div className="daily-weather-item">
                            <div className="weather-icon-with-item">
                                <img src="./src/assets/Weather-icons/Precipitation.png" alt="" />
                                <p>Precipitation</p>
                            </div>
                            <div className="daily-weather-fetched-data">
                                <p>{`${daily_and_hourly_forcast_data["Weather_daily_data"]["Precipitation_7days_data"][index]} ${daily_and_hourly_forcast_data["weather_units"]["Precipitation_Unit"]}`}</p>
                            </div>
                        </div>
                        <div className="daily-weather-item">
                            <div className="weather-icon-with-item">
                                <img src="./src/assets/Weather-icons/Rain.png" alt="" />
                                <p>Rain</p>
                            </div>
                            <div className="daily-weather-fetched-data">
                                <p>{`${daily_and_hourly_forcast_data["Weather_daily_data"]["Rain_7days_data"][index]} ${daily_and_hourly_forcast_data["weather_units"]["Rain_unit"]}`}</p>
                            </div>
                        </div>
                        <div className="daily-weather-item">
                            <div className="weather-icon-with-item">
                                <img src="./src/assets/Weather-icons/Snow-fall.png" alt="" />
                                <p>Snow Fall</p>
                            </div>
                            <div className="daily-weather-fetched-data">
                                <p>{`${daily_and_hourly_forcast_data["Weather_daily_data"]["Snowfall_7days_data"][index]} ${daily_and_hourly_forcast_data["weather_units"]["Snowfall_unit"]}`}</p>
                            </div>
                        </div>
                        <div className="daily-weather-item">
                            <div className="weather-icon-with-item">
                                <img src="./src/assets/Weather-icons/Wind_speed.png" alt="" />
                                <p>Wind Speed</p>
                            </div>
                            <div className="daily-weather-fetched-data">
                                <p>{`${daily_and_hourly_forcast_data["Weather_daily_data"]["Windspeed_7days_data"][index]} ${daily_and_hourly_forcast_data["weather_units"]["Windspeed_unit"]} `}</p>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
        return Daily_weather_box_main_elements
    }


    function Render_hourly_forcast_data() {
        return (
            // <div className="houryly-weather-item-data-all-container">
            //     <div className="houryly-weather-item-data-container">
            //         <div className="hourly-day-and-date">
            //             <h3>Hourly Forcast</h3>
            //         </div>
            //         <div className="horuly-weather-data-box">
            //             {/* <div className="slide-middle-layer">
            //                     <div className="weather-data-item-all-container">

            //                     </div>
            //                 </div>
            //                 <div className="prev-button" onClick={() => { ChangeSlide("prev-slide") }}>
            //                     <img src="./src/assets/Weather-icons/prev.png" alt="" className="prev-button" />
            //                 </div>
            //                 <div className="next-button" onClick={() => { ChangeSlide("next-slide") }}>
            //                     <img src="./src/assets/Weather-icons/next.png" alt="" className="next-button" />
            //                 </div> */}
            //         </div>
            //     </div>
            // </div>
            <Swiper
                modules={[Navigation, Scrollbar, A11y]}
                spaceBetween={20}
                slidesPerView={1}
                navigation
                centeredSlides={true}
                centeredSlidesBounds={true}
                loop={true}
                breakpoints={{
                    450: {
                        slidesPerView: 1,
                        spaceBetween: 10,
                    },
                    455: {
                        slidesPerView: 2,
                        spaceBetween: 60,
                    },
                    620: {
                        slidesPerView: 3,
                        spaceBetween: 40,
                    },
                    1025: {
                        slidesPerView: 1,
                        spaceBetween: 10,
                    },
                }}
                // onSwiper={(swiper) => console.log(swiper)}
                // onSlideChange={() => console.log('slide change')}
            >
                <SwiperSlide>{elements_array[0]}</SwiperSlide>
                <SwiperSlide>{elements_array[1]}</SwiperSlide>
                <SwiperSlide>{elements_array[2]}</SwiperSlide>
                <SwiperSlide>{elements_array[3]}</SwiperSlide>
                <SwiperSlide>{elements_array[4]}</SwiperSlide>
                <SwiperSlide>{elements_array[5]}</SwiperSlide>
                <SwiperSlide>{elements_array[6]}</SwiperSlide>
                <SwiperSlide>{elements_array[7]}</SwiperSlide>
                <SwiperSlide>{elements_array[8]}</SwiperSlide>
                <SwiperSlide>{elements_array[9]}</SwiperSlide>
                <SwiperSlide>{elements_array[10]}</SwiperSlide>

            </Swiper>
        )
    }
    let Display_current_weather_data = [<div className="daily-specific-class">{Render_daily_weather_box()}</div>, <div className="hourly-specific-class">{Render_hourly_forcast_data()}</div>]

    function Change_weather_data(Weather_data_type) {
        if (Weather_data_type == "Daily-Weather_data") {
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
                }
            ]
            set_weather_data_option_style(New_style_array_obj)
            set_switch_weather_data(0)
            let change_class_element = document.querySelector("#daily-hourly-class-change")
            change_class_element.classList.remove("daily-hourly-content-hourly-data")
            change_class_element.classList.add("daily-hourly-content-daily-data")
        }
        else if (Weather_data_type == "Hourly-Weather_data") {
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
                }
            ]
            set_weather_data_option_style(New_style_array_obj)
            set_switch_weather_data(1)
            let change_class_element = document.querySelector("#daily-hourly-class-change")
            change_class_element.classList.remove("daily-hourly-content-daily-data")
            change_class_element.classList.add("daily-hourly-content-hourly-data")
        }
    }

    function ChangeSlide(slidemove) {
        if (slidemove == "prev-slide") {
            let Slide_element = document.querySelector(".weather-data-item-all-container")
            Slide_element.classList.add("anime-active-prev-class")
            setTimeout(() => {
                Slide_element.classList.remove("anime-active-prev-class")
                let New_elemenst_array = [...elements_array]
                let remove_element = New_elemenst_array.pop()
                New_elemenst_array.unshift(remove_element)
                set_elements_array(New_elemenst_array)
            }, 450);
        }
        else if (slidemove == "next-slide") {
            let Slide_element = document.querySelector(".weather-data-item-all-container")
            Slide_element.classList.add("anime-active-next-class")
            setTimeout(() => {
                Slide_element.classList.remove("anime-active-next-class")
                let New_elemenst_array = [...elements_array]
                let remove_element = New_elemenst_array.shift()
                New_elemenst_array.push(remove_element)
                set_elements_array(New_elemenst_array)
            }, 450);
        }
    }


    // console.log("now before the sample forcast function the daily and hourly weather data is")
    // console.log(daily_and_hourly_forcast_data)


    let count_obj = {
        temperature: 0,
        cloud_cover: 0,
        cloud_cover_high: 0,
        dew_point: 0,
        Rain: 0,
        Sealevel_Pressure: 0,
        Relative_humidity: 0,
        snowfall: 0,
        surface_pressure: 0,
        wind_speed: 0,
        wind_direction: 0
    }
    let intervalId_obj = {
        temperature: null,
        cloud_cover: null,
        cloud_cover_high: null,
        dew_point: null,
        rain: null,
        sealevel_pressure: null,
        relative_humidity: null,
        snowfall: null,
        surface_pressure: null,
        wind_speed: null,
        wind_direction: null
    };

    let Show_hourly_data = async (weather_data_type) => {
        let data_url = `https://api.open-meteo.com/v1/forecast?latitude=${selected_weather_obj_data["Latitude"]}&longitude=${selected_weather_obj_data["Longitude"]}&current=temperature_2m,relative_humidity_2m,precipitation,rain,snowfall,cloud_cover,pressure_msl,surface_pressure,wind_speed_10m,wind_direction_10m&hourly=temperature_2m,relative_humidity_2m,dew_point_2m,rain,snowfall,pressure_msl,surface_pressure,cloud_cover,cloud_cover_high,wind_speed_80m,wind_direction_80m,temperature_80m&daily=temperature_2m_max,precipitation_sum,rain_sum,snowfall_sum,wind_speed_10m_max&timezone=auto`
        let data_fetch = await fetch(data_url)
        let weather_data = await data_fetch.json()

        if (weather_data_type == "Temperature") {
            Stop_hourly_data("Temperature")
            const display_data = () => {

                if (count_obj["temperature"] > 167) {
                    clearInterval(intervalId_obj["temperature"]);
                    intervalId_obj["temperature"] = null;
                    // console.log("Interval cleared.");
                    return;
                }

                let date_and_time = weather_data["hourly"]["time"][count_obj["temperature"]];
                let date_string = weather_data["hourly"]["time"][count_obj["temperature"]].slice(0, 10);
                let time_string = weather_data["hourly"]["time"][count_obj["temperature"]].slice(11, 16);
                let date_and_time_string = `${date_string} - ${time_string}`;
                let Weather_data_time = document.querySelector(".temperature-time");
                let Weather_item_content = document.querySelector(".temperature-data-unit");
                Weather_data_time.innerHTML = date_and_time_string;
                Weather_item_content.innerHTML = `${weather_data["hourly"]["temperature_2m"][count_obj["temperature"]]} ${weather_data["hourly_units"]["temperature_2m"]}`;
                count_obj["temperature"] += 1;
            };

            if (!intervalId_obj["temperature"]) {
                intervalId_obj["temperature"] = setInterval(display_data, 2000);
                // console.log("Interval started.");
            }
        }
        else if (weather_data_type == "Cloud-Cover") {
            Stop_hourly_data("Cloud-Cover")
            const display_data = () => {

                if (count_obj["cloud_cover"] > 167) {
                    clearInterval(intervalId_obj["cloud_cover"]);
                    intervalId_obj["cloud_cover"] = null;
                    // console.log("Interval cleared.");
                    return;
                }

                let date_and_time = weather_data["hourly"]["time"][count_obj["cloud_cover"]];
                let date_string = weather_data["hourly"]["time"][count_obj["cloud_cover"]].slice(0, 10);
                let time_string = weather_data["hourly"]["time"][count_obj["cloud_cover"]].slice(11, 16);
                let date_and_time_string = `${date_string} - ${time_string}`;
                let Weather_data_time = document.querySelector(".Cloud_cover-time");
                let Weather_item_content = document.querySelector(".Cloud_cover_data-unit");
                Weather_data_time.innerHTML = date_and_time_string;
                Weather_item_content.innerHTML = `${weather_data["hourly"]["cloud_cover"][count_obj["cloud_cover"]]} ${weather_data["hourly_units"]["cloud_cover"]}`;
                count_obj["cloud_cover"] += 1;
            };

            if (!intervalId_obj["cloud_cover"]) {
                intervalId_obj["cloud_cover"] = setInterval(display_data, 2000);
                // console.log("Interval started.");
            }
        }
        else if (weather_data_type == "Cloud-Cover-High") {
            Stop_hourly_data("Cloud-Cover-High")
            const display_data = () => {

                if (count_obj["cloud_cover_high"] > 167) {
                    clearInterval(intervalId_obj["cloud_cover_high"]);
                    intervalId_obj["cloud_cover_high"] = null;
                    // console.log("Interval cleared.");
                    return;
                }

                let date_and_time = weather_data["hourly"]["time"][count_obj["cloud_cover_high"]];
                let date_string = weather_data["hourly"]["time"][count_obj["cloud_cover_high"]].slice(0, 10);
                let time_string = weather_data["hourly"]["time"][count_obj["cloud_cover_high"]].slice(11, 16);
                let date_and_time_string = `${date_string} - ${time_string}`;
                let Weather_data_time = document.querySelector(".Cloud-cover-high-time");
                let Weather_item_content = document.querySelector(".Cloud-Cover-high-data-unit");
                Weather_data_time.innerHTML = date_and_time_string;
                Weather_item_content.innerHTML = `${weather_data["hourly"]["cloud_cover_high"][count_obj["cloud_cover_high"]]} ${weather_data["hourly_units"]["cloud_cover_high"]}`;
                count_obj["cloud_cover_high"] += 1;
            };

            if (!intervalId_obj["cloud_cover_high"]) {
                intervalId_obj["cloud_cover_high"] = setInterval(display_data, 2000);
                // console.log("Interval started.");
            }
        }
        else if (weather_data_type == "Dew-Point") {
            Stop_hourly_data("Dew-Point")
            const display_data = () => {

                if (count_obj["dew_point"] > 167) {
                    clearInterval(intervalId_obj["dew_point"]);
                    intervalId_obj["dew_point"] = null;
                    // console.log("Interval cleared.");
                    return;
                }

                let date_and_time = weather_data["hourly"]["time"][count_obj["dew_point"]];
                let date_string = weather_data["hourly"]["time"][count_obj["dew_point"]].slice(0, 10);
                let time_string = weather_data["hourly"]["time"][count_obj["dew_point"]].slice(11, 16);
                let date_and_time_string = `${date_string} - ${time_string}`;
                let Weather_data_time = document.querySelector(".Dew-point-time");
                let Weather_item_content = document.querySelector(".Dew-point-data-unit");
                Weather_data_time.innerHTML = date_and_time_string;
                Weather_item_content.innerHTML = `${weather_data["hourly"]["dew_point_2m"][count_obj["dew_point"]]} ${weather_data["hourly_units"]["dew_point_2m"]}`;
                count_obj["dew_point"] += 1;
            };

            if (!intervalId_obj["dew_point"]) {
                intervalId_obj["dew_point"] = setInterval(display_data, 2000);
                // console.log("Interval started.");
            }
        }
        else if (weather_data_type == "Rain") {
            Stop_hourly_data("Rain")
            const display_data = () => {

                if (count_obj["Rain"] > 167) {
                    clearInterval(intervalId_obj["rain"]);
                    intervalId_obj["rain"] = null;
                    // console.log("Interval cleared.");
                    return;
                }

                let date_and_time = weather_data["hourly"]["time"][count_obj["Rain"]];
                let date_string = weather_data["hourly"]["time"][count_obj["Rain"]].slice(0, 10);
                let time_string = weather_data["hourly"]["time"][count_obj["Rain"]].slice(11, 16);
                let date_and_time_string = `${date_string} - ${time_string}`;
                let Weather_data_time = document.querySelector(".Rain-time");
                let Weather_item_content = document.querySelector(".Rain-data-unit");
                Weather_data_time.innerHTML = date_and_time_string;
                Weather_item_content.innerHTML = `${weather_data["hourly"]["rain"][count_obj["Rain"]]} ${weather_data["hourly_units"]["rain"]}`;
                count_obj["Rain"] += 1;
            };

            if (!intervalId_obj["rain"]) {
                intervalId_obj["rain"] = setInterval(display_data, 2000);
                // console.log("Interval started.");
            }
        }
        else if (weather_data_type == "Sealevel_Pressure") {
            Stop_hourly_data("Sealevel_Pressure")
            const display_data = () => {

                if (count_obj["Sealevel_Pressure"] > 167) {
                    clearInterval(intervalId_obj["sealevel_pressure"]);
                    intervalId_obj["sealevel_pressure"] = null;
                    // console.log("Interval cleared.");
                    return;
                }

                let date_and_time = weather_data["hourly"]["time"][count_obj["Sealevel_Pressure"]];
                let date_string = weather_data["hourly"]["time"][count_obj["Sealevel_Pressure"]].slice(0, 10);
                let time_string = weather_data["hourly"]["time"][count_obj["Sealevel_Pressure"]].slice(11, 16);
                let date_and_time_string = `${date_string} - ${time_string}`;
                let Weather_data_time = document.querySelector(".Sealevel-pressure-time");
                let Weather_item_content = document.querySelector(".Sealevel-pressure-data-unit");
                Weather_data_time.innerHTML = date_and_time_string;
                Weather_item_content.innerHTML = `${weather_data["hourly"]["pressure_msl"][count_obj["Sealevel_Pressure"]]} ${weather_data["hourly_units"]["pressure_msl"]}`;
                count_obj["Sealevel_Pressure"] += 1;
            };

            if (!intervalId_obj["sealevel_pressure"]) {
                intervalId_obj["sealevel_pressure"] = setInterval(display_data, 2000);
                // console.log("Interval started.");
            }
        }
        else if (weather_data_type == "Relative-Humidity") {
            Stop_hourly_data("Relative-Humidity")
            const display_data = () => {

                if (count_obj["Relative_humidity"] > 167) {
                    clearInterval(intervalId_obj["relative_humidity"]);
                    intervalId_obj["relative_humidity"] = null;
                    // console.log("Interval cleared.");
                    return;
                }

                let date_and_time = weather_data["hourly"]["time"][count_obj["Relative_humidity"]];
                let date_string = weather_data["hourly"]["time"][count_obj["Relative_humidity"]].slice(0, 10);
                let time_string = weather_data["hourly"]["time"][count_obj["Relative_humidity"]].slice(11, 16);
                let date_and_time_string = `${date_string} - ${time_string}`;
                let Weather_data_time = document.querySelector(".Relative-humidity-time");
                let Weather_item_content = document.querySelector(".Relative_humidity-data-unit");
                Weather_data_time.innerHTML = date_and_time_string;
                Weather_item_content.innerHTML = `${weather_data["hourly"]["relative_humidity_2m"][count_obj["Relative_humidity"]]} ${weather_data["hourly_units"]["relative_humidity_2m"]}`;
                count_obj["Relative_humidity"] += 1;
            };

            if (!intervalId_obj["relative_humidity"]) {
                intervalId_obj["relative_humidity"] = setInterval(display_data, 2000);
                // console.log("Interval started.");
            }
        }
        else if (weather_data_type == "Snowfall") {
            Stop_hourly_data("Snowfall")
            const display_data = () => {

                if (count_obj["snowfall"] > 167) {
                    clearInterval(intervalId_obj["snowfall"]);
                    intervalId_obj["snowfall"] = null;
                    // console.log("Interval cleared.");
                    return;
                }

                let date_and_time = weather_data["hourly"]["time"][count_obj["snowfall"]];
                let date_string = weather_data["hourly"]["time"][count_obj["snowfall"]].slice(0, 10);
                let time_string = weather_data["hourly"]["time"][count_obj["snowfall"]].slice(11, 16);
                let date_and_time_string = `${date_string} - ${time_string}`;
                let Weather_data_time = document.querySelector(".Snowfall-time");
                let Weather_item_content = document.querySelector(".Snowfall-data-unit");
                Weather_data_time.innerHTML = date_and_time_string;
                Weather_item_content.innerHTML = `${weather_data["hourly"]["snowfall"][count_obj["snowfall"]]} ${weather_data["hourly_units"]["snowfall"]}`;
                count_obj["snowfall"] += 1;
            };

            if (!intervalId_obj["snowfall"]) {
                intervalId_obj["snowfall"] = setInterval(display_data, 2000);
                // console.log("Interval started.");
            }
        }
        else if (weather_data_type == "Surface-Pressure") {
            Stop_hourly_data("Surface-Pressure")
            const display_data = () => {

                if (count_obj["surface_pressure"] > 167) {
                    clearInterval(intervalId_obj["surface_pressure"]);
                    intervalId_obj["surface_pressure"] = null;
                    // console.log("Interval cleared.");
                    return;
                }

                let date_and_time = weather_data["hourly"]["time"][count_obj["surface_pressure"]];
                let date_string = weather_data["hourly"]["time"][count_obj["surface_pressure"]].slice(0, 10);
                let time_string = weather_data["hourly"]["time"][count_obj["surface_pressure"]].slice(11, 16);
                let date_and_time_string = `${date_string} - ${time_string}`;
                let Weather_data_time = document.querySelector(".Surface-pressure-time");
                let Weather_item_content = document.querySelector(".Surface-pressure-data-unit");
                Weather_data_time.innerHTML = date_and_time_string;
                Weather_item_content.innerHTML = `${weather_data["hourly"]["surface_pressure"][count_obj["surface_pressure"]]} ${weather_data["hourly_units"]["surface_pressure"]}`;
                count_obj["surface_pressure"] += 1;
            };

            if (!intervalId_obj["surface_pressure"]) {
                intervalId_obj["surface_pressure"] = setInterval(display_data, 2000);
                // console.log("Interval started.");
            }
        }
        else if (weather_data_type == "Wind-Speed") {
            Stop_hourly_data("Wind-Speed")
            const display_data = () => {

                if (count_obj["wind_speed"] > 167) {
                    clearInterval(intervalId_obj["wind_speed"]);
                    intervalId_obj["wind_speed"] = null;
                    // console.log("Interval cleared.");
                    return;
                }

                let date_and_time = weather_data["hourly"]["time"][count_obj["wind_speed"]];
                let date_string = weather_data["hourly"]["time"][count_obj["wind_speed"]].slice(0, 10);
                let time_string = weather_data["hourly"]["time"][count_obj["wind_speed"]].slice(11, 16);
                let date_and_time_string = `${date_string} - ${time_string}`;
                let Weather_data_time = document.querySelector(".Wind-speed-time");
                let Weather_item_content = document.querySelector(".wind-speed-data-unit");
                Weather_data_time.innerHTML = date_and_time_string;
                Weather_item_content.innerHTML = `${weather_data["hourly"]["wind_speed_80m"][count_obj["wind_speed"]]} ${weather_data["hourly_units"]["wind_speed_80m"]}`;
                count_obj["wind_speed"] += 1;
            };

            if (!intervalId_obj["wind_speed"]) {
                intervalId_obj["wind_speed"] = setInterval(display_data, 2000);
                // console.log("Interval started.");
            }
        }
        else if (weather_data_type == "Wind-Direction") {
            Stop_hourly_data("Wind-Direction")
            const display_data = () => {

                if (count_obj["wind_direction"] > 167) {
                    clearInterval(intervalId_obj["wind_direction"]);
                    intervalId_obj["wind_direction"] = null;
                    // console.log("Interval cleared.");
                    return;
                }

                let date_and_time = weather_data["hourly"]["time"][count_obj["wind_direction"]];
                let date_string = weather_data["hourly"]["time"][count_obj["wind_direction"]].slice(0, 10);
                let time_string = weather_data["hourly"]["time"][count_obj["wind_direction"]].slice(11, 16);
                let date_and_time_string = `${date_string} - ${time_string}`;
                let Weather_data_time = document.querySelector(".Wind-direction-time");
                let Weather_item_content = document.querySelector(".Wind-direction-data-unit");
                Weather_data_time.innerHTML = date_and_time_string;
                Weather_item_content.innerHTML = `${weather_data["hourly"]["wind_direction_80m"][count_obj["wind_direction"]]} ${weather_data["hourly_units"]["wind_direction_80m"]}`;
                count_obj["wind_direction"] += 1;
            };

            if (!intervalId_obj["wind_direction"]) {
                intervalId_obj["wind_direction"] = setInterval(display_data, 2000);
                // console.log("Interval started.");
            }
        }
    }

    const Stop_hourly_data = (weather_data_type) => {
        if (weather_data_type == "Temperature") {
            if (intervalId_obj["temperature"]) {
                clearInterval(intervalId_obj["temperature"]);
                intervalId_obj["temperature"] = null;
                // console.log("Interval stopped.");
            }
        }
        else if (weather_data_type == "Cloud-Cover") {
            if (intervalId_obj["cloud_cover"]) {
                clearInterval(intervalId_obj["cloud_cover"]);
                intervalId_obj["cloud_cover"] = null;
                // console.log("Interval stopped.");
            }
        }
        else if (weather_data_type == "Cloud-Cover-High") {
            if (intervalId_obj["cloud_cover_high"]) {
                clearInterval(intervalId_obj["cloud_cover_high"]);
                intervalId_obj["cloud_cover_high"] = null;
                // console.log("Interval stopped.");
            }
        }
        else if (weather_data_type == "Dew-Point") {
            if (intervalId_obj["dew_point"]) {
                clearInterval(intervalId_obj["dew_point"]);
                intervalId_obj["dew_point"] = null;
                // console.log("Interval stopped.");
            }
        }
        else if (weather_data_type == "Rain") {
            if (intervalId_obj["rain"]) {
                clearInterval(intervalId_obj["rain"]);
                intervalId_obj["rain"] = null;
                // console.log("Interval stopped.");
            }
        }
        else if (weather_data_type == "Sealevel_Pressure") {
            if (intervalId_obj["sealevel_pressure"]) {
                clearInterval(intervalId_obj["sealevel_pressure"]);
                intervalId_obj["sealevel_pressure"] = null;
                // console.log("Interval stopped.");
            }
        }
        else if (weather_data_type == "Relative-Humidity") {
            if (intervalId_obj["relative_humidity"]) {
                clearInterval(intervalId_obj["relative_humidity"]);
                intervalId_obj["relative_humidity"] = null;
                // console.log("Interval stopped.");
            }
        }
        else if (weather_data_type == "Snowfall") {
            if (intervalId_obj["snowfall"]) {
                clearInterval(intervalId_obj["snowfall"]);
                intervalId_obj["snowfall"] = null;
                // console.log("Interval stopped.");
            }
        }
        else if (weather_data_type == "Surface-Pressure") {
            if (intervalId_obj["surface_pressure"]) {
                clearInterval(intervalId_obj["surface_pressure"]);
                intervalId_obj["surface_pressure"] = null;
                // console.log("Interval stopped.");
            }
        }
        else if (weather_data_type == "Wind-Speed") {
            if (intervalId_obj["wind_speed"]) {
                clearInterval(intervalId_obj["wind_speed"]);
                intervalId_obj["wind_speed"] = null;
                // console.log("Interval stopped.");
            }
        }
        else if (weather_data_type == "Wind-Direction") {
            if (intervalId_obj["wind_direction"]) {
                clearInterval(intervalId_obj["wind_direction"]);
                intervalId_obj["wind_direction"] = null;
                // console.log("Interval stopped.");
            }
        }
    };

    const restart_the_hourly_data = async (weather_data_type) => {

        if (weather_data_type == "Temperature") {

            Stop_hourly_data("Temperature")
            count_obj["temperature"] = 0

            const display_data = () => {
                Show_hourly_data("Temperature")
            };

            if (!intervalId_obj["temperature"]) {
                intervalId_obj["temperature"] = setInterval(display_data, 2000);
                // console.log("Interval started.");
            }
        }

        else if (weather_data_type == "Cloud-Cover") {
            Stop_hourly_data("Cloud-Cover")
            count_obj["cloud_cover"] = 0

            const display_data = () => {
                Show_hourly_data("Cloud-Cover")
            };

            if (!intervalId_obj["cloud_cover"]) {
                intervalId_obj["cloud_cover"] = setInterval(display_data, 2000);
                // console.log("Interval started.");
            }
        }

        else if (weather_data_type == "Cloud-Cover-High") {
            Stop_hourly_data("Cloud-Cover-High")
            count_obj["cloud_cover_high"] = 0

            const display_data = () => {
                Show_hourly_data("Cloud-Cover-High")
            };

            if (!intervalId_obj["cloud_cover_high"]) {
                intervalId_obj["cloud_cover_high"] = setInterval(display_data, 2000);
                // console.log("Interval started.");
            }
        }

        else if (weather_data_type == "Dew-Point") {
            Stop_hourly_data("Dew-Point")
            count_obj["dew_point"] = 0

            const display_data = () => {
                Show_hourly_data("Dew-Point")
            };

            if (!intervalId_obj["dew_point"]) {
                intervalId_obj["dew_point"] = setInterval(display_data, 2000);
                // console.log("Interval started.");
            }
        }

        else if (weather_data_type == "Rain") {
            Stop_hourly_data("Rain")
            count_obj["Rain"] = 0

            const display_data = () => {
                Show_hourly_data("Rain")
            };

            if (!intervalId_obj["rain"]) {
                intervalId_obj["rain"] = setInterval(display_data, 2000);
                // console.log("Interval started.");
            }
        }

        else if (weather_data_type == "Sealevel_Pressure") {
            Stop_hourly_data("Sealevel_Pressure")
            count_obj["Sealevel_Pressure"] = 0

            const display_data = () => {
                Show_hourly_data("Sealevel_Pressure")
            };

            if (!intervalId_obj["sealevel_pressure"]) {
                intervalId_obj["sealevel_pressure"] = setInterval(display_data, 2000);
                // console.log("Interval started.");
            }
        }

        else if (weather_data_type == "Relative-Humidity") {
            Stop_hourly_data("Relative-Humidity")
            count_obj["Relative_humidity"] = 0

            const display_data = () => {
                Show_hourly_data("Relative-Humidity")
            };

            if (!intervalId_obj["relative_humidity"]) {
                intervalId_obj["relative_humidity"] = setInterval(display_data, 2000);
                // console.log("Interval started.");
            }
        }

        else if (weather_data_type == "Snowfall") {
            Stop_hourly_data("Snowfall")
            count_obj["snowfall"] = 0

            const display_data = () => {
                Show_hourly_data("Snowfall")
            };

            if (!intervalId_obj["snowfall"]) {
                intervalId_obj["snowfall"] = setInterval(display_data, 2000);
                // console.log("Interval started.");
            }
        }

        else if (weather_data_type == "Surface-Pressure") {
            Stop_hourly_data("Surface-Pressure")
            count_obj["surface_pressure"] = 0

            const display_data = () => {
                Show_hourly_data("Surface-Pressure")
            };

            if (!intervalId_obj["surface_pressure"]) {
                intervalId_obj["surface_pressure"] = setInterval(display_data, 2000);
                // console.log("Interval started.");
            }
        }

        else if (weather_data_type == "Wind-Speed") {
            Stop_hourly_data("Wind-Speed")
            count_obj["wind_speed"] = 0

            const display_data = () => {
                Show_hourly_data("Wind-Speed")
            };

            if (!intervalId_obj["wind_speed"]) {
                intervalId_obj["wind_speed"] = setInterval(display_data, 2000);
                // console.log("Interval started.");
            }
        }

        else if (weather_data_type == "Wind-Direction") {
            Stop_hourly_data("Wind-Direction")
            count_obj["wind_direction"] = 0

            const display_data = () => {
                Show_hourly_data("Wind-Direction")
            };

            if (!intervalId_obj["wind_direction"]) {
                intervalId_obj["wind_direction"] = setInterval(display_data, 2000);
                // console.log("Interval started.");
            }
        }

    }

    return (
        <div className="Daily-and-hourly-data-container">
            <div id="daily-hourly-class-change">
                <div className="daily-hourly-heading">
                    <h2>Daily & Hourly Forcast</h2>
                </div>
                <div className="daily-hourly-weather-data-container">
                    <div className="daily-and-hourly-options">
                        <div className="daily-weather-data">
                            <button onClick={() => {
                                Change_weather_data("Daily-Weather_data")
                            }} style={Weather_data_option_style[0]}>Daily Forcast</button>
                        </div>
                        <div className="hourly-weather-data">
                            <button onClick={() => {
                                Change_weather_data("Hourly-Weather_data")
                            }} style={Weather_data_option_style[1]}>Hourly Forcast</button>
                        </div>
                    </div>
                    <div className="daily-hourly-data-content">
                        <Current_location_data imgsrc={Display_weather_icon()} location_name={current_location_obj_data["location_name"]} location_state={current_location_obj_data["location_state"]} location_country={current_location_obj_data["location_country"]} />
                        <div className="each-day-weather-all-data">
                            {Display_current_weather_data[switch_weather_data]}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default DailyandHourlyWeather