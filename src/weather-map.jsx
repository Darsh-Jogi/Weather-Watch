import { useState, useEffect } from "react"
import { MapContainer, TileLayer, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
function WeatherMap({ location_coordinates_obj, Active_weather_layer, Active_map_layer }) {
    

    function ChangeCentercoord({new_center}) {
        const map = useMap();
        map.setView(new_center, map.getZoom());
        return null;
    }

    return (

        <div className="leaflet-full-map">
            <MapContainer center={[location_coordinates_obj["Latitude"], location_coordinates_obj["Longitude"]]}
                zoom={6} 
                style={{ height: '100vh', width: '100vw' }}
                minZoom={2}
                maxZoom={18}
                worldCopyJump={true} >
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution="&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors"
                />
                {/* this is the satelite map layer */}
                <TileLayer
                    url={Active_map_layer}
                    // attribution="Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community"
                />
                <TileLayer
                    url={Active_weather_layer}
                    // attribution="&copy; <a href='https://openweathermap.org/'>OpenWeatherMap</a>"
                />
                <ChangeCentercoord new_center={[location_coordinates_obj["Latitude"], location_coordinates_obj["Longitude"]]} />
            </MapContainer>
        </div>
    )
}

export default WeatherMap