// Deklarierung der Variablen
var vorlaufinput = document.querySelector('input.range.vorlauf'),
    belastungsinput = document.querySelector('input.range.dauer'),
    ausruhinput = document.querySelector('input.range.ruhe'),
    rundeninput = document.querySelector('input.range.runden')
;

var preparationSpan = document.querySelector('span.value.vorlauf'),
    dauerSpan = document.querySelector('span.value.dauer'),
    restSpan = document.querySelector('span.value.ruhe'),
    roundsSpan = document.querySelector('span.value.runden')
;

var zeitanzeige = document.querySelector('.timer'),
    rundeAnzeige = document.querySelector('.runde');
    
var intervall;


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
  dauerSpan.innerHTML = belastungsinput.value;
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
    dauerSpan.innerHTML = belastungsinput.value;
  };
  ausruhinput.oninput = function() {
    restSpan.innerHTML = ausruhinput.value;
  };
  rundeninput.oninput = function() {
    roundsSpan.innerHTML = rundeninput.value;
  };

  
// Änderungen bei button start und zurück
  startbutton.onclick = function() {
    runTabata(vorlaufinput.value, belastungsinput.value, ausruhinput.value, rundeninput.value);
  document.getElementById('resetbutton').style.visibility = 'visible';
  document.getElementById('zeigendiv').style.visibility = 'visible';
  document.getElementById("Einstellungsdiv").style.display = "none";
    
      
      }

  resetbutton.onclick = function() {
     clearInterval(interval); wertzeigen();
  document.getElementById('resetbutton').style.visibility = 'hidden';
  document.getElementById('zeigendiv').style.visibility = 'hidden';
  document.getElementById("Einstellungsdiv").style.display = "";
  document.body.style.backgroundColor = "white"

    }
  };

// Eigentlicher Tabata array
function runTabata(vorlauf, dauer, ruhe, runden) {
  let arrPeriods = [vorlauf],
      index = 0
  ;

  for(let i = 0; i < runden; i++) {
    arrPeriods.push(dauer);
    arrPeriods.push(ruhe);
    }
   runtimer(arrPeriods, index);
}

// Setzen des Timers
function runtimer(arrPeriods, index) {
timeFuture = Date.now()
timeFuture2 = timeFuture + arrPeriods[index] * 1000;

  interval = setInterval(() => {
     const timeDifference = Math.round((timeFuture2 - Date.now()) / 1000) + 1;
    
    zeitanzeige.innerHTML ="Noch  " + timeDifference + "s";
      rundeAnzeige.innerHTML ="Runde " + Math.floor(((index + 1) / 2)) + "/" + (arrPeriods.length - 1) / 2;
      document.getElementById("myBar").innerHTML = timeDifference;

    if(timeDifference === 1) {clearInterval(interval);
    if(index < arrPeriods.length-1) {index++; runtimer(arrPeriods, index);} 
    else {ende()}
    }},1000);
  
  
  
  if
  (index === 0 ) {vorlauf()}
  else if (index % 2 == 0 &&  index == arrPeriods.length-3) {setTimeout(() =>{ruhe()
    var x = Math.floor(Math.random() * (2 - 1 + 1)) + 1;
    if (x==1){document.getElementById('vor1').play();}
    if (x==2){document.getElementById('vor2').play();}
  },1000)}
  else if (index % 2 == 0 ) {setTimeout(function(){ruhe()},1000)}
  else if (index % 2 == 0 &&  index == arrPeriods.length-1){ende()}
  else if (index % 1 == 0 ) {setTimeout(function(){aktiv()},1000)}
  }
 
 function vorlauf(){
    document.body.style.backgroundColor = "#36FFBE";
    document.getElementById("was").innerHTML = "gleich geht es los";
    document.getElementById("progressdiv").style.display = "none";
    }

 function aktiv(){
  move()
  document.body.style.backgroundColor = "#FF4E4E";
    document.getElementById("was").innerHTML= "GO !!"
    document.getElementById("progressdiv").style.display = "";
    document.getElementById("timer").style.display = "none";
    var x = Math.floor(Math.random() * (3 - 1 + 1)) + 1;
    if (x==1){document.getElementById('gosound1').play();}
    if (x==2){document.getElementById('gosound2').play();}
    if (x==3){document.getElementById('gosound3').play();}
   }
    
 function ruhe(){

   document.body.style.backgroundColor = "#2c687f";
   document.getElementById("timer").style.display = "";
   document.getElementById("progressdiv").style.display = "none";
   document.getElementById("was").innerHTML = "Pause";
   var x = Math.floor(Math.random() * (3 - 1 + 1)) + 1;
   if (x==1){document.getElementById('kurzepausesound1').play();}
   if (x==2){document.getElementById('kurzepausesound2').play();}
   if (x==3){document.getElementById('kurzepausesound3').play();}

  }


  function ende(){
document.body.style.backgroundColor = "#0FC2CF";
document.getElementById("myBar").innerHTML = "";
document.getElementById("was").innerHTML = "Gratulation !!";
document.getElementById("timer").style.display = "none";
document.getElementById('endesound').play();
var x = Math.floor(Math.random() * (3 - 1 + 1)) + 1;
   if (x==1){document.getElementById('endesound1').play();}
   if (x==2){document.getElementById('endesound2').play();}
   if (x==3){document.getElementById('endesound3').play();}

 }

function move() {
  var elem = document.getElementById("myBar");   
  var width = 100;
  var id = setInterval(frame, belastungsinput.value*10,10);
  function frame() { 
      if (width === 1) {clearInterval(id);} else { width--; elem.style.width = width + '%';}
                    }
  }
