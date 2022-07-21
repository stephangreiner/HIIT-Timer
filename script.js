// Konstante zeigen lediglich auf html Elemente. Input von html 
const belastungseingabe = document.getElementById('eindauer');
const ausruheingabe = document.getElementById('einruhe');
const rundeneingabe = document.getElementById('einrunden');
const medienwahl = document.getElementById("Medienwahl");
// der Ausgang zu html 
const ZA = document.getElementById('Zeitanzeige');
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

// Starten des Programms durch ausführen von Funktionen
// Anzeige der eingegebenen Werte schon bevor Wertsetzenfunktion ausgeführt wird
  // Grundanzeige vor Änderung der Variablen 
zurueckknopf.onclick = function(){location.reload()}
startknopf.onclick = function() {
  runTabata( 5 , belastungseingabe.value, ausruheingabe.value, rundeneingabe.value);
  document.getElementById('zeigendiv').style.visibility = 'visible';
  document.getElementById("Einstellungsdiv").style.display = "none"; 
                                  }

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
// Bei Zeitablauf wird das Intervall beendet und ein Index hochgezählt
// Prüfung index (Arraydurchgänge 0 , gerade und vorletze, nirmalgerade , ungerade Reihenfolge
function uhrwerk(arrPeriods, index) {
  jetzt = Date.now()
  dann = jetzt + arrPeriods[index] * 1000;
  window.index = index;
  window.arrPeriods = arrPeriods;
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

//  Es wird eine globale mediaV eingeführt, die je nach Stand des Selektors geändert wird
var mediaV = 1
medienwahl.addEventListener("change", function() {
    if(medienwahl.value == "1"){mediaV = 1;}
    else if(medienwahl.value == "2"){mediaV = Math.floor(Math.random() * (5 - 1 + 1)) + 1;}
    else if(medienwahl.value == "3"){mediaV = 6}
})
//  Bei der Hälfte der eingegebenen Vorlaufzeit wird die Camera ausgelöst wenn camera nicht an geht der Auslöser einfach  ins leerer kann
function vorlauf(){
    document.getElementById("zurueckknopf").style.display = "none"
    document.body.style.backgroundColor = "black";
    document.getElementById("Balkendiv").style.display = "none";
    TA.innerHTML = "gleich geht es los";
  }

  // Erzeugt eine Zufallszahl zwischen 0 und 3. Wenn Zufallszahl 0 und die Camera noch an ist, dann mach bei Ende der häfteBelastungszeit ein Foto       
function aktiv(){
  balkenschrumpfer();
   document.body.style.backgroundColor = "#00ff00";
   document.getElementById("zurueckknopf").style.display = "none";
   document.getElementById("Balkendiv").style.display = "";
   BB.style.color = "black";
   ZA.style.display = "none";
   TA.innerHTML= "GO !!";
  var fotorand = Math.floor(Math.random() * 4 );
  if (fotorand == 0 && Streamansicht.srcObject != null) {setTimeout(function(){fotomachen();},
  (belastungseingabe.value*1000/2)), setTimeout(function(){cameraStop()},belastungseingabe.value*1000)};
   if (mediaV==1){document.getElementById('gongsound').play();}
   else if (mediaV==2){document.getElementById('gosound1').play();}
   else if (mediaV==3){document.getElementById('gosound2').play();}
   else if (mediaV==4){document.getElementById('gosound3').play();}
   else if (mediaV==5){document.getElementById('gosound4').play();}
   else if (mediaV==6){document.getElementById('m1').play();}
   console.log(Streamansicht.srcObject)
                 }
  
function ruhe(){
  //die Kamera wird mit der ersten Ruhephase gestoppt. Wenn sie nicht läuft, geht es ins leere. kann man sicher ebsser machen  
   balkenwachser(),
   document.getElementById('m1').pause();
   document.body.style.background = "black"; 
   document.getElementById("zurueckknopf").style.display = "none";
   BB.style.color = "black";
   ZA.style.display = "none";
   TA.innerHTML = "Pause";
   if (index % 2 == 0 &&  index == arrPeriods.length-3){vorletztepause()}
   else {normalepause()}  
                 }

function  normalepause(){
  if (mediaV==1){document.getElementById('gongsound').play();}
  else if (mediaV==2){document.getElementById('kurzepausesound1').play()}
  else if (mediaV==3){document.getElementById('kurzepausesound2').play()}
  else if (mediaV==4){document.getElementById('kurzepausesound3').play()}
  else if (mediaV==5){document.getElementById('kurzepausesound4').play()}
  else if (mediaV==6) {document.getElementById('m1').pause();}
                        }

function vorletztepause(){
  if (mediaV==1){document.getElementById('gongsound').play();}
  else if (mediaV==2){document.getElementById('vor1').play();}
  else if (mediaV==3){document.getElementById('vor2').play();}
  else if (mediaV==4){document.getElementById('vor3').play();}
  else if (mediaV==5){document.getElementById('vor4').play();}
  else if (mediaV==5){document.getElementById('vor4').play();}
  else if (mediaV==6) {document.getElementById('m1').pause();}   
                        }
 // Wenn Camera noch an aus machen      
function ende(){ 
  if (Streamansicht.srcObject != null) {cameraStop()};
   document.getElementById("zurueckknopf").style.display = "";
   document.getElementById("herunterladenknopf").style.display = ""; 
   document.getElementById("Balkendiv").style.display = "none";
   document.body.style.backgroundColor = "blue";
   BB.style.display = "none";
   TA.innerHTML = "Super";
   ZA.style.display = "none";
   if (mediaV==1){document.getElementById('gongsound').play();}
   else if (mediaV==2){document.getElementById('endesound1').play()}
   else if (mediaV==3){document.getElementById('endesound2').play()}
   else if (mediaV==4){document.getElementById('endesound3').play()}
   else if (mediaV==5){document.getElementById('endesound4').play()}
                   }

// eigene Uhrwerke (setInterval) für das wachsen und schrumpfen des Balkens
function balkenschrumpfer() {
  var Ausganswert = 100;
  var id = setInterval(was, belastungseingabe.value*10,1000);
  function was(){if (Ausganswert === 1) {clearInterval(id);} 
  else { Ausganswert= Ausganswert-1; BB.style.width = Ausganswert + '%';BB.style.fontSize = "300%"}}
                           }
function balkenwachser() {
  var Ausgangswert = 1;
  var id = setInterval(was, ausruheingabe.value*10,1000);
  function was() { if (Ausgangswert === 100) {clearInterval(id);}
  else {Ausgangswert = Ausgangswert+1}; BB.style.width = Ausgangswert + '%';BB.style.fontSize = "300%"}
                         }
                 
// Fotoapp____________________________________________
// das Gesamt Fotodiv urspünglich nicht anzeigen
// Camera wird gestopt, wenn 1.Alt ausgewählt wird. Wenn 2.Alt nie ausgewählt geht es ins leere.
const Foto = document.getElementById("Fotomodus");
const GFD = document.getElementById("Gesamtfotodiv")
GFD.style.display="none"
Foto.addEventListener("change", function() {
    if(Foto.value == "1")     {cameraStop(),GFD.style.display="none"}
    else if(Foto.value == "2"){cameraStart(),GFD.style.display=""}
                                           })
// constraints für Videostream festlegen hier fullhd Auflösung selbscamer und kein Audio
// alternative 4K video: {width: {exact: }, height: {exact: }}
// ideal : auflöung wenn möglich wie angegeben
var constraints = { video: {width: {ideal: 3840}, height: {ideal: 2160}, facingMode: "user" }, audio: false };
var track = null;
const Streamansicht = document.getElementById("streamansicht");
const Bildcanvas = document.getElementById("bildcanvas");

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
function fotomachen()  {
    Bildcanvas.width = Streamansicht.videoWidth;
    Bildcanvas.height = Streamansicht.videoHeight;
    Bildcanvas.getContext("2d").drawImage(Streamansicht, 0, 0);   
                       };

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
 
