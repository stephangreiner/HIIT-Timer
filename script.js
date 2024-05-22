var modus = 1;
var audioV = 0;
var untenzahl = 0;
var KB = 0;
const KBspeich = 0;
var Probenanzahl = 500;
var ss = 0; 
var GL = 8;
var GS = 12;
var AV = 1;


window.onload = function () {
neuerTagTest();
neuerMonatTest();
standartbild();
localStorage.removeItem("LSPEICHneu",);
localStorage.removeItem("KBSPEICHneu");
localStorage.removeItem("KZPEICHneu");
localStorage.removeItem("RHSPEICHneu");

document.getElementById("aktivcanvasdiv").style.display="none";
document.getElementById("Ldiv").style.display="none";
document.getElementById("aktivdiv").style.display="none";
document.getElementById("sta_div").style.display = "none";
document.getElementById("table2").style.display = "none";
document.getElementById("details").innerHTML = "Tage anzeigen"
localStorage.setItem('KBzeitspeicher', +new Date);


if (typeof localStorage.KBSPEICHmonat ==="undefined")
{document.getElementById("monat").innerHTML = "0"}
else { document.getElementById("monat").innerHTML =  localStorage.KBSPEICHmonat;}

if (typeof localStorage.KZSPEICHmonat ==="undefined")
{document.getElementById("monatKZ").innerHTML = "0"}
else { document.getElementById("monatKZ").innerHTML =  localStorage.KZSPEICHmonat;}

if (typeof localStorage.RHSPEICHmonat ==="undefined")
{document.getElementById("monatRH").innerHTML = "0"}
else { document.getElementById("monatRH").innerHTML =  localStorage.RHSPEICHmonat;}

if (typeof localStorage.LSPEICHmonat ==="undefined")
{document.getElementById("monatL").innerHTML = "0"}
else { document.getElementById("monatL").innerHTML =  localStorage.LSPEICHmonat;}



if (typeof localStorage.KBSPEICH ==="undefined") 
{document.getElementById("heute").innerHTML =  "0"}
else {document.getElementById("heute").innerHTML =  localStorage.KBSPEICH};

if (typeof localStorage.LSPEICH ==="undefined") 
{document.getElementById("heuteL").innerHTML =  "0"}
else {document.getElementById("heuteL").innerHTML =  localStorage.LSPEICH};

if (typeof localStorage.KZSPEICH ==="undefined") 
{document.getElementById("heuteKZ").innerHTML =  "0"}
else {document.getElementById("heuteKZ").innerHTML =  localStorage.KZSPEICH};

if (typeof localStorage.RHSPEICH ==="undefined") 
{document.getElementById("heuteRH").innerHTML =  "0"}
else {document.getElementById("heuteRH").innerHTML =  localStorage.RHSPEICH};



                            }


function sta_zeigen(){
  d = new Date();  
  document.getElementById("datum").innerHTML = d.getDate() + "." + (d.getMonth()+1) + "." + d.getFullYear();
  const monatn = ["Jan","Feb","Mär","Apr","Mai","Jun","Jul","Aug","Sep","Okt","Nov","Dez"];
  let name = monatn[d.getMonth()];
  const monate = document.getElementsByClassName("monats");
  for (let i = 0; i < d.getDate() ; i++) {monate[i].innerHTML = (i +1) + "." + (name)} 

  
  document.getElementById("mittelwert").innerHTML = Math.round(localStorage.KBSPEICHmonat  / d.getDate());
  document.getElementById("mittelwertKZ").innerHTML = Math.round(localStorage.KZSPEICHmonat  / d.getDate());
  document.getElementById("mittelwertRH").innerHTML = Math.round(localStorage.RHSPEICHmonat  / d.getDate());
  document.getElementById("mittelwertL").innerHTML = Math.round(localStorage.LSPEICHmonat  / d.getDate());
 
document.getElementById("sta_div").style.display = "";
document.getElementById("aktivcanvasdiv").style.display="none";
document.getElementById("aktivdiv").style.display="none";
document.getElementById("startdiv").style.display="none";
document.getElementById("monatname").innerHTML = name;


// Liegestützentabelle

// Kniebeugentabelle
for (let i = 1; i <= 31; i++) {
  const tabel_reihe = "t" + i; 
  const k_tag = "Ktag" + i; 
  const wert = localStorage.getItem(k_tag) 
  document.getElementById(tabel_reihe).innerHTML = wert;
}



// Klimmzügetabelle
for (let i = 1; i <= 31; i++) {
  const y = "KZtag" + i; 
  const r = "t" + i + "KZ"; 
  const v = localStorage.getItem(y) 
  document.getElementById(r).innerHTML = v;
}

//Rückenhebertabelle
for (let i = 1; i <= 31; i++) {
  const key = "RHtag" + i; 
  const elementId = "t" + i + "RH"; 
  const value = localStorage.getItem(key) 
  document.getElementById(elementId).innerHTML = value;
}

//Rückenhebertabelle
for (let i = 1; i <= 31; i++) {
  const key = "tag" + i; 
  const elementId = "t" + i + "L"; 
  const value = localStorage.getItem(key) 
  document.getElementById(elementId).innerHTML = value;
}

//Liegestützentabelle 
for (let i = 1; i <= 31; i++) {
  const tabel_reihe_l = "tag" + i; 
  const l_tag = "t" + i + "L"; 
  const wert_l = localStorage.getItem(l_tag) 
  document.getElementById(tabel_reihe_l).innerHTML = wert_l;
}
 

}

function tage_zeigen() {
  if (document.getElementById("table2").style.display === "none") 
       {
          document.getElementById("table1div").style.display = "none";
          document.getElementById("table2").style.display = "block";
          document.getElementById("details").innerHTML = "Monatsansicht"
  } 
else {
document.getElementById("table1div").style.display = "block";
document.getElementById("table2").style.display = "none";document.getElementById("details").innerHTML = "Tagesansicht"
  }
}

function neuerTagTest(){
  ld = new Date(parseInt(localStorage.getItem('KBzeitspeicher')));
  jd = new Date();
  nld = parseInt(ld.getDate())
  njd = parseInt(jd.getDate())
  if (nld!=njd){neuer_tag()}
                       }
function neuer_tag(){
  d = new Date();  
  a =  localStorage.getItem("KBSPEICH");
  localStorage.setItem("Ktag" + (d.getDate()-1), a)
  localStorage.removeItem("KBSPEICH")
  l =  localStorage.getItem("LSPEICH");
  localStorage.setItem("tag" + (d.getDate()-1), l)
  localStorage.removeItem("LSPEICH")
  k =  localStorage.getItem("KZSPEICH");
  localStorage.setItem("KZtag" + (d.getDate()-1), k)
  localStorage.removeItem("KZSPEICH")
  r =  localStorage.getItem("RHSPEICH");
  localStorage.setItem("RHtag" + (d.getDate()-1), r)
  localStorage.removeItem("RHSPEICH")




                   }
function neuerMonatTest(){
         ld = new Date(parseInt(localStorage.getItem('KBzeitspeicher')));
         jd = new Date();
         nld = parseInt(ld.getMonth())
         njd = parseInt(jd.getMonth())
         if (nld!=njd){monatneu()}
         console.log("monatpeicher = " + nld)
         console.log("monatjezt = " + njd) 
                          }   
function monatneu(){    
  localStorage.removeItem("KBSPEICHmonat"),
  localStorage.clear();
  document.getElementById("monat").innerHTML = "0";
                        }
  

var as = document.getElementById("ansichtw") 
as.addEventListener("change", function() {
if      (as.value == "1"){AV = 1}
if      (as.value == "2"){AV = 2}
else if (as.value == "3"){AV = 3}
})      

function start() {
  console.log("startja");
  document.getElementById("startdiv").style.display = "none";

  const aktivDiv = document.getElementById("aktivdiv");
  const aktivCanvasDiv = document.getElementById("aktivcanvasdiv");
  const lDiv = document.getElementById("Ldiv");

  switch (AV) {
    case 1:
      aktivDiv.style.display = "";
      aktivCanvasDiv.style.display = "none";
      break;
    case 2:
      aktivDiv.style.display = "";
      break;
    case 3:
      aktivDiv.style.display = "none";
      aktivCanvasDiv.style.display = "";
      break;
    default:
      console.log("canvasanzeige");
  }

  if ([1, 2, 3].includes(modus)) {
    lDiv.style.display = "none";
    uhrlos();
    addEventListener("devicemotion", handleMotionEvent);
    addEventListener("devicemotion", doSample);
    tick();
  } else if (modus == 4) {
    aktivDiv.style.display = "none";
    lDiv.style.display = "";
  }
}


function standartbild(){
   var  flachbild = document.createElement("img");
   flachbild.src = "media/flach.png";
   flachbild.id ="flachbild"
   flachbild.style.width = "200px";
   flachbild.style.hight = "200px";
   startb.appendChild(flachbild);
   screen.orientation.unlock()
                      }

const modusV = document.getElementById('mod');
modusV.value = 1;
modusV.min = 1;
modusV.max = 4; 


var mo = document.getElementById("mod") 
mo.addEventListener("change", function() {
if(modusV.value == "1"){ modus = 1; 
      var  flachbild = document.createElement("img");
      flachbild.src = "media/flach.png";
      flachbild.id ="flachbild"
      flachbild.style.width = "200px";
      flachbild.style.hight = "200px";
      startb.appendChild(flachbild);
      document.getElementById( "startb").style.backgroundColor = "rgb(255, 29, 29)"
      if (document.getElementById('flachbild') != null) { console.log("gibts schon");}
      if (document.getElementById('hochbild') != null) { document.getElementById('hochbild').remove();}
      if (document.getElementById('querbild') != null) { document.getElementById('querbild').remove();}
      if (document.getElementById('liegesbild') != null) { document.getElementById('liegesbild').remove();}
      else {console.log("komisch1")}
                      }


if (modusV.value == "2"){modus = 2;
     var  hochbild = document.createElement("img");
      hochbild.src = "media/hoch.png";
      hochbild.id ="hochbild";
      hochbild.style.width = "200px";
      hochbild.style.height = "200px";
      startb.appendChild(hochbild);
      document.getElementById( "startb").style.backgroundColor = "rgb(149, 216, 32)"
      if (document.getElementById('hochbild') != null) { console.log("gibts schon");}
      if (document.getElementById('flachbild') != null) { document.getElementById('flachbild').remove()}
      if (document.getElementById('querbild') != null) { document.getElementById('querbild').remove()}
      if (document.getElementById('liegesbild') != null) { document.getElementById('liegesbild').remove();}
       else {console.log("komisch2")}
                    }
if (modusV.value == "3"){modus = 3; 
     var  querbild = document.createElement("img");
    querbild.id ="querbild";
   querbild.src = "media/quer.png";
    querbild.style.width = "200px";
    querbild.style.height = "200px";
    startb.appendChild(querbild); 
    document.getElementById( "startb").style.backgroundColor = "rgb(55, 229, 229)"
    if (document.getElementById('querbild') != null) { console.log("querbild  gibts schon");}
    if (document.getElementById('flachbild') != null) { document.getElementById('flachbild').remove();}
    if (document.getElementById('hochbild') != null) { document.getElementById('hochbild').remove();}
    if (document.getElementById('liegesbild') != null) { document.getElementById('liegesbild').remove();}
    else{console.log("komisch3")} 
                 }

if (modusV.value == "4"){modus = 4;  
    var  liegesbild = document.createElement("img");
    liegesbild.id ="liegesbild";
    liegesbild.src = "media/LiegeS.png";
    liegesbild.style.width = "200px";
    liegesbild.style.height = "200px";
    startb.appendChild(liegesbild);                 
    document.getElementById( "startb").style.backgroundColor = "rgb(255, 86, 241)";
    if (document.getElementById('liegesbild')!= null) { console.log(" liegesbild gibts schon");}
    if (document.getElementById('flachbild')!= null) { document.getElementById('flachbild').remove();}
    if (document.getElementById('hochbild') != null) { document.getElementById('hochbild').remove();}
    if (document.getElementById('querbild') != null) { document.getElementById('querbild').remove();}  
    else{console.log("komisch4")} 
                               }
                                        })  

                                        
var glw = document.getElementById("GLW") 
glw.addEventListener("change", function() {
if      (glw.value == "1"){GL = 8}
else if (glw.value == "2"){GL = 5}
else if (glw.value == "3"){GL = 0}
                                                  })  

var gsw = document.getElementById("GSW") 
gsw.addEventListener("change", function() {
if      (gsw.value == "1"){GS = 12}
else if (gsw.value == "2"){GS = 15}
else if (gsw.value == "3"){GS = 20}
})    
                                                                                             

function ton(){
  var b =document.getElementById('tonb') 
    var a =document.getElementById('tona') ;
    if (audioV === 0)     {audioV = 1; a.innerHTML ="🔇";b.style.backgroundColor = "rgb(115, 115, 115)"}
    else if (audioV === 1){audioV = 0; a.innerHTML ="🔈";b.style.backgroundColor = "rgb(115, 115, 115)"}
    else {console.log("ähhhhhhhh")}
          }          




//für die Darstellung in dr Detailansicht werden die Variablen auf eine Dezimalstelle gerundet
// ich glaub es ist besser mit schwer oben / Azsgabeungekehrt
// startet die handleMotionEvent die ist speziell für den Sensor handling ungewöhnlich


function handleMotionEvent(event) {
    var x = event.accelerationIncludingGravity.x;
    var y = event.accelerationIncludingGravity.y;
    var z = event.accelerationIncludingGravity.z;

if (modus == 1){zvar(); document.getElementById("oneb").style.backgroundColor ="rgb(255, 29, 29)"}
if (modus == 2){yvar(); document.getElementById("oneb").style.backgroundColor ="rgb(149, 216, 32)"}
if (modus == 3){xvar(); document.getElementById("oneb").style.backgroundColor ="rgb(55, 229, 229)"}


function zvar(){
console.log("squatmodus")
if (z < GL) {niedrigg()} 
if (z > GS) {hochg()}} 
                 
function yvar(){
console.log("pullmodus")
if (y < GL) {niedrigg()}
if (y > GS) {hochg()}}
                 
function xvar(){
console.log("VRmodus")
if (x < GL) {niedrigg()}
if (x > GS) {hochg()}}
                                      }

var firstExecution = 0; // Store the first execution time
var interval = 100; // 2 millisekunden
function hochg() {
var date = new Date();
var milliseconds = date.getTime(); 
    if((milliseconds - firstExecution) > interval) 
    {firstExecution = milliseconds;
      untenzahl = untenzahl+ 1;
      document.getElementById("A1").innerHTML = untenzahl;
 if (ss == 0) {ss = ss + 1;console.log("ss11 "+ ss)} // startet die aktivierung
 else {console.log("komischss" + ss)}
    } 
  else {console.log("zufrüh" + interval);}
                 }


function niedrigg() {
  
var date = new Date();
var milliseconds = date.getTime(); 
if((milliseconds - firstExecution) > interval && ss ==1) // die Verzögerung ist wahrscheinlich unnötig
  { firstExecution = milliseconds;
    KB = KB + 1; 
    if (audioV == 0) {synthleicht()} else if (audioV == 1) {console.log("audiV1keinton" + audioV)}else {console.log("ton komisch");}
    if (AV == 2) {bildwechselKB ()}
    document.getElementById("KB").innerHTML = KB;
    document.getElementById("Anzahl").innerHTML = KB;
    if (modus == 1){

        if (typeof(Storage) !== "undefined") {
        if (localStorage.KBSPEICH) {localStorage.KBSPEICH= Number(localStorage.KBSPEICH)+1;} 
        else {localStorage.KBSPEICH = 1;}
        document.getElementById("heute").innerHTML =  localStorage.KBSPEICH;
        } else {document.getElementById("heute").innerHTML = "komisch";}

       if (typeof(Storage) !== "undefined") {
       if (localStorage.KBSPEICHneu) {localStorage.KBSPEICHneu= Number(localStorage.KBSPEICHneu)+1;} 
       else {localStorage.KBSPEICHneu = 1;}
       } else {console.log("komisch")}

       if (typeof(Storage) !== "undefined") {
       if (localStorage.KBSPEICHmonat) {localStorage.KBSPEICHmonat= Number(localStorage.KBSPEICHmonat)+1;} 
       else {localStorage.KBSPEICHmonat = 1;}
     } else {console.log("komisch")}
 
   }
    
if (modus == 2){
    if (typeof(Storage) !== "undefined") {
    if (localStorage.KZSPEICH) {localStorage.KZSPEICH= Number(localStorage.KZSPEICH)+1;} 
    else {localStorage.KZSPEICH = 1;}
    document.getElementById("heuteKZ").innerHTML =  localStorage.KZSPEICH;
    } else {document.getElementById("heuteKZ").innerHTML = "komisch";}

   if (typeof(Storage) !== "undefined") {
   if (localStorage.KZSPEICHneu) {localStorage.KZSPEICHneu= Number(localStorage.KZSPEICHneu)+1;} 
   else {localStorage.KZSPEICHneu = 1;}
   } else {console.log("komisch")}

   if (typeof(Storage) !== "undefined") {
   if (localStorage.KZSPEICHmonat) {localStorage.KZSPEICHmonat= Number(localStorage.KZSPEICHmonat)+1;} 
   else {localStorage.KZSPEICHmonat = 1;}
 } else {console.log("komisch")}

}

if (modus == 3){
  if (typeof(Storage) !== "undefined") {
  if (localStorage.RHSPEICH) {localStorage.RHSPEICH= Number(localStorage.RHSPEICH)+1;} 
  else {localStorage.RHSPEICH = 1;}
  document.getElementById("heuteRH").innerHTML =  localStorage.RHSPEICH;
  } else {document.getElementById("heuteRH").innerHTML = "komisch";}

 if (typeof(Storage) !== "undefined") {
 if (localStorage.RHSPEICHneu) {localStorage.RHSPEICHneu= Number(localStorage.RHSPEICHneu)+1;} 
 else {localStorage.RHSPEICHneu = 1;}
 } else {console.log("komisch")}

 if (typeof(Storage) !== "undefined") {
 if (localStorage.RHSPEICHmonat) {localStorage.RHSPEICHmonat= Number(localStorage.RHSPEICHmonat)+1;} 
 else {localStorage.RHSPEICHmonat = 1;}
} else {console.log("komisch")}

}
ss = ss - 1;console.log("ss00 "+ ss) // setzt den aktivierung zurück  SS
}
}                 



function bildwechselKB () {if  (KB % 10 === 0 && KB >= 10 ) {bildKB ()} }  

const ONEK = document.getElementById("oneb");

function bildKB() {
    let mediaV = Math.floor(Math.random() * 41) + 1;
    console.log("BildzufallV =" + mediaV);

    if (ONEK) {
        ONEK.style.background = `url('media/bm${mediaV}.jpg') no-repeat center`;
    } else {
        console.log("Element 'oneb' not found in the document.");
    }
}


function synthleicht() {
  let p = Synth.createInstrument('piano');
 
  if (KB % 10 === 0) {
    p.play("C", 4, 0.5);
  } else {
    p.play("E", 4, 0.5);
  }
}



                 
// canvas gezchnet werden Linien
var canvas = document.getElementById('canvas');
var W = canvas.width;
var H = canvas.height;
var ctx = canvas.getContext('2d');
var linien = {};
var scaleX = W/Probenanzahl;
var scaleY = 5;
linien.z = getInitArr(Probenanzahl);
linien.y = getInitArr(Probenanzahl);
linien.x = getInitArr(Probenanzahl);



// wird y dann auch gezeichnet ?
function doSample(event) {
if (modus==1){ shift(linien.z, event.accelerationIncludingGravity.z);}
if (modus==2){ shift(linien.y, event.accelerationIncludingGravity.y);}
if (modus==3){ shift(linien.x, event.accelerationIncludingGravity.x);}
}



function calculateDynamicScaleY(dataArrays) {
  let maxVal = 0;
  dataArrays.forEach(arr => {
      const localMax = Math.max(...arr.map(Math.abs));
      if (localMax > maxVal) maxVal = localMax;
  });
  return maxVal > 0 ? (H / 2) / maxVal : 5; // Prevent division by zero
}

function tick() {
  requestAnimationFrame(tick);
  ctx.fillStyle = 'black';
  ctx.fillRect(0, 0, W, H);
  const dynamicScaleY = calculateDynamicScaleY([linien.x, linien.y, linien.z]);
  zehnGlinie(), zehnleichtlinie(), zehnschwerlinie();
  if (modus == 1) { drawGraph(linien.z, scaleX, dynamicScaleY); }
  if (modus == 2) { drawGraph(linien.y, scaleX, dynamicScaleY); }
  if (modus == 3) { drawGraph(linien.x, scaleX, dynamicScaleY); }
}

//die Zahlen sind entsprechend der oben angegeben Scale = 5 alle x *5
function zehnGlinie() {
  ctx.lineWidth = 1;
  ctx.strokeStyle = 'white';
  ctx.beginPath();
  ctx.moveTo(0, (H/2)+50);
  ctx.lineTo(W, (H/2)+50);
  ctx.stroke();
}
function zehnleichtlinie() {
  ctx.strokeStyle = 'brown';
  ctx.beginPath();
  ctx.moveTo(0, (H/2)+100);
  ctx.lineTo(W, (H/2)+100);
  ctx.stroke();
}
function zehnschwerlinie() {
  ctx.strokeStyle = 'blue';
  ctx.beginPath();
  ctx.moveTo(0, (H/2)-0);
  ctx.lineTo(W, (H/2)-0);
  ctx.stroke();
}


function drawGraph(linien, scaleX, scaleY) {  
  ctx.save();
  ctx.translate(0, H/2); 
  ctx.lineWidth = 4
  ctx.strokeStyle = "green";
  if (min >= 1){ctx.strokeStyle = "red";}
  if (min >= 2){ ctx.strokeStyle = "violet";}
  if (min >= 3){ ctx.strokeStyle = "rgb(255, 255, 0)";
}
  ctx.beginPath();
  var len = linien.length;
  ctx.moveTo(0, linien[0] * scaleY);
  for(var i = 0; i < len; i++){
    ctx.lineTo(i*scaleX, linien[i]*scaleY);
   }
  ctx.stroke();
  ctx.restore();
                                         }

//get Float32Array of length initialized to 0
function getInitArr(length) {
  var arr = new Float32Array(length);
  return arr;
                            }

//zieht eine Probe aus doSample und fügt sie zeitlich hinten an den Array an und malt so die Linie
function shift(arr, datum) {
  var ret = arr[0];
  for (var i = 1; i < arr.length; i++) { arr[i - 1] = arr[i]; }
  arr[arr.length - 1] = datum;
  return ret;
                          }

//stopuhr
var sec = 0;
var min = "";
function tock(){
  document.getElementById("sekAn").innerHTML= sec
  document.getElementById("minAn").innerHTML= min
    sec = sec+1;
    if (sec >= 60) {sec = 0,min++;}
              }
function uhrlos() {i =setInterval(tock, 1000); }
   
function neu(){location.reload()}


// Liegestützen:

var  L = 0
function nasedrauf(){
  console.log(L)
  L = L+ 1;
  document.getElementById("LieA").innerHTML = L; 
  if (typeof(Storage) !== "undefined") {
    if (localStorage.LSPEICH) {localStorage.LSPEICH= Number(localStorage.LSPEICH)+1;} 
    else {localStorage.LSPEICH = 1;}
    document.getElementById("heute").innerHTML =  localStorage.LSPEICH;
  } else {console.log("komisch")}

  if (typeof(Storage) !== "undefined") {
   if (localStorage.LSPEICHneu) {localStorage.LSPEICHneu= Number(localStorage.LSPEICHneu)+1;} 
   else {localStorage.LSPEICHneu = 1;}
 } else {console.log("komisch")}

 if (typeof(Storage) !== "undefined") {
   if (localStorage.LSPEICHmonat) {localStorage.LSPEICHmonat= Number(localStorage.LSPEICHmonat)+1;} 
   else {localStorage.LSPEICHmonat = 1;}
 } else {console.log("komisch")}

 if (AV == 2) {bildwechsel ()}
 if (audioV == 0) {synth_Lieg()} else if (audioV == 1) {console.log("audiV1keinLton" + audioV)}else {console.log("tonLkomisch");}

                   }

 function bildwechsel () { if (L % 10 === 0 && L >= 10  ) {bild ()}      
                        }  

function synth_Lieg(){
let p = Synth.createInstrument('piano');
if  (L % 10 === 0 && L >= 10 ){p.play("E",4,0.5)}
   else (p.play("C",4,0.5))
  }
                        
                     
  const ONE = document.getElementById("LieB") 
  function bild(){
    mediaV = Math.floor(Math.random() * 41) + 1
    console.log("BildzufallV =" + mediaV)
    const bilder = [
      'media/bm1.jpg', 'media/bm2.jpg', 'media/bm3.jpg', 'media/bm4.jpg', 'media/bm5.jpg',
      'media/bm6.jpg', 'media/bm7.jpg', 'media/bm8.jpg', 'media/bm9.jpg', 'media/bm10.jpg',
      'media/bm11.jpg', 'media/bm12.jpg', 'media/bm13.jpg', 'media/bm14.jpg', 'media/bm15.jpg',
      'media/bm16.jpg', 'media/bm17.jpg', 'media/bm18.jpg', 'media/bm19.jpg', 'media/bm20.jpg',
      'media/bm21.jpg', 'media/bm22.jpg', 'media/bm23.jpg', 'media/bm24.jpg', 'media/bm25.jpg',
      'media/bm26.jpg', 'media/bm27.jpg', 'media/bm28.jpg', 'media/bm29.jpg', 'media/bm30.jpg',
      'media/bm31.jpg', 'media/bm32.jpg', 'media/bm33.jpg', 'media/bm34.jpg', 'media/bm35.jpg',
      'media/bm36.jpg', 'media/bm37.jpg', 'media/bm38.jpg', 'media/bm39.jpg', 'media/bm40.jpg',
      'media/bm41.jpg', 'media/bm42.jpg'
  ];
  
  if (mediaV >= 1 && mediaV <= bilder.length) {
      ONE.style.background = `url('${bilder[mediaV - 1]}') no-repeat center`;
  }
  }           
     
  if ('Notification' in window) {
    Notification.requestPermission().then(permission => {
      if (permission === 'granted') {
        console.log('Notification permission granted.');
      } else {
        console.log('Notification permission denied.');
      }
    });
  }
  
  function scheduleDailyNotification() {
    const now = new Date();
    const sevenAM = new Date();
    sevenAM.setHours(7, 0, 0, 0); // Set to 7:00 AM
  
    if (now.getTime() > sevenAM.getTime()) {
      sevenAM.setDate(sevenAM.getDate() + 1); // Schedule for the next day
    }
  
    const timeout = sevenAM.getTime() - now.getTime();
  
    setTimeout(() => {
      sendNotification();
      setInterval(sendNotification, 24 * 60 * 60 * 1000); // Repeat every 24 hours
    }, timeout);
  }
  
  function sendNotification() {
    if ('serviceWorker' in navigator && 'PushManager' in window) {
      navigator.serviceWorker.ready.then(registration => {
        registration.showNotification('Daily Notification', {
          body: 'nur 10!',
          icon: 'favicon-16x16.png',
          badge: 'favicon-16x16.png'
        });
      });
    }
  }
  
  scheduleDailyNotification();
  
  if ('serviceWorker' in navigator && 'PushManager' in window) {
    navigator.serviceWorker.ready.then(registration => {
      registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: '<Your VAPID Public Key>'
      }).then(subscription => {
        console.log('User is subscribed:', subscription);
        // Send subscription to your server
      }).catch(error => {
        console.log('Failed to subscribe the user:', error);
      });
    });
  }
  