const Location = async (lat , long ) =>
{
    const data = await fetch("https://api.openweathermap.org/data/2.5/weather?lat="+ lat + "&lon="+ long +"&appid=9e4cdd6c628c4cbdcacc25b6df594009")
    const fetchData = data.json();
    return fetchData;
}
export default  Location;