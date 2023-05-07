let selectHour = 0;
let counterInjuriesArray =[];
let counterAccidentsHour = 0;
let minuteArrays = [];
let minuteArray = [];
let hourArrays = [];

for (let i = 0; i < 24; i++) {
  hourArrays[i] = [];
}

// let minuteArrays = [];
for (let i = 0; i < 24; i++) {
  minuteArrays[i] = [];
  counterInjuriesArray[i]=[];
  for (let j = 0; j < 60; j++) {
    minuteArrays[i][j] = 0; 
    counterInjuriesArray[i][j] = 0;
  }
}

let dropDown = document.getElementById("timeOfDay");
dropDown.addEventListener("change", retrieveData);

function retrieveData() {
  // reset hourArrays and minuteArrays
  for (let i = 0; i < 24; i++) {
    hourArrays[i] = [];
  }
  for (let i = 0; i < 24; i++) {
    for (let j = 0; j < 60; j++) {
      minuteArrays[i][j] = 0;
      counterInjuriesArray[i][j] = 0;
    }
  }

  fetch("https://data.cityofnewyork.us/resource/h9gi-nx95.json?$where=crash_date%20%3E=%20%272023-04-01T00:00:00.000%27%20AND%20crash_date%20%3C%20%272023-05-01T00:00:00.000%27%20AND%20contributing_factor_vehicle_1%20=%20%27Driver%20Inattention/Distraction%27&$limit=1000")
    .then((response) => response.json())
    .then((dataOne) => {
      fetch("https://data.cityofnewyork.us/resource/h9gi-nx95.json?$where=crash_date%20%3E=%20%272023-04-01T00:00:00.000%27%20AND%20crash_date%20%3C%20%272023-05-01T00:00:00.000%27%20AND%20contributing_factor_vehicle_1%20=%20%27Driver%20Inattention/Distraction%27&$limit=1000&$offset=1000")
        .then((response) => response.json())
        .then((data) => {
          let fullData = dataOne.concat(data);
          fullData.forEach((obj) => {
            let crashTime = obj.crash_time;
            let hour = parseInt(crashTime.split(":")[0]);
            let minute = parseInt(crashTime.split(":")[1]);
            let injury=parseInt(obj.number_of_persons_injured)
            hourArrays[hour].push(obj);
            minuteArrays[hour][minute]++;
            counterInjuriesArray[hour][injury]++// increment the count for this minute
          });
          // retrieve the selected hour and log the minute array
          let selectedHour = parseInt(dropDown.value);
          console.log(minuteArrays[selectedHour]);
          console.log(counterInjuriesArray[selectedHour])
          console.log(hourArrays[selectedHour])
        });
    });
}


function setup() {
  let divWidth = document.getElementById('barGraph').clientWidth;
  let divHeight = document.getElementById('barGraph').clientHeight;
  var canvas = createCanvas(divWidth, divHeight);
  canvas.parent('barGraph');
}

function draw() {
  background(0)
  let hourSelect = dropDown.value

  for(let i = 0; i < 60; i++){
    let injuryCount = counterInjuriesArray[hourSelect][i]
    let colorPop;
    
    if (injuryCount == 0){
      colorPop = color(70, 0, 0);
    }
    else if (injuryCount > 0 && injuryCount <= 5){
      colorPop = color(150, 0, 0);
    }
    else if (injuryCount > 5 && injuryCount <= 10){
      colorPop = color(200, 0, 0);
    }
    else if (injuryCount > 10 && injuryCount <= 15){
      colorPop = color(250, 0, 0);
    }
    else if (injuryCount > 15 && injuryCount <= 20){
      colorPop = color(255, 0, 0);
    }
    else {
      colorPop = color(255, 0, 0);
    }
    stroke(255)
    strokeWeight(0.05)
    fill(colorPop);
  rect(width*i/60, height-((minuteArrays[hourSelect][i]*400)/31), width/60, ((minuteArrays[hourSelect][i]*400)/31) ) 

}
  
}
