const form = document.querySelector("form")
const input = document.querySelector("#cityInpt")
const card = document.querySelector(".card")

const apikey = "02928a59f2e321e3331214ae34b184d2"

form.addEventListener("submit", (event)=>{
    event.preventDefault()
    const city = input.value
    if(city){
        getData(city)
    }else{
        displayError("Please Enter a city")
    }
})

async function getData(city){
    const apiurl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}`
    const response = await fetch(apiurl)
    const data = await response.json()
    try{
        displayInfo(data)
        console.log(data)
    }catch(e){
        displayError("City Not Found")
    }
}


function displayInfo(data){
    console.log(data);
    const {name: city, main:{temp, humidity}, weather:[{id, description}]} = data
    card.textContent = ""
    card.style.display = "flex"

    const cityShow = document.createElement("h1")
    const tempShow = document.createElement("p")
    const discShow = document.createElement("p")
    const humidityShow = document.createElement("p")
    const emojiShow = document.createElement("p")

    cityShow.textContent = city
    tempShow.textContent =( temp - 273.15).toFixed(1) + " °c" 
    discShow.textContent = description
    humidityShow.textContent = "Humidity: " + humidity + "%"
    emojiShow.textContent = getEmoji(id)

    cityShow.classList.add("city")
    tempShow.classList.add("temp")
    discShow.classList.add("disc")
    humidityShow.classList.add("humidity")
    emojiShow.classList.add("emoji")

    card.append(cityShow, tempShow, discShow, humidityShow, emojiShow)
}


function getEmoji(id){
    switch(true){
        case id >= 200 && id <= 299:
            return "⛈"
        case id >= 300 && id <= 499:
            return "🌧"
        case id >= 500 && id <= 599:
            return "🌦"
        case id >= 600 && id <= 700:
            return "🌨"
        case id >= 701 && id <= 799:
            return "🌫"
        case id == 800:
            return "☀"
        case id >= 801 && id <= 804:
            return "⛅"
        default:
            return "❓"
    }
}

function displayError(msg){
    const error =  document.createElement("p")
    error.textContent = msg
    error.classList.add("error")
    
    card.textContent = ""
    card.style.display = "flex"
    card.appendChild(error)
}