import React from "react";
import "./weather.css"

const Data = (props) =>{
    return(
        <>
            <div className="card_main">
            <div className="city_info">
                <div className="cities"> 
                    <i className="fa-solid fa-location-dot"></i>
                    <div className="cities_header">
                        <h1 className="fetchcity"> {props.cityname} </h1>
                    </div>
                </div>
                <div className="temp"><h1> {props.temp} °Cel </h1></div>
            </div>
            <div className="min-max_temp">
                <h3> min-temp : {props.temp_min} °Cel</h3>
                <h3>||</h3>
                <h3>max-temp :{props.temp_max} °Cel</h3>
            </div>
            </div>
        </>
    )
}

export default Data;