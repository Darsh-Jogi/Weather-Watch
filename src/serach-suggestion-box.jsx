function SearchSuggestionBox({ serach_obj_value, input_len, input_func }) {
    let Locations_items = []

    let Search_object = serach_obj_value
    let Serach_object_array = Search_object["results"]

    function Rednerlocationitems() {
        if ((input_len >= 2) && (Serach_object_array)) {
            let Search_object = serach_obj_value
            let Serach_object_array = Search_object["results"]

            if (Serach_object_array.length > 0) {
                for (let index = 0; index < Serach_object_array.length; index++) {
                    let loc_obj = {
                        Location_Name: Serach_object_array[index]["name"],
                        Latitude: Serach_object_array[index]["latitude"],
                        Longitude: Serach_object_array[index]["longitude"],
                        State: Serach_object_array[index]["admin1"],
                        country: Serach_object_array[index]["country"],
                        unique_id: Serach_object_array[index]["id"]
                    }
                    let string_of_loc_obj = JSON.stringify(loc_obj)
                    Locations_items.push(
                        <li className="location-item" onClick={input_func} data-locationdeatils={string_of_loc_obj}>
                            <div className="location-details" data-locationdeatils={string_of_loc_obj}>
                                <h4 data-locationdeatils={string_of_loc_obj}> {Serach_object_array[index]["name"]} </h4>
                                <div className="more-location-info" data-locationdeatils={string_of_loc_obj}>
                                    <h5 data-locationdeatils={string_of_loc_obj}>{Serach_object_array[index]["admin1"]},</h5>
                                    <h5 data-locationdeatils={string_of_loc_obj}>{Serach_object_array[index]["country"]}</h5>
                                </div>
                            </div>
                        </li>
                    )
                }
                return Locations_items
            }
        }
        else if ((input_len >= 2) && (!Serach_object_array)) {
            let box_element = document.querySelector(".Search-sugesstion-container")
            box_element.style.display = "none"
        }
    }

    return (
        <div className="Search-sugesstion-container">
            <div className="serach_suggestiob-box">
                <ul className="list-of-locaitons">
                    {Rednerlocationitems()}
                </ul>
            </div>
        </div>
    )
}
export default SearchSuggestionBox