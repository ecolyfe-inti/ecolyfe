/* ─── Firebase Setup ─── */
const firebaseConfig = {
  apiKey: "AIzaSyB6rzWtko7reyLUdw1h6V2_NHMw8IvUEnM",
  authDomain: "ecolyfe-3a51a.firebaseapp.com",
  databaseURL: "https://ecolyfe-3a51a-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "ecolyfe-3a51a",
  storageBucket: "ecolyfe-3a51a.firebasestorage.app",
  messagingSenderId: "832173313260",
  appId: "1:832173313260:web:eb323d1377506aa589a9c9",
  measurementId: "G-FPE2FF51DC"
};
firebase.initializeApp(firebaseConfig);
const db = firebase.database();
const fbStorage = firebase.storage();

/* ─── Firebase Helpers ─── */
function toArray(val) {
  if (!val) return [];
  if (Array.isArray(val)) return val;
  return Object.values(val);
}

function normalizeUser(username, data) {
  return {
    username,
    email: data.email || '',
    password: data.password || '',
    eco_score: data.eco_score || 0,
    onboarding_complete: data.onboarding_complete || 0,
    checkins: toArray(data.checkins),
    quizHistory: toArray(data.quizHistory),
    bonusHistory: toArray(data.bonusHistory),
    achievements: toArray(data.achievements),
    top1Streak: data.top1Streak || 0,
    lastTop1Date: data.lastTop1Date || null,
    loginStreak: data.loginStreak || 0,
    lastLoginDate: data.lastLoginDate || null
  };
}

async function saveUserToFirebase(user) {
  const d = { ...user };
  delete d.username;
  await db.ref('users/' + user.username).set(d);
}

async function fetchAllUsers() {
  const snap = await db.ref('users').once('value');
  const arr = [];
  snap.forEach(child => { arr.push(normalizeUser(child.key, child.val())); });
  return arr;
}

async function fetchAllPosts() {
  const snap = await db.ref('posts').orderByChild('timestamp').once('value');
  const arr = [];
  snap.forEach(child => {
    const p = child.val();
    p.id = child.key;
    p.likes = p.likes ? Object.keys(p.likes) : [];
    p.comments = p.comments ? Object.values(p.comments) : [];
    arr.push(p);
  });
  return arr;
}

function showLoading() {
  const el = document.getElementById('loading-overlay');
  if (el) { el.classList.remove('hidden'); }
}
function hideLoading() {
  const el = document.getElementById('loading-overlay');
  if (el) { el.classList.add('hidden'); }
}
