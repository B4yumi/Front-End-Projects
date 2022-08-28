
const baseURL = 'https://api.openweathermap.org/data/2.5/weather?zip=';
const apiKey = '&appid=bf7a301edd53a20b90125d5d3d29ab43&units=imperial';

let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();


document.getElementById('generate').addEventListener('click', Action);


function Action(e){
const zip = document.getElementById('zip').value;

getData(baseURL,zip,apiKey)
.then(function(data){
    console.log(data);
    const userResponse = document.getElementById('feelings').value;
    postData('/addData',{temperature: data.main.temp,
        date: newDate,
        userResponse: userResponse});
    
}).then(function(data){
    console.log(data);
    retrieveData();
});
};


const getData = async(baseURL,zip,apiKey)=>{
    let res = await fetch(baseURL+zip+apiKey)
    try {
        const data = await res.json();
        console.log(data);
        return data;

    } catch(error){
        console.log('error',error);
    }
};

const postData = async ( url = '', data = {})=>{
    console.log(data);
      const response = await fetch(url, {
      method: 'POST', 
      credentials: 'same-origin',
      headers: {
          'Content-Type': 'application/json',
      },
             
      body: JSON.stringify(data), 
    });

      try {
        const newData = await response.json();
        console.log(newData);
        return newData;
      }catch(error) {
      console.log("error", error);
      }
  };


  const retrieveData = async () =>{
    const request = await fetch('/all');
    try {
   
    const allData = await request.json()
    console.log(allData)
    

    document.getElementById('temp').innerHTML = Math.round(allData.temperature)+ 'degrees';
    document.getElementById('content').innerHTML = allData.userResponse;
    document.getElementById('date').innerHTML =allData.date;
    }
    catch(error) {
      console.log("error", error);
      
    }
   }


  