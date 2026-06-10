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

let db = null;
let fbStorage = null;

if (typeof firebase !== 'undefined') {
  try {
    firebase.initializeApp(firebaseConfig);
    db = firebase.database();
    fbStorage = firebase.storage();
  } catch (error) {
    console.error("Firebase initialization failed:", error);
  }
} else {
  console.warn("Firebase script not loaded. Running in local fallback mode.");
}

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
    assessmentDone: data.assessmentDone || false,
    programme: data.programme || '',
    yearOfStudy: data.yearOfStudy || '',
    livingArrangement: data.livingArrangement || '',
    studentId: data.studentId || '',
    name: data.name || '',
    instagram: data.instagram || '',
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
  if (db) {
    try {
      await db.ref('users/' + user.username).set(d);
    } catch (error) {
      console.warn("Firebase saveUserToFirebase failed:", error);
    }
  }
  // Always update local cache
  let localUsers = [];
  try {
    const saved = localStorage.getItem('ecolyfeLocalUsers');
    if (saved) localUsers = JSON.parse(saved);
  } catch (e) {}
  const idx = localUsers.findIndex(u => u.username === user.username);
  if (idx !== -1) {
    localUsers[idx] = user;
  } else {
    localUsers.push(user);
  }
  localStorage.setItem('ecolyfeLocalUsers', JSON.stringify(localUsers));
}

async function fetchAllUsers() {
  if (db) {
    try {
      const snap = await db.ref('users').once('value');
      const arr = [];
      snap.forEach(child => { arr.push(normalizeUser(child.key, child.val())); });
      localStorage.setItem('ecolyfeLocalUsers', JSON.stringify(arr));
      return arr;
    } catch (error) {
      console.warn("Firebase fetchAllUsers failed. Loading from local cache.", error);
    }
  }
  const cached = localStorage.getItem('ecolyfeLocalUsers');
  return cached ? JSON.parse(cached) : [];
}

async function fetchAllPosts() {
  if (db) {
    try {
      const snap = await db.ref('posts').orderByChild('timestamp').once('value');
      const arr = [];
      snap.forEach(child => {
        const p = child.val();
        p.id = child.key;
        p.likes = p.likes ? Object.keys(p.likes) : [];
        p.comments = p.comments ? Object.values(p.comments) : [];
        arr.push(p);
      });
      localStorage.setItem('ecolyfeLocalPosts', JSON.stringify(arr));
      return arr;
    } catch (error) {
      console.warn("Firebase fetchAllPosts failed. Loading from local cache.", error);
    }
  }
  const cached = localStorage.getItem('ecolyfeLocalPosts');
  return cached ? JSON.parse(cached) : [];
}

function showLoading() {
  const el = document.getElementById('loading-overlay');
  if (el) { el.classList.remove('hidden'); }
}
function hideLoading() {
  const el = document.getElementById('loading-overlay');
  if (el) { el.classList.add('hidden'); }
}

async function saveAssessment(data) {
  if (db) {
    try {
      await db.ref('assessments').push(data);
      return;
    } catch (error) {
      console.warn("Firebase saveAssessment failed:", error);
    }
  }
  // Always update local cache
  let localAssessments = [];
  try {
    const saved = localStorage.getItem('ecolyfeLocalAssessments');
    if (saved) localAssessments = JSON.parse(saved);
  } catch (e) {}
  localAssessments.push(data);
  localStorage.setItem('ecolyfeLocalAssessments', JSON.stringify(localAssessments));
}

async function fetchAssessments() {
  if (db) {
    try {
      const snap = await db.ref('assessments').once('value');
      const arr = [];
      snap.forEach(child => arr.push({ id: child.key, ...child.val() }));
      localStorage.setItem('ecolyfeLocalAssessments', JSON.stringify(arr));
      return arr;
    } catch (error) {
      console.warn("Firebase fetchAssessments failed. Loading from local cache.", error);
    }
  }
  const cached = localStorage.getItem('ecolyfeLocalAssessments');
  return cached ? JSON.parse(cached) : [];
}

async function savePost(post) {
  if (db) {
    try {
      return await db.ref('posts').push(post);
    } catch (error) {
      console.warn("Firebase savePost failed:", error);
    }
  }
  // Offline fallback
  let localPosts = [];
  const cached = localStorage.getItem('ecolyfeLocalPosts');
  if (cached) {
    try { localPosts = JSON.parse(cached); } catch (e) {}
  }
  post.id = 'local_' + Date.now();
  localPosts.push(post);
  localStorage.setItem('ecolyfeLocalPosts', JSON.stringify(localPosts));
  return post;
}

async function likePostInFirebase(postId, username, isLike) {
  if (db) {
    try {
      const ref = db.ref(`posts/${postId}/likes/${username}`);
      if (isLike) {
        await ref.set(true);
      } else {
        await ref.remove();
      }
      return;
    } catch (error) {
      console.warn("Firebase likePost failed:", error);
    }
  }
  // Offline fallback: update local cache
  let localPosts = [];
  const cached = localStorage.getItem('ecolyfeLocalPosts');
  if (cached) {
    try {
      localPosts = JSON.parse(cached);
      const post = localPosts.find(p => p.id === postId);
      if (post) {
        post.likes = post.likes || [];
        const idx = post.likes.indexOf(username);
        if (isLike && idx === -1) {
          post.likes.push(username);
        } else if (!isLike && idx !== -1) {
          post.likes.splice(idx, 1);
        }
        localStorage.setItem('ecolyfeLocalPosts', JSON.stringify(localPosts));
      }
    } catch (e) {}
  }
}

async function deletePostInFirebase(postId) {
  if (db) {
    try {
      await db.ref(`posts/${postId}`).remove();
    } catch (error) {
      console.warn("Firebase deletePost failed:", error);
    }
  }
  // Offline fallback
  let localPosts = [];
  const cached = localStorage.getItem('ecolyfeLocalPosts');
  if (cached) {
    try {
      localPosts = JSON.parse(cached);
      const idx = localPosts.findIndex(p => p.id === postId);
      if (idx !== -1) {
        localPosts.splice(idx, 1);
        localStorage.setItem('ecolyfeLocalPosts', JSON.stringify(localPosts));
      }
    } catch (e) {}
  }
}

async function commentOnPostInFirebase(postId, comment) {
  if (db) {
    try {
      const newCommentRef = db.ref(`posts/${postId}/comments`).push();
      await newCommentRef.set(comment);
      return;
    } catch (error) {
      console.warn("Firebase commentPost failed:", error);
    }
  }
  // Offline fallback
  let localPosts = [];
  const cached = localStorage.getItem('ecolyfeLocalPosts');
  if (cached) {
    try {
      localPosts = JSON.parse(cached);
      const post = localPosts.find(p => p.id === postId);
      if (post) {
        post.comments = post.comments || [];
        post.comments.push(comment);
        localStorage.setItem('ecolyfeLocalPosts', JSON.stringify(localPosts));
      }
    } catch (e) {}
  }
}
