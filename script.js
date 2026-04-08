// --- DOM refs ---
const belastungseingabe = document.getElementById('eindauer');
const ausruheingabe = document.getElementById('einruhe');
const rundeneingabe = document.getElementById('einrunden');
const tonwahl = document.getElementById("tonwahl");
const musikupload = document.getElementById("musikupload");
const musikuploadbereich = document.getElementById("musikuploadbereich");
const musikdateiname = document.getElementById("musikdateiname");
const startknopf = document.getElementById("startknopf");
const zurueckknopf = document.getElementById("zurueckknopf");
const kameramodus = document.getElementById("kameramodus");
const mehrfachdownloadbereich = document.getElementById("mehrfachdownloadbereich");
const mehrfachdownloadliste = document.getElementById("mehrfachdownloadliste");
const standardMusik = document.getElementById('m1');
const customMusic = document.getElementById('customMusic');
const ZA = document.getElementById('Zeitanzeige');
const RA = document.getElementById('Rundenanzeige');
const TA = document.getElementById('Textanzeige');
const BB = document.getElementById("Balkenzeit");
const GFD = document.getElementById("Gesamtfotodiv");
const Streamansicht = document.getElementById("streamansicht");
const Bildcanvas = document.getElementById("bildcanvas");

// --- State ---
let audioMode = 0;       // 0=silent, 1=gong, 2=music, 3=motivation
let customMusicUrl = "";
let sessionMedien = [];
let zufallsVideoRunde = null;
let arrPeriods = [];
let currentIndex = 0;
let wakeLock = null;
let audioCtx = null;
let lastBeepSecond = -1;
let track = null;
let imageCapture = null;
let mediaRecorder = null;
let videoChunks = [];
let laufendeVideoRunde = null;

// --- Audio ID arrays (replaces switch-case blocks) ---
const goSounds    = ['gosound1','gosound2','gosound3','gosound4','gosound5',
                     'gosound6','gosound7','gosound8','gosound9','gosound10','gosound11'];
const pauseSounds = ['kurzepausesound1','kurzepausesound2','kurzepausesound3','kurzepausesound4',
                     'kurzepausesound5','kurzepausesound6','kurzepausesound7','kurzepausesound8'];
const vorSounds   = ['vor1','vor2','vor3','vor4','vor5','vor6'];
const endeSounds  = ['endesound1','endesound2','endesound3','endesound4'];

function playRandom(ids) {
  document.getElementById(ids[Math.floor(Math.random() * ids.length)]).play();
}

// --- localStorage ---
function saveSettings() {
  localStorage.setItem('hiit-work',   belastungseingabe.value);
  localStorage.setItem('hiit-rest',   ausruheingabe.value);
  localStorage.setItem('hiit-rounds', rundeneingabe.value);
  localStorage.setItem('hiit-audio',  tonwahl.value);
  localStorage.setItem('hiit-camera', kameramodus.value);
}

function loadSettings() {
  const work   = localStorage.getItem('hiit-work');
  const rest   = localStorage.getItem('hiit-rest');
  const rounds = localStorage.getItem('hiit-rounds');
  const audio  = localStorage.getItem('hiit-audio');
  const camera = localStorage.getItem('hiit-camera');

  if (work)   belastungseingabe.value = work;
  if (rest)   ausruheingabe.value = rest;
  if (rounds) rundeneingabe.value = rounds;
  if (audio)  {
    tonwahl.value = audio;
    tonwahl.dispatchEvent(new Event('change'));
  }
  if (camera) kameramodus.value = camera;
}

// --- Screen Wake Lock ---
async function requestWakeLock() {
  if ('wakeLock' in navigator) {
    try {
      wakeLock = await navigator.wakeLock.request('screen');
    } catch (err) {
      // wake lock not available or denied — silently ignore
    }
  }
}

function releaseWakeLock() {
  if (wakeLock) {
    wakeLock.release();
    wakeLock = null;
  }
}

// --- Countdown beep (Web Audio API) ---
function initAudioCtx() {
  try {
    if (!audioCtx) {
      audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    } else if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
  } catch (err) {
    // AudioContext not available
  }
}

function countdownBeep() {
  if (!audioCtx) return;
  const osc  = audioCtx.createOscillator();
  const gain = audioCtx.createGain();
  osc.connect(gain);
  gain.connect(audioCtx.destination);
  osc.frequency.value = 880;
  gain.gain.setValueAtTime(0.15, audioCtx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.15);
  osc.start(audioCtx.currentTime);
  osc.stop(audioCtx.currentTime + 0.15);
}

// --- Init ---
ZA.innerHTML = "-----";
RA.innerHTML = '0 / 0';

window.onload = function() {
  belastungseingabe.min = 1;
  ausruheingabe.min = 1;
  rundeneingabe.min = 1;
  belastungseingabe.max = 60;
  ausruheingabe.max = 60;
  rundeneingabe.max = 20;
  belastungseingabe.value = 20;
  ausruheingabe.value = 10;
  rundeneingabe.value = 8;
  kameramodus.value = "aus";

  loadSettings();

  document.getElementById('dauer').innerHTML   = belastungseingabe.value;
  document.getElementById('ruhe').innerHTML    = ausruheingabe.value;
  document.getElementById('runden').innerHTML  = rundeneingabe.value;

  belastungseingabe.oninput = function() {
    document.getElementById('dauer').innerHTML = belastungseingabe.value;
    saveSettings();
  };
  ausruheingabe.oninput = function() {
    document.getElementById('ruhe').innerHTML = ausruheingabe.value;
    saveSettings();
  };
  rundeneingabe.oninput = function() {
    document.getElementById('runden').innerHTML = rundeneingabe.value;
    saveSettings();
  };

  mehrfachdownloadbereich.style.display = "none";
  GFD.style.display = "none";
  updateMusikUploadSichtbarkeit();
};

// --- Controls ---
startknopf.onclick = function() {
  sessionMedien = [];
  zufallsVideoRunde = kameramodus.value === "video-zufall"
    ? Math.max(1, Math.floor(Math.random() * Number(rundeneingabe.value)) + 1)
    : null;
  stoppeVideoAufnahme();
  renderMehrfachDownloads();
  initAudioCtx();
  requestWakeLock();
  runTabata(5, belastungseingabe.value, ausruheingabe.value, rundeneingabe.value);
  if (kameramodus.value !== "aus") {
    cameraStart();
    GFD.style.display = "";
  } else {
    GFD.style.display = "none";
  }
  document.getElementById('zeigendiv').style.visibility = 'visible';
  document.getElementById("Einstellungsdiv").style.display = "none";
};

zurueckknopf.onclick = function() {
  releaseWakeLock();
  location.reload();
};

// --- Timer ---
function runTabata(warmupSec, dauer, ruheSec, runden) {
  arrPeriods = [warmupSec];
  for (let i = 0; i < runden; i++) {
    arrPeriods.push(dauer);
    arrPeriods.push(ruheSec);
  }
  uhrwerk(0);
}

function uhrwerk(idx) {
  currentIndex = idx;
  lastBeepSecond = -1;
  const dann = Date.now() + arrPeriods[currentIndex] * 1000;

  const l = setInterval(function() {
    const zeitunterschied = Math.round((dann - Date.now()) / 1000) + 1;
    ZA.innerHTML = "Noch " + zeitunterschied + "s";
    RA.innerHTML = "Runde " + Math.floor((currentIndex + 1) / 2) + "/" + ((arrPeriods.length - 1) / 2);
    BB.innerHTML = zeitunterschied < 2 ? "" : zeitunterschied;

    // Countdown beep + haptic for last 3 seconds (skip during final/ende phase)
    const isEnde = currentIndex % 2 === 0 && currentIndex === arrPeriods.length - 1;
    if (zeitunterschied <= 3 && zeitunterschied >= 1 && !isEnde && zeitunterschied !== lastBeepSecond) {
      lastBeepSecond = zeitunterschied;
      if (navigator.vibrate) navigator.vibrate(50);
      if (audioMode !== 0) countdownBeep();
    }

    if (zeitunterschied <= 0) {
      clearInterval(l);
      if (currentIndex < arrPeriods.length - 1) {
        uhrwerk(currentIndex + 1);
      }
    }
  }, 1000);

  if (currentIndex === 0) {
    vorlauf();
  } else if (currentIndex % 2 === 0 && currentIndex === arrPeriods.length - 1) {
    ende();
  } else if (currentIndex % 2 === 0) {
    ruhe();
  } else {
    aktiv();
  }
}

// --- Audio mode selection ---
tonwahl.addEventListener("change", function() {
  switch (tonwahl.value) {
    case "10": audioMode = 0; tonwahl.style.backgroundColor = "#737373"; break;
    case "1":  audioMode = 1; tonwahl.style.backgroundColor = "#00ff00"; break;
    case "2":  audioMode = 2; tonwahl.style.backgroundColor = "#00ff00"; break;
    case "3":  audioMode = 3; tonwahl.style.backgroundColor = "#00ff00"; break;
  }
  updateMusikUploadSichtbarkeit();
  saveSettings();
});

kameramodus.addEventListener("change", saveSettings);

musikupload.addEventListener("change", function(event) {
  const datei = event.target.files && event.target.files[0];
  if (!datei) {
    resetCustomMusic();
    return;
  }
  if (customMusicUrl) {
    URL.revokeObjectURL(customMusicUrl);
  }
  customMusicUrl = URL.createObjectURL(datei);
  customMusic.src = customMusicUrl;
  customMusic.load();
  musikdateiname.textContent = datei.name;
});

function updateMusikUploadSichtbarkeit() {
  musikuploadbereich.style.display = tonwahl.value === "2" ? "flex" : "none";
}

function resetCustomMusic() {
  if (customMusicUrl) {
    URL.revokeObjectURL(customMusicUrl);
  }
  customMusicUrl = "";
  customMusic.removeAttribute("src");
  customMusic.load();
  musikdateiname.textContent = "Keine Datei ausgewählt";
}

// --- Phase handlers ---
function vorlauf() {
  document.body.style.backgroundColor = "black";
  document.getElementById("zurueckknopf").style.display = "none";
  document.getElementById("Balkendiv").style.display = "none";
  TA.innerHTML = "";
}

function aktiv() {
  aktivbalkenschrumpfer();
  aktivaudio();
  document.body.style.backgroundColor = "#00ff00";
  document.getElementById("zurueckknopf").style.display = "none";
  document.getElementById("Balkendiv").style.display = "";
  BB.style.color = "black";
  ZA.style.display = "none";
  TA.innerHTML = "GO !!";

  const runde = Math.floor((currentIndex + 1) / 2);
  const streamAktiv = Streamansicht.srcObject !== null;
  const sollFotoMachen  = streamAktiv && kameramodus.value === "foto-alle";
  const sollVideoMachen = streamAktiv && kameramodus.value === "video-zufall" && runde === zufallsVideoRunde;

  if (sollFotoMachen) {
    const aktivzeitInMs = Number(belastungseingabe.value) * 1000;
    setTimeout(fotomachen, zufallsFotoZeitpunkt(aktivzeitInMs));
  }
  if (sollVideoMachen) {
    starteVideoAufnahme(runde);
  }
}

function ruhe() {
  stoppeVideoAufnahme();
  ruhebalkenwachser();
  standardMusik.pause();
  customMusic.pause();
  document.body.style.background = "black";
  document.getElementById("zurueckknopf").style.display = "none";
  BB.style.color = "black";
  ZA.style.display = "none";
  TA.innerHTML = "Pause";

  if (currentIndex % 2 === 0 && currentIndex === arrPeriods.length - 3) {
    vorletzteruheaudio();
  } else {
    ruheaudio();
  }
}

function ende() {
  endeaudio();
  stoppeVideoAufnahme();
  if (Streamansicht.srcObject !== null) {
    cameraStop();
  }
  releaseWakeLock();
  renderMehrfachDownloads();
  document.getElementById("zurueckknopf").style.display = "";
  document.getElementById("Balkendiv").style.display = "none";
  document.body.style.backgroundColor = "blue";
  BB.style.display = "none";
  TA.innerHTML = "Super";
  ZA.style.display = "none";
}

// --- Audio playback ---
function aktivaudio() {
  switch (audioMode) {
    case 0: break;
    case 1: document.getElementById('gongsound').play(); break;
    case 2:
      if (customMusicUrl) {
        customMusic.play();
      } else {
        standardMusik.currentTime = 0;
        standardMusik.play();
      }
      break;
    case 3: playRandom(goSounds); break;
  }
}

function ruheaudio() {
  switch (audioMode) {
    case 0: break;
    case 1: document.getElementById('gongsound').play(); break;
    case 2: standardMusik.pause(); customMusic.pause(); break;
    case 3: playRandom(pauseSounds); break;
  }
}

function vorletzteruheaudio() {
  switch (audioMode) {
    case 0: break;
    case 1: document.getElementById('gongsound').play(); break;
    case 2: standardMusik.pause(); customMusic.pause(); break;
    case 3: playRandom(vorSounds); break;
  }
}

function endeaudio() {
  switch (audioMode) {
    case 0: break;
    case 1: document.getElementById('gongsound').play(); break;
    case 2: standardMusik.pause(); customMusic.pause(); break;
    case 3: playRandom(endeSounds); break;
  }
}

// --- Progress bar animations ---
function aktivbalkenschrumpfer() {
  let ausgangswert = 100;
  const id = setInterval(function() {
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
  const id = setInterval(function() {
    if (ausgangswert === 100) {
      clearInterval(id);
    } else {
      ausgangswert += 1;
      BB.style.width = ausgangswert + '%';
      BB.style.fontSize = "300%";
    }
  }, ausruheingabe.value * 10);
}

// --- Camera ---
const constraints = {
  video: {
    width: { ideal: 3840 },
    height: { ideal: 2160 },
    facingMode: { ideal: "user" }
  },
  audio: false
};

function cameraStart() {
  startKameraStream().catch(function() {
    // camera unavailable or permission denied
  });
}

async function startKameraStream() {
  const stream = await navigator.mediaDevices.getUserMedia(constraints);
  const videotrack = stream.getVideoTracks()[0];
  const kameraeinstellungen = videotrack.getSettings();

  if (kameraeinstellungen.facingMode !== "user" && navigator.mediaDevices.enumerateDevices) {
    stream.getTracks().forEach(function(mediatrack) { mediatrack.stop(); });
    const optimierteConstraints = await holeOptimierteFrontkameraConstraints();
    const frontkameraStream = await navigator.mediaDevices.getUserMedia(optimierteConstraints);
    track = frontkameraStream.getVideoTracks()[0];
    await setupKameraQualitaet(track);
    if (typeof ImageCapture !== "undefined") {
      imageCapture = new ImageCapture(track);
    }
    Streamansicht.srcObject = frontkameraStream;
    return;
  }

  track = videotrack;
  await setupKameraQualitaet(track);
  if (typeof ImageCapture !== "undefined") {
    imageCapture = new ImageCapture(track);
  }
  Streamansicht.srcObject = stream;
}

function cameraStop() {
  stoppeVideoAufnahme();
  if (track) {
    track.stop();
    track = null;
  }
  imageCapture = null;
  Streamansicht.srcObject = null;
}

function setupKameraQualitaet(videotrack) {
  try {
    const faehigkeiten = videotrack.getCapabilities();
    const erweiterteEinstellungen = [];

    if (faehigkeiten.focusMode && faehigkeiten.focusMode.includes("continuous")) {
      erweiterteEinstellungen.push({ focusMode: "continuous" });
    }
    if (faehigkeiten.exposureMode && faehigkeiten.exposureMode.includes("continuous")) {
      erweiterteEinstellungen.push({ exposureMode: "continuous" });
    }
    if (faehigkeiten.whiteBalanceMode && faehigkeiten.whiteBalanceMode.includes("continuous")) {
      erweiterteEinstellungen.push({ whiteBalanceMode: "continuous" });
    }
    if (faehigkeiten.sharpness && typeof faehigkeiten.sharpness.max === "number") {
      erweiterteEinstellungen.push({ sharpness: faehigkeiten.sharpness.max });
    }
    if (faehigkeiten.contrast && typeof faehigkeiten.contrast.max === "number") {
      erweiterteEinstellungen.push({ contrast: faehigkeiten.contrast.max });
    }
    if (faehigkeiten.saturation && typeof faehigkeiten.saturation.max === "number") {
      erweiterteEinstellungen.push({ saturation: faehigkeiten.saturation.max });
    }

    if (erweiterteEinstellungen.length > 0) {
      videotrack.applyConstraints({ advanced: erweiterteEinstellungen });
    }
  } catch (err) {
    // camera optimization not fully available
  }
}

// --- Media capture ---
function zufallsFotoZeitpunkt(aktivzeitInMs) {
  if (!aktivzeitInMs || aktivzeitInMs <= 1200) {
    return Math.max(100, aktivzeitInMs / 2);
  }
  const min = 500;
  const max = aktivzeitInMs - 500;
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function blobZuDataUrl(blob) {
  return new Promise(function(resolve, reject) {
    const reader = new FileReader();
    reader.onloadend = function() { resolve(reader.result); };
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}

async function fotomachen() {
  if (!Streamansicht.videoWidth || !Streamansicht.videoHeight) return;

  if (imageCapture) {
    try {
      const fotoBlob = await imageCapture.takePhoto();
      const bildDataUrl = await blobZuDataUrl(fotoBlob);
      sessionMedien.push({
        typ: "foto",
        zeitstempel: new Date().toISOString(),
        url: bildDataUrl,
        dateiEndung: "jpg"
      });
      return;
    } catch (err) {
      // fallback to canvas
    }
  }

  Bildcanvas.width  = Streamansicht.videoWidth;
  Bildcanvas.height = Streamansicht.videoHeight;
  const context = Bildcanvas.getContext("2d");
  context.imageSmoothingEnabled = true;
  context.imageSmoothingQuality = "high";
  context.clearRect(0, 0, Bildcanvas.width, Bildcanvas.height);
  context.drawImage(Streamansicht, 0, 0, Bildcanvas.width, Bildcanvas.height);
  sessionMedien.push({
    typ: "foto",
    zeitstempel: new Date().toISOString(),
    url: Bildcanvas.toDataURL("image/png"),
    dateiEndung: "png"
  });
}

function starteVideoAufnahme(runde) {
  if (!Streamansicht.srcObject || typeof MediaRecorder === "undefined" || mediaRecorder) return;

  const unterstuetzterTyp = holeVideoMimeType();
  videoChunks = [];
  laufendeVideoRunde = runde;

  try {
    mediaRecorder = unterstuetzterTyp
      ? new MediaRecorder(Streamansicht.srcObject, { mimeType: unterstuetzterTyp })
      : new MediaRecorder(Streamansicht.srcObject);
  } catch (err) {
    mediaRecorder = null;
    laufendeVideoRunde = null;
    return;
  }

  mediaRecorder.ondataavailable = function(event) {
    if (event.data && event.data.size > 0) {
      videoChunks.push(event.data);
    }
  };

  mediaRecorder.onstop = function() {
    if (!videoChunks.length) {
      mediaRecorder = null;
      laufendeVideoRunde = null;
      return;
    }
    const mimeType = mediaRecorder.mimeType || unterstuetzterTyp || "video/webm";
    const videoBlob = new Blob(videoChunks, { type: mimeType });
    const videoUrl = URL.createObjectURL(videoBlob);
    sessionMedien.push({
      typ: "video",
      zeitstempel: new Date().toISOString(),
      url: videoUrl,
      dateiEndung: mimeType.includes("mp4") ? "mp4" : "webm",
      runde: laufendeVideoRunde
    });
    renderMehrfachDownloads();
    mediaRecorder = null;
    laufendeVideoRunde = null;
    videoChunks = [];
  };

  mediaRecorder.start();
}

function stoppeVideoAufnahme() {
  if (mediaRecorder && mediaRecorder.state !== "inactive") {
    mediaRecorder.stop();
  }
}

function holeVideoMimeType() {
  if (typeof MediaRecorder === "undefined" || !MediaRecorder.isTypeSupported) return "";
  const kandidatentypen = ["video/webm;codecs=vp9", "video/webm;codecs=vp8", "video/webm"];
  return kandidatentypen.find(function(typ) {
    return MediaRecorder.isTypeSupported(typ);
  }) || "";
}

async function holeOptimierteFrontkameraConstraints() {
  const geraete = await navigator.mediaDevices.enumerateDevices();
  const videogeraete = geraete.filter(function(geraet) {
    return geraet.kind === "videoinput";
  });

  const frontkameraRegex = /(front|user|facetime|selfie|vorder|frontal)/i;
  const weitwinkelRegex  = /(wide|ultra|0\.5|weit)/i;

  const frontkameras = videogeraete.filter(function(geraet) {
    return frontkameraRegex.test(geraet.label);
  });

  const bevorzugteFrontkamera = frontkameras.find(function(geraet) {
    return weitwinkelRegex.test(geraet.label);
  }) || frontkameras[0];

  if (bevorzugteFrontkamera) {
    return {
      video: {
        deviceId: { exact: bevorzugteFrontkamera.deviceId },
        width: { ideal: 3840 },
        height: { ideal: 2160 }
      },
      audio: false
    };
  }
  return constraints;
}

// --- Download gallery ---
function renderMehrfachDownloads() {
  mehrfachdownloadliste.innerHTML = "";

  if (!sessionMedien.length) {
    mehrfachdownloadbereich.style.display = "none";
    return;
  }

  mehrfachdownloadbereich.style.display = "block";
  sessionMedien.forEach(function(eintrag, index) {
    const kachel    = document.createElement("div");
    const link      = document.createElement("a");
    const linkBild  = document.createElement("img");
    const zeit      = new Date(eintrag.zeitstempel);
    const stempel   = `${zeit.getHours()}_${zeit.getMinutes()}_${zeit.getSeconds()}`;
    const vorschau  = eintrag.typ === "video"
      ? document.createElement("video")
      : document.createElement("img");
    const dateinameBasis = eintrag.typ === "video"
      ? `HIIT_Video_Runde_${eintrag.runde || index + 1}_${stempel}`
      : `HIIT_Foto_${index + 1}_${stempel}`;

    kachel.className = "mehrfachfotokachel";

    if (eintrag.typ === "video") {
      vorschau.className  = "mehrfachvideovorschau";
      vorschau.src        = eintrag.url;
      vorschau.muted      = true;
      vorschau.playsInline = true;
      vorschau.controls   = true;
      vorschau.preload    = "metadata";
      vorschau.setAttribute("aria-label", `Video Runde ${eintrag.runde || index + 1}`);
    } else {
      vorschau.className = "mehrfachfotovorschau";
      vorschau.src       = eintrag.url;
      vorschau.alt       = `Foto ${index + 1}`;
    }

    link.className = "mehrfachdownloadlink";
    link.href      = eintrag.url;
    link.download  = `${dateinameBasis}.${eintrag.dateiEndung || (eintrag.typ === "video" ? "webm" : "png")}`;
    link.setAttribute("aria-label", `${eintrag.typ === "video" ? "Video" : "Foto"} ${index + 1} herunterladen`);

    linkBild.src    = "./bilder/herunterladensymbol.png";
    linkBild.alt    = `Download ${eintrag.typ === "video" ? "Video" : "Foto"} ${index + 1}`;
    linkBild.width  = 28;
    linkBild.height = 28;

    link.appendChild(linkBild);
    kachel.appendChild(vorschau);
    kachel.appendChild(link);
    mehrfachdownloadliste.appendChild(kachel);
  });
}
