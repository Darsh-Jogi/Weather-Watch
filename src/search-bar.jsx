import { useState, useEffect } from "react"
import SearchSuggestionBox from "./serach-suggestion-box.jsx"
function Searchbar({ updated_input_value, input_handler, search_obj, enterd_input_length, select_input_func, serach_location }) {
    return (
        <div className="search-bar">
            <div className="serach-bat-button-div">
                <div className="search-field">
                    <input type="text" placeholder="Enter Location here" value={updated_input_value} onChange={input_handler} />
                </div>
                <div className="search-button">
                    <button onClick={serach_location}>Search</button>
                </div>
            </div>
            <SearchSuggestionBox serach_obj_value={search_obj} input_len={enterd_input_length} input_func={select_input_func} />
        </div>
    )
}

export default Searchbar