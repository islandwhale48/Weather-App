
const place = document.querySelector('.place');
const time = document.querySelector('.time');
const date = document.querySelector('.date');
const temperature = document.querySelector('.temperature');
const form = document.querySelector('.search');
const icon = document.querySelector('.icon img')
const desc = document.querySelector('.desc')
const spans = document.querySelectorAll('.displayInfo div span')

document.addEventListener('DOMContentLoaded',(e)=>{
    try{
        getWeatherDetails('India');
    }
    catch(error){
        console.error('its not working')
    }
})

form.addEventListener('submit', (e) => {
    e.preventDefault();
    var searchTerm = form.elements.query.value;
    getWeatherDetails(searchTerm);
    searchTerm = "";
})



const apiKey = '2741108d47bd42be8be184043241606'; // Replace with your actual API key
const apiUrl = ' http://api.weatherapi.com/v1'; // Replace with the actual API URL


const getWeatherDetails = async (searchTerm) => {
    const config = { params: { key: apiKey, q: searchTerm } }
    const res = await axios.get(' http://api.weatherapi.com/v1/current.json', config)
    changedisplay(res.data);

}

function changedisplay(data) {
    console.log(data)
    temperature.textContent = data.current.temp_c;
    place.innerText = data.location.name + ',' + data.location.country;

    time.innerText = getCurrentTime();
    
    icon.src = data.current.condition.icon;
    desc.innerText = data.current.condition.text;

    spans[1].innerText = data.current.wind_kph + "kph";
    spans[3].innerText = data.current.humidity;
    spans[5].innerText = data.current.precip_mm;
    ;

}


function getCurrentTime() {
    const now = new Date();

    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');

    return `${hours}:${minutes}:${seconds}`;
}
function getCurrentDate() {
    const now = new Date();

    const year = now.getFullYear();
    const monthIndex = now.getMonth(); // Months are zero-based, so no need to add 1 here
    const day = now.getDate().toString().padStart(2, '0');
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const month = months[monthIndex]; 

    return `${day} ${month}, ${year}`;
}

setInterval(() => {
    time.innertext = getCurrentTime();
}, 1000);
date.innerText = getCurrentDate();
setInterval(() => {
    time.innertext = getCurrentDate();
}, 1000);