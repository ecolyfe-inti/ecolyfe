const state = {
  user: null,
  prompts: [
    { id: 1, title: 'Reusable shopping bag', description: 'Use a reusable bag for shopping instead of single-use plastic.', category: 'Waste', basePoints: 8, impact: 1.2 },
    { id: 2, title: 'Plant-based meal', description: 'Choose a plant-based meal for dinner.', category: 'Food', basePoints: 12, impact: 1.5 },
    { id: 3, title: 'Use public transport', description: 'Bike, walk, or use public transit instead of driving.', category: 'Transport', basePoints: 15, impact: 1.8 },
    { id: 4, title: 'Use reusable water bottle', description: 'Bring a reusable water bottle and avoid bottled water.', category: 'Waste', basePoints: 6, impact: 1.1 },
    { id: 5, title: 'Energy saved', description: 'Turn off lights and unplug devices when not in use.', category: 'Energy', basePoints: 10, impact: 1.3 },
    { id: 6, title: 'Compost', description: 'Compost food scraps instead of throwing them away.', category: 'Waste', basePoints: 11, impact: 1.4 },
    { id: 7, title: 'Reusable mug', description: 'Use a reusable coffee cup for your drink.', category: 'Waste', basePoints: 5, impact: 1.0 },
    { id: 8, title: 'Eco-friendly product', description: 'Choose a product with sustainable packaging.', category: 'Shopping', basePoints: 9, impact: 1.2 },
    { id: 9, title: 'Share knowledge', description: 'Tell a friend about an eco habit you practiced.', category: 'Community', basePoints: 7, impact: 1.1 },
    { id: 10, title: 'Reduce shower time', description: 'Take a shorter shower to save water.', category: 'Water', basePoints: 10, impact: 1.4 }
  ],
  bonusActions: [
    { id: 1, title: 'Eco Challenge', description: 'Complete a small challenge such as planting a herb or reducing food waste.', points: 18 },
    { id: 2, title: 'Community Share', description: 'Share one eco tip with a friend or post a green idea.', points: 12 },
    { id: 3, title: 'Energy Check', description: 'Track your energy use by switching off unused devices.', points: 14 }
  ],
  quizzes: [
    { id: 1, question: 'Which item is best to reduce plastic waste?', options: ['Plastic water bottle', 'Reusable bottle', 'Single-use straw'], answer: 1, points: 15 },
    { id: 2, question: 'What is the most eco-friendly way to get around town?', options: ['Driving alone', 'Biking or walking', 'Taking a taxi'], answer: 1, points: 18 },
    { id: 3, question: 'Which action saves the most energy at home?', options: ['Turning off lights when not needed', 'Leaving devices plugged in', 'Using incandescent bulbs'], answer: 0, points: 12 }
  ],
  users: [],
  posts: [],
  assessments: []
};

const FUN_FACTS = [
  "Recycling one aluminum can saves enough energy to run a TV for three hours!",
  "An average faucet flows at a rate of 2 gallons per minute. You can save up to 4 gallons of water every morning by turning off the tap while brushing your teeth.",
  "Plastic bags and wrappers thrown away globally can wrap around the Earth 7 times every single hour.",
  "Eating a plant-based meal just once a week saves as much water as not showering for 6 months!",
  "LED light bulbs use up to 80% less energy and last 25 times longer than traditional incandescent bulbs.",
  "A single mature tree can absorb more than 48 pounds of carbon dioxide from the atmosphere every year.",
  "Energy-saving mode on your appliances can reduce electricity consumption by up to 15% without sacrificing performance.",
  "Using a reusable water bottle saves an average of 156 plastic bottles per person every year.",
  "Composting organic waste instead of throwing it in the landfill prevents the release of methane, a greenhouse gas 25 times more potent than carbon dioxide.",
  "Walking or biking instead of driving for short trips of less than 2 miles can prevent tons of CO2 emissions annually.",
  "A leaky toilet can waste up to 200 gallons of water per day without making any noise.",
  "Recycling paper saves 60% of the energy needed to make new paper from trees, and prevents air pollution by 95%!",
  "Approximately one-third of all food produced globally for human consumption is lost or wasted.",
  "Shorter showers save energy! Heating water is the second-largest energy expense in most homes.",
  "Bamboo is one of the fastest-growing plants on Earth and can be harvested sustainably without killing the plant, making it an excellent wood alternative.",
  "The energy saved by recycling one glass bottle can power a computer for 25 minutes!"
];

function getDailyFunFact() {
  const today = new Date();
  const dayNum = Math.floor(today.getTime() / (1000 * 60 * 60 * 24)); // Days since epoch
  const index = dayNum % FUN_FACTS.length;
  return FUN_FACTS[index];
}

const loginPanel = document.getElementById('login-panel');
const surveyPanel = document.getElementById('survey-panel');
const dashboardPanel = document.getElementById('dashboard-panel');
const leaderboardPanel = document.getElementById('leaderboard-panel');
const feedPanel = document.getElementById('feed-panel');
const analyticsPanel = document.getElementById('analytics-panel');
const statusBar = document.getElementById('status-bar');

function setStatus(message) {
  statusBar.textContent = message;
}

function showPanel(panel) {
  [loginPanel, surveyPanel, dashboardPanel, leaderboardPanel, feedPanel, analyticsPanel].forEach(node => {
    node.hidden = node !== panel;
  });
}

function getPromptPoints(prompt) {
  const streakMultiplier = 1 + Math.min(0.3, (prompt.basePoints - 5) / 50);
  return Math.max(1, Math.round(prompt.basePoints * prompt.impact * streakMultiplier));
}

function getTodayQuiz() {
  const today = new Date().toISOString().slice(0, 10);
  const index = Number(today.replace(/-/g, '')) % state.quizzes.length;
  return state.quizzes[index];
}

function hasAnsweredQuizToday() {
  const today = new Date().toISOString().slice(0, 10);
  return state.user.quizHistory.some(record => record.date === today);
}

function saveUsers() {
  if (state.user) {
    saveUserToFirebase(state.user);
  }
}

const ACHIEVEMENTS = [
  { id: 'first_steps', title: 'First Steps', description: 'Complete your first daily check-in.', icon: '🌱', condition: (user) => user.checkins.length >= 1 },
  { id: 'quiz_master', title: 'Quiz Master', description: 'Answer 5 quizzes correctly.', icon: '🧠', condition: (user) => user.quizHistory.filter(q => q.correct).length >= 5 },
  { id: 'bonus_hunter', title: 'Bonus Hunter', description: 'Complete 3 bonus actions.', icon: '🎁', condition: (user) => user.bonusHistory.length >= 3 },
  { id: 'top_dog', title: 'Top Dog', description: 'Reach #1 on the leaderboard.', icon: '👑', condition: (user) => user.top1Streak >= 1 },
  { id: 'login_streak_3', title: 'Consistent Eco', description: 'Log in for 3 consecutive days.', icon: '📅', condition: (user) => user.loginStreak >= 3 },
  { id: 'login_streak_7', title: 'Eco Week', description: 'Log in for 7 consecutive days.', icon: '📆', condition: (user) => user.loginStreak >= 7 },
  { id: 'login_streak_30', title: 'Eco Month', description: 'Log in for 30 consecutive days.', icon: '🗓️', condition: (user) => user.loginStreak >= 30 }
];

// Continuous leaderboard streak milestones up to 500
for (let i = 10; i <= 500; i += 10) {
  ACHIEVEMENTS.push({
    id: `streak_${i}`,
    title: `Eco Legend ${i}`,
    description: `Maintain #1 on the leaderboard for ${i} consecutive days.`,
    icon: '🔥',
    condition: (user) => user.top1Streak >= i
  });
}

function checkAchievements() {
  const today = new Date().toISOString().slice(0, 10);
  const sortedUsers = state.users.slice().sort((a, b) => b.eco_score - a.eco_score);
  const isTop1 = sortedUsers[0] && sortedUsers[0].username === state.user.username;

  if (isTop1) {
    if (state.user.lastTop1Date !== today) {
      if (state.user.lastTop1Date) {
        const lastDate = new Date(state.user.lastTop1Date);
        const currentDate = new Date(today);
        const diffTime = Math.abs(currentDate - lastDate);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        if (diffDays === 1) {
          state.user.top1Streak += 1;
        } else if (diffDays > 1) {
          state.user.top1Streak = 1;
        }
      } else {
        state.user.top1Streak = 1;
      }
      state.user.lastTop1Date = today;
    }
  } else {
    // If they view dashboard and aren't top 1, their streak ends
    if (state.user.lastTop1Date !== today) {
      state.user.top1Streak = 0;
      state.user.lastTop1Date = null;
    }
  }

  let newlyUnlocked = [];
  ACHIEVEMENTS.forEach(ach => {
    if (!state.user.achievements.includes(ach.id) && ach.condition(state.user)) {
      state.user.achievements.push(ach.id);
      newlyUnlocked.push(ach);
    }
  });

  if (newlyUnlocked.length > 0) {
    saveUsers();
    setTimeout(() => {
      alert('🏆 Achievement Unlocked!\n\n' + newlyUnlocked.map(a => `${a.icon} ${a.title}`).join('\n'));
    }, 100);
  }
}

function renderLogin(isRegister = false) {
  setStatus(isRegister ? 'Create your EcoLyfe account.' : 'Welcome back to EcoLyfe.');
  loginPanel.innerHTML = `
    <h2>${isRegister ? 'Create Account' : 'Welcome to EcoLyfe'}</h2>
    <p>${isRegister ? 'Join us to start earning Eco Score points.' : 'Log in to continue your eco journey.'}</p>
    <div class="form-group">
      <label for="username">Username</label>
      <input id="username" placeholder="e.g. greenjay" />
    </div>
    <div class="form-group">
      <label for="password">Password</label>
      <input id="password" type="password" placeholder="Your password" />
    </div>
    ${isRegister ? `
    <div class="form-group">
      <label for="email">Email (optional)</label>
      <input id="email" placeholder="you@example.com" />
    </div>
    ` : ''}
    <button id="start-button">${isRegister ? 'Sign Up' : 'Log In'}</button>
    <p style="margin-top: 14px; color: var(--muted);">
      ${isRegister 
        ? 'Already have an account? <a href="#" id="toggle-mode">Log in here</a>' 
        : 'New here? <a href="#" id="toggle-mode">Create an account</a>'}
    </p>
  `;
  showPanel(loginPanel);
  
  document.getElementById('start-button').addEventListener('click', () => {
    if (isRegister) {
      handleRegister();
    } else {
      handleLoginAction();
    }
  });

  document.getElementById('toggle-mode').addEventListener('click', (e) => {
    e.preventDefault();
    renderLogin(!isRegister);
  });
}

function updateLoginStreak(user) {
  const today = new Date().toISOString().slice(0, 10);
  if (user.lastLoginDate !== today) {
    if (user.lastLoginDate) {
      const lastDate = new Date(user.lastLoginDate);
      const currentDate = new Date(today);
      const diffTime = Math.abs(currentDate - lastDate);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      
      if (diffDays === 1) {
        user.loginStreak += 1;
      } else if (diffDays > 1) {
        user.loginStreak = 1;
      }
    } else {
      user.loginStreak = 1;
    }
    user.lastLoginDate = today;
  }
}

async function handleLoginAction() {
  const username = document.getElementById('username').value.trim().toLowerCase();
  const password = document.getElementById('password').value;
  if (!username) return alert('Please enter a username.');
  if (!password) return alert('Please enter a password.');

  showLoading();
  let user = state.users.find(entry => entry.username === username);
  if (!user) {
    hideLoading();
    return alert('Account not found. Please create an account.');
  }

  if (user.password && user.password !== password) {
    hideLoading();
    return alert('Incorrect password.');
  }
  if (!user.password) {
    user.password = password;
  }
  
  updateLoginStreak(user);
  await saveUserToFirebase(user);

  state.user = user;
  localStorage.setItem('ecolyfeUser', user.username);
  if (user.assessmentDone) {
    renderDashboard();
  } else {
    renderDemographics();
  }
  hideLoading();
}

async function handleRegister() {
  const username = document.getElementById('username').value.trim().toLowerCase();
  const password = document.getElementById('password').value;
  const email = document.getElementById('email').value.trim();
  
  if (!username) return alert('Please enter a username.');
  if (!password) return alert('Please enter a password.');

  showLoading();
  let user = state.users.find(entry => entry.username === username);
  if (user) {
    hideLoading();
    return alert('Username already exists. Please choose another or log in.');
  }

  user = { 
    username, 
    password, 
    email, 
    eco_score: 0, 
    onboarding_complete: 0, 
    checkins: [], 
    quizHistory: [], 
    bonusHistory: [], 
    achievements: [], 
    top1Streak: 0, 
    lastTop1Date: null, 
    loginStreak: 1, 
    lastLoginDate: new Date().toISOString().slice(0, 10) 
  };
  state.users.push(user);
  await saveUserToFirebase(user);

  state.user = user;
  localStorage.setItem('ecolyfeUser', user.username);
  renderDemographics();
  hideLoading();
}

function loadUserData(username) {
  const user = state.users.find(entry => entry.username === username);
  if (!user) {
    localStorage.removeItem('ecolyfeUser');
    renderLogin();
    return;
  }
  state.user = user;
  if (user.assessmentDone) {
    renderDashboard();
  } else {
    renderDemographics();
  }
}

// ═══ Assessment Engine ═══

let _assessAnswers = {};
let _assessDemographics = {};
let _assessCatIdx = 0;

const ASSESSMENT = {
  categories: [
    {
      id: 'energy', name: 'Energy Conservation', icon: '⚡', color: '#f59e0b', weight: 0.20, maxRaw: 26,
      questions: [
        { id: 'e0', text: 'How often do you turn off lights when leaving a room?', weight: 1.5,
          options: ['Never', 'Rarely', 'Sometimes', 'Often', 'Always'] },
        { id: 'e1', text: 'What do you usually do with plugged-in devices and chargers when leaving your room?', weight: 1.5,
          options: ['Leave everything switched on', 'Leave chargers in, turn off screens', 'Unplug some chargers and devices', 'Unplug most things', 'Unplug and switch off everything'] },
        { id: 'e2', text: 'How often do you use air conditioning when the room is already cool or unoccupied?', weight: 1.5,
          options: ['I leave it on all the time', 'Often', 'Sometimes', 'Rarely', 'Never — I switch it off when not needed'] },
        { id: 'e3', text: 'Rate your overall effort to reduce electricity use in your daily routine. (1 = No effort, 5 = Very consistent)', weight: 1.0,
          options: ['1 — No effort at all', '2', '3 — Sometimes try', '4', '5 — Very consistent'] },
        { id: 'e4', text: 'Which best describes your device and screen usage before going to sleep?', weight: 1.0,
          options: ['Keep everything on overnight', 'Turn off most things eventually', 'Power down devices but leave lights on', 'Switch off everything before sleeping', 'Unplug and power off everything completely'] }
      ]
    },
    {
      id: 'transport', name: 'Transportation Habits', icon: '🚌', color: '#3b82f6', weight: 0.25, maxRaw: 26,
      questions: [
        { id: 't0', text: 'How do you most often travel to campus or your place of study?', weight: 1.5,
          options: ['Private car (alone)', 'Motorcycle (alone)', 'Carpool or rideshare', 'Public bus or train', 'Walk or cycle'] },
        { id: 't1', text: 'On average, how many days per week do you use a private vehicle (car or motorcycle)?', weight: 1.5,
          options: ['Every day (5–7 days)', 'Most days (3–4 days)', 'A few days (1–2 days)', 'Rarely', 'Never'] },
        { id: 't2', text: 'In the past month, how often have you carpooled or shared a ride with others?', weight: 1.5,
          options: ['Never', 'Once', 'A few times', 'Regularly', 'Almost all my trips'] },
        { id: 't3', text: 'What is the longest distance you are comfortable walking or cycling rather than taking a vehicle?', weight: 1.0,
          options: ["I don't walk or cycle anywhere", 'Less than 5 minutes away', '5–10 minutes away', '10–20 minutes away', 'More than 20 minutes away'] },
        { id: 't4', text: 'How often do you plan and combine errands to reduce the number of journeys you make?', weight: 1.0,
          options: ['Never', 'Rarely', 'Sometimes', 'Often', 'Always'] }
      ]
    },
    {
      id: 'food', name: 'Sustainable Food Choices', icon: '🥗', color: '#10b981', weight: 0.20, maxRaw: 23,
      questions: [
        { id: 'f0', text: 'How often do you choose plant-based meals (vegetarian or vegan options)?', weight: 1.5,
          options: ['Never', 'Rarely', 'Sometimes', 'Often', 'Always'] },
        { id: 'f1', text: 'How much food do you typically leave uneaten or throw away per meal?', weight: 1.5,
          options: ['More than half the meal', 'About half', 'A small portion', 'Very little', 'None — I finish everything'] },
        { id: 'f2', text: 'Do you bring a reusable water bottle or container when going to campus or out?', weight: 1.0,
          options: ['Never', 'Rarely', 'Sometimes', 'Often', 'Always'] },
        { id: 'f3', text: 'How often do you consider the environmental impact when choosing your food (e.g. less packaging, fewer processed foods)?', weight: 1.0,
          options: ['Never', 'Rarely', 'Sometimes', 'Often', 'Always'] },
        { id: 'f4', text: 'How often do you eat at fast food chains or order single-use packaged takeaways?', weight: 0.75,
          options: ['Daily', '4–5 times a week', '2–3 times a week', 'About once a week', 'Rarely or never'] }
      ]
    },
    {
      id: 'waste', name: 'Waste Management', icon: '♻️', color: '#8b5cf6', weight: 0.20, maxRaw: 23,
      questions: [
        { id: 'w0', text: 'How often do you separate recyclable materials (plastic, paper, cans) from your general waste?', weight: 1.5,
          options: ['Never', 'Rarely', 'Sometimes', 'Often', 'Always'] },
        { id: 'w1', text: 'When you go grocery or retail shopping, how often do you bring your own reusable bag?', weight: 1.0,
          options: ['Never', 'Rarely', 'Sometimes', 'Often', 'Always'] },
        { id: 'w2', text: 'How do you typically dispose of old electronics, clothing, or items you no longer need?', weight: 1.5,
          options: ['Throw them in the general bin', 'Leave them unused at home', 'Donate or sell them occasionally', 'Regularly donate, sell, or recycle', 'Always find a responsible disposal method'] },
        { id: 'w3', text: 'How often do you buy second-hand, refurbished, or pre-loved items instead of buying new?', weight: 1.0,
          options: ['Never', 'Rarely', 'Sometimes', 'Often', 'Always'] },
        { id: 'w4', text: 'Do you use reusable items such as cups, straws, or cutlery when eating or drinking on the go?', weight: 0.75,
          options: ['Never', 'Rarely', 'Sometimes', 'Often', 'Always'] }
      ]
    },
    {
      id: 'water', name: 'Water Conservation', icon: '💧', color: '#06b6d4', weight: 0.15, maxRaw: 24,
      questions: [
        { id: 'wa0', text: 'How long is your typical shower?', weight: 1.5,
          options: ['More than 15 minutes', '10–15 minutes', '7–10 minutes', '5–7 minutes', 'Less than 5 minutes'] },
        { id: 'wa1', text: 'Do you turn off the tap while brushing your teeth, lathering hands, or shampooing?', weight: 1.5,
          options: ['Never', 'Rarely', 'Sometimes', 'Often', 'Always'] },
        { id: 'wa2', text: 'How often do you only run the washing machine when it is fully loaded?', weight: 1.0,
          options: ['Never — I run it regardless of load', 'Rarely', 'Sometimes', 'Often', 'Always'] },
        { id: 'wa3', text: 'When you notice a dripping or leaking tap, what do you do?', weight: 1.0,
          options: ['Ignore it', 'Mention it but take no action', 'Try to report it when I remember', 'Report it promptly', 'Fix or report it immediately'] },
        { id: 'wa4', text: 'Rate how mindful you are of your daily water usage. (1 = Not mindful at all, 5 = Very mindful)', weight: 1.0,
          options: ['1 — Not mindful at all', '2', '3 — Somewhat mindful', '4', '5 — Very mindful'] }
      ]
    }
  ]
};

const LEVEL_CONFIG = [
  { level: 'Eco Beginner',  min: 0,  max: 20,  color: '#ef4444', bg: '#fef2f2', emoji: '🌿' },
  { level: 'Eco Explorer',  min: 21, max: 40,  color: '#f97316', bg: '#fff7ed', emoji: '🌱' },
  { level: 'Eco Aware',     min: 41, max: 60,  color: '#eab308', bg: '#fefce8', emoji: '🍃' },
  { level: 'Eco Advocate',  min: 61, max: 80,  color: '#22c55e', bg: '#f0fdf4', emoji: '🌳' },
  { level: 'Eco Champion',  min: 81, max: 100, color: '#16a34a', bg: '#dcfce7', emoji: '🏆' }
];

function getEcoLevel(score) {
  return LEVEL_CONFIG.find(l => score >= l.min && score <= l.max) || LEVEL_CONFIG[0];
}

function getEcoLevelDesc(score) {
  if (score <= 20) return 'You are at the start of your eco journey. Small daily changes can make a big difference!';
  if (score <= 40) return 'You have begun exploring sustainable habits. Keep building on your progress!';
  if (score <= 60) return 'You are aware of sustainability and practising it in many areas. Great start!';
  if (score <= 80) return 'You are an active advocate for sustainable living. Keep inspiring others!';
  return 'Outstanding! You consistently champion sustainability across all areas of daily life. 🌟';
}

function calculateAssessmentScores() {
  const catScores = {};
  let totalWeighted = 0;
  ASSESSMENT.categories.forEach(cat => {
    let raw = 0;
    cat.questions.forEach(q => {
      const val = _assessAnswers[q.id];
      if (val !== undefined) raw += val * q.weight;
    });
    catScores[cat.id] = Math.min(100, Math.round((raw / cat.maxRaw) * 100));
    totalWeighted += catScores[cat.id] * cat.weight;
  });
  catScores.overall = Math.min(100, Math.round(totalWeighted));
  return catScores;
}

function renderDemographics() {
  setStatus("Welcome to EcoLyfe! Let's start with your profile.");
  const isReturning = state.user.checkins && state.user.checkins.length > 0;
  surveyPanel.innerHTML = `
    <div class="assessment-intro">
      <div class="assessment-intro-icon">🌍</div>
      <h2>${isReturning ? 'New: Eco-Living Assessment' : 'Welcome to EcoLyfe!'}</h2>
      <p>${isReturning
        ? "We've upgraded our sustainability assessment. Complete this 25-question evaluation to unlock your detailed Eco Profile and contribute to INTI's campus sustainability insights."
        : 'Before you start earning Eco Score points, complete a short 25-question sustainability assessment. It takes about 2–3 minutes and helps us understand sustainability habits across INTI.'}
      </p>
      <div class="assessment-info-row">
        <span>📋 25 Questions</span>
        <span>⏱️ ~2–3 minutes</span>
        <span>🔒 Anonymous data</span>
      </div>
    </div>
    <h3 style="margin-bottom:16px">Your Profile</h3>
    <p style="color:var(--muted);margin-bottom:20px;font-size:0.9rem">Used for anonymous sustainability trend analysis only.</p>
    <div class="form-group">
      <label for="demo-role">I am a...</label>
      <select id="demo-role">
        <option value="student">Student</option>
        <option value="teacher">Teacher / Staff</option>
        <option value="other">Other</option>
      </select>
    </div>
    <div class="form-group" id="demo-programme-group">
      <label for="demo-programme" id="demo-programme-label">Programme / Course</label>
      <input type="text" id="demo-programme" placeholder="e.g. Bachelor of Computer Science" />
    </div>
    <div class="form-group" id="demo-studentid-group">
      <label for="demo-studentid">Student ID</label>
      <input type="text" id="demo-studentid" placeholder="e.g. P24011234" />
    </div>
    <div class="form-group">
      <label for="demo-name">Full Name</label>
      <input type="text" id="demo-name" placeholder="e.g. Alex Green" />
    </div>
    <div class="form-group">
      <label for="demo-instagram">Instagram Username (Optional)</label>
      <input type="text" id="demo-instagram" placeholder="e.g. @alex_green" />
    </div>
    <div class="form-group">
      <label for="demo-living">Living Arrangement</label>
      <select id="demo-living">
        <option value="">Select your living arrangement</option>
        <option value="Hostel">Hostel</option>
        <option value="Rental">Rental House / Apartment</option>
        <option value="Family Home">Family Home</option>
      </select>
    </div>
    <button id="begin-assessment-btn" style="width:100%;margin-top:8px">Begin Assessment →</button>
  `;
  showPanel(surveyPanel);
  _assessAnswers = {};
  _assessCatIdx = 0;

  // Toggle dynamic fields based on Role selection
  const roleSelect = document.getElementById('demo-role');
  const programmeGroup = document.getElementById('demo-programme-group');
  const programmeLabel = document.getElementById('demo-programme-label');
  const programmeInput = document.getElementById('demo-programme');
  const studentIdGroup = document.getElementById('demo-studentid-group');

  roleSelect.addEventListener('change', () => {
    const role = roleSelect.value;
    if (role === 'student') {
      programmeGroup.style.display = 'block';
      programmeLabel.textContent = 'Programme / Course';
      programmeInput.placeholder = 'e.g. Bachelor of Computer Science';
      studentIdGroup.style.display = 'block';
    } else if (role === 'teacher') {
      programmeGroup.style.display = 'block';
      programmeLabel.textContent = 'School / Faculty';
      programmeInput.placeholder = 'e.g. School of Engineering, Business, or Computer Science';
      studentIdGroup.style.display = 'none';
    } else { // 'other'
      programmeGroup.style.display = 'none';
      studentIdGroup.style.display = 'none';
    }
  });

  document.getElementById('begin-assessment-btn').addEventListener('click', () => {
    const role = document.getElementById('demo-role').value;
    const programme = document.getElementById('demo-programme').value.trim();
    const studentId = document.getElementById('demo-studentid').value.trim();
    const name = document.getElementById('demo-name').value.trim();
    const instagram = document.getElementById('demo-instagram').value.trim();
    const livingArrangement = document.getElementById('demo-living').value;

    if (role === 'student') {
      if (!programme) return alert('Please enter your programme or course.');
      if (!studentId) return alert('Please enter your Student ID.');
      const studentIdRegex = /^[A-Za-z0-9]{7,15}$/;
      if (!studentIdRegex.test(studentId)) {
        return alert('Please enter a valid Student ID (e.g. P24016143).');
      }
    } else if (role === 'teacher') {
      if (!programme) return alert('Please enter your school or faculty.');
    }

    if (!name) return alert('Please enter your Full Name.');
    if (!livingArrangement) return alert('Please select your living arrangement.');

    _assessDemographics = { 
      role,
      programme: role !== 'other' ? programme : "", 
      studentId: role === 'student' ? studentId.toUpperCase() : "", 
      name, 
      instagram: instagram || "", 
      yearOfStudy: "", 
      livingArrangement 
    };
    renderAssessment(0);
  });
}

function renderAssessment(catIdx) {
  _assessCatIdx = catIdx;
  const cat = ASSESSMENT.categories[catIdx];
  const totalCats = ASSESSMENT.categories.length;
  const questionOffset = ASSESSMENT.categories.slice(0, catIdx).reduce((s, c) => s + c.questions.length, 0);
  const totalQs = 25;
  const progressPct = Math.round((questionOffset / totalQs) * 100);
  setStatus(`Category ${catIdx + 1} of ${totalCats}: ${cat.name}`);
  surveyPanel.innerHTML = `
    <div class="assess-progress-wrap">
      <div class="assess-cat-steps">
        ${ASSESSMENT.categories.map((c, i) => `
          <div class="assess-cat-step ${i < catIdx ? 'done' : i === catIdx ? 'active' : ''}">
            <div class="assess-cat-step-dot">${c.icon}</div>
            <div class="assess-cat-step-name">${c.name.split(' ')[0]}</div>
          </div>
        `).join('')}
      </div>
      <div class="assess-progress-track">
        <div class="assess-progress-fill" style="width:${progressPct}%"></div>
      </div>
      <div class="assess-progress-label">Questions ${questionOffset + 1}–${questionOffset + cat.questions.length} of ${totalQs}</div>
    </div>
    <div class="assess-cat-header" style="border-left:4px solid ${cat.color}">
      <span class="assess-cat-icon">${cat.icon}</span>
      <div>
        <h2 style="margin:0;color:${cat.color}">${cat.name}</h2>
        <p style="margin:0;color:var(--muted);font-size:0.9rem">Category ${catIdx + 1} of ${totalCats}</p>
      </div>
    </div>
    <div class="assess-questions">
      ${cat.questions.map((q, qIdx) => {
        const globalIdx = questionOffset + qIdx + 1;
        const selected = _assessAnswers[q.id];
        return `
          <div class="assess-question-card">
            <div class="assess-q-badge">Q${globalIdx}</div>
            <p class="assess-q-text">${q.text}</p>
            <div class="assess-options">
              ${q.options.map((opt, oIdx) => `
                <button class="assess-option${selected === oIdx ? ' selected' : ''}" data-qid="${q.id}" data-score="${oIdx}"
                  ${selected === oIdx ? `style="border-color:${cat.color};background:${cat.color}18"` : ''}>
                  <span class="assess-option-dot"></span>
                  <span>${opt}</span>
                </button>
              `).join('')}
            </div>
          </div>
        `;
      }).join('')}
    </div>
    <div class="assess-nav">
      ${catIdx > 0 ? `<button class="assess-back-btn" id="assess-back">← Back</button>` : '<div></div>'}
      <button id="assess-next" ${cat.questions.some(q => _assessAnswers[q.id] === undefined) ? 'disabled' : ''}>
        ${catIdx === totalCats - 1 ? '🎉 See My Results' : `Next: ${ASSESSMENT.categories[catIdx + 1].name} →`}
      </button>
    </div>
  `;
  showPanel(surveyPanel);
  surveyPanel.querySelectorAll('.assess-option').forEach(btn => {
    btn.addEventListener('click', () => {
      const qid = btn.dataset.qid;
      const score = Number(btn.dataset.score);
      _assessAnswers[qid] = score;
      surveyPanel.querySelectorAll(`.assess-option[data-qid="${qid}"]`).forEach(b => {
        b.classList.remove('selected');
        b.style.borderColor = '';
        b.style.background = '';
      });
      btn.classList.add('selected');
      btn.style.borderColor = cat.color;
      btn.style.background = cat.color + '18';
      const nextBtn = document.getElementById('assess-next');
      if (nextBtn) nextBtn.disabled = cat.questions.some(q => _assessAnswers[q.id] === undefined);
    });
  });
  document.getElementById('assess-next').addEventListener('click', () => {
    if (catIdx < totalCats - 1) {
      renderAssessment(catIdx + 1);
    } else {
      renderResults(calculateAssessmentScores());
    }
  });
  if (catIdx > 0) {
    document.getElementById('assess-back').addEventListener('click', () => renderAssessment(catIdx - 1));
  }
}

function renderResults(scores) {
  setStatus('Your sustainability assessment is complete!');
  const lvl = getEcoLevel(scores.overall);
  const cats = ASSESSMENT.categories;
  const sorted = cats.slice().sort((a, b) => scores[b.id] - scores[a.id]);
  const strongest = sorted[0];
  const weakest = sorted[sorted.length - 1];
  surveyPanel.innerHTML = `
    <div class="results-hero">
      <h2>Your Eco Profile 🌿</h2>
      <p>Here is how you scored across the five sustainability categories.</p>
    </div>
    <div class="results-score-card">
      <div class="results-score-ring">
        <span class="results-score-num" id="score-counter">0</span>
        <span class="results-score-denom">/100</span>
      </div>
      <div>
        <div class="results-level-badge" style="background:${lvl.bg};color:${lvl.color};border:2px solid ${lvl.color}40">
          ${lvl.emoji} ${lvl.level}
        </div>
        <p class="results-level-desc">${getEcoLevelDesc(scores.overall)}</p>
      </div>
    </div>
    <div class="results-cat-breakdown">
      ${cats.map(cat => `
        <div class="results-cat-row">
          <div class="results-cat-info">
            <span class="results-cat-icon">${cat.icon}</span>
            <span class="results-cat-name">${cat.name}</span>
          </div>
          <div class="results-cat-bar-track">
            <div class="results-cat-bar" data-width="${scores[cat.id]}" style="background:${cat.color};width:0%"></div>
          </div>
          <span class="results-cat-pct">${scores[cat.id]}%</span>
        </div>
      `).join('')}
    </div>
    <div class="results-insights-row">
      <div class="results-insight strength">
        <div class="results-insight-icon">💪</div>
        <div>
          <div class="results-insight-label">Strongest Area</div>
          <div class="results-insight-val">${strongest.icon} ${strongest.name}</div>
        </div>
      </div>
      <div class="results-insight improve">
        <div class="results-insight-icon">🎯</div>
        <div>
          <div class="results-insight-label">Needs Improvement</div>
          <div class="results-insight-val">${weakest.icon} ${weakest.name}</div>
        </div>
      </div>
    </div>
    <div class="results-reflection-box">
      <h3>Self-Reflection</h3>
      <p>Which sustainability category do you <em>feel</em> you need the most improvement in?</p>
      <select id="perceived-weak" style="margin-top:8px">
        <option value="">Select a category...</option>
        ${cats.map(c => `<option value="${c.id}">${c.icon} ${c.name}</option>`).join('')}
      </select>
    </div>
    <button id="complete-assessment" style="width:100%;margin-top:16px;font-size:1.05rem">Start My EcoLyfe Journey 🌱</button>
  `;
  showPanel(surveyPanel);
  let count = 0;
  const target = scores.overall;
  const el = document.getElementById('score-counter');
  const stepV = Math.max(1, Math.ceil(target / 40));
  const timer = setInterval(() => {
    count = Math.min(count + stepV, target);
    el.textContent = count;
    if (count >= target) clearInterval(timer);
  }, 30);
  setTimeout(() => {
    surveyPanel.querySelectorAll('.results-cat-bar[data-width]').forEach(bar => {
      bar.style.width = bar.dataset.width + '%';
    });
  }, 300);
  document.getElementById('complete-assessment').addEventListener('click', async () => {
    const perceivedWeak = document.getElementById('perceived-weak').value;
    if (!perceivedWeak) return alert('Please select a category for the self-reflection question.');
    await completeAssessment(scores, perceivedWeak);
  });
}

async function completeAssessment(scores, perceivedWeak) {
  showLoading();
  const isNewUser = !state.user.onboarding_complete;
  const record = {
    userId: state.user.username,
    role: _assessDemographics.role || "student",
    studentId: _assessDemographics.studentId || "",
    name: _assessDemographics.name || "",
    instagram: _assessDemographics.instagram || "",
    timestamp: new Date().toISOString(),
    programme: _assessDemographics.programme,
    yearOfStudy: _assessDemographics.yearOfStudy,
    livingArrangement: _assessDemographics.livingArrangement,
    overallScore: scores.overall,
    energyScore: scores.energy,
    transportScore: scores.transport,
    foodScore: scores.food,
    wasteScore: scores.waste,
    waterScore: scores.water,
    perceivedWeakCategory: perceivedWeak,
    answers: { ..._assessAnswers }
  };
  await db.ref('assessments').push(record);
  state.user.assessmentDone = true;
  state.user.onboarding_complete = 1;
  state.user.role = _assessDemographics.role || "student";
  state.user.programme = _assessDemographics.programme;
  state.user.yearOfStudy = _assessDemographics.yearOfStudy;
  state.user.livingArrangement = _assessDemographics.livingArrangement;
  state.user.studentId = _assessDemographics.studentId || "";
  state.user.name = _assessDemographics.name || "";
  state.user.instagram = _assessDemographics.instagram || "";
  if (isNewUser) {
    state.user.eco_score = scores.overall;
  }
  await saveUserToFirebase(state.user);
  hideLoading();
  renderDashboard();
}

function renderDashboard() {
  checkAchievements();

  const todayString = new Date().toISOString().slice(0, 10);
  const dismissedDate = localStorage.getItem('ecolyfe_dismissed_fact_date');
  const showFact = dismissedDate !== todayString;

  setStatus(`Welcome back, ${state.user.username}! Your Eco Score is ${state.user.eco_score}.`);
  dashboardPanel.innerHTML = `
    <div class="dashboard-header">
      <div style="display: flex; justify-content: space-between; gap: 12px; align-items: center; flex-wrap: wrap;">
        <div>
          <h2>Daily Eco Check-in</h2>
          <p>Check off eco actions or answer a quiz to earn bonus Eco Score points.</p>
        </div>
        <div class="nav-buttons">
          <button class="nav-btn" id="go-feed">📢 Community Feed</button>
          <button class="nav-btn" id="go-analytics">📊 Analytics</button>
          <button class="nav-btn outline" id="sign-out">Sign out</button>
        </div>
      </div>
    </div>
    <div class="score-badge">Eco Score: ${state.user.eco_score}</div>
    ${showFact ? `
    <div class="fun-fact-card" id="fun-fact-card" style="margin-top: 20px;">
      <div class="fun-fact-icon">💡</div>
      <div class="fun-fact-body">
        <div class="fun-fact-title">Sustainability Fact of the Day</div>
        <p class="fun-fact-text">${getDailyFunFact()}</p>
      </div>
      <button class="fun-fact-close" id="fun-fact-close" title="Dismiss fact">✕</button>
    </div>
    ` : ''}
    <div id="prompt-list" class="card-grid" style="margin-top: 20px;"></div>
    <section class="panel" id="bonus-panel"></section>
    <section class="panel" id="quiz-panel"></section>
    <section class="panel" id="achievements-panel"></section>
    <div class="toast">Use actions, bonus challenges, and quizzes to build your score. Each has its own reward path.</div>
  `;

  if (showFact) {
    const closeBtn = document.getElementById('fun-fact-close');
    const cardEl = document.getElementById('fun-fact-card');
    if (closeBtn && cardEl) {
      closeBtn.addEventListener('click', () => {
        cardEl.classList.add('dismissed');
        localStorage.setItem('ecolyfe_dismissed_fact_date', todayString);
        setTimeout(() => {
          cardEl.remove();
        }, 300);
      });
    }
  }

  showPanel(dashboardPanel);
  document.getElementById('sign-out').addEventListener('click', () => {
    localStorage.removeItem('ecolyfeUser');
    state.user = null;
    renderLogin();
  });
  document.getElementById('go-feed').addEventListener('click', () => {
    renderFeedPanel();
  });
  document.getElementById('go-analytics').addEventListener('click', () => renderAnalytics());
  loadPrompts();
  renderBonusPanel();
  renderQuizPanel();
  renderAchievementsPanel();
  loadLeaderboard();
}

function renderAchievementsPanel() {
  const panel = document.getElementById('achievements-panel');

  // Show base achievements and up to 1 next locked streak achievement
  let displayAchievements = ACHIEVEMENTS.filter(a => !a.id.startsWith('streak_') || state.user.achievements.includes(a.id));

  // Find next locked streak to preview
  const nextStreak = ACHIEVEMENTS.find(a => a.id.startsWith('streak_') && !state.user.achievements.includes(a.id));
  if (nextStreak) {
    displayAchievements.push(nextStreak);
  }

  panel.innerHTML = `
    <h2>Achievements</h2>
    <p>Unlock badges by building eco habits and dominating the leaderboard.<br><small>Current Top 1 Streak: <strong>${state.user.top1Streak} days</strong> | Current Login Streak: <strong>${state.user.loginStreak} days</strong></small></p>
    <div class="achievement-grid">
      ${displayAchievements.map(ach => {
    const unlocked = state.user.achievements.includes(ach.id);
    return `
          <div class="achievement-badge ${unlocked ? 'unlocked' : 'locked'}">
            <div class="achievement-icon">${ach.icon}</div>
            <div class="achievement-info">
              <h3>${ach.title}</h3>
              <p>${ach.description}</p>
            </div>
          </div>
        `;
  }).join('')}
    </div>
  `;
}

function renderBonusPanel() {
  const bonusPanel = document.getElementById('bonus-panel');
  const today = new Date().toISOString().slice(0, 10);
  bonusPanel.innerHTML = `
    <h2>Bonus Actions</h2>
    <p>Complete extra eco tasks for bonus points today.</p>
    <div class="bonus-grid">
      ${state.bonusActions.map(action => {
    const done = state.user.bonusHistory.some(record => record.date === today && record.actionId === action.id);
    return `
          <div class="bonus-item">
            <div>
              <h3>${action.title}</h3>
              <p>${action.description}</p>
            </div>
            <div style="text-align: right; display: grid; gap: 12px; align-items: center;">
              <div class="score-badge">+${action.points}</div>
              <button class="${done ? 'secondary' : ''}" ${done ? 'disabled' : ''} data-action-id="${action.id}">
                ${done ? 'Completed' : 'Complete'}
              </button>
            </div>
          </div>
        `;
  }).join('')}
    </div>
  `;
  bonusPanel.querySelectorAll('button[data-action-id]').forEach(button => {
    button.addEventListener('click', () => handleBonusAction(Number(button.dataset.actionId)));
  });
}

function handleBonusAction(actionId) {
  const today = new Date().toISOString().slice(0, 10);
  const alreadyDone = state.user.bonusHistory.some(record => record.actionId === actionId && record.date === today);
  if (alreadyDone) return alert('This bonus action is already completed today.');

  const action = state.bonusActions.find(entry => entry.id === actionId);
  if (!action) return alert('Action not found.');

  state.user.bonusHistory.push({ actionId, date: today, points: action.points });
  state.user.eco_score += action.points;
  saveUsers();
  renderDashboard();
}

function loadPrompts() {
  const today = new Date().toISOString().slice(0, 10);
  const promptList = document.getElementById('prompt-list');
  promptList.innerHTML = state.prompts.map(prompt => {
    const checked = state.user.checkins.some(item => item.prompt_id === prompt.id && item.date === today);
    const points = getPromptPoints(prompt);
    return `
      <div class="check-item">
        <div>
          <h3>${prompt.title}</h3>
          <p>${prompt.description}</p>
          <small style="color: var(--muted);">Category: ${prompt.category}</small>
        </div>
        <div style="text-align: right;">
          <div class="score-badge">+${points}</div>
          <button class="${checked ? 'secondary' : ''}" ${checked ? 'disabled' : ''} data-prompt-id="${prompt.id}">
            ${checked ? 'Done' : 'Check In'}
          </button>
        </div>
      </div>
    `;
  }).join('');
  promptList.querySelectorAll('button[data-prompt-id]').forEach(button => {
    button.addEventListener('click', () => handleCheckin(Number(button.dataset.promptId)));
  });
}

function renderQuizPanel() {
  const quizPanel = document.getElementById('quiz-panel');
  if (hasAnsweredQuizToday()) {
    const today = new Date().toISOString().slice(0, 10);
    const record = state.user.quizHistory.find(item => item.date === today);
    quizPanel.innerHTML = `
      <h2>Daily Quiz</h2>
      <p>You already answered today's quiz and earned <strong>${record.pointsEarned}</strong> bonus points.</p>
    `;
    return;
  }

  const nextQuiz = getTodayQuiz();
  quizPanel.innerHTML = `
    <h2>Eco Quiz Challenge</h2>
    <p>Answer a quiz question to earn extra Eco Score points.</p>
    <div class="form-group quiz-options">
      <label>${nextQuiz.question}</label>
      ${nextQuiz.options.map((option, index) => `
        <label class="quiz-option">
          <input type="radio" name="quiz-answer" value="${index}" />
          <span>${option}</span>
        </label>
      `).join('')}
    </div>
    <div class="quiz-actions">
      <button id="quiz-submit">Submit Quiz</button>
    </div>
  `;
  document.getElementById('quiz-submit').addEventListener('click', handleQuizSubmit);
}

function handleQuizSubmit() {
  const answer = document.querySelector('input[name="quiz-answer"]:checked');
  if (!answer) return alert('Please choose an answer before submitting.');

  const quiz = getTodayQuiz();
  const selectedIndex = Number(answer.value);
  const today = new Date().toISOString().slice(0, 10);
  const correct = selectedIndex === quiz.answer;
  const earned = correct ? quiz.points : 5;
  const bonusLabel = correct ? `${earned} bonus points for a correct answer!` : `You earned ${earned} participation points.`;

  state.user.eco_score += earned;
  state.user.quizHistory.push({ date: today, quizId: quiz.id, correct, pointsEarned: earned });
  saveUsers();
  alert(bonusLabel);
  renderDashboard();
}

function handleCheckin(promptId) {
  const today = new Date().toISOString().slice(0, 10);
  const alreadyChecked = state.user.checkins.some(item => item.prompt_id === promptId && item.date === today);
  if (alreadyChecked) return alert('You have already checked in for this prompt today.');

  const prompt = state.prompts.find(entry => entry.id === promptId);
  if (!prompt) return alert('Prompt not found.');

  const points = getPromptPoints(prompt);
  state.user.checkins.push({ prompt_id: promptId, date: today, points });
  state.user.eco_score += points;
  saveUsers();
  renderDashboard();
}

function loadLeaderboard() {
  leaderboardPanel.innerHTML = `
    <h2>Leaderboard</h2>
    <p>Top 10 EcoLyfe champions by Eco Score.</p>
    <div class="leaderboard">
      ${state.users
      .slice()
      .sort((a, b) => b.eco_score - a.eco_score)
      .slice(0, 10)
      .map((entry, index) => `
          <div class="leaderboard-row">
            <span class="leaderboard-rank">${index + 1}</span>
            <span>${entry.username}</span>
            <strong>${entry.eco_score}</strong>
          </div>
        `)
      .join('')}
    </div>
  `;
  leaderboardPanel.hidden = false;
}

/* ─── Social Feed ─── */

function timeAgo(timestamp) {
  const now = Date.now();
  const diff = now - new Date(timestamp).getTime();
  const seconds = Math.floor(diff / 1000);
  if (seconds < 60) return 'just now';
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `${days}d ago`;
  const weeks = Math.floor(days / 7);
  if (weeks < 5) return `${weeks}w ago`;
  return new Date(timestamp).toLocaleDateString();
}

function hasPostedToday() {
  const today = new Date().toISOString().slice(0, 10);
  return state.posts.some(p => p.username === state.user.username && p.timestamp.slice(0, 10) === today);
}

function showPointsToast(points) {
  // Remove any existing toast
  const existing = document.querySelector('.points-toast');
  if (existing) existing.remove();

  const toast = document.createElement('div');
  toast.className = 'points-toast';
  toast.textContent = `🌿 +${points} Eco Points earned for posting!`;
  document.body.appendChild(toast);
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      toast.classList.add('show');
    });
  });
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 500);
  }, 3000);
}

let pendingImageData = null;

function renderFeedPanel() {
  setStatus('Share your eco journey with the community!');
  const initial = state.user.username.charAt(0);

  const postCards = state.posts.slice().reverse().map(post => {
    const isOwner = post.username === state.user.username;
    const liked = post.likes.includes(state.user.username);
    const likeCount = post.likes.length;
    const commentCount = post.comments.length;
    const postInitial = post.username.charAt(0);

    const commentsHTML = post.comments.map(c => `
      <div class="comment-item">
        <div class="comment-avatar">${c.username.charAt(0)}</div>
        <div class="comment-bubble">
          <div class="comment-author">${c.username}</div>
          <div class="comment-text">${escapeHTML(c.text)}</div>
          <div class="comment-time">${timeAgo(c.timestamp)}</div>
        </div>
      </div>
    `).join('');

    return `
      <div class="post-card" data-post-id="${post.id}">
        <div class="post-card-header">
          <div class="post-card-user">
            <div class="post-avatar">${postInitial}</div>
            <div class="post-user-info">
              <span class="post-username">${post.username}</span>
              <div class="post-meta">
                <span>${timeAgo(post.timestamp)}</span>
                ${post.category ? `<span class="post-category-tag">${post.category}</span>` : ''}
              </div>
            </div>
          </div>
          ${isOwner ? `<button class="post-delete-btn" data-delete-id="${post.id}" title="Delete post">🗑️</button>` : ''}
        </div>
        <div class="post-card-body">
          <p>${escapeHTML(post.text)}</p>
        </div>
        ${post.imageData ? `<img class="post-card-image" src="${post.imageData}" alt="Post image" />` : ''}
        <div class="post-actions">
          <button class="post-action-btn ${liked ? 'liked' : ''}" data-like-id="${post.id}">
            <span class="like-icon">${liked ? '❤️' : '🤍'}</span>
            <span>${likeCount > 0 ? likeCount : ''}</span>
          </button>
          <button class="post-action-btn" data-toggle-comments="${post.id}">
            💬 ${commentCount > 0 ? commentCount : ''}
          </button>
        </div>
        <div class="post-comments" id="comments-${post.id}" style="display: none;">
          <div class="comments-list">${commentsHTML}</div>
          <div class="comment-form">
            <input type="text" placeholder="Write a comment..." data-comment-input="${post.id}" />
            <button data-comment-submit="${post.id}">Post</button>
          </div>
        </div>
      </div>
    `;
  }).join('');

  feedPanel.innerHTML = `
    <div class="feed-header">
      <h2>Community Feed</h2>
      <button class="nav-btn outline" id="back-dashboard">← Dashboard</button>
    </div>

    <div class="post-composer">
      <div class="composer-top">
        <div class="composer-avatar">${initial}</div>
        <div class="composer-body">
          <textarea id="post-text" placeholder="Share what eco action you did today... 🌍"></textarea>
          <div class="image-preview-container" id="image-preview-container">
            <img class="image-preview" id="image-preview" src="" alt="Preview" />
            <button class="image-preview-remove" id="image-preview-remove" title="Remove image">✕</button>
          </div>
          <div class="composer-controls">
            <select id="post-category">
              <option value="">🏷️ Category (optional)</option>
              <option value="🗑️ Waste">🗑️ Waste</option>
              <option value="🍃 Food">🍃 Food</option>
              <option value="🚲 Transport">🚲 Transport</option>
              <option value="⚡ Energy">⚡ Energy</option>
              <option value="💧 Water">💧 Water</option>
              <option value="🛒 Shopping">🛒 Shopping</option>
              <option value="🤝 Community">🤝 Community</option>
              <option value="🌱 General">🌱 General</option>
            </select>
            <label class="image-upload-label">
              📷 Photo
              <input type="file" id="post-image" accept="image/*" />
            </label>
            <button class="post-btn" id="submit-post">Post</button>
          </div>
        </div>
      </div>
    </div>

    <div class="feed-stream" id="feed-stream">
      ${postCards.length > 0 ? postCards : `
        <div class="feed-empty">
          <div class="feed-empty-icon">🌍</div>
          <p>No posts yet. Be the first to share your eco journey!</p>
        </div>
      `}
    </div>
  `;

  showPanel(feedPanel);
  pendingImageData = null;

  // Back to dashboard
  document.getElementById('back-dashboard').addEventListener('click', () => {
    renderDashboard();
  });

  // Image upload handling
  document.getElementById('post-image').addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    // Read and compress image
    const reader = new FileReader();
    reader.onload = (ev) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const MAX_WIDTH = 800;
        const MAX_HEIGHT = 800;
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > MAX_WIDTH) {
            height *= MAX_WIDTH / width;
            width = MAX_WIDTH;
          }
        } else {
          if (height > MAX_HEIGHT) {
            width *= MAX_HEIGHT / height;
            height = MAX_HEIGHT;
          }
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);

        // Compress to tiny JPEG
        pendingImageData = canvas.toDataURL('image/jpeg', 0.7);
        
        document.getElementById('image-preview').src = pendingImageData;
        document.getElementById('image-preview-container').classList.add('active');
      };
      img.src = ev.target.result;
    };
    reader.readAsDataURL(file);
  });

  // Remove image preview
  document.getElementById('image-preview-remove').addEventListener('click', () => {
    pendingImageData = null;
    document.getElementById('post-image').value = '';
    document.getElementById('image-preview-container').classList.remove('active');
  });

  // Submit post
  document.getElementById('submit-post').addEventListener('click', handleCreatePost);

  // Like buttons
  feedPanel.querySelectorAll('[data-like-id]').forEach(btn => {
    btn.addEventListener('click', () => handleLikePost(btn.dataset.likeId));
  });

  // Delete buttons
  feedPanel.querySelectorAll('[data-delete-id]').forEach(btn => {
    btn.addEventListener('click', () => handleDeletePost(btn.dataset.deleteId));
  });

  // Toggle comments
  feedPanel.querySelectorAll('[data-toggle-comments]').forEach(btn => {
    btn.addEventListener('click', () => {
      const commentsDiv = document.getElementById(`comments-${btn.dataset.toggleComments}`);
      commentsDiv.style.display = commentsDiv.style.display === 'none' ? 'block' : 'none';
    });
  });

  // Comment submit
  feedPanel.querySelectorAll('[data-comment-submit]').forEach(btn => {
    btn.addEventListener('click', () => {
      const postId = btn.dataset.commentSubmit;
      const input = feedPanel.querySelector(`[data-comment-input="${postId}"]`);
      if (input && input.value.trim()) {
        handleCommentPost(postId, input.value.trim());
      }
    });
  });

  // Comment enter key
  feedPanel.querySelectorAll('[data-comment-input]').forEach(input => {
    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && input.value.trim()) {
        handleCommentPost(input.dataset.commentInput, input.value.trim());
      }
    });
  });
}

function escapeHTML(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

async function handleCreatePost() {
  const text = document.getElementById('post-text').value.trim();
  if (!text) return alert('Please write something before posting.');
  if (text.length > 1000) return alert('Post text is too long (max 1000 characters).');

  const category = document.getElementById('post-category').value;
  const earnedPoints = !hasPostedToday();

  showLoading();

  let imageUrl = pendingImageData || null;

  const post = {
    username: state.user.username,
    text,
    category,
    imageData: imageUrl,
    timestamp: new Date().toISOString()
  };

  try {
    await db.ref('posts').push(post);
  } catch (err) {
    console.error("Database error:", err);
    alert("Failed to save post. Please check your connection.");
    hideLoading();
    return;
  }

  if (earnedPoints) {
    state.user.eco_score += 5;
    saveUsers();
    showPointsToast(5);
  }

  pendingImageData = null;
  hideLoading();
}

function handleLikePost(postId) {
  const post = state.posts.find(p => p.id === postId);
  if (!post) return;

  const idx = post.likes.indexOf(state.user.username);
  if (idx === -1) {
    db.ref(`posts/${postId}/likes/${state.user.username}`).set(true);
  } else {
    db.ref(`posts/${postId}/likes/${state.user.username}`).remove();
  }
}

function handleDeletePost(postId) {
  const post = state.posts.find(p => p.id === postId);
  if (!post || post.username !== state.user.username) return;
  if (!confirm('Delete this post?')) return;

  db.ref(`posts/${postId}`).remove();
}

function handleCommentPost(postId, text) {
  const post = state.posts.find(p => p.id === postId);
  if (!post) return;

  const newCommentRef = db.ref(`posts/${postId}/comments`).push();
  newCommentRef.set({
    username: state.user.username,
    text,
    timestamp: new Date().toISOString()
  });

  // Re-open the comment section after re-render
  setTimeout(() => {
    const commentsDiv = document.getElementById(`comments-${postId}`);
    if (commentsDiv) commentsDiv.style.display = 'block';
  }, 500);
}

/* ─── Analytics Dashboard ─── */

function renderAnalytics() {
  setStatus('Campus Sustainability Analytics — real-time insights from INTI students.');
  analyticsPanel.innerHTML = `
    <div class="analytics-header">
      <h2>📊 Campus Analytics</h2>
      <button class="nav-btn outline" id="back-from-analytics">← Dashboard</button>
    </div>
    <div id="analytics-content">
      <div style="text-align:center;padding:60px 24px">
        <div class="loading-spinner" style="margin:0 auto 16px"></div>
        <p style="color:var(--muted)">Loading campus data...</p>
      </div>
    </div>
  `;
  showPanel(analyticsPanel);
  document.getElementById('back-from-analytics').addEventListener('click', () => renderDashboard());
  
  if (state.assessments && state.assessments.length > 0) {
    renderAnalyticsContent(state.assessments);
  } else {
    db.ref('assessments').once('value', snap => {
      const records = [];
      snap.forEach(child => records.push(child.val()));
      state.assessments = records;
      renderAnalyticsContent(records);
    });
  }
}

function renderAnalyticsContent(rawRecords) {
  const content = document.getElementById('analytics-content');
  if (!content) return;

  // Filter to keep only the latest assessment per user
  const latestRecordsMap = new Map();
  rawRecords.forEach(r => {
    const uid = r.userId || r.name || 'anonymous';
    const existing = latestRecordsMap.get(uid);
    if (!existing || new Date(r.timestamp) > new Date(existing.timestamp)) {
      latestRecordsMap.set(uid, r);
    }
  });
  const records = Array.from(latestRecordsMap.values());

  if (records.length === 0) {
    content.innerHTML = `<div class="analytics-empty"><div style="font-size:3rem;margin-bottom:12px">📊</div><p>No assessment data yet. Be the first to complete the assessment!</p></div>`;
    return;
  }
  const n = records.length;
  const cats = ASSESSMENT.categories;
  const catAvg = {};
  cats.forEach(c => {
    const key = c.id + 'Score';
    catAvg[c.id] = Math.round(records.reduce((s, r) => s + (r[key] || 0), 0) / n);
  });
  const avgOverall = Math.round(records.reduce((s, r) => s + (r.overallScore || 0), 0) / n);
  const sortedByAvg = cats.slice().sort((a, b) => catAvg[b.id] - catAvg[a.id]);

  const levelBuckets = {};
  LEVEL_CONFIG.forEach(l => { levelBuckets[l.level] = 0; });
  records.forEach(r => { const lv = getEcoLevel(r.overallScore || 0); levelBuckets[lv.level]++; });

  const progData = {};
  records.forEach(r => {
    if (r.programme) {
      const trimmed = r.programme.trim();
      if (trimmed !== '') {
        const canonical = trimmed.toUpperCase();
        if (!progData[canonical]) {
          progData[canonical] = { name: trimmed, scores: [], count: 0 };
        }
        progData[canonical].scores.push(r.overallScore || 0);
        progData[canonical].count++;
        if (trimmed.length < progData[canonical].name.length || progData[canonical].count === 1) {
          progData[canonical].name = trimmed;
        }
      }
    }
  });

  const sortedProgrammes = Object.values(progData)
    .sort((a, b) => b.count - a.count)
    .slice(0, 6)
    .map(p => ({
      name: p.name,
      avg: Math.round(p.scores.reduce((s, v) => s + v, 0) / p.count),
      count: p.count
    }));

  const livings = ['Hostel', 'Rental', 'Family Home'];
  const livingData = {};
  livings.forEach(l => {
    const g = records.filter(r => r.livingArrangement === l);
    livingData[l] = g.length ? { avg: Math.round(g.reduce((s, r) => s + (r.overallScore || 0), 0) / g.length), count: g.length } : null;
  });

  const perceivedCounts = { energy: 0, transport: 0, food: 0, waste: 0, water: 0 };
  records.forEach(r => { if (r.perceivedWeakCategory in perceivedCounts) perceivedCounts[r.perceivedWeakCategory]++; });

  const qData = {};
  cats.forEach(cat => {
    cat.questions.forEach(q => {
      const vals = records.filter(r => r.answers && r.answers[q.id] !== undefined).map(r => r.answers[q.id]);
      const avg = vals.length ? vals.reduce((s, v) => s + v, 0) / vals.length : 0;
      qData[q.id] = { score: Math.round((avg / 4) * 100), text: q.text, catIcon: cat.icon };
    });
  });
  const qSorted = Object.entries(qData).sort((a, b) => b[1].score - a[1].score);
  const top3 = qSorted.slice(0, 3);
  const bottom3 = qSorted.slice(-3).reverse();

  const avgLvl = getEcoLevel(avgOverall);

  const barRow = (label, val, color, count = null) => {
    if (val === null) return `<div class="analytics-bar-row"><span class="analytics-bar-label">${label}</span><div class="analytics-bar-track"><div class="analytics-bar-fill" style="background:#e5e7eb" data-w="0"></div></div><span class="analytics-bar-pct" style="color:var(--muted)">No data</span></div>`;
    return `<div class="analytics-bar-row"><span class="analytics-bar-label">${label}</span><div class="analytics-bar-track"><div class="analytics-bar-fill" style="background:${color}" data-w="${val}"></div></div><span class="analytics-bar-pct">${val}%${count !== null ? ` <small>(${count})</small>` : ''}</span></div>`;
  };

  content.innerHTML = `
    <div class="analytics-summary-grid">
      <div class="analytics-stat-card"><div class="analytics-stat-num">${n}</div><div class="analytics-stat-lbl">Assessments Completed</div></div>
      <div class="analytics-stat-card"><div class="analytics-stat-num" style="color:${avgLvl.color}">${avgOverall}/100</div><div class="analytics-stat-lbl">Average Campus Eco Score</div></div>
      <div class="analytics-stat-card"><div class="analytics-stat-num">${sortedByAvg[0].icon}</div><div class="analytics-stat-lbl">Strongest: ${sortedByAvg[0].name}</div></div>
      <div class="analytics-stat-card"><div class="analytics-stat-num">${sortedByAvg[sortedByAvg.length - 1].icon}</div><div class="analytics-stat-lbl">Needs Work: ${sortedByAvg[sortedByAvg.length - 1].name}</div></div>
    </div>

    <div class="analytics-section">
      <div class="analytics-section-title">📈 Category Averages</div>
      ${cats.map(c => barRow(`${c.icon} ${c.name}`, catAvg[c.id], c.color)).join('')}
    </div>

    <div class="analytics-section">
      <div class="analytics-section-title">🏅 Sustainability Level Distribution</div>
      ${LEVEL_CONFIG.map(lc => {
        const cnt = levelBuckets[lc.level];
        const pct = Math.round((cnt / n) * 100);
        return barRow(`${lc.emoji} ${lc.level}`, pct, lc.color, cnt);
      }).join('')}
    </div>

    <div class="analytics-two-col">
      <div class="analytics-section">
        <div class="analytics-section-title">🎓 By Programme / Course</div>
        ${sortedProgrammes.map(p => {
          return barRow(p.name, p.avg, getEcoLevel(p.avg).color, p.count);
        }).join('')}
        ${sortedProgrammes.length === 0 ? '<div style="color:var(--muted); font-size:0.9rem; padding: 10px 0;">No programme data available yet.</div>' : ''}
      </div>
      <div class="analytics-section">
        <div class="analytics-section-title">🏠 By Living Arrangement</div>
        ${livings.map(l => {
          const d = livingData[l];
          return barRow(l, d ? d.avg : null, '#10b981', d ? d.count : null);
        }).join('')}
      </div>
    </div>

    <div class="analytics-section">
      <div class="analytics-section-title">🤔 Perceived vs Actual Weakest Area</div>
      <p class="analytics-section-sub">Where students <em>think</em> they are weakest (left) vs actual assessment scores — lower score = weaker area (right).</p>
      <div class="pva-grid">
        <div>
          <div class="pva-heading">Self-Reported Weakness</div>
          ${cats.map(cat => {
            const pct = Math.round((perceivedCounts[cat.id] / n) * 100);
            return barRow(`${cat.icon} ${cat.name}`, pct, '#94a3b8');
          }).join('')}
        </div>
        <div>
          <div class="pva-heading">Actual Average Score</div>
          ${cats.map(cat => barRow(`${cat.icon} ${cat.name}`, catAvg[cat.id], cat.color)).join('')}
        </div>
      </div>
    </div>

    <div class="analytics-two-col">
      <div class="analytics-section">
        <div class="analytics-section-title">💪 Top 3 Strongest Behaviours</div>
        ${top3.map(([id, d]) => `
          <div class="analytics-behaviour-card strength">
            <span class="abc-icon">${d.catIcon}</span>
            <p class="abc-text">${d.text}</p>
            <strong class="abc-score" style="color:#16a34a">${d.score}%</strong>
          </div>
        `).join('')}
      </div>
      <div class="analytics-section">
        <div class="analytics-section-title">🎯 Top 3 Areas to Improve</div>
        ${bottom3.map(([id, d]) => `
          <div class="analytics-behaviour-card improve">
            <span class="abc-icon">${d.catIcon}</span>
            <p class="abc-text">${d.text}</p>
            <strong class="abc-score" style="color:#ef4444">${d.score}%</strong>
          </div>
        `).join('')}
      </div>
    </div>
  `;

  setTimeout(() => {
    content.querySelectorAll('.analytics-bar-fill[data-w]').forEach(bar => {
      bar.style.width = bar.dataset.w + '%';
    });
  }, 100);
}

/* ─── Init ─── */

async function init() {
  showLoading();

  // Real-time listeners
  db.ref('users').on('value', (snap) => {
    const arr = [];
    snap.forEach(child => { arr.push(normalizeUser(child.key, child.val())); });
    state.users = arr;

    if (state.user) {
      const updated = arr.find(u => u.username === state.user.username);
      if (updated) {
        state.user = updated;
      }
    }

    if (!leaderboardPanel.hidden || !dashboardPanel.hidden) {
      loadLeaderboard();
      const scoreBadge = document.querySelector('.score-badge');
      if (scoreBadge && state.user) {
        scoreBadge.textContent = `Eco Score: ${state.user.eco_score}`;
      }
    }
  });

  db.ref('posts').on('value', (snap) => {
    const arr = [];
    snap.forEach(child => {
      const p = child.val();
      p.id = child.key;
      p.likes = p.likes ? Object.keys(p.likes) : [];
      p.comments = p.comments ? Object.values(p.comments) : [];
      arr.push(p);
    });
    state.posts = arr;
    if (!feedPanel.hidden) {
      renderFeedPanel();
    }
  });

  db.ref('assessments').on('value', (snap) => {
    const arr = [];
    snap.forEach(child => { arr.push(child.val()); });
    state.assessments = arr;
    if (!analyticsPanel.hidden) {
      renderAnalyticsContent(arr);
    }
  });

  await fetchAllUsers();
  await fetchAllPosts();

  const savedUser = localStorage.getItem('ecolyfeUser');
  renderLogin();
  if (savedUser) {
    document.getElementById('username').value = savedUser;
  }

  hideLoading();
}

init();
