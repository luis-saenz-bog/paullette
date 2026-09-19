// ==============================
// Utilidades
// ==============================
function flowerSVG(color){
  return `
    <svg viewBox="0 0 24 24" width="100%" height="100%" fill="${color}" xmlns="http://www.w3.org/2000/svg">
      <g>
        <ellipse cx="12" cy="6" rx="3.4" ry="5" />
        <ellipse cx="12" cy="6" rx="3.4" ry="5" transform="rotate(72 12 12)" />
        <ellipse cx="12" cy="6" rx="3.4" ry="5" transform="rotate(144 12 12)" />
        <ellipse cx="12" cy="6" rx="3.4" ry="5" transform="rotate(216 12 12)" />
        <ellipse cx="12" cy="6" rx="3.4" ry="5" transform="rotate(288 12 12)" />
        <circle cx="12" cy="12" r="2.6" fill="#a5670d" />
      </g>
    </svg>
  `;
}

// ==============================
// Destellos dorados de fondo (decorativos)
// ==============================
const sparklesContainer = document.getElementById('sparkles-container');
for (let i = 0; i < 40; i++){
  const sparkle = document.createElement('div');
  sparkle.className = 'sparkle';
  sparkle.textContent = Math.random() > 0.5 ? '✦' : '✧';
  sparkle.style.top = Math.random() * 100 + '%';
  sparkle.style.left = Math.random() * 100 + '%';
  sparkle.style.animationDelay = (Math.random() * 3) + 's';
  sparklesContainer.appendChild(sparkle);
}

// ==============================
// Corazones ambientales (decorativos, de fondo, continuos)
// ==============================
const ambientContainer = document.getElementById('ambient-hearts');
const ambientEmojis = ['💛', '🌷', '💗'];

function spawnAmbientHeart(){
  const heart = document.createElement('div');
  heart.className = 'ambient-heart';
  heart.textContent = ambientEmojis[Math.floor(Math.random() * ambientEmojis.length)];
  heart.style.left = Math.random() * 100 + 'vw';
  heart.style.fontSize = (0.9 + Math.random() * 1.1) + 'rem';
  const duration = 10 + Math.random() * 8;
  heart.style.animationDuration = duration + 's';
  ambientContainer.appendChild(heart);
  setTimeout(() => heart.remove(), duration * 1000);
}

setInterval(spawnAmbientHeart, 1400);
spawnAmbientHeart();


// ==============================
// Lluvia de pétalos y tulipanes al máximo (con reacción al mouse)
// ==============================
const petalsContainer = document.getElementById('petals-container');
const PETAL_SPEED = 10;   // máxima velocidad
const PETAL_AMOUNT = 60;  // máxima cantidad

let currentPetals = [];

function createPetal(speedFactor){
  const petal = document.createElement('div');
  petal.className = 'petal';

  const left = Math.random() * 100;
  const size = 14 + Math.random() * 20;
  const isTulip = Math.random() < 0.35;

  const baseFallDuration = 20 - speedFactor * 1.6;
  const fallDuration = Math.max(3, baseFallDuration + Math.random() * 3);
  const swayDuration = 3 + Math.random() * 3;
  const delay = Math.random() * 6;

  petal.style.left = left + 'vw';
  petal.style.width = size + 'px';
  petal.style.height = size + 'px';
  petal.style.animation = `fall ${fallDuration}s linear ${delay}s infinite, sway ${swayDuration}s ease-in-out ${delay}s infinite`;
  petal.style.transform = `rotate(${Math.random() * 360}deg)`;
  petal.dataset.baseLeft = left;

  if (isTulip){
    petal.style.fontSize = size + 'px';
    petal.style.display = 'flex';
    petal.style.alignItems = 'center';
    petal.style.justifyContent = 'center';
    petal.textContent = '🌷';
  } else {
    const colors = ['#ffd166', '#f4a300', '#ffe08a'];
    const color = colors[Math.floor(Math.random() * colors.length)];
    petal.innerHTML = flowerSVG(color);
  }

  petalsContainer.appendChild(petal);
  currentPetals.push(petal);
}

function renderPetals(){
  currentPetals.forEach(p => p.remove());
  currentPetals = [];

  for (let i = 0; i < PETAL_AMOUNT; i++){
    createPetal(PETAL_SPEED);
  }
}

renderPetals();

// Reacción al mouse: empuja los pétalos cercanos
document.addEventListener('mousemove', (e) => {
  const mouseXPercent = (e.clientX / window.innerWidth) * 100;

  currentPetals.forEach(petal => {
    const baseLeft = parseFloat(petal.dataset.baseLeft);
    const distance = Math.abs(baseLeft - mouseXPercent);

    if (distance < 8){
      const push = distance < 4 ? 6 : 3;
      const direction = baseLeft > mouseXPercent ? 1 : -1;
      petal.style.left = (baseLeft + push * direction) + 'vw';
    } else {
      petal.style.left = baseLeft + 'vw';
    }
  });
});


// ==============================
// Razones para amarte (actividad interactiva con frases románticas)
// ==============================
const reasonsText = document.getElementById('reasons-text');
const reasonBtn = document.getElementById('reason-btn');

const loveReasons = [
  'Porque tu sonrisa es más bonita que cualquier tulipán 🌷',
  'Porque contigo hasta los días grises se vuelven amarillos 💛',
  'Porque cada mensaje tuyo es mi flor favorita del día 🌷',
  'Porque amarte se siente tan natural como que las flores florezcan',
  'Porque eres la razón por la que quiero mejorar cada día',
  'Porque tu voz es mi canción favorita 🎶',
  'Porque contigo el tiempo se detiene y a la vez vuela',
  'Porque tus ojos brillan como el sol de un 21 de septiembre',
  'Porque me haces creer en los finales felices',
  'Porque cada tulipán del mundo me recuerda a ti 🌷',
  'Porque tu abrazo es mi lugar favorito',
  'Porque quiero ver florecer cada día a tu lado',
  'Porque nunca me cansaré de decirte cuánto te amo',
  'Porque eres mi persona favorita en cualquier estación del año',
  'Porque contigo hasta lo simple se vuelve especial, Paullette 💛'
];

let lastReasonIndex = -1;

function showNewReason(){
  let index;
  do{
    index = Math.floor(Math.random() * loveReasons.length);
  } while (index === lastReasonIndex && loveReasons.length > 1);
  lastReasonIndex = index;

  reasonsText.classList.add('fading');
  setTimeout(() => {
    reasonsText.textContent = loveReasons[index];
    reasonsText.classList.remove('fading');
  }, 300);
}

reasonBtn.addEventListener('click', showNewReason);


// ==============================
// Flores al tocar/hacer clic en la pantalla
// ==============================
const clickBloomContainer = document.getElementById('click-bloom-container');
const bloomEmojis = ['🌷', '💛', '✨'];

function spawnClickBloom(x, y){
  const bloom = document.createElement('div');
  bloom.className = 'click-bloom';
  bloom.textContent = bloomEmojis[Math.floor(Math.random() * bloomEmojis.length)];
  bloom.style.left = x + 'px';
  bloom.style.top = y + 'px';
  clickBloomContainer.appendChild(bloom);
  setTimeout(() => bloom.remove(), 1000);
}

document.addEventListener('click', (e) => {
  // Evita interferir con botones, inputs y controles
  if (e.target.closest('button, input, a, .modal-box')) return;
  spawnClickBloom(e.clientX, e.clientY);
});


// ==============================
// Cuenta regresiva hasta el 21 de septiembre
// ==============================
function getNextSept21(){
  const now = new Date();
  let target = new Date(now.getFullYear(), 8, 21, 0, 0, 0);
  if (target < now){
    target = new Date(now.getFullYear() + 1, 8, 21, 0, 0, 0);
  }
  return target;
}

function isSept21Today(){
  const now = new Date();
  return now.getMonth() === 8 && now.getDate() === 21;
}

let celebrationTriggered = false;

function updateCountdown(){
  const countdownEl = document.getElementById('countdown');
  const celebrationEl = document.getElementById('countdown-celebration');

  if (isSept21Today()){
    countdownEl.classList.add('hidden');
    celebrationEl.style.display = 'block';

    if (!celebrationTriggered){
      celebrationTriggered = true;
      launchConfetti();
    }
    return;
  }

  countdownEl.classList.remove('hidden');
  celebrationEl.style.display = 'none';
  celebrationTriggered = false;

  const target = getNextSept21();
  const now = new Date();
  let diff = Math.max(0, target - now);

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const mins = Math.floor((diff / (1000 * 60)) % 60);
  const secs = Math.floor((diff / 1000) % 60);

  document.getElementById('cd-days').textContent = String(days).padStart(2, '0');
  document.getElementById('cd-hours').textContent = String(hours).padStart(2, '0');
  document.getElementById('cd-mins').textContent = String(mins).padStart(2, '0');
  document.getElementById('cd-secs').textContent = String(secs).padStart(2, '0');
}

updateCountdown();
setInterval(updateCountdown, 1000);


// ==============================
// Contador de días juntos (desde el 20 de noviembre)
// ==============================
function getTogetherStartDate(){
  const now = new Date();
  let start = new Date(now.getFullYear(), 10, 20); // mes 10 = noviembre
  // Si el 20 de noviembre de este año todavía no ha llegado,
  // se toma el del año pasado como fecha de inicio.
  if (start > now){
    start = new Date(now.getFullYear() - 1, 10, 20);
  }
  return start;
}

function updateTogetherCounter(){
  const start = getTogetherStartDate();
  const now = new Date();
  const diffMs = now - start;
  const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  document.getElementById('together-days').textContent = days;
}

updateTogetherCounter();
setInterval(updateTogetherCounter, 60000);


// ==============================
// Medidor de amor interactivo
// ==============================
const loveFill = document.getElementById('love-fill');
const loveCaption = document.getElementById('love-caption');
const loveTapBtn = document.getElementById('love-tap-btn');

let loveLevel = 0;
const loveMax = 10;

const loveMessages = [
  'Toca el tulipán y descúbrelo 🌷',
  'Un poquito... 🌱',
  'Cada vez más 🌷',
  'Bastante 💛',
  'Muchísimo 🌷💛',
  'Un montón 💛🌷',
  'Casi al infinito...',
  'Infinitamente 💛',
  'Más que ayer 🌷',
  'Con todo su corazón 💛',
  '¡INFINITO, Paullette! 🌷💛✨'
];

loveTapBtn.addEventListener('click', () => {
  if (loveLevel < loveMax){
    loveLevel++;
  }

  const percent = (loveLevel / loveMax) * 100;
  loveFill.style.width = percent + '%';
  loveCaption.textContent = loveMessages[loveLevel];

  if (loveLevel === loveMax){
    launchConfetti();
    for (let i = 0; i < 6; i++){
      setTimeout(launchHeart, i * 150);
    }
  }
});


// ==============================
// Modal romántico + sonido + confeti
// ==============================
const openModalBtn = document.getElementById('open-modal-btn');
const closeModalBtn = document.getElementById('close-modal-btn');
const modalOverlay = document.getElementById('modal-overlay');
const farewellToast = document.getElementById('farewell-toast');

function playChime(){
  try{
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(880, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(1320, ctx.currentTime + 0.15);
    gain.gain.setValueAtTime(0.15, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.6);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.6);
  }catch(err){ /* silencioso si el navegador bloquea audio */ }
}

function launchConfetti(){
  const confettiContainer = document.getElementById('confetti-container');
  const colors = ['#ffd166', '#f4a300', '#a9720a', '#ffe08a', '#fff2c6'];

  for (let i = 0; i < 40; i++){
    const piece = document.createElement('div');
    piece.className = 'confetti-piece';
    piece.style.left = Math.random() * 100 + 'vw';
    piece.style.background = colors[Math.floor(Math.random() * colors.length)];
    piece.style.animationDelay = (Math.random() * 0.4) + 's';
    piece.style.animationDuration = (2 + Math.random() * 1.5) + 's';
    confettiContainer.appendChild(piece);
    setTimeout(() => piece.remove(), 4200);
  }
}

function openModal(){
  modalOverlay.classList.add('active');
  playChime();
  launchConfetti();
}

function closeModal(){
  modalOverlay.classList.remove('active');
  farewellToast.classList.add('show');
  setTimeout(() => farewellToast.classList.remove('show'), 3200);
}

openModalBtn.addEventListener('click', openModal);
closeModalBtn.addEventListener('click', closeModal);

modalOverlay.addEventListener('click', (e) => {
  if (e.target === modalOverlay){ closeModal(); }
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape'){ closeModal(); }
});


// ==============================
// Efecto sorpresa: fotitos nuestras con la tecla "M"
// ==============================
const heartContainer = document.getElementById('heart-container');

// Coloca aquí los nombres de tus fotos (mismo tamaño recomendado, ej. 300x300px)
// y súbelas a esta misma carpeta con esos nombres exactos.
const photoSources = ['fotito.jpeg'];
const fallbackEmojis = ['💛', '🌷'];

function launchHeart(){
  const img = document.createElement('img');
  img.className = 'floating-photo';
  img.src = photoSources[Math.floor(Math.random() * photoSources.length)];
  img.alt = 'Nosotros';
  img.style.left = (10 + Math.random() * 80) + 'vw';

  // Si la foto no existe todavía, muestra un emoji de respaldo en su lugar
  img.onerror = () => {
    const fallback = document.createElement('div');
    fallback.className = 'floating-heart';
    fallback.textContent = fallbackEmojis[Math.floor(Math.random() * fallbackEmojis.length)];
    fallback.style.left = img.style.left;
    heartContainer.appendChild(fallback);
    setTimeout(() => fallback.remove(), 3600);
    img.remove();
  };

  heartContainer.appendChild(img);
  setTimeout(() => img.remove(), 3600);
}

document.addEventListener('keydown', (e) => {
  if (e.key.toLowerCase() === 'm'){
    for (let i = 0; i < 8; i++){
      setTimeout(launchHeart, i * 150);
    }
  }
});


// ==============================
// Rompecabezas de nuestra foto
// ==============================
const PUZZLE_GRID = 3;
const PUZZLE_TOTAL = PUZZLE_GRID * PUZZLE_GRID;
const puzzleGrid = document.getElementById('puzzle-grid');
const puzzleSuccess = document.getElementById('puzzle-success');
const puzzleShuffleBtn = document.getElementById('puzzle-shuffle-btn');

let puzzleSelected = null;
let puzzleSolved = false;

function shuffleArray(arr){
  for (let i = arr.length - 1; i > 0; i--){
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function backgroundPositionForIndex(idx){
  const row = Math.floor(idx / PUZZLE_GRID);
  const col = idx % PUZZLE_GRID;
  const step = 100 / (PUZZLE_GRID - 1);
  return `${col * step}% ${row * step}%`;
}

function onPuzzlePieceClick(e){
  if (puzzleSolved) return;
  const el = e.currentTarget;

  if (!puzzleSelected){
    puzzleSelected = el;
    el.classList.add('selected');
    return;
  }

  if (puzzleSelected === el){
    el.classList.remove('selected');
    puzzleSelected = null;
    return;
  }

  // Intercambia las piezas (imagen y posición correcta) entre las dos celdas
  const tempIndex = puzzleSelected.dataset.correctIndex;
  puzzleSelected.dataset.correctIndex = el.dataset.correctIndex;
  el.dataset.correctIndex = tempIndex;

  puzzleSelected.style.backgroundPosition = backgroundPositionForIndex(+puzzleSelected.dataset.correctIndex);
  el.style.backgroundPosition = backgroundPositionForIndex(+el.dataset.correctIndex);

  puzzleSelected.classList.remove('selected');
  puzzleSelected = null;

  checkPuzzleSolved();
}

function checkPuzzleSolved(){
  const pieces = [...puzzleGrid.children];
  const solved = pieces.every((piece, slot) => +piece.dataset.correctIndex === slot);

  if (solved){
    puzzleSolved = true;
    launchConfetti();
    for (let i = 0; i < 6; i++){
      setTimeout(launchHeart, i * 180);
    }
    puzzleSuccess.style.display = 'block';
  }
}

function buildPuzzle(){
  puzzleGrid.innerHTML = '';
  puzzleSelected = null;
  puzzleSolved = false;
  puzzleSuccess.style.display = 'none';

  let order = shuffleArray([...Array(PUZZLE_TOTAL).keys()]);

  // Evita que aparezca ya resuelto por casualidad
  const isIdentity = order.every((v, i) => v === i);
  if (isIdentity){
    [order[0], order[1]] = [order[1], order[0]];
  }

  order.forEach((correctIdx) => {
    const piece = document.createElement('div');
    piece.className = 'puzzle-piece';
    piece.dataset.correctIndex = correctIdx;
    piece.style.backgroundPosition = backgroundPositionForIndex(correctIdx);
    piece.addEventListener('click', onPuzzlePieceClick);
    puzzleGrid.appendChild(piece);
  });
}

puzzleShuffleBtn.addEventListener('click', buildPuzzle);
buildPuzzle();

// Verifica que la foto del rompecabezas exista; si no, avisa claramente
// en vez de dejar las piezas en blanco.
const PUZZLE_PHOTO_SRC = 'nuestra-foto.jpeg';
const puzzleCheckImg = new Image();
puzzleCheckImg.onerror = () => {
  const warning = document.createElement('p');
  warning.className = 'puzzle-warning';
  warning.textContent = `⚠️ No se encontró "${PUZZLE_PHOTO_SRC}" en esta carpeta. Colócala junto a index.html con ese nombre exacto para ver el rompecabezas.`;
  puzzleGrid.insertAdjacentElement('afterend', warning);
};
puzzleCheckImg.src = PUZZLE_PHOTO_SRC;


// ==============================
// Mariposa cruzando la pantalla
// ==============================
const critter = document.getElementById('critter');

function flyCritter(){
  critter.classList.remove('fly');
  void critter.offsetWidth;
  critter.textContent = Math.random() > 0.5 ? '🦋' : '🐝';
  critter.classList.add('fly');
}

flyCritter();
setInterval(flyCritter, 18000);


// ==============================
// Carrusel de galería
// ==============================
const track = document.getElementById('carousel-track');
const slides = track.querySelectorAll('.carousel-slide');
const prevBtn = document.getElementById('prev-slide');
const nextBtn = document.getElementById('next-slide');
const dotsContainer = document.getElementById('carousel-dots');
let currentSlide = 0;

slides.forEach((_, i) => {
  const dot = document.createElement('button');
  dot.className = 'carousel-dot';
  dot.setAttribute('aria-label', `Ir a la foto ${i + 1}`);
  dot.addEventListener('click', () => {
    currentSlide = i;
    updateCarousel();
  });
  dotsContainer.appendChild(dot);
});

const dots = dotsContainer.querySelectorAll('.carousel-dot');

function updateCarousel(){
  track.style.transform = `translateX(-${currentSlide * 100}%)`;
  dots.forEach((dot, i) => dot.classList.toggle('active', i === currentSlide));
}

prevBtn.addEventListener('click', () => {
  currentSlide = (currentSlide - 1 + slides.length) % slides.length;
  updateCarousel();
});

nextBtn.addEventListener('click', () => {
  currentSlide = (currentSlide + 1) % slides.length;
  updateCarousel();
});

updateCarousel();


// ==============================
// Compartir mensaje
// ==============================
const shareBtn = document.getElementById('share-btn');

shareBtn.addEventListener('click', async () => {
  const text = 'Luis te ama, Paullette, y te desea un hermoso 21 de septiembre 💛🌷';

  if (navigator.share){
    try{
      await navigator.share({ title: 'Feliz Día de las Flores Amarillas', text });
    }catch(err){ /* el usuario canceló el share */ }
  } else {
    try{
      await navigator.clipboard.writeText(text);
      alert('Mensaje copiado al portapapeles 💛');
    }catch(err){
      alert(text);
    }
  }
});


// ==============================
// Descargar tarjeta como imagen
// ==============================
const downloadBtn = document.getElementById('download-btn');
const messageCard = document.getElementById('message-card');

downloadBtn.addEventListener('click', () => {
  if (typeof html2canvas === 'undefined'){
    alert('No se pudo cargar la herramienta de descarga (revisa tu conexión a internet).');
    return;
  }
  html2canvas(messageCard, { backgroundColor: null, scale: 2 }).then(canvas => {
    const link = document.createElement('a');
    link.download = 'flores-amarillas.png';
    link.href = canvas.toDataURL('image/png');
    link.click();
  });
});


// ==============================
// Música de fondo (opcional)
// ==============================
const bgMusic = document.getElementById('bg-music');
const musicToggle = document.getElementById('music-toggle');
let isPlaying = false;

musicToggle.addEventListener('click', () => {
  if (!isPlaying){
    bgMusic.play().then(() => {
      isPlaying = true;
      musicToggle.textContent = '🔊';
    }).catch(() => {
      musicToggle.textContent = '🔇';
    });
  } else {
    bgMusic.pause();
    isPlaying = false;
    musicToggle.textContent = '🔈';
  }
});