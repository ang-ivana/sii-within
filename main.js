const navItems = document.querySelectorAll('.nav-item');
const sections = document.querySelectorAll('.page-section');

navItems.forEach(item => {
  item.addEventListener("click", function (e) {
    e.preventDefault();

    //Removing the active classes
    navItems.forEach(nav => nav.classList.remove("active"));
    sections.forEach(sec => sec.classList.remove("js-page-section"));
    this.classList.add("active");
    const text = this.textContent.trim();
    switch (text) {
      case "Home":
        document.getElementById("home").classList.add("js-page-section");
        break;

      case "Activities":
        document.getElementById("activities").classList.add("js-page-section");
        break;

      case "Statistics":
        document.getElementById("statistics").classList.add("js-page-section");
        break;
      case "Profile":
        document.getElementById("profile").classList.add("js-page-section");
        break;

      default:
        document.getElementById("home").classList.add("js-page-section");
    }
  })
})

const playSession = document.getElementById("session-btn");
const stopSession = document.getElementById("stop-session");
const yogaSession = document.querySelector(".yoga-session");
const sessionMusic = document.getElementById("sessionMusic");

let stopTimeout = null;
let fadeInterval = null;
let isPlaying = false;
let isFading = false;

playSession.addEventListener('click', () => {
  if (isPlaying || isFading) return;
  isPlaying = true;
  yogaSession.classList.add("js-yoga-session");

  clearAll();
  sessionMusic.currentTime = 0;
  sessionMusic.volume = 1;
  sessionMusic.play();

  stopTimeout = setTimeout(stopMusic, 180000);
})

stopSession.addEventListener("click", () => {
  if (!isPlaying || isFading) return;
  stopMusic();
})

function stopMusic() {
  isFading = true;
  clearTimeout(stopTimeout);
  const duration = 2000;
  const interval = 50;
  const step = sessionMusic.volume / (duration / interval);

  fadeInterval = setInterval(() => {
    if (sessionMusic.volume > step) {
      sessionMusic.volume -= step;
    } else {
      finishStop();
    }
  }, interval)
}

function finishStop() {
  clearAll();
  sessionMusic.pause();
  sessionMusic.currentTime = 0;
  sessionMusic.volume = 1;
  yogaSession.classList.remove("js-yoga-session");
  logMindfulActivity(3);
  isPlaying = false;
  isFading = false;
}


function clearAll() {
  if (fadeInterval) {
    clearInterval(fadeInterval);
    fadeInterval = null;
  }
}

//Async & Await
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

const dailyThoughtText = document.querySelector(".daily-thought p");
const refreshThoughtBtn = document.querySelector("#refreshImg");
if (refreshThoughtBtn) {
  refreshThoughtBtn.addEventListener("click", async () => {
    dailyThoughtText.textContent = "Loading a new thought...";
    const thought = await getDailyThought();
    dailyThoughtText.textContent = thought;
  })
}
async function getDailyThought() {
  await sleep(600);
  const thoughts = [
    "Rest is productive.",
    "You don’t need permission to slow down.",
    "Progress counts even when it’s quiet.",
    "Small steps still move you forward.",
    "Your pace is valid.",
    "You are allowed to change your mind.",
    "Healing isn’t linear.",
    "Consistency beats intensity.",
    "It’s okay to begin again.",
    "Showing up imperfectly still matters.",
    "Energy is more valuable than speed.",
    "Peace is a form of success.",
    "You’re not behind.",
    "Your worth isn’t tied to output.",
    "One good habit can change everything.",
    "Breathe before reacting.",
    "Your body is on your side.",
    "Today doesn’t have to be amazing.",
    "Doing less can mean doing better.",
    "Momentum starts with kindness to yourself.",
    "You don’t need to do it all today.",
    "Growth often feels uncomfortable.",
    "Effort matters more than motivation.",
    "You can rest without quitting.",
    "Your best looks different every day.",
    "Boundaries protect your energy.",
    "Saying no is self-respect.",
    "You’re learning, not failing.",
    "Quiet days still count.",
    "It’s okay to ask for help.",
    "Comparison steals joy.",
    "Focus on what’s in your control.",
    "Motivation follows action.",
    "One step is enough.",
    "You’re allowed to take breaks.",
    "Progress doesn’t need an audience.",
    "You are not your bad days.",
    "Showing up is brave.",
    "Simple routines create stability.",
    "You don’t need to earn rest.",
    "Your feelings are information.",
    "Growth requires patience.",
    "You can do hard things slowly.",
    "Self-care is not selfish.",
    "You’re allowed to protect your peace.",
    "Not everything needs a reaction.",
    "Healing starts with honesty.",
    "It’s okay to start small.",
    "You don’t need to be perfect to begin.",
    "Calm is a skill you can build.",
    "Momentum comes from movement.",
    "You’re allowed to feel proud.",
    "Progress includes setbacks.",
    "Being gentle is being strong.",
    "You don’t have to rush your life.",
    "One good decision can change your day.",
    "It’s okay to need time.",
    "You’re growing even when it’s subtle.",
    "Stability beats chaos.",
    "You don’t need external validation.",
    "Focus beats motivation.",
    "You can choose peace.",
    "Your effort matters.",
    "Consistency compounds.",
    "Start where you are.",
    "You’re not lazy, you’re human.",
    "Healing takes energy.",
    "Simple habits build strong lives.",
    "You don’t need to prove yourself.",
    "Stillness is powerful.",
    "You deserve compassion from yourself.",
    "One breath can reset you.",
    "Progress isn’t loud.",
    "You are allowed to rest mid-journey.",
    "You’re allowed to take up space.",
    "Clarity comes from action.",
    "You don’t need everything figured out.",
    "Today is a chance to try again.",
    "Stability is underrated.",
    "Your mental health matters.",
    "You can be ambitious and gentle.",
    "One task at a time.",
    "You don’t need to be motivated to begin.",
    "Discipline is self-trust.",
    "Growth happens in repetition.",
    "It’s okay to go at your own speed.",
    "Your nervous system needs care.",
    "Pause before pushing.",
    "You’re allowed to enjoy progress.",
    "Effort builds confidence.",
    "You are not falling behind.",
    "Simple is sustainable.",
    "Rest fuels resilience.",
    "Motivation comes and goes — habits stay.",
    "You can redefine success.",
    "Your health is a priority.",
    "You don’t need urgency to be valuable.",
    "It’s okay to protect your time.",
    "Progress includes reflection.",
    "You’re learning how to live better.",
    "You don’t owe productivity.",
    "Energy management beats time management.",
    "Healing requires patience.",
    "Your body remembers kindness.",
    "One calm moment matters.",
    "You don’t need to hustle to be worthy.",
    "Start before you’re ready.",
    "Tiny habits build strong foundations.",
    "You can slow down without stopping.",
    "You’re allowed to feel tired.",
    "Effort builds momentum.",
    "You’re not broken.",
    "Focus on the next right step.",
    "Consistency builds trust with yourself.",
    "It’s okay to change direction.",
    "Progress looks boring sometimes.",
    "You’re allowed to rest before burnout.",
    "Calm creates clarity.",
    "You don’t need constant motivation.",
    "Discipline is care.",
    "You can build a life you don’t need to escape.",
    "Progress doesn’t need perfection.",
    "You’re allowed to be a beginner.",
    "Healing starts with rest.",
    "One habit at a time.",
    "You deserve sustainable success.",
    "Peace is productive.",
    "Growth is often invisible.",
    "You’re allowed to stop and breathe.",
    "Self-trust is built daily.",
    "Motivation follows consistency.",
    "Your pace is protective.",
    "You can do less and still move forward.",
    "Your needs matter.",
    "Rest is part of progress.",
    "You don’t need to rush healing.",
    "Focus on what’s doable.",
    "You’re building resilience.",
    "Gentle effort counts.",
    "You’re allowed to enjoy the process.",
    "Simplicity supports wellbeing.",
    "You don’t need to compare timelines.",
    "Calm is a form of strength.",
    "Slow progress is still progress.",
    "Self-love fuels motivation.",
    "Every small win matters.",
    "You’re allowed to take space.",
    "Action creates momentum.",
    "Your mind deserves kindness.",
    "You don’t have to solve everything at once.",
    "Consistency is quiet power.",
    "You are allowed to prioritize yourself.",
    "Your limits are valid.",
    "Every day is a new chance.",
    "You’re allowed to start fresh.",
    "Focus on what serves you.",
    "Your journey is unique.",
    "Self-care isn’t optional.",
    "Small victories matter.",
    "Energy is a resource, not infinite.",
    "Progress may feel invisible but still exists.",
    "You’re allowed to protect your joy.",
    "Rest restores clarity.",
    "Healthy habits compound over time.",
    "You can create your own rhythm.",
    "Growth often comes from discomfort.",
    "You don’t need to justify your rest.",
    "Your intuition knows the way.",
    "Every effort counts.",
    "You’re allowed to celebrate yourself.",
    "Focus on your own lane.",
    "Patience is a form of strength.",
    "Boundaries cultivate peace.",
    "You’re allowed to pause.",
    "Self-respect creates resilience.",
    "Your mind needs breaks.",
    "Effort without burnout matters.",
    "Small steps build momentum.",
    "Consistency beats motivation alone.",
    "You’re allowed to take a day off.",
    "Progress is personal, not public.",
    "Clarity comes from stillness.",
    "Your well-being is a priority.",
    "You are allowed to feel everything.",
    "Self-discipline supports freedom.",
    "Momentum starts with action.",
    "Rest is strategic.",
    "Your growth is real, even if quiet.",
    "Daily habits shape your life.",
    "You’re allowed to slow down.",
    "Energy management is key.",
    "Focus on what you can control.",
    "Your limits deserve respect.",
    "Small actions create change.",
    "You’re allowed to be patient.",
    "Effort compounds over time.",
    "You are allowed to recover.",
    "Your pace creates sustainability.",
    "Progress starts where you are.",
    "Self-care is an investment.",
    "Your goals deserve consistency.",
    "You’re allowed to reflect.",
    "Boundaries protect your energy.",
    "Focus beats perfection.",
    "You are allowed to rest before acting.",
    "Momentum is built incrementally.",
    "Self-trust grows through action.",
    "Your journey is valid.",
    "Small progress is real progress.",
    "You’re allowed to celebrate growth.",
    "Effort fuels confidence.",
    "Your well-being shapes your success.",
    "Discipline protects freedom.",
    "Your energy is valuable.",
    "You’re allowed to step back.",
    "Consistency produces results.",
    "Rest is productive work.",
    "Focus on the next step.",
    "You are allowed to start over.",
    "Patience strengthens perseverance.",
    "Small wins create big impact.",
    "You’re allowed to feel proud of progress.",
    "Self-respect fuels motivation.",
    "Your limits are part of growth.",
    "Momentum comes from consistency.",
    "You’re allowed to take breaks for clarity.",
    "Growth requires practice.",
    "You don’t need permission to prioritize yourself.",
    "Daily effort beats occasional bursts.",
    "Your mind and body deserve care.",
    "You’re allowed to move at your own pace.",
    "Small steps build confidence.",
    "Consistency builds reliability.",
    "You are allowed to reflect on your progress.",
    "Self-compassion fuels resilience.",
    "Focus on your process, not outcome.",
    "You’re allowed to adjust your goals.",
    "Growth is incremental.",
    "Your energy deserves protection.",
    "Momentum is created by action.",
    "Small habits lead to big change.",
    "You’re allowed to rest without guilt.",
    "Consistency is quiet power.",
    "Your progress matters.",
    "Daily practice creates results.",
    "You’re allowed to set boundaries.",
    "Self-care is strength.",
    "Focus is more important than motivation.",
    "Growth comes from persistence.",
    "You’re allowed to celebrate milestones.",
    "Your journey is your own.",
    "Small steps are valid.",
    "Consistency builds trust in yourself.",
    "You’re allowed to take time for reflection.",
    "Rest is part of action.",
    "Your effort is meaningful.",
    "Daily habits compound over time.",
    "You’re allowed to prioritize peace.",
    "Momentum comes from small wins.",
    "Focus protects your energy.",
    "Your well-being creates capacity.",
    "Small progress adds up.",
    "You’re allowed to reset when needed.",
    "Consistency creates results.",
    "Your pace shapes sustainability.",
    "Daily effort matters.",
    "You’re allowed to protect your focus.",
    "Self-care enables growth.",
    "Momentum grows with each step.",
    "Small wins maintain motivation.",
    "You’re allowed to rest strategically.",
    "Consistency produces habits.",
    "Your energy shapes your progress.",
    "Daily steps build momentum.",
    "You’re allowed to move at your own speed.",
    "Small improvements are progress.",
    "Consistency is cumulative.",
    "Your well-being fuels action.",
    "You’re allowed to prioritize yourself daily.",
    "Momentum grows from repeated effort.",
    "Daily practice builds skills.",
    "Small steps sustain progress.",
    "Consistency strengthens resilience.",
    "You’re allowed to pause and reflect.",
    "Your energy drives your focus.",
    "Daily action compounds.",
    "Small wins create confidence.",
    "Consistency develops self-trust.",
    "You’re allowed to protect your time.",
    "Your well-being supports growth.",
    "Daily effort builds results.",
    "Small actions produce change.",
    "Consistency is empowering.",
    "You’re allowed to step back for clarity.",
    "Momentum comes from persistence.",
    "Daily progress is progress.",
    "Small improvements matter.",
    "Consistency strengthens habits.",
    "You’re allowed to honor your pace.",
    "Your energy is important.",
    "Daily steps create momentum.",
    "Small wins fuel confidence.",
    "Consistency compounds over time.",
    "You’re allowed to reflect and adjust.",
    "Your focus drives growth.",
    "Daily practice leads to mastery.",
    "Small actions sustain momentum.",
    "Consistency produces reliable results.",
    "You’re allowed to rest when needed.",
    "Your energy powers action.",
    "Daily effort creates change.",
    "Small progress leads to big outcomes.",
    "Consistency builds self-confidence.",
    "You’re allowed to slow down without guilt.",
    "Your well-being is priority.",
    "Daily steps strengthen habits.",
    "Small wins create progress.",
    "Consistency sustains motivation.",
    "You’re allowed to reset and start over.",
    "Momentum grows through repeated action.",
    "Daily effort accumulates.",
    "Small actions make a difference.",
    "Consistency shapes your journey.",
    "You’re allowed to focus on yourself.",
    "Your energy fuels growth.",
    "Daily progress compounds.",
    "Small wins keep momentum.",
    "Consistency strengthens discipline.",
    "You’re allowed to prioritize rest.",
    "Your well-being creates sustainability.",
    "Daily action builds results.",
    "Small steps sustain progress.",
    "Consistency produces long-term change.",
    "You’re allowed to pace yourself.",
    "Momentum comes from small, repeated actions.",
    "Daily habits create transformation.",
    "Small improvements accumulate over time.",
    "Consistency builds resilience.",
    "You’re allowed to care for your energy.",
    "Your effort compounds.",
    "Daily progress matters.",
    "Small wins support confidence.",
    "Consistency shapes success.",
    "You’re allowed to honor your pace.",
    "Your well-being drives performance.",
    "Daily steps create results.",
    "Small actions lead to change.",
    "Consistency maintains momentum.",
    "You’re allowed to rest strategically.",
    "Your energy supports achievement.",
    "Daily practice creates growth.",
    "Small progress builds confidence.",
    "Consistency drives long-term success.",
    "You’re allowed to take space for reflection.",
    "Momentum grows through persistence.",
    "Daily effort strengthens habits.",
    "Small wins foster motivation.",
    "Consistency reinforces discipline.",
    "You’re allowed to reset when necessary.",
    "Your well-being fuels progress.",
    "Daily action leads to improvement.",
    "Small steps maintain momentum.",
    "Consistency creates lasting change.",
    "You’re allowed to honor your limits.",
    "Your energy is essential for growth.",
    "Daily practice compounds over time.",
    "Small wins encourage progress.",
    "Consistency strengthens perseverance.",
    "You’re allowed to focus on what matters.",
    "Momentum is built one step at a time.",
    "Daily effort produces results.",
    "Small actions sustain growth.",
    "Consistency creates reliable habits.",
    "You’re allowed to take breaks for clarity.",
    "Your well-being nurtures success.",
    "Daily steps lead to progress.",
    "Small wins build confidence.",
    "Consistency fosters long-term achievement.",
    "You’re allowed to honor your own pace.",
    "Your energy drives your goals.",
    "Daily practice strengthens discipline.",
    "Small improvements accumulate.",
    "Consistency produces sustainable change.",
    "You’re allowed to reflect and reset.",
    "Momentum grows with persistent action.",
    "Daily effort shapes outcomes.",
    "Small steps lead to big results.",
    "Consistency reinforces self-trust.",
    "You’re allowed to prioritize peace.",
    "Your well-being supports consistency.",
    "Daily action strengthens habits.",
    "Small wins maintain motivation.",
    "Consistency compounds over time.",
    "You’re allowed to rest and recharge.",
    "Your energy fuels sustainable growth.",
    "Daily practice produces progress.",
    "Small actions create momentum.",
    "Consistency drives long-term success.",
    "You’re allowed to move at your own pace.",
    "Momentum grows through repeated effort.",
    "Daily effort builds resilience.",
    "Small wins sustain progress.",
    "Consistency strengthens perseverance.",
    "You’re allowed to honor your limits.",
    "Your well-being empowers achievement.",
    "Daily steps lead to improvement.",
    "Small progress compounds over time.",
    "Consistency shapes your journey.",
    "You’re allowed to take space for reflection.",
    "Momentum comes from persistent effort.",
    "Daily action creates lasting change.",
    "Small wins fuel motivation.",
    "Consistency reinforces discipline.",
    "You’re allowed to prioritize yourself.",
    "Your energy nurtures progress.",
    "Daily practice strengthens consistency.",
    "Small improvements build confidence.",
    "Consistency produces sustainable results.",
    "You’re allowed to pause and reset."
  ];
  return thoughts[Math.floor(Math.random() * thoughts.length)]

}

// const activitiesContainer = document.querySelector(".activites-suggestions");
// async function loadActivitiesAsync() {
//   if (!activitiesContainer) return;
//   activitiesContainer.innerHTML = "<p>Loading suggestions...</p>";

//   const activites = await fetchActivities();
//   activitiesContainer.innerHTML = "";

//   activites.forEach(activity => {
//     const card = document.createElement("div");
//     card.className = "activites-btn";
//     card.innerHTML = `
//     <div class="activities-info">
//     <h3>${activity.title}</h3>
//     <span>${activity.time}</span>
//     </div>
//     `;
//     activitiesContainer.appendChild(card);
//   })
// }

// async function fetchActivities() {
//   await sleep(800);
//   return [
//     { title: "Guided Breathing", time: "3 min" },
//     { title: "Mindful Walking", time: "5 min" },
//     { title: "Gratitude Journaling", time: "7 min" }
//   ];
// }

// loadActivitiesAsync();
// async function logMindfulSession() {
//   await sleep(300);

//   const sessions = JSON.parse(localStorage.getItem("mindfulSessions")) || [];
//   sessions.push({ date: new Date().toISOString() });
//   localStorage.setItem("mindfulSessions", JSON.stringify(sessions));

// }


//Statistics Logic
function getStat(key, defaultValue) {
  return JSON.parse(localStorage.getItem(key)) ?? defaultValue;
}

function setStat(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

let stats = getStat("stats", {
  mindfulMinutes: 0,
  breathingSessions: 0,
  journalEntries: 0,
  activeTime: [],
  streak: {
    count: 0,
    lastDate: null
  }
});
stats.activeTime ??= [];
stats.streak ??= { count: 0, lastDate: null };
function updateStreak() {
  const today = new Date().toDateString();

  if (stats.streak.lastDate === today) return;
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  if (stats.streak.lastDate === yesterday.toDateString()) {
    stats.streak.count += 1;
  } else {
    stats.streak.count = 1;
  }
  stats.streak.lastDate = today;
}

function logMindfulActivity(minutes = 3) {
  stats.mindfulMinutes += minutes;
  stats.breathingSessions += 1;
  stats.activeTime.push(new Date().getHours());
  updateStreak();
  saveAndRenderStats();
}

function logJournalEntry() {
  stats.journalEntries += 1;
  stats.activeTime.push(new Date().getHours());
  updateStreak();
  saveAndRenderStats();
}

function saveAndRenderStats() {
  setStat("stats", stats);
  renderStats();
}

function renderStats() {
  const mostActiveHour = getMostActiveTime(stats.activeTime);
  document.getElementById("mindfulMinutes").textContent = `${stats.mindfulMinutes} min`;
  document.getElementById("breathingSessions").textContent = stats.breathingSessions;
  document.getElementById("journalEntries").textContent = stats.journalEntries;
  document.getElementById("currentStreak").textContent = `${stats.streak.count} days`;
  document.getElementById("activeTime").textContent = mostActiveHour ?? "-";
}

function getMostActiveTime(hours = []) {
  if (!hours.length) return null;
  const count = {};
  hours.forEach(h => count[h] = (count[h] || 0) + 1);
  const peakHour = Object.keys(count).reduce((a, b) => count[a] > count[b] ? a : b);
  if (peakHour < 12) return "Morning";
  if (peakHour < 18) return "Afternoon";
  return "Evening";
}

renderStats();

const closeJournal = document.querySelector(".close-journal span")
const openJournal = document.querySelector(".open-journal")
const journalEditor = document.querySelector(".journal-editor")
const body = document.querySelector("body")

openJournal.addEventListener("click", () => {
  journalEditor.classList.add("js-editor")
  body.classList.add("js-fixed")
})

closeJournal.addEventListener("click", () => {
  journalEditor.classList.remove("js-editor")
  body.classList.remove("js-fixed")
})

//Journal Section
const journalTitle = document.getElementById("journalTitle");
const journalContent = document.getElementById("journalContent");
const saveJournalBtn = document.getElementById("saveJournal");
const journalList = document.getElementById("journalList");

let editingId = null;

renderJournal();
saveJournalBtn.addEventListener("click", () => {
  if (!journalContent.value.trim()) return;
  const journals = getJournals();

  if (editingId) {
    const entry = journals.find(j => j.id === editingId);
    entry.title = journalTitle.value;
    entry.content = journalContent.value;
    entry.updated = new Date().toISOString();
    editingId = null;
  } else {
    journals.push({
      id: Date.now(),
      title: journalTitle.value || "Untitled Entry",
      content: journalContent.value,
      date: new Date().toISOString()
    })
    logJournalEntry();
  }
  saveJournals(journals);
  clearEditor();
  renderJournal();
  journalEditor.classList.remove("js-editor")
  body.classList.remove("js-fixed")
  updateCarousel();
})

function getJournals() {
  return JSON.parse(localStorage.getItem("journals")) || [];
}

function saveJournals(data) {
  localStorage.setItem("journals", JSON.stringify(data));
}

function renderJournal() {
  const journals = getJournals();
  journalList.innerHTML = "";
  if (!journals.length) {
    journalList.innerHTML = "<p>No entries yet.</p>";
    return;
  }

  journals.reverse().forEach(entry => {
    const card = document.createElement("div");
    card.className = "journal-card";
    card.innerHTML = `
    <h4>${entry.title}</h4>
    <span>${new Date(entry.date).toLocaleDateString()}</span>
    <p>${entry.content.substring(0, 120)}...</p>

<div class="journal-actions">
<button onclick="editJournal(${entry.id})" class="btn primary-btn">Edit</button>
<button onclick="deleteJournal(${entry.id})" class="btn secondary-btn">Delete</button>
</div>
    `;
    journalList.appendChild(card);
  })
}
function editJournal(id) {
  const journals = getJournals();
  const entry = journals.find(j => j.id === id);

  journalTitle.value = entry.title;
  journalContent.value = entry.content;
  editingId = id;
  journalEditor.classList.add("js-editor")
  body.classList.add("js-fixed")
  updateCarousel();
}

function deleteJournal(id) {
  let journals = getJournals();
  journals = journals.filter(j => j.id !== id);
  saveJournals(journals);
  renderJournal();
  updateCarousel();
}

function clearEditor() {
  journalTitle.value = "";
  journalContent.value = "";
}

//Carousel
const track = document.querySelector(".journal-list");
const cards = document.querySelectorAll(".journal-card");
const nextBtn = document.querySelector(".next");
const prevBtn = document.querySelector(".prev");
const yourEntries = document.querySelector("#yourEntries");
if (cards.length != 0) {
  let index = 0;
  function cardsPerView() {
    if (window.innerWidth > 768) return 4;
    if (window.innerWidth <= 768) return 2;
    if (window.innerWidth < 560) return 1;
  }

  function updateCarousel() {
    const cardWidth = cards[0].offsetWidth;
    track.style.transform = `translateX(-${index * cardWidth}px)`;
  }

  nextBtn.addEventListener("click", () => {
    const maxIndex = cards.length - cardsPerView();
    index = Math.min(index + 1, maxIndex);
    updateCarousel();
  })

  prevBtn.addEventListener("click", () => {
    index = Math.max(index - 1, 0);
    updateCarousel();
  })

  window.addEventListener("resize", () => {
    index = 0
    updateCarousel();
  })
} else {
  yourEntries.style.display = "none"
}

if (cards.length <= 4 && window.innerWidth > 768) {
  nextBtn.style.display = "none"
  prevBtn.style.display = "none"
} else if (cards.length <= 2 && window.innerWidth < 768) {
  nextBtn.style.display = "none"
  prevBtn.style.display = "none"
} else if (cards.length <= 1 && window.innerWidth <= 560) {
  nextBtn.style.display = "none"
  prevBtn.style.display = "none"
}


