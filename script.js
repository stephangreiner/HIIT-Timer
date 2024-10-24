const belastungseingabe = document.getElementById('eindauer'); // Eingabe-Elemente
const ausruheingabe = document.getElementById('einruhe');
const rundeneingabe = document.getElementById('einrunden');
const tonwahl = document.getElementById("tonwahl");

const ZA = document.getElementById('Zeitanzeige'); // Ausgabe-Elemente
const RA = document.getElementById('Rundenanzeige');
const TA = document.getElementById('Textanzeige');
const BB = document.getElementById("Balkenzeit");

ZA.innerHTML = "-----";
RA.innerHTML = '0 / 0';

window.onload = function() {
  document.getElementById("herunterladenknopf").style.display = "none";
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

  belastungseingabe.oninput = function() {
    document.getElementById('dauer').innerHTML = belastungseingabe.value;
  };
  ausruheingabe.oninput = function() {
    document.getElementById('ruhe').innerHTML = ausruheingabe.value;
  };
  rundeneingabe.oninput = function() {
    document.getElementById('runden').innerHTML = rundeneingabe.value;
  };
};

startknopf.onclick = function() {
  runTabata(5, belastungseingabe.value, ausruheingabe.value, rundeneingabe.value);
  document.getElementById('zeigendiv').style.visibility = 'visible';
  document.getElementById("Einstellungsdiv").style.display = "none";
};

zurueckknopf.onclick = function() {
  location.reload();
};

// Tabata-Funktion
function runTabata(vorlauf, dauer, ruhe, runden) {
  let arrPeriods = [vorlauf];
  let index = 0;
  for (let i = 0; i < runden; i++) {
    arrPeriods.push(dauer);
    arrPeriods.push(ruhe);
  }
  uhrwerk(arrPeriods, index);
}

// Timer-Funktion
function uhrwerk(arrPeriods, index) {
  let jetzt = Date.now();
  let dann = jetzt + arrPeriods[index] * 1000;

  window.index = index;
  window.arrPeriods = arrPeriods;
  window.arrPeriods.length = arrPeriods.length;

  let l = setInterval(function() {
    let zeitunterschied = Math.round((dann - Date.now()) / 1000) + 1;
    ZA.innerHTML = "Noch " + zeitunterschied + "s";
    RA.innerHTML = "Runde " + Math.floor((index + 1) / 2) + "/" + ((arrPeriods.length - 1) / 2);
    BB.innerHTML = zeitunterschied;

    if (zeitunterschied < 2) {
      BB.innerHTML = "";
    }

    if (zeitunterschied === 0) {
      clearInterval(l);
      if (index < arrPeriods.length - 1) {
        index++;
        uhrwerk(arrPeriods, index);
      }
    }
  }, 1000);

  if (index === 0) {
    vorlauf();
  } else if (index % 2 === 0 && index === arrPeriods.length - 1) {
    ende();
  } else if (index % 2 === 0) {
    setTimeout(function() {
      ruhe();
    }, 1000);
  } else {
    setTimeout(function() {
      aktiv();
    }, 1000);
  }
}

let tonv = 20;
tonwahl.addEventListener("change", function() {
  switch (tonwahl.value) {
    case "10":
      tonv = 0;
      tonwahl.style.backgroundColor = "#737373";
      break;
    case "1":
      tonv = 1;
      tonwahl.style.backgroundColor = "#00ff00";
      break;
    case "2":
      tonv = 2;
      tonwahl.style.backgroundColor = "#00ff00";
      break;
    case "3":
      tonv = Math.floor(Math.random() * 4) + 3;
      tonwahl.style.backgroundColor = "#00ff00";
      break;
  }
});

const Foto = document.getElementById("Fotomodus");
const GFD = document.getElementById("Gesamtfotodiv");
GFD.style.display = "none";

function camera() {
  const checkBox = document.getElementById("fotocheck");
  if (checkBox.checked) {
    cameraStart();
    GFD.style.display = "";
  } else {
    cameraStop();
    GFD.style.display = "none";
  }
}

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

function cameraStop() {
  track.stop();
  Streamansicht.srcObject = null;
}

function vorlauf() {
  document.body.style.backgroundColor = "black";
  document.getElementById("zurueckknopf").style.display = "none";
  document.getElementById("Balkendiv").style.display = "none";
  TA.innerHTML = "";
}

function aktiv() {
  console.log("aktivtonv" + tonv);
  aktivbalkenschrumpfer();
  aktivaudio();
  document.body.style.backgroundColor = "#00ff00";
  document.getElementById("zurueckknopf").style.display = "none";
  document.getElementById("Balkendiv").style.display = "";
  BB.style.color = "black";
  ZA.style.display = "none";
  TA.innerHTML = "GO !!";
  let fotorand = 6;
  let runde = Math.floor((index + 1) / 2);
  let Gesamtrunde = (arrPeriods.length - 1) / 2;
  console.log("laufende " + runde);
  console.log("arrplang" + Gesamtrunde);

  if (runde === Gesamtrunde) {
    fotorand = 0;
    console.log("fotorandgesetzt:" + fotorand);
  } else {
    fotorand = Math.floor(Math.random() * 4);
    console.log("fotorandzufall:" + fotorand);
  }

  console.log(Streamansicht.srcObject);

  if (fotorand === 0 && Streamansicht.srcObject !== null) {
    setTimeout(function() {
      fotomachen();
    }, (belastungseingabe.value * 1000) / 2);
    setTimeout(function() {
      cameraStop();
    }, belastungseingabe.value * 1000);
  }
}

function ruhe() {
  ruhebalkenwachser();
  document.getElementById('m1').pause();
  document.body.style.background = "black";
  document.getElementById("zurueckknopf").style.display = "none";
  BB.style.color = "black";
  ZA.style.display = "none";
  TA.innerHTML = "Pause";

  if (index % 2 === 0 && index === arrPeriods.length - 3) {
    vorletzteruheaudio();
    console.log("vorletzteRundeaaPerriods" + (arrPeriods.length - 3));
  } else {
    ruheaudio();
  }
}

function ende() {
  endeaudio();
  if (Streamansicht.srcObject !== null) {
    cameraStop();
  }
  document.getElementById("zurueckknopf").style.display = "";
  document.getElementById("herunterladenknopf").style.display = "";
  document.getElementById("Balkendiv").style.display = "none";
  document.body.style.backgroundColor = "blue";
  BB.style.display = "none";
  TA.innerHTML = "Super";
  ZA.style.display = "none";
}

function aktivaudio() {
  if (tonv > 2 && tonv < 18) {
    tonv = Math.floor(Math.random() * 11) + 3;
    console.log("tonvaktiv" + tonv);
  }

  switch (tonv) {
    case 0:
      console.log("tonv" + tonv);
      break;
    case 1:
      document.getElementById('gongsound').play();
      break;
    case 2:
      document.getElementById('m1').play();
      break;
    case 3:
      document.getElementById('gosound1').play();
      break;
    case 4:
      document.getElementById('gosound2').play();
      break;
    case 5:
      document.getElementById('gosound3').play();
      break;
    case 6:
      document.getElementById('gosound4').play();
      break;
    case 7:
      document.getElementById('gosound5').play();
      break;
    case 8:
      document.getElementById('gosound6').play();
      break;
    case 9:
      document.getElementById('gosound7').play();
      break;
    case 10:
      document.getElementById('gosound8').play();
      break;
    case 11:
      document.getElementById('gosound9').play();
      break;
    case 12:
      document.getElementById('gosound10').play();
      break;
    case 13:
      document.getElementById('gosound11').play();
      break;
    default:
      console.log("tonv" + tonv);
      break;
  }
}

function ruheaudio() {
  if (tonv > 2 && tonv < 18) {
    tonv = Math.floor(Math.random() * 8) + 3;
  }

  switch (tonv) {
    case 0:
      console.log("ruhetonv==0!");
      break;
    case 1:
      document.getElementById('gongsound').play();
      break;
    case 2:
      document.getElementById('m1').pause();
      break;
    case 3:
      document.getElementById('kurzepausesound1').play();
      break;
    case 4:
      document.getElementById('kurzepausesound2').play();
      break;
    case 5:
      document.getElementById('kurzepausesound3').play();
      break;
    case 6:
      document.getElementById('kurzepausesound4').play();
      break;
    case 7:
      document.getElementById('kurzepausesound5').play();
      break;
    case 8:
      document.getElementById('kurzepausesound6').play();
      break;
    case 9:
      document.getElementById('kurzepausesound7').play();
      break;
    case 10:
      document.getElementById('kurzepausesound8').play();
      break;
    default:
      console.log("errorruheRundelogtonv" + tonv);
      break;
  }
}

function vorletzteruheaudio() {
  if (tonv > 2 && tonv < 18) {
    tonv = Math.floor(Math.random() * 6) + 3;
  }

  switch (tonv) {
    case 0:
      console.log("tonv == 0");
      break;
    case 1:
      document.getElementById('gongsound').play();
      break;
    case 2:
      document.getElementById('m1').pause();
      break;
    case 3:
      document.getElementById('vor1').play();
      break;
    case 4:
      document.getElementById('vor2').play();
      break;
    case 5:
      document.getElementById('vor3').play();
      break;
    case 6:
      document.getElementById('vor4').play();
      break;
    case 7:
      document.getElementById('vor5').play();
      break;
    case 8:
      document.getElementById('vor6').play();
      break;
    default:
      console.log("errorverltztelogtonv" + tonv);
      break;
  }
}

function endeaudio() {
  if (tonv > 2 && tonv < 18) {
    tonv = Math.floor(Math.random() * 4) + 3;
  }

  switch (tonv) {
    case 0:
      console.log("endetonv == 0");
      break;
    case 1:
      document.getElementById('gongsound').play();
      break;
    case 2:
      document.getElementById('m1').pause();
      break;
    case 3:
      document.getElementById('endesound1').play();
      break;
    case 4:
      document.getElementById('endesound2').play();
      break;
    case 5:
      document.getElementById('endesound3').play();
      break;
    case 6:
      document.getElementById('endesound4').play();
      break;
    default:
      console.log("tonv" + tonv);
      break;
  }
}

function aktivbalkenschrumpfer() {
  let ausgangswert = 100;
  let id = setInterval(function() {
    if (ausgangswert === 1) {
      clearInterval(id);
    } else {
      ausgangswert -= 1;
      BB.style.width = ausgangswert + '%';
      BB.style.fontSize = "300%";
    }
  }, belastungseingabe.value * 10);
}

function ruhebalkenwachser() {
  let ausgangswert = 1;
  let id = setInterval(function() {
    if (ausgangswert === 100) {
      clearInterval(id);
    } else {
      ausgangswert += 1;
      BB.style.width = ausgangswert + '%';
      BB.style.fontSize = "300%";
    }
  }, ausruheingabe.value * 10);
}

// Video-Stream Einstellungen
const constraints = {
  video: {
    width: { ideal: 3840 },
    height: { ideal: 2160 },
    facingMode: "user"
  },
  audio: false
};
let track = null;
const Streamansicht = document.getElementById("streamansicht");
const Bildcanvas = document.getElementById("bildcanvas");

function fotomachen() {
  Bildcanvas.width = Streamansicht.videoWidth;
  Bildcanvas.height = Streamansicht.videoHeight;
  Bildcanvas.getContext("2d").drawImage(Streamansicht, 0, 0);
  cameraStop();
}

function bildherunterladen() {
  const canvas = Bildcanvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
  const link = document.createElement('a');
  const d = new Date();
  const ja = d.getFullYear();
  const mo = d.getMonth() + 1;
  const ta = d.getDate();
  const st = d.getHours();
  const mi = d.getMinutes();
  link.download = `HIIT_${ta}_${mo}_${ja}_${st}_${mi}.png`;
  link.href = canvas;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
