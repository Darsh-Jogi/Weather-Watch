function Current_location_data({imgsrc, location_name, location_state, location_country}) {
    return (
        <div className="current-location-name-data">
            <div className="current-weather-icon">
                <img src={imgsrc} alt="" />
            </div>
            <div className="current-location-full-deatils">
                <div className="current-location-name">
                    <h2>{location_name}</h2>
                </div>
                <div className="state-and-country">
                    <h4>{location_state},</h4>
                    <h4>{location_country}</h4>
                </div>
            </div>
        </div>
    )
}

export default Current_location_data