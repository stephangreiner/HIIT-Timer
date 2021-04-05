// html Wörterbuch die folgenden Contanten zeigen lediglich auf html Elemente
// der Input von html 
const vorlaufeingabe = document.querySelector('input.bereich.vorlauf');
const belastungseingabe = document.querySelector('input.bereich.dauer');
const ausruheingabe = document.querySelector('input.bereich.ruhe');
const rundeneingabe = document.querySelector('input.bereich.runden');
const medienwahl = document.getElementById("Medienwahl");

// der Ausgang zu html 
const ZA = document.getElementById('Zeitanzeige');
const RA = document.getElementById('Rundenanzeige');
const TA = document.getElementById('Textanzeige');
const BB = document.getElementById("Balkenzeit")


// Starten des Programms durch ausführen von Funktionen
wertzeigen();
wertsetzen();

// 
function wertzeigen() {
  vorlaufeingabe.min = 1;
  belastungseingabe.min = 1;
  ausruheingabe.min = 1;
  rundeneingabe.min = 1;
  
  vorlaufeingabe.max = 60;
  belastungseingabe.max = 60;
  ausruheingabe.max = 60;
  rundeneingabe.max = 20;
  
  vorlaufeingabe.value = 15;
  belastungseingabe.value = 20;
  ausruheingabe.value = 10;
  rundeneingabe.value = 8;
  
  // Anzeige der eingegebenen Werte schon bevor Wertsetzenfunktion ausgeführt wird
  document.querySelector('span.wert.vorlauf').innerHTML = vorlaufeingabe.value;
  document.querySelector('span.wert.dauer').innerHTML = belastungseingabe.value;
  document.querySelector('span.wert.ruhe').innerHTML = ausruheingabe.value;
  document.querySelector('span.wert.runden').innerHTML = rundeneingabe.value;

  // Grundanzeige vor Änderung der Variablen 
  ZA.innerHTML = "-----";
  RA.innerHTML = '0 / 0';
}

// Speichern der Auswahl in Variablen
function wertsetzen() {
  vorlaufeingabe.oninput = function() {document.querySelector('span.wert.vorlauf').innerHTML = vorlaufeingabe.value;};
  belastungseingabe.oninput = function() {document.querySelector('span.wert.dauer').innerHTML = belastungseingabe.value;};
  ausruheingabe.oninput = function() {document.querySelector('span.wert.ruhe').innerHTML = ausruheingabe.value;};
  rundeneingabe.oninput = function() {document.querySelector('span.wert.runden').innerHTML = rundeneingabe.value;};
 
  
// Änderungen bei button start und zurück
  startknopf.onclick = function() {
  runTabata(vorlaufeingabe.value, belastungseingabe.value, ausruheingabe.value, rundeneingabe.value);
  
  document.getElementById('zeigendiv').style.visibility = 'visible';
  document.getElementById("Einstellungsdiv").style.display = "none"; 
      }

// zurückknopf Seite ganz neu Laden
  zurückknopf.onclick = function(){location.reload()}
  };

// Eigentlicher Tabata array
function runTabata(vorlauf, dauer, ruhe, runden) {
  let arrPeriods = [vorlauf],
  index = 0;
  for(let i = 0; i < runden; i++) {
    arrPeriods.push(dauer);
    arrPeriods.push(ruhe);
    }
   uhrwerk(arrPeriods, index);
}

// Setzen des Timers
function uhrwerk(arrPeriods, index) {
  jetzt = Date.now()
  dann = jetzt + arrPeriods[index] * 1000;
  window.index = index;
  window.arrPeriods = arrPeriods;

 // Die setintervall Methode ruft die funtion x alle 1000ms auf. sie ist an l gekoppelt 
 //um mit der clearIntervall Methode gestoppt werden zu können
   l = setInterval(function x() {
    var zeitunterschied = Math.round((dann - Date.now()) / 1000) + 1;
    ZA.innerHTML ="Noch  " + zeitunterschied + "s";
    RA.innerHTML ="Runde " + Math.floor(((index + 1) / 2)) + "/" + (arrPeriods.length - 1) / 2;
    BB.innerHTML = zeitunterschied;
  // 5 Sekunden vor Zeitablauf verschwindet die Zeitanzeige
    if (zeitunterschied < 5) {BB.innerHTML= ""}
  // Bei Zeitablauf wird das Intervall beendet und ein Index hochgezählt
    if(zeitunterschied == 0) {clearInterval(l);
    if(index < arrPeriods.length -1) {index++; uhrwerk(arrPeriods, index);} }
    },1000); 

 if (index === 0 ) {vorlauf()}
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
//  10 Sekunden nach Start des Vorlaufes wird so jedes mal die Camera ausgelöst.
// wenn camera nicht an geht der Auslöser einfach  ins leerer kann
function vorlauf(){
    setTimeout(function(){fotomachen(); }, 10000);
    document.body.style.backgroundColor = "#2c687f";
    document.getElementById("Balkendiv").style.display = "none";
    TA.innerHTML = "gleich geht es los";
  }
       
function aktiv(){
   balkenschrumpfer();
   document.getElementById("zurückknopf").style.display = "none"
   document.body.style.backgroundImage = "none";
   document.body.style.backgroundColor = "#FF4E4E";
   document.getElementById("Balkendiv").style.display = "";
   BB.style.color = "#FF4E4E";
   TA.innerHTML= "GO !!" 
   ZA.style.display = "none";
   if (mediaV==1){document.getElementById('gongsound').play();}
   else if (mediaV==2){document.getElementById('gosound1').play();}
   else if (mediaV==3){document.getElementById('gosound2').play();}
   else if (mediaV==4){document.getElementById('gosound3').play();}
   else if (mediaV==5){document.getElementById('gosound4').play();}
   else if (mediaV==6){document.getElementById('m1').play();}
   }
  
function ruhe(){
  //die Kamera wird mit der ersten Ruhephase gestoppt. Wenn sie nicht läuft,
  // geht es ins leere. kann man sicher ebsser machen  
   cameraStop();
   balkenwachser(),
   document.getElementById('m1').pause();
   document.body.style.background = "#2c687f";  
   BB.style.color = "#2c687f";
   ZA.style.display = "none";
   TA.innerHTML = "Pause";
   if (index % 2 == 0 &&  index == arrPeriods.length-3){vorletztepause()}
   else {normalepause()}  
}

function  normalepause(){
  if (mediaV==1){document.getElementById('gongsound').play();}
  else if (mediaV==2){document.getElementById('kurzepausesound1').play()
  document.body.style.background = "#2c687f url('image/ruhe1.jpg') no-repeat center";}
  else if (mediaV==3){document.getElementById('kurzepausesound2').play()
  document.body.style.background = "#2c687f url('image/ruhe2.jpg') no-repeat center";}
  else if (mediaV==4){document.getElementById('kurzepausesound3').play();
  document.body.style.background = "#2c687f url('image/ruhe3.jpg') no-repeat center"}
  else if (mediaV==5){document.getElementById('kurzepausesound4').play()
  document.body.style.background = "#2c687f url('image/ruhe4.jpg') no-repeat center";}
  else if (mediaV==6) {document.getElementById('m1').pause();}
}

function vorletztepause(){
  if (mediaV==1){document.getElementById('gongsound').play();}
  else if (mediaV==2){document.getElementById('vor1').play()
  document.body.style.background = "#2c687f url('image/vor1.jpg') no-repeat center";}
  else if (mediaV==3){document.getElementById('vor2').play()
  document.body.style.background = "#2c687f url('image/vor2.jpg') no-repeat center";;}
  else if (mediaV==4){document.getElementById('vor3').play();}
  else if (mediaV==5){document.getElementById('vor4').play();}
  else if (mediaV==5){document.getElementById('vor4').play();}
  else if (mediaV==6) {document.getElementById('m1').pause();}   
      }

function ende(){ 
  document.getElementById("zurückknopf").style.display = "none"
   document.body.style.backgroundColor = "#0FC2CF";
   BB.style.display = "none";
   TA.innerHTML = "Gratulation !!";
   ZA.style.display = "none";
   if (mediaV==1){document.getElementById('gongsound').play();}
   else if (mediaV==2){document.getElementById('endesound1').play() 
   document.body.style.background = "#2c687f url('image/ende1.jpg') no-repeat center";}
   else if (mediaV==3){document.getElementById('endesound2').play()
   document.body.style.background = "#2c687f url('image/ende2.jpg') no-repeat center";}
   else if (mediaV==4){document.getElementById('endesound3').play()
   document.body.style.background = "#2c687f url('image/ende3.jpg') no-repeat center";}
   else if (mediaV==5){document.getElementById('endesound4').play()
   document.body.style.background = "#2c687f url('image/ende4.jpg') no-repeat center";}
                   }


// eigene Uhrwerke (setInterval) für das wachsen und schrumpfen des Balkens
function balkenschrumpfer() {
  var Ausganswert = 100;
  var id = setInterval(was, belastungseingabe.value*10,1000);
  function was()
  {if (Ausganswert === 1) {clearInterval(id);} 
  else { Ausganswert= Ausganswert-1; BB.style.width = Ausganswert + '%';}}
                     }
function balkenwachser() {
  var Ausgangswert = 1;
  var id = setInterval(was, ausruheingabe.value*10,1000);
  function was() { 
  if (Ausgangswert === 100) {clearInterval(id);}
  else {Ausgangswert = Ausgangswert+1}; BB.style.width = Ausgangswert + '%';}
                    }
                
// Fotoapp____________________________________________
// das Gesamt Fotodiv urspünglich nicht anzeigen
const GFD = document.getElementById("Gesamtfotodiv")
GFD.style.display="none"

// Camera wird gestopt, wenn 1.Alt ausgewählt wird. Wenn 2.Alt nie ausgewählt geht es ins leere.
const Foto = document.getElementById("Fotomodus");
Foto.addEventListener("change", function() {
    if(Foto.value == "1"){GFD.style.display="none",cameraStop()}
    else if(Foto.value == "2"){GFD.style.display="",cameraStart()}
  })

//  constraints für Videostream und Konstanten festlegen
var constraints = { video: { facingMode: "user" }, audio: false };
var track = null;
const Streamansicht = document.getElementById("streamansicht");
const Bildcanvas = document.getElementById("bildcanvas");

// zugriff auf camera und stream zur Streamansicht
document.getElementById("herunterladenknopf").style.display='none'
function cameraStart() {
    navigator.mediaDevices
        .getUserMedia(constraints)
        .then(function(stream) {
            track = stream.getTracks()[0];
            Streamansicht.srcObject = stream;
                            })
        .catch(function(error) {
            console.error("Etwas hat nicht geklappt", error);
                            });
}
 // der track wird gestoppt, theoretisch muss jeder Einzelne Track gestopt werden. Anders kann der Kamerazugriff nicht beendet werden
function cameraStop(){track.stop() };

function fotomachen()  {
    document.getElementById("herunterladenknopf").style.display=''; 
    // der Stream hat eine andere größe, als das Bild, was man davon machen will, deshab muss man gleichsetzen
    Bildcanvas.width = Streamansicht.videoWidth;
    Bildcanvas.height = Streamansicht.videoHeight;
    Bildcanvas.getContext("2d").drawImage(Streamansicht, 0, 0);
    
};

function bildherunterladen() {
const canvas =  Bildcanvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
window.location.href=canvas;
  }
 


