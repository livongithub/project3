var rawData;

let injuriesPedestrianCounter = 0;
let deathCounter = 0;
let filteredData;
let dailyData = [];

let placeholder = document.getElementById('partTwo')


var pageOneUrl = "https://data.cityofnewyork.us/resource/h9gi-nx95.json?$where=crash_date%20%3E=%20%272023-04-01T00:00:00.000%27%20AND%20crash_date%20%3C%20%272023-05-01T00:00:00.000%27%20AND%20contributing_factor_vehicle_1%20=%20%27Driver%20Inattention/Distraction%27&$limit=1000";
var pageTwoUrl = "https://data.cityofnewyork.us/resource/h9gi-nx95.json?$where=crash_date%20%3E=%20%272023-04-01T00:00:00.000%27%20AND%20crash_date%20%3C%20%272023-05-01T00:00:00.000%27%20AND%20contributing_factor_vehicle_1%20=%20%27Driver%20Inattention/Distraction%27&$limit=1000&$offset=1000";

var data = [];

$.ajax({
  url: pageOneUrl,
  type: "GET",
  success: function(result) {
    data = data.concat(result);
    
    $.ajax({
      url: pageTwoUrl,
      type: "GET",
      success: function(result) {
        results = data.concat(result);
        
        // Do something with the combined data from both pages
        console.log(results);
      

      let dailyData = [];

      for (let i = 1; i <= 30; i++) {
      const filteredData = results.filter(function(item) {
          const dayDate = item.crash_date.substring(8, 10);
          return parseInt(dayDate) === i;
      });
      dailyData.push(filteredData);
      let calendar = document.createElement('div')
      let numberShow = document.createElement ('p')
  
      placeholder.append(calendar)
      calendar.append(numberShow)
      numberShow.innerHTML = filteredData.length

      numberShow.setAttribute('id', 'numberShow')


  
      calendar.style.display = "flex"
      calendar.style.alignItems = "center"
      calendar.style.justifyContent = "center"
      calendar.style.transition = "opacity 0.5s ease-in-out"
  
      numberShow.style.color = "black"
      numberShow.style.fontWeight = "700"
      numberShow.style.opacity = "0"
  
      placeholder.style.display = "grid"
      placeholder.style.gridTemplateColumns = "repeat(7, 1fr)"
      placeholder.style.gridTemplateRows = "auto repeat(5, 1fr)"
      placeholder.style.margin = "0 auto"

      const mediaQueryOne = window.matchMedia('(min-width: 600px)');
      const mediaQueryTwo = window.matchMedia('(min-width: 390px)');

      if (mediaQueryOne.matches) {
        numberShow.style.fontSize = "30px"
      } else if (mediaQueryTwo.matches){
        numberShow.style.fontSize = "20px"
      }
      else {
        numberShow.style.fontSize = "20px"
      }
  
      calendar.addEventListener("mouseenter", () => {
          numberShow.style.opacity = ".5";
        });
  
      calendar.addEventListener("mouseleave", () => {
          numberShow.style.opacity = "0";
        });
  
      redVar = (filteredData.length*250)/80
  
      calendar.style.backgroundColor = `rgb(${redVar}, 0, 0)`
      }
  
      console.log(dailyData);

      let pedInjuries = 0;
  
      const pedestrianInjuries = results.filter(obj => obj.number_of_pedestrians_injured > 0);
      
      pedestrianInjuries.forEach(injury => {
        const pedestrianInjuryImage = document.createElement('img');
        pedestrianInjuryImage.src = 'pedestrianInjured.png';
  
        let pedestrianDivInj = document.getElementById('pedestrian-injuries');
        pedestrianDivInj.append(pedestrianInjuryImage);
        pedestrianInjuryImage.style.width = "25px";

        pedInjuries++
      });

      let pedDead = 0 

      console.log("pedestrian injuries = "+pedInjuries)
  
      const pedestrianDeaths = results.filter(obj => obj.number_of_pedestrians_killed > 0);
      
      pedestrianDeaths.forEach(death => {
        const pedestrianDeathImage = document.createElement('img');
        pedestrianDeathImage.src = 'pedestrianDead.png';
  
        let pedestrianDivDead = document.getElementById('pedestrian-deaths');
        pedestrianDivDead.append(pedestrianDeathImage);
        pedestrianDeathImage.style.width = "25px";

        pedDead ++
      });

      console.log("pedestrian dead = "+  pedDead)

      let cycInjuries = 0
  
      const cyclistInjuries = results.filter(obj => obj.number_of_cyclist_injured > 0);
      
      cyclistInjuries.forEach(injury => {
        const cyclistInjuryImage = document.createElement('img');
        cyclistInjuryImage.src = 'cyclistInjured.png';
  
        let cyclistDivInj = document.getElementById('cyclist-injuries');
        cyclistDivInj.append(cyclistInjuryImage);
        cyclistInjuryImage.style.width = "25px";

        cycInjuries++
      });

      console.log ('cyclist injuries = '+ cycInjuries)

      let cycDead = 0
  
      const cyclistDeaths = results.filter(obj => obj.number_of_cyclist_killed > 0);
      
      cyclistDeaths.forEach(death => {
        const cyclistDeathImage = document.createElement('img');
        cyclistDeathImage.src = 'cyclistDead.png';
  
        let cyclistDivDead = document.getElementById('cyclist-deaths');
        cyclistDivDead.append(cyclistDeathImage);
        cyclistDeathImage.style.width = "25px";

        cycDead++
      });

      console.log('cyclist dead = '+ cycDead)

            for(let t = 0; t < data.length; t++){

                const obj = data[t];

            if (obj.vehicle_type_code1 === 'Motorcycle' || obj.vehicle_type_code2 === 'Motorcycle') {

                if (obj.number_of_motorist_injured > 0) {
                const motorInjuryImage = document.createElement('img');
                motorInjuryImage.src = 'motorInjured.png';
        
                let motorDivInj = document.getElementById('motor-injuries');
                motorDivInj.append(motorInjuryImage);
                motorInjuryImage.style.width = "25px";
                }

                if (obj.number_of_motorist_killed > 0) {
                const motorDeathImage = document.createElement('img');
                motorDeathImage.src = 'motoDead.png';
        
                let motorDivDead = document.getElementById('motor-deaths');
                motorDivDead.append(motorDeathImage);
                motorDeathImage.style.width = "25px";
                }
            }

            if (obj.vehicle_type_code1 !== 'Motorcycle' && obj.vehicle_type_code2 !== 'Motorcycle') {
                if (obj.number_of_persons_injured > 0) {
                const driverInjuryImage = document.createElement('img');
                driverInjuryImage.src = 'driverInjured.png';
        
                let driverDivInj = document.getElementById('driver-injuries');
                driverDivInj.append(driverInjuryImage);
                driverInjuryImage.style.width = "25px";
                }
                if (obj.number_of_persons_killed > 0) {
                    const driverDeathImage = document.createElement('img');
                    driverDeathImage.src = 'driverDead.png';
            
                    let driverDivDead = document.getElementById('driver-deaths');
                    driverDivDead.append(driverDeathImage);
                    driverDeathImage.style.width = "25px";
                }
            }   

        }
      }
    });
  }
});
