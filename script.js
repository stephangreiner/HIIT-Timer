const belastungseingabe = document.getElementById('eindauer');// Konstante zeigen lediglich auf html Elemente. Input von html 
const ausruheingabe = document.getElementById('einruhe');
const rundeneingabe = document.getElementById('einrunden');
const tonwahl = document.getElementById("tonwahl");

const ZA = document.getElementById('Zeitanzeige');// der Ausgang zu html 
const RA = document.getElementById('Rundenanzeige');
const TA = document.getElementById('Textanzeige');
const BB = document.getElementById("Balkenzeit")
ZA.innerHTML = "-----";
RA.innerHTML = '0 / 0';

window.onload = function(){
  document.getElementById("herunterladenknopf").style.display="none";
  belastungseingabe.min = 1;
  ausruheingabe.min = 1;
  rundeneingabe.min = 1;
  belastungseingabe.max = 60;
  ausruheingabe.max = 60;
  rundeneingabe.max = 20;
  belastungseingabe.value = 20;
  ausruheingabe.value = 10;
  rundeneingabe.value = 8;
  document.getElementById('dauer').innerHTML = belastungseingabe.value;
  document.getElementById('ruhe').innerHTML = ausruheingabe.value;
  document.getElementById('runden').innerHTML = rundeneingabe.value;
  belastungseingabe.oninput = function() {document.getElementById('dauer').innerHTML = belastungseingabe.value;};
  ausruheingabe.oninput = function()     {document.getElementById('ruhe').innerHTML = ausruheingabe.value;};
  rundeneingabe.oninput = function()     {document.getElementById('runden').innerHTML = rundeneingabe.value;};
                             };


startknopf.onclick = function() {
  runTabata( 5 , belastungseingabe.value, ausruheingabe.value, rundeneingabe.value);
  document.getElementById('zeigendiv').style.visibility = 'visible';
  document.getElementById("Einstellungsdiv").style.display = "none"; 

zurueckknopf.onclick = function(){location.reload()}                                  }

// Eigentlicher Tabata array
function runTabata(vorlauf, dauer, ruhe, runden) {
  let arrPeriods = [vorlauf],
  index = 0;
  for(let i = 0; i < runden; i++) {arrPeriods.push(dauer);arrPeriods.push(ruhe);}
  uhrwerk(arrPeriods, index);
                                                 }
// Setzen des Timers
// Die setintervall Methode ruft die funtion x alle 1000ms auf. sie ist an l gekoppelt um mit der clearIntervall Methode gestoppt werden zu können
// 2 Sekunden vor Zeitablauf verschwindet die Zeitanzeige
// Bei Zeitablauf wird das Intervall beendet und ein index hochgezählt
// Prüfung index (Arraydurchgänge 0 , gerade und vorletze, nirmalgerade , ungerade Reihenfolge
function uhrwerk(arrPeriods, index) {
  jetzt = Date.now()
  dann = jetzt + arrPeriods[index] * 1000;
  window.index = index;
  window.arrPeriods = arrPeriods;
  window.arrPeriods.length = arrPeriods.length;
   l = setInterval(function x() {
    var zeitunterschied = Math.round((dann - Date.now()) / 1000) + 1;
    ZA.innerHTML ="Noch  " + zeitunterschied + "s";
    RA.innerHTML ="Runde " + Math.floor(((index + 1) / 2)) + "/" + (arrPeriods.length - 1) / 2;
    BB.innerHTML = zeitunterschied;
    if (zeitunterschied < 2) {BB.innerHTML= ""}
    if(zeitunterschied == 0) {clearInterval(l);
    if(index < arrPeriods.length -1) {index++; uhrwerk(arrPeriods, index);} }
                                },1000); 
    if (index == 0 ) {vorlauf()}
    else if (index % 2 == 0 &&  index == arrPeriods.length-1){ende()}
    else if (index % 2 == 0 ) {setTimeout(function(){ruhe()},1000)}
    else if (index % 1 == 0 ) {setTimeout(function(){aktiv()},1000)}
                                 }


var tonv = 20
tonwahl.addEventListener("change", function() {
    if(tonwahl.value == "10")    {tonv = 0; document.getElementById("tonwahl").style.backgroundColor ="#737373"}
    else if(tonwahl.value == "1"){tonv = 1;document.getElementById("tonwahl").style.backgroundColor ="#00ff00"}
    else if(tonwahl.value == "2"){tonv = 2;document.getElementById("tonwahl").style.backgroundColor ="#00ff00"}
    else if(tonwahl.value == "3"){tonv = Math.floor(Math.random() * 4-0)+3;; document.getElementById("tonwahl").style.backgroundColor ="#00ff00";
    console.log("tonverstestufe"+ tonv)}
})    


const Foto = document.getElementById("Fotomodus");
const GFD = document.getElementById("Gesamtfotodiv")
GFD.style.display="none"
function camera() {
var checkBox = document.getElementById("fotocheck");
if (checkBox.checked == true){cameraStart(),GFD.style.display="";}
else {cameraStop(),GFD.style.display="none"   } }



// zugriff auf camera und stream zur Streamansicht
function cameraStart() {
  navigator.mediaDevices
      .getUserMedia(constraints)
      .then(function(stream) {
          track = stream.getTracks()[0];
          Streamansicht.srcObject = stream;  })
      .catch(function(error) {console.error("Etwas hat nicht geklappt", error);});
                          }
// der track wird gestoppt, und die src auf null zuückgesetzt
function cameraStop(){track.stop(),Streamansicht.srcObject = null };
// der Stream hat eine andere größe, als das Bild, was man davon machen will, deshab muss man gleichsetzen



function vorlauf(){
      document.body.style.backgroundColor = "black";
      document.getElementById("zurueckknopf").style.display = "none"
      document.getElementById("Balkendiv").style.display = "none";
      TA.innerHTML = "";
                  }

  
function aktiv(){
  console.log("tonv"+ tonv)
  aktivbalkenschrumpfer(); aktivaudio()
   document.body.style.backgroundColor = "#00ff00";
   document.getElementById("zurueckknopf").style.display = "none";
   document.getElementById("Balkendiv").style.display = "";
   BB.style.color = "black";
   ZA.style.display = "none";
   TA.innerHTML= "GO !!";
   var fotorand = 6;
   var runde = Math.floor(((index + 1) / 2))
   var Gesamtrunde = (arrPeriods.length - 1) / 2
  console.log("laufende " + runde );
   console.log("arrplang" + Gesamtrunde); // für jede runde hat der array 2 Elemente (Daueraktiv und Dauerruhe)
  if (runde == Gesamtrunde) {fotorand = 0,console.log("fotorandgesetzt:" + fotorand)} 
  else   { fotorand = Math.floor(Math.random() * 4 ),console.log("fotorandzufall:" + fotorand);}//Zufallszahl zwischen 0 und 3.    
  console.log(Streamansicht.srcObject)
  if (fotorand == 0 && Streamansicht.srcObject != null ) {setTimeout(function(){fotomachen();},
  (belastungseingabe.value*1000/2)), setTimeout(function(){cameraStop()},belastungseingabe.value*1000)};


  }
  
function ruhe(){
   ruhebalkenwachser(),
   document.getElementById('m1').pause();
   document.body.style.background = "black"; 
   document.getElementById("zurueckknopf").style.display = "none";
   BB.style.color = "black";
   ZA.style.display = "none";
   TA.innerHTML = "Pause";
   if (index % 2 == 0 &&  index == arrPeriods.length-3){vorletzteruheaudio(),console.log("vorl" + arrPeriods.length-3)}
   else {ruheaudio()}  
                 }


function ende(){ 
  if (Streamansicht.srcObject != null) {cameraStop()};
   document.getElementById("zurueckknopf").style.display = "";
   document.getElementById("herunterladenknopf").style.display = ""; 
   document.getElementById("Balkendiv").style.display = "none";
   document.body.style.backgroundColor = "blue";
   BB.style.display = "none";
   TA.innerHTML = "Super";
   ZA.style.display = "none";
                   }


function aktivaudio(){
  if  (tonv > 2 && tonv < 18){tonv = Math.floor(Math.random() * 8-0)+3;console.log(tonv)}; // integeger zwichen 3 unf 6 inbegriffen
   if      (tonv==0){console.log("tonv"+ tonv)}
   else if (tonv==1){document.getElementById('gongsound').play();}
   else if (tonv==2){document.getElementById('m1').play();}
   else if (tonv==3){document.getElementById('gosound1').play();}
   else if (tonv==4){document.getElementById('gosound2').play();}
   else if (tonv==5){document.getElementById('gosound3').play();}
   else if (tonv==6){document.getElementById('gosound4').play();}
   else if (tonv==7){document.getElementById('gosound5').play();}
   else if (tonv==8){document.getElementById('gosound6').play();}
   else if (tonv==9){document.getElementById('gosound7').play();}
   else if (tonv==10){document.getElementById('gosound8').play();}
   else{console.log("tonv"+ tonv)}
}

function  ruheaudio(){
  if  (tonv > 2 && tonv < 18){tonv = Math.floor(Math.random() * 4-0)+3;};
  if (tonv==0){console.log("jjjjjjjjjjjjj")}
  else if (tonv==1){document.getElementById('gongsound').play();}
  else if (tonv==2){document.getElementById('m1').pause();}
  else if (tonv==3){document.getElementById('kurzepausesound1').play()}
  else if (tonv==4){document.getElementById('kurzepausesound2').play()}
  else if (tonv==5){document.getElementById('kurzepausesound3').play()}
  else if (tonv==6){document.getElementById('kurzepausesound4').play()}
  else{console.log("tonv"+ tonv)}
                        }


function vorletzteruheaudio(){
  if  (tonv > 2 && tonv < 18){tonv = Math.floor(Math.random() * 5-0)+3;};
  if (tonv==0){console.log("tonv = 0")}
  else if (tonv==1){document.getElementById('gongsound').play();}
  else if (tonv==2) {document.getElementById('m1').pause();} 
  else if (tonv==3){document.getElementById('vor1').play();}
  else if (tonv==4){document.getElementById('vor2').play();}
  else if (tonv==5){document.getElementById('vor3').play();}
  else if (tonv==6){document.getElementById('vor4').play();}
  else if (tonv==7){document.getElementById('vor5').play();}
  else{console.log("tonv"+ tonv)}  
                        }
   
function endeaudio() {
  if  (tonv > 2 && tonv < 18){tonv = Math.floor(Math.random() * 4-0)+3;};
  if (tonv==0){console.log("tonv = o")}
   else if (tonv==1){document.getElementById('gongsound').play();}
   else if (tonv==2){document.getElementById('m1').pause();}
   else if (tonv==3){document.getElementById('endesound1').play()}
   else if (tonv==4){document.getElementById('endesound2').play()}
   else if (tonv==5){document.getElementById('endesound3').play()}
   else if (tonv==6){document.getElementById('endesound4').play()}
}


function aktivbalkenschrumpfer() {
  var Ausganswert = 100;
  var id = setInterval(was, belastungseingabe.value*10,1000);
  function was(){if (Ausganswert === 1) {clearInterval(id);} 
  else { Ausganswert= Ausganswert-1; BB.style.width = Ausganswert + '%';BB.style.fontSize = "300%"}}
                           }
function ruhebalkenwachser() {
  var Ausgangswert = 1;
  var id = setInterval(was, ausruheingabe.value*10,1000);
  function was() { if (Ausgangswert === 100) {clearInterval(id);}
  else {Ausgangswert = Ausgangswert+1}; BB.style.width = Ausgangswert + '%';BB.style.fontSize = "300%"}
                         }
                 

// constraints für Videostream festlegen hier fullhd Auflösung selbscamer und kein Audio
// alternative 4K video: {width: {exact: }, height: {exact: }}
// ideal : auflöung wenn möglich wie angegeben
var constraints = { video: {width: {ideal: 3840}, height: {ideal: 2160}, facingMode: "user" }, audio: false };
var track = null;
const Streamansicht = document.getElementById("streamansicht");
const Bildcanvas = document.getElementById("bildcanvas");


function fotomachen()  {
    Bildcanvas.width = Streamansicht.videoWidth;
    Bildcanvas.height = Streamansicht.videoHeight;
    Bildcanvas.getContext("2d").drawImage(Streamansicht, 0, 0);   
    cameraStop()                 };

//Zum Download data URL durch actet stream ersetzen. Da browser download nur über html link in body erlauben wird temporärer link erschaffen
function bildherunterladen() {
    const canvas =  Bildcanvas.toDataURL("image/png").replace("image/png", "image/octet-stream");;
    var link = document.createElement( 'a' ); 
    var d = new Date();
     var ja = d.getFullYear();
     var mo = d.getMonth()+1;
     var ta= d.getDate();
     var st= d.getHours();
     var mi = d.getMinutes();
  link.download ='HIIT_'+ta+"_"+mo+"_"+ja+"_"+st+"_"+mi+".png";  
  link.href = canvas;   
  document.body.appendChild(link);  
  link.click();  
  document.body.removeChild(link);
                                }
 
