// Deklarierung der Variablen
var vorlaufinput = document.querySelector('input.range.preparation'),
    belastungsinput = document.querySelector('input.range.activity'),
    ausruhinput = document.querySelector('input.range.rest'),
    rundeninput = document.querySelector('input.range.rounds')
;

var preparationSpan = document.querySelector('span.value.preparation'),
    activitySpan = document.querySelector('span.value.activity'),
    restSpan = document.querySelector('span.value.rest'),
    roundsSpan = document.querySelector('span.value.rounds')
;

var zeitanzeige = document.querySelector('.timer'),
    rundeAnzeige = document.querySelector('.runde');

var interval;


wertzeigen();
wertsetzen();


// Anzeigen der Auswahlmöglichkeiten
function wertzeigen() {
  
  vorlaufinput.min = 1;
  belastungsinput.min = 1;
  ausruhinput.min = 1;
  rundeninput.min = 1;
  
  vorlaufinput.max = 60;
  belastungsinput.max = 60;
  ausruhinput.max = 60;
  rundeninput.max = 20;
  
  vorlaufinput.value = 5;
  belastungsinput.value = 20;
  ausruhinput.value = 10;
  rundeninput.value = 8;
  
  preparationSpan.innerHTML = vorlaufinput.value;
  activitySpan.innerHTML = belastungsinput.value;
  restSpan.innerHTML = ausruhinput.value;
  roundsSpan.innerHTML = rundeninput.value;
  
  zeitanzeige.innerHTML = "-----";
  rundeAnzeige.innerHTML = '0 / 0';
}

// Speichern der Auswahl in Variablen
function wertsetzen() {
  vorlaufinput.oninput = function() {
    preparationSpan.innerHTML = vorlaufinput.value;
  };
  belastungsinput.oninput = function() {
    activitySpan.innerHTML = belastungsinput.value;
  };
  ausruhinput.oninput = function() {
    restSpan.innerHTML = ausruhinput.value;
  };
  rundeninput.oninput = function() {
    roundsSpan.innerHTML = rundeninput.value;
  };

  
// Änderungen bei button start und zurück
  startbutton.onclick = function() {
    let elem = document.getElementById('resetbutton');
    elem.style.visibility = 'visible';
    let elem2 = document.getElementById('zeigendiv');
    elem2.style.visibility = 'visible';
      runTabata(vorlaufinput.value, belastungsinput.value, ausruhinput.value, rundeninput.value);
      document.getElementById("Einstellungsdiv").style.display = "none";
      document.getElementById("startbutton").style.display = "none";
      
      }

  resetbutton.onclick = function() {
    let elem = document.getElementById('resetbutton');
    elem.style.visibility = 'hidden';
    let elem2 = document.getElementById('zeigendiv');
    elem2.style.visibility = 'hidden';
     clearInterval(interval); wertzeigen();
      document.getElementById("Einstellungsdiv").style.display = "";
      document.getElementById("startbutton").style.display = "";
      document.body.style.backgroundColor = "white"
      document.getElementById("Ende").innerHTML = "";
    }
  };

// Eigentlicher Tabata array
function runTabata(preparation, activity, rest, rounds) {
  let arrPeriods = [preparation],
      index = 0
  ;
  
  for(let i = 0; i < rounds; i++) {
    arrPeriods.push(activity);
    arrPeriods.push(rest);
    }
   runtimer(arrPeriods, index);
}

// Setzen des Timers
function runtimer(arrPeriods, index) {
  let timeNow, timeFuture, timeDifference;
  
  timeFuture = new Date();
  timeFuture = timeFuture.getTime();
  timeFuture = timeFuture + arrPeriods[index] * 1000;

  interval = setInterval(function() {
    timeNow = new Date();
    timeDifference = Math.round((timeFuture - timeNow) / 1000) + 1;
    
    zeitanzeige.innerHTML ="Noch  " + timeDifference + "s";
      rundeAnzeige.innerHTML ="Runde " + Math.floor(((index + 1) / 2)) + "/" + (arrPeriods.length - 1) / 2;


    
  // Reaktionen auf Timerereignisse

    if(timeDifference === 1) {
      clearInterval(interval);
      if(index < arrPeriods.length-1) {
        index++;
        runtimer(arrPeriods, index);
      } else {
        ende()
      }
    }
  },1000);

  if
  (index === 0 ) {vorlauf()}
  else if (index % 2 == 0 ) {setTimeout(function(){ruhe();}, 1000);clearInterval(id2)}
  else if (index % 1 == 0 ) {setTimeout(function(){move();aktiv();}, 1000);var id2 = setInterval(function(){document.getElementById("myBar").innerHTML = timeDifference;},1000)}
 
 
 
 function vorlauf(){
    document.body.style.backgroundColor = "#36FFBE";
    document.getElementById("was").innerHTML = "gleich geht es los";
    document.getElementById("progressdiv").style.display = "none"}

 function aktiv(){
    document.body.style.backgroundColor = "#FF4E4E";
    document.getElementById("was").innerHTML= "GO !!"
    document.getElementById("progressdiv").style.display = "";
    document.getElementById("timer").style.display = "none";
    document.getElementById('gosound').play();
  }
    
 }
 function ruhe(){
   document.body.style.backgroundColor = "#2c687f";
   document.getElementById("timer").style.display = "";
   document.getElementById("progressdiv").style.display = "none";
   document.getElementById("was").style.display = "";
   document.getElementById("was").innerHTML = "Pause";
   document.getElementById('kurzepausesound').play(); 
  }

  function ende(){
document.body.style.backgroundColor = "#0FC2CF";
document.getElementById("myBar").innerHTML = "";
document.getElementById("was").innerHTML = "Gratulation !!";
document.getElementById("timer").style.display = "none";
document.getElementById('endesound').play();
}

function move() {
  var elem = document.getElementById("myBar");   
  var width = 100;
  var id = setInterval(frame, belastungsinput.value*10,10);
  function frame() { 
      if (width < 17) {clearInterval(id);} else { width--; elem.style.width = width + '%'; }
  }
}
