// Deklarierung der Variablen
var vorlaufeingabe = document.querySelector('input.range.vorlauf'),
    belastungseingabe = document.querySelector('input.range.dauer'),
    ausruheingabe = document.querySelector('input.range.ruhe'),
    rundeneingabe = document.querySelector('input.range.runden')
;

var preparationSpan = document.querySelector('span.value.vorlauf'),
    dauerSpan = document.querySelector('span.value.dauer'),
    restSpan = document.querySelector('span.value.ruhe'),
    roundsSpan = document.querySelector('span.value.runden')
;

var zeitanzeige = document.getElementById('uhr'),
    rundeAnzeige = document.getElementById('runde');
    
var intervall;


wertzeigen();
wertsetzen();


// Anzeigen der Auswahlmöglichkeiten
function wertzeigen() {
  
  vorlaufeingabe.min = 1;
  belastungseingabe.min = 1;
  ausruheingabe.min = 1;
  rundeneingabe.min = 1;
  
  vorlaufeingabe.max = 60;
  belastungseingabe.max = 60;
  ausruheingabe.max = 60;
  rundeneingabe.max = 20;
  
  vorlaufeingabe.value = 5;
  belastungseingabe.value = 20;
  ausruheingabe.value = 10;
  rundeneingabe.value = 8;
  
  preparationSpan.innerHTML = vorlaufeingabe.value;
  dauerSpan.innerHTM = belastungseingabe.value;
  restSpan.innerHTML = ausruheingabe.value;
  roundsSpan.innerHTML = rundeneingabe.value

  
  zeitanzeige.innerHTML = "-----";
  rundeAnzeige.innerHTML = '0 / 0';
}

// Speichern der Auswahl in Variablen
function wertsetzen() {
  vorlaufeingabe.oninput = function() {preparationSpan.innerHTML = vorlaufeingabe.value};
  belastungseingabe.oninput = function() {dauerSpan.innerHTM = belastungseingabe.value};
  ausruheingabe.oninput = function() {restSpan.innerHTML = ausruheingabe.value};
  rundeneingabe.oninput = function() {roundsSpan.innerHTML = rundeneingabe.value};
}

  
// Änderungen bei button start und zurück
  startknopf.onclick = function() {
    runTabata(vorlaufeingabe.value, belastungseingabe.value, ausruheingabe.value, rundeneingabe.value);
  document.getElementById('zurückknopf').style.visibility = 'visible';
  document.getElementById('zeigendiv').style.visibility = 'visible';
  document.getElementById("Einstellungsdiv").style.display = "none"; 
      }

  zurückknopf.onclick = function() {
     clearInterval(interval); wertzeigen();
  document.getElementById('zurückknopf').style.visibility = 'hidden';
  document.getElementById('zeigendiv').style.visibility = 'hidden';
  document.getElementById("Einstellungsdiv").style.display = "";
  document.body.style.backgroundColor = "white"

    }
  ;

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

window.index = index;
window.arrPeriods = arrPeriods;

  interval = setInterval(() => {
     const timeDifference = Math.round((timeFuture2 - Date.now()) / 1000) + 1;
    
    zeitanzeige.innerHTML ="Noch  " + timeDifference + "s";
      rundeAnzeige.innerHTML ="Runde " + Math.floor(((index + 1) / 2)) + "/" + (arrPeriods.length - 1) / 2;
      document.getElementById("meinbalken").innerHTML = timeDifference;

    if(timeDifference == 0) {clearInterval(interval);
    if(index < arrPeriods.length -1) {index++; runtimer(arrPeriods, index);} 
    }},1000);

  

  
  if
  (index === 0 ) {vorlauf()}
  else if (index % 2 == 0 &&  index == arrPeriods.length-1){ende()}
  else if (index % 2 == 0 ) {setTimeout(function(){ruhe()},1000)}
  else if (index % 1 == 0 ) {setTimeout(function(){aktiv()},1000)}
  }

  //Inhalt des Schalters wird in einer globalen variablen gespeichert

window.mediaV = 5
var a = document.getElementById("selector");


a.addEventListener("change", function() {
    if(a.value == "1"){window.mediaV = 5}
    if(a.value == "2"){window.mediaV = Math.floor(Math.random() * (4 - 1 + 1)) + 1}
})
  


 function vorlauf(){
    document.body.style.backgroundColor = "#2c687f";
    document.getElementById("textwasid").innerHTML = "gleich geht es los";
    document.getElementById("progressdiv").style.display = "none";
    }
       
 function aktiv(){
  moveaktiv()
  document.body.style.backgroundImage = "none";
  document.body.style.backgroundColor = "#FF4E4E";
  document.getElementById("meinbalken").style.color = "";
    document.getElementById("textwasid").innerHTML= "GO !!"
    document.getElementById("progressdiv").style.display = "";
    document.getElementById("uhr").style.display = "none";
    if (mediaV==5){document.getElementById('gongsound').play();}
    if (mediaV==1){document.getElementById('gosound1').play();}
    if (mediaV==2){document.getElementById('gosound2').play();}
    if (mediaV==3){document.getElementById('gosound3').play();}
    if (mediaV==4){document.getElementById('gosound4').play();}
   }
  
 function ruhe(){
  moveruhe(),
   document.body.style.background = "#2c687f",  
   document.getElementById("meinbalken").style.color = "#2c687f";
  document.getElementById("uhr").style.display = "none";
   document.getElementById("textwasid").innerHTML = "Pause";
   if (index % 2 == 0 &&  index == arrPeriods.length-3)

   { if (mediaV==5){document.getElementById('gongsound').play();}
     if (mediaV==1){document.getElementById('vor1').play()
       document.body.style.background = "#2c687f url('image/vor1.jpg') no-repeat center";}
       if (mediaV==2){document.getElementById('vor2').play()
       document.body.style.background = "#2c687f url('image/vor2.jpg') no-repeat center";;}
       if (mediaV==3){document.getElementById('vor3').play();}
       if (mediaV==4){document.getElementById('vor4').play();}
     
      }
  else {
     if (mediaV==5){document.getElementById('gongsound').play();}
      if (mediaV==1){document.getElementById('kurzepausesound1').play()
      document.body.style.background = "#2c687f url('image/ruhe1.jpg') no-repeat center";}
      if (mediaV==2){document.getElementById('kurzepausesound2').play()
      document.body.style.background = "#2c687f url('image/ruhe2.jpg') no-repeat center";}
      if (mediaV==3){document.getElementById('kurzepausesound3').play();
      document.body.style.background = "#2c687f url('image/ruhe3.jpg') no-repeat center"}
      if (mediaV==4){document.getElementById('kurzepausesound4').play()
      document.body.style.background = "#2c687f url('image/ruhe4.jpg') no-repeat center";}
    }    
                }


  function ende(){ 
document.body.style.backgroundColor = "#0FC2CF";
document.getElementById("meinbalken").style.display = "none";
document.getElementById("textwasid").innerHTML = "Gratulation !!";
document.getElementById("uhr").style.display = "none";

   if (mediaV==5){document.getElementById('gongsound').play();}
   if (mediaV==1){document.getElementById('endesound1').play() 
   document.body.style.background = "#2c687f url('image/ende1.jpg') no-repeat center";}
   if (mediaV==2){document.getElementById('endesound2').play()
   document.body.style.background = "#2c687f url('image/ende2.jpg') no-repeat center";}
   if (mediaV==3){document.getElementById('endesound3').play()
   document.body.style.background = "#2c687f url('image/ende3.jpg') no-repeat center";}
   if (mediaV==4){document.getElementById('endesound3').play()
   document.body.style.background = "#2c687f url('image/ende4.jpg') no-repeat center";}
                   }


function moveaktiv() {
  var w = 100;
  var id = setInterval(frame,belastungseingabe.value*10,1000);
  function frame()
  {if (w === 1) {clearInterval(id);} 
  else { w= w-1; document.getElementById("meinbalken").style.width = w + '%';}}
                     }
function moveruhe() {
  var w = 1;
  var id = setInterval(frame, ausruheingabe.value*10,1000);
  function frame() { 
  if (w === 100) {clearInterval(id);}
   else {w = w+1}; document.getElementById("meinbalken").style.width = w + '%';
  }}