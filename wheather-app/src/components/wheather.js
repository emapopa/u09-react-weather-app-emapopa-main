import React, {useState, useEffect} from 'react';
import"./weather.css";

function Weather() {
    

  
    useEffect(() => {
        weatherData(null)
    },[])
    

    const APIKEY = "7c5b04964b8d8416a51fb638469c2610";

    const [form, setForm] = useState({
        city: "",
        country: "",
    });
    const [icon, setIcon] = useState('');
    const [sunrise, setSunrise] = useState('');
    const [sunset, setSunset] = useState('');
    const [description, setDescription] = useState('')
    const [name, setName] = useState('');
    const [data, setData] = useState(null);
    const [temperature, setTemperature] = useState('');
    const [days, setDays] = useState([]);
    const [temp2, setTemp2] = useState("");
    const [feels, setFeels] = useState('');
    const [speed, setSpeed] = useState('');
    const [deg, setDeg] = useState('');
    function weatherData(e){
       // console.log("Hej från weatherdata")
       if (e) {
        e.preventDefault();}
            navigator.geolocation.getCurrentPosition((position) => {
                console.log('hej')
                let lat = position.coords.latitude
                let lon = position.coords.longitude
                //console.log(lat)
                //console.log(lon)
                let url
                if (form.city) {
                    url = `https://api.openweathermap.org/data/2.5/weather?q=${form.city},${form.country}&units=metric&appid=${APIKEY}`
                }else{
                    url = `https:/api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${APIKEY}`
                }
           
            
          
            const data = fetch(url)
            .then(res => res.json())
                .then(data => {
                        setIcon(data.weather[0].icon)
                        setSunrise(data.sys.sunrise)
                        setDescription(data.weather[0].description)
                        setSunset(data.sys.sunset)
                        setName(data.name)
                        setData(data)
                        setTemperature(data.main.temp)
                        setFeels(data.main.feels_like)
                        setSpeed(data.wind.speed)
                        setDeg(data.wind.deg)
                        console.log(data)
                    }
                )
                const data2 = fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${APIKEY}&units=metric`)
                .then(result => result.json())
                .then(data2 => {
                    console.log(data2)
                    setDays(data2.list)
                })
                })           
                
    }


    const handleChange = (e) => {
        let name = e.target.name;
        let value = e.target.value;

        if(name === "city"){
            setForm({...form, city:value})
        }
        if(name === "country"){
            setForm({...form, country:value})
        }
        console.log(form.city, form.country);
    };
   const iconurl =  "http://openweathermap.org/img/wn/" + icon + ".png"
    return (
        <div className= "max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl bg-gradient-to-r from-green-400 to-blue-500  ">
        <span className= "title font-black">Weather App</span>   
        <br/>
        {}
            <form onSubmit={weatherData}>
            <input className="h-full w-full border-gray-300 px-2 transition-all border-blue rounded-sm" type="text" name="city" placeholder="city" value={form.city} onChange={handleChange} />
        
            <input className="h-full w-full border-gray-300 px-2 transition-all border-blue rounded-sm" type="text" name="country" placeholder="country" value={form.country} onChange={handleChange}/>
            &nbsp;
            <input type="submit" className="getweather bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded" value="Submit" />
        </form>
        <div className="pt-20 content-center">

            <span className="cardtitle">
                {name}: Weather as of-
            </span>
            <span className="cardsubtitle">
                 {new Date().toLocaleTimeString()}
             </span>
          
        <h3>Temperature: 
            {temperature} <sup>o</sup>
        </h3>

        <span className="weather-main">{description}</span>
        <div>
        <img src={iconurl} className="h-36 w-full object-cover md:w-40 pobject-center" icon="" />
        </div>
        <h3>Feels like:
            {feels} <sup>o</sup>
        </h3>
        <h4>Wind speed:
            {speed}
        </h4>
       
        <h4>Sunrise</h4>
        <span>
            {new Date(sunrise * 1000).toLocaleTimeString()}
        </span>

        <h4>Sunset</h4>
        <span>
            {new Date(sunset * 1000).toLocaleTimeString()}
        </span>

        </div>
        <div className="p-10 pt-10 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-5">

        {days.map((day)=>{
            return (
                <div className="box-content h-32 w-32 p-4 border-4" key={day.dt} >
                    <h1>{new Date(day.dt * 1000).toLocaleDateString()}</h1>
                    <h1>{new Date(day.dt * 1000).toLocaleTimeString()}</h1>
                    <h1>{day.main.temp} °C</h1>
                    <h1>Humidity:{day.main.humidity}%</h1>
                </div>
            )
        })}
        </div>
       
        </div>
    )
    
};



export default Weather