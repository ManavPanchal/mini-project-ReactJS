import React, { useEffect, useState} from "react";
import "./weather.css"
import { suggestion } from "./suggestion";
import Location from "./Location";
import Tooltip from '@mui/material/Tooltip';
import Data from "./Data";

const WeatherM =() =>
{
    const [crntCity, setCrntCity] = useState("");
    const [name , setName] = useState("");
    const [fetchCity, fetchCrntCityName] = useState("");
    const [suggarr , setSuggArr] =  useState([]);
    const [crntTemp , setCrntTemp] = useState([]);
    const [latitude , setLatitude ] = useState(null);
    const [longitude , setLongitude] = useState(null);

    useEffect(()=>{
        navigator.geolocation.getCurrentPosition((position) =>{
            setLatitude(position.coords.latitude);
            setLongitude(position.coords.longitude);
        })
    },[])

    useEffect(async ()=>{
        const res = await fetch("https://api.openweathermap.org/data/2.5/weather?q=" +  name   +"&units=metric&appid=9e4cdd6c628c4cbdcacc25b6df594009"); 
        const result = await res.json();
        setCrntTemp(result.main);
        fetchCrntCityName(result.name);
    },[name])

    const doChange = (event) =>
    {
        const {value} = event.target;
        setCrntCity(value);
        if(value !== ""){
            suggestion(value).then((response)=>{
                setSuggArr(response);
            });
        }else setSuggArr([]);
    }
    const searchData = () =>{
        setName(crntCity);
    }
    const searchCrntLocation = async () =>{
        const response  =  await Location(latitude , longitude);
        const result =  await response;
        setCrntCity(result.name);
    }
    var ind = 0;
    return(
        <>
            <div className="Body_wrapper">
                <div className="card_wrapper">
                    <div className="card">
                        <div className="card_header">
                            <div className="search_wrapper">
                                <div className="search_bar">
                                    <input 
                                        type="text"
                                        placeholder="Enter City Name"
                                        onChange={doChange}
                                        value = {crntCity}
                                    />
                                    <Tooltip title="Click to find your current Location" style={{"fontSize" : "2rem"}}>
                                        <button onClick={() =>{
                                            if(latitude == null)
                                                alert("Allow use Location to find your cuurent location")
                                            else {
                                                setCrntCity("searching for Location...");
                                                searchCrntLocation();
                                            }
                                        }} className="crntLocator"> <i className="fa-solid fa-location-crosshairs"></i> </button>
                                    </Tooltip>
                                    <div className="suggestion_section">
                                    {suggarr.map((elem , index) => {
                                            if(ind<9){
                                                ind ++;
                                                return(
                                                <h1 key={index} className="suggestions" onClick={() =>{
                                                setCrntCity(elem.city);                                
                                                setSuggArr([]);}}> 
                                                {elem.city} , {elem.state} 
                                                </h1>
                                                )
                                            }
                                            return ;
                                        })}
                                    </div>
                                </div>
                                <button onClick= {searchData}>search</button>
                            </div>
                        </div>
                        {!crntTemp? (
                            <p className="data-exception">No data Found </p>
                        ):(
                            <Data 
                                cityname = {fetchCity} 
                                temp={crntTemp.temp} 
                                temp_min = {crntTemp.temp_min}
                                temp_max = {crntTemp.temp_max}
                            />
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}

export default WeatherM

// <i class="fa-solid fa-location-crosshairs"></i>
// fetchCityName
// crntTemp.temp
// crntTemp.temp_min
// crntTemp.temp_max