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
    { id: 1, question: 'Which item is best to reduce plastic waste?', options: ['Plastic water bottle', 'Reusable bottle', 'Single-use straw'], answer: 1, points: 15, explanation: 'Using a reusable bottle can save an average of 156 plastic bottles per person every year and significantly reduce single-use plastic waste.' },
    { id: 2, question: 'What is the most eco-friendly way to get around town?', options: ['Driving alone', 'Biking or walking', 'Taking a taxi'], answer: 1, points: 18, explanation: 'Biking or walking produces zero emissions, improves personal health, and is the most sustainable way to travel short distances.' },
    { id: 3, question: 'Which action saves the most energy at home?', options: ['Turning off lights when not needed', 'Leaving devices plugged in', 'Using incandescent bulbs'], answer: 0, points: 12, explanation: 'Turning off lights when leaving a room is a zero-cost habit that directly reduces electricity usage and extends bulb life.' },
    { id: 4, question: 'Which of these has the highest carbon footprint per gram of protein?', options: ['Beef', 'Chicken', 'Beans'], answer: 0, points: 15, explanation: 'Beef production generates significantly higher greenhouse gas emissions per gram of protein compared to poultry and plant-based proteins due to methane from enteric fermentation and land use.' },
    { id: 5, question: 'How long does it take for a standard plastic bag to decompose in a landfill?', options: ['10-20 years', '100-200 years', 'Up to 1,000 years'], answer: 2, points: 15, explanation: 'Plastic bags can take up to 1,000 years to decompose in a landfill. Instead of biodegarding, they break down into microplastics that pollute ecosystems.' },
    { id: 6, question: 'What is the primary gas produced by food waste decomposing in landfills?', options: ['Carbon Dioxide', 'Methane', 'Oxygen'], answer: 1, points: 15, explanation: 'When food waste decomposes anaerobically (without oxygen) in landfills, it produces methane, a potent greenhouse gas with a global warming potential 28-36 times greater than CO2 over 100 years.' },
    { id: 7, question: 'Which type of light bulb is the most energy efficient?', options: ['Incandescent', 'Halogen', 'LED'], answer: 2, points: 12, explanation: 'LED light bulbs consume up to 80% less energy and last up to 25 times longer than traditional incandescent bulbs.' },
    { id: 8, question: 'What percentage of global greenhouse gas emissions come from food production?', options: ['Around 10%', 'Around 26%', 'Around 50%'], answer: 1, points: 15, explanation: 'According to major studies, food production accounts for approximately 26% of global greenhouse gas emissions, covering agriculture, land use, and distribution.' },
    { id: 9, question: 'How much water is saved by using a dishwasher instead of handwashing?', options: ['No difference', 'Up to 2 times more', 'Up to 5 times more'], answer: 2, points: 12, explanation: 'Modern Energy Star certified dishwashers can use up to 5 times less water than washing dishes by hand under running water.' },
    { id: 10, question: 'Which of the following is NOT a fossil fuel?', options: ['Coal', 'Natural Gas', 'Uranium'], answer: 2, points: 12, explanation: 'Uranium is a heavy metal used in nuclear power plants to generate electricity through fission, which does not release greenhouse gases, unlike burning fossil fuels like coal and gas.' },
    { id: 11, question: 'What is the most recycled material in the world by weight?', options: ['Steel', 'Plastic', 'Glass'], answer: 0, points: 15, explanation: 'Steel is the most recycled material globally. It does not lose its structural properties when recycled, and more steel is recycled each year than plastic, paper, aluminum, and glass combined.' },
    { id: 12, question: 'How many trees are cut down annually to produce paper globally?', options: ['Around 4 billion', 'Around 100 million', 'Around 500,000'], answer: 0, points: 15, explanation: 'Approximately 4 billion trees are cut down annually for paper production worldwide, contributing to deforestation and loss of biodiversity.' },
    { id: 13, question: 'What is the "vampire draw" of appliances?', options: ['Power used by devices when in standby mode', 'Power surge when turning devices on', 'Power consumed during peak hours'], answer: 0, points: 12, explanation: 'Vampire draw (or standby power) is the electricity consumed by appliances and electronics while they are switched off or in standby mode, accounting for up to 10% of average household electricity use.' },
    { id: 14, question: 'Which action contributes most to marine microplastic pollution?', options: ['Washing synthetic clothes', 'Using paper straws', 'Throwing away metal cans'], answer: 0, points: 15, explanation: 'Washing synthetic textiles (like polyester and nylon) releases hundreds of thousands of microfibers per wash cycle, which bypass wastewater treatment plants and end up in oceans.' },
    { id: 15, question: 'What is greywater?', options: ['Wastewater from toilets', 'Gently used water from sinks, showers, and baths', 'Highly toxic industrial water'], answer: 1, points: 15, explanation: 'Greywater is wastewater generated from domestic activities such as laundry, dishwashing, and bathing, which can be recycled on-site for uses like landscape irrigation and toilet flushing.' }
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

function getTodayQuizzes() {
  const today = new Date().toISOString().slice(0, 10);
  const dayNum = Number(today.replace(/-/g, ''));
  const list = [];
  const len = state.quizzes.length;
  
  // Deterministically select 5 distinct questions
  const indices = new Set();
  let attempt = 0;
  while (indices.size < 5 && attempt < 100) {
    const idx = (dayNum + attempt * 7) % len;
    indices.add(idx);
    attempt++;
  }
  
  indices.forEach(idx => list.push(state.quizzes[idx]));
  return list;
}

function hasAnsweredQuizToday() {
  const today = new Date().toISOString().slice(0, 10);
  return state.user.quizHistory.filter(record => record.date === today).length >= 5;
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
  localStorage.setItem('ecolyfePanel', 'login');
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

let activeUserListener = null;
function attachUserListener(username) {
  if (activeUserListener && db) {
    try {
      db.ref('users/' + activeUserListener).off();
    } catch (e) {}
  }
  activeUserListener = username;
  if (db) {
    try {
      db.ref('users/' + username).on('value', (snap) => {
        if (snap.exists()) {
          const updated = normalizeUser(username, snap.val());
          state.user = updated;
          
          const scoreBadge = document.querySelector('.score-badge');
          if (scoreBadge) {
            scoreBadge.textContent = `Eco Score: ${updated.eco_score}`;
          }
        }
      });
    } catch (e) {
      console.warn("Failed to attach user real-time listener:", e);
    }
  }
}

let leaderboardListener = null;\r
function attachLeaderboardListener() {\r
  if (leaderboardListener && db) {\r
    try {\r
      db.ref('users').off('value', leaderboardListener);\r
    } catch (e) {}\r
  }\r
  if (db) {\r
    try {\r
      leaderboardListener = db.ref('users').orderByChild('eco_score').limitToLast(10).on('value', (snap) => {\r
        const arr = [];\r
        snap.forEach(child => {\r
          const v = child.val();\r
          arr.push({\r
            username: child.key,\r
            name: v.name || child.key,\r
            eco_score: v.eco_score || 0,\r
            programme: v.programme || '',\r
            yearOfStudy: v.yearOfStudy || ''\r
          });\r
        });\r
        arr.reverse();\r
        state.leaderboard = arr;\r
        localStorage.setItem('ecolyfeLocalLeaderboard', JSON.stringify(arr));\r
        \r
        if (!leaderboardPanel.hidden) {\r
          loadLeaderboard();\r
        }\r
      });\r
    } catch (e) {\r
      console.warn("Failed to attach leaderboard listener:", e);\r
    }\r
  } else {\r
    const cached = localStorage.getItem('ecolyfeLocalLeaderboard');\r
    state.leaderboard = cached ? JSON.parse(cached) : [];\r
  }\r
}\r


async function handleLoginAction() {
  const username = document.getElementById('username').value.trim().toLowerCase();
  const password = document.getElementById('password').value;
  if (!username) return alert('Please enter a username.');
  if (!password) return alert('Please enter a password.');

  showLoading();
  let user = await fetchUserByUsername(username);
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
  
  attachUserListener(user.username);
  
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
  const exists = await checkUsernameExists(username);
  if (exists) {
    hideLoading();
    return alert('Username already exists. Please choose another or log in.');
  }

  const user = { 
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
  await saveUserToFirebase(user);

  state.user = user;
  localStorage.setItem('ecolyfeUser', user.username);
  
  attachUserListener(user.username);
  
  renderDemographics();
  hideLoading();
}

async function loadUserData(username) {
  let user = await fetchUserByUsername(username);
  if (!user) {
    localStorage.removeItem('ecolyfeUser');
    localStorage.removeItem('ecolyfePanel');
    renderLogin();
    return;
  }
  state.user = user;
  
  attachUserListener(username);
  
  updateLoginStreak(user);
  saveUserToFirebase(user); // fire-and-forget: don't block UI for login streak write
  
  if (user.assessmentDone) {
    const savedPanel = localStorage.getItem('ecolyfePanel') || 'dashboard';
    if (savedPanel === 'feed') {
      renderFeedPanel();
    } else if (savedPanel === 'analytics') {
      renderAnalytics();
    } else {
      renderDashboard();
    }
  } else {
    renderDemographics();
  }
}

// ═══ Assessment Engine ═══

let _assessAnswers = {};
let _assessDemographics = {};
let _assessCatIdx = 0;
let _assessSelfReflection = "";

const ASSESSMENT = {
  categories: [
    {
      id: 'energy', name: 'Energy Conservation', icon: '⚡', color: '#f59e0b', weight: 0.15,
      questions: [] // Populated dynamically via getActiveQuestions
    },
    {
      id: 'transport', name: 'Transportation Habits', icon: '🚌', color: '#3b82f6', weight: 0.30,
      questions: [
        { id: 't0', text: 'How do you most often travel to campus or your place of study?', weight: 1.5,
          options: ['Private car (alone)', 'Motorcycle (alone)', 'Carpool or rideshare', 'Public bus or train', 'Walk or cycle'] },
        { id: 't1', text: 'On average, how many days per week do you use a private vehicle (car or motorcycle)?', weight: 1.5,
          options: ['Every day (5–7 days)', 'Most days (3–4 days)', 'A few days (1–2 days)', 'Rarely', 'Never'] },
        { id: 't2', text: 'In the past month, how often have you carpooled or shared a ride with others?', weight: 1.5,
          options: [
            'Never',
            'Once',
            'A few times',
            'Regularly',
            'Almost all my trips',
            'Primary reliance on public transportation',
            'Not Applicable (I do not travel or use personal vehicles)'
          ] },
        { id: 't3', text: 'What is the longest distance you are comfortable walking or cycling rather than taking a vehicle?', weight: 1.0,
          options: ["I don't walk or cycle anywhere", 'Less than 5 minutes away', '5–10 minutes away', '10–20 minutes away', 'More than 20 minutes away'] },
        { id: 't4', text: 'How often do you plan and combine errands to reduce the number of journeys you make?', weight: 1.0,
          options: ['Never', 'Rarely', 'Sometimes', 'Often', 'Always'] }
      ]
    },
    {
      id: 'food', name: 'Food & Sustainability', icon: '🥗', color: '#10b981', weight: 0.30,
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
      id: 'waste', name: 'Waste Management', icon: '♻️', color: '#8b5cf6', weight: 0.15,
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
      id: 'water', name: 'Water Conservation', icon: '💧', color: '#06b6d4', weight: 0.10,
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

function getActiveQuestions(cat) {
  if (cat.id !== 'energy') return cat.questions;
  const living = _assessDemographics.livingArrangement || 'Homeowner';
  if (living === 'Student' || living === 'Tenant') {
    return [
      { id: 'e0', text: 'How often do you turn off lights and fans when leaving a room?', weight: 1.5,
        options: ['Never', 'Rarely', 'Sometimes', 'Often', 'Always'] },
      { id: 'e1', text: 'What do you usually do with plugged-in devices and chargers when leaving your room (to prevent phantom load)?', weight: 1.5,
        options: ['Leave everything switched on', 'Leave chargers in, turn off screens', 'Unplug some chargers and devices', 'Unplug most things', 'Unplug and switch off everything'] },
      { id: 'e2', text: 'How often do you adjust air conditioning settings or use natural ventilation/fans instead of AC to save energy?', weight: 1.5,
        options: ['Never — I run AC at high levels constantly', 'Rarely', 'Sometimes', 'Often', 'Always — I use natural cooling when possible'] },
      { id: 'e3', text: 'Rate your overall effort to reduce electricity use in your daily routine. (1 = No effort, 5 = Very consistent)', weight: 1.0,
        options: ['1 — No effort at all', '2', '3 — Sometimes try', '4', '5 — Very consistent'] }
    ];
  } else {
    // Homeowner
    return [
      { id: 'e_eff', text: 'What energy efficiency measures are active in your home (LED lights, smart thermostat, Energy-Star appliances)?', weight: 1.5,
        options: ['None — older appliances and lighting', 'Partial LED lighting, standard appliances', 'Smart thermostat, full LED, or energy-star appliances', 'Solar panels installed and high-efficiency home profile'] },
      { id: 'e_source', text: 'What is the primary source of your home heating / electricity?', weight: 1.5,
        options: ['Standard utility grid (coal / natural gas)', 'Mixed grid electricity (some renewables)', 'Green power tariff (100% renewable plan) or rooftop solar'] },
      { id: 'e_bill', text: 'How would you describe your average monthly household energy consumption / utility bills?', weight: 1.5,
        options: ['High — high heating/cooling loads and high billing', 'Average — standard bills for a home of our size', 'Low — below average, we actively track power bills'] },
      { id: 'e3', text: 'Rate your overall effort to reduce electricity use in your daily routine. (1 = No effort, 5 = Very consistent)', weight: 1.0,
        options: ['1 — No effort at all', '2', '3 — Sometimes try', '4', '5 — Very consistent'] }
    ];
  }
}

function getQuestionScore(qid, val) {
  if (qid === 't2') {
    if (val === 5 || val === 6) return 4; // Max score for public transit and N/A
  }
  return val;
}

function getQuestionMaxScore(q) {
  if (q.id === 't2') return 4;
  return q.options.length - 1;
}

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
  
  // Self-Reflection Score (10% weight)
  // Maps selection to a score out of 100: we can give a baseline of 100 for completed reflection
  catScores.reflection = 100; 

  ASSESSMENT.categories.forEach(cat => {
    let raw = 0;
    let maxRaw = 0;
    const activeQs = getActiveQuestions(cat);
    activeQs.forEach(q => {
      const val = _assessAnswers[q.id];
      if (val !== undefined) {
        const score = getQuestionScore(q.id, val);
        raw += score * q.weight;
      }
      maxRaw += getQuestionMaxScore(q) * q.weight;
    });
    catScores[cat.id] = maxRaw > 0 ? Math.min(100, Math.round((raw / maxRaw) * 100)) : 0;
    totalWeighted += catScores[cat.id] * cat.weight;
  });
  
  // Weighted sum: Categories make up 90% and Reflection is 10%
  catScores.overall = Math.min(100, Math.round((totalWeighted * 0.9) + (catScores.reflection * 0.1)));
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
      <label for="demo-living">Living Arrangement & Utility Profile</label>
      <select id="demo-living">
        <option value="">Select your arrangement...</option>
        <option value="Hostel">Hostel (Student - no utility control)</option>
        <option value="Rental">Rental House / Apartment (Tenant - no utility control)</option>
        <option value="Family Home">Family Home (Homeowner - with utility control)</option>
      </select>
    </div>
    <button id="begin-assessment-btn" style="width:100%;margin-top:8px">Begin Assessment →</button>
  `;
  localStorage.setItem('ecolyfePanel', 'demographics');
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
    renderSelfReflection();
  });
}

function renderSelfReflection() {
  setStatus("Self-Reflection: Reflect on your current habits.");
  const cats = ASSESSMENT.categories;
  
  surveyPanel.innerHTML = `
    <div class="assess-progress-wrap">
      <div class="assess-progress-track">
        <div class="assess-progress-fill" style="width: 0%"></div>
      </div>
      <div class="assess-progress-label">Step 1: Self-Reflection (0% Complete)</div>
    </div>
    <div class="assess-cat-header" style="border-left:4px solid var(--accent, #1c4a2e)">
      <span class="assess-cat-icon">🧘</span>
      <div>
        <h2 style="margin:0;color:var(--accent)">Self-Reflection</h2>
        <p style="margin:0;color:var(--muted);font-size:0.9rem">Assess your mindset before the evaluation</p>
      </div>
    </div>
    <div class="assess-question-card" style="margin-top:24px;">
      <p class="assess-q-text">Which sustainability category do you <strong>feel</strong> you need the most improvement in?</p>
      <div class="assess-options" style="margin-top:16px;">
        ${cats.map((c, i) => `
          <button class="assess-option${_assessSelfReflection === c.id ? ' selected' : ''}" data-catid="${c.id}"
            ${_assessSelfReflection === c.id ? `style="border-color:${c.color};background:${c.color}18"` : ''}>
            <span class="assess-option-dot"></span>
            <span>${c.icon} ${c.name}</span>
          </button>
        `).join('')}
      </div>
    </div>
    <div class="assess-nav" style="margin-top:24px;display:flex;justify-content:space-between;">
      <button class="assess-back-btn" id="reflect-back">← Back</button>
      <button id="reflect-start" ${_assessSelfReflection === "" ? 'disabled' : ''}>Start Assessment →</button>
    </div>
  `;
  showPanel(surveyPanel);

  surveyPanel.querySelectorAll('.assess-option').forEach(btn => {
    btn.addEventListener('click', () => {
      const catid = btn.dataset.catid;
      _assessSelfReflection = catid;
      surveyPanel.querySelectorAll('.assess-option').forEach(b => {
        b.classList.remove('selected');
        b.style.borderColor = '';
        b.style.background = '';
      });
      btn.classList.add('selected');
      const cat = ASSESSMENT.categories.find(c => c.id === catid);
      btn.style.borderColor = cat.color;
      btn.style.background = cat.color + '18';
      const startBtn = document.getElementById('reflect-start');
      if (startBtn) startBtn.disabled = false;
    });
  });

  document.getElementById('reflect-back').addEventListener('click', () => {
    renderDemographics();
  });

  document.getElementById('reflect-start').addEventListener('click', () => {
    renderAssessment(0);
    surveyPanel.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
}

function renderAssessment(catIdx) {
  _assessCatIdx = catIdx;
  const cat = ASSESSMENT.categories[catIdx];
  const totalCats = ASSESSMENT.categories.length;
  
  // Get active questions dynamically based on demographics
  const activeQs = getActiveQuestions(cat);
  
  // Compute total questions dynamically across all categories
  const totalQs = ASSESSMENT.categories.reduce((sum, c) => sum + getActiveQuestions(c).length, 0);
  
  // Compute question offset dynamically
  const questionOffset = ASSESSMENT.categories.slice(0, catIdx).reduce((s, c) => s + getActiveQuestions(c).length, 0);
  
  // Compute current progress based on answered questions
  let answeredCount = 0;
  ASSESSMENT.categories.forEach(c => {
    getActiveQuestions(c).forEach(q => {
      if (_assessAnswers[q.id] !== undefined) answeredCount++;
    });
  });
  const progressPct = Math.round((answeredCount / totalQs) * 100);
  
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
      <div class="assess-progress-label">Questions ${questionOffset + 1}–${questionOffset + activeQs.length} of ${totalQs} (${progressPct}% Complete)</div>
    </div>
    <div class="assess-cat-header" style="border-left:4px solid ${cat.color}">
      <span class="assess-cat-icon">${cat.icon}</span>
      <div>
        <h2 style="margin:0;color:${cat.color}">${cat.name}</h2>
        <p style="margin:0;color:var(--muted);font-size:0.9rem">Category ${catIdx + 1} of ${totalCats}</p>
      </div>
    </div>
    <div class="assess-questions">
      ${activeQs.map((q, qIdx) => {
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
      <button class="assess-back-btn" id="assess-back">← Back</button>
      <button id="assess-next" ${activeQs.some(q => _assessAnswers[q.id] === undefined) ? 'disabled' : ''}>
        ${catIdx === totalCats - 1 ? '🎉 See My Results' : `Next: ${ASSESSMENT.categories[catIdx + 1].name} →`}
      </button>
    </div>
  `;
  showPanel(surveyPanel);
  
  // Option buttons click handling
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
      
      // Update next button state
      const nextBtn = document.getElementById('assess-next');
      if (nextBtn) nextBtn.disabled = activeQs.some(q => _assessAnswers[q.id] === undefined);
      
      // Update progress bar dynamically
      updateLiveProgressBar();
    });
  });
  
  // Navigation button listeners
  document.getElementById('assess-next').addEventListener('click', () => {
    if (catIdx < totalCats - 1) {
      renderAssessment(catIdx + 1);
      // Auto-scrolling to top of surveyPanel
      surveyPanel.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      renderResults(calculateAssessmentScores());
      surveyPanel.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
  
  document.getElementById('assess-back').addEventListener('click', () => {
    if (catIdx > 0) {
      renderAssessment(catIdx - 1);
      surveyPanel.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      renderSelfReflection();
      surveyPanel.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
}

function updateLiveProgressBar() {
  const cat = ASSESSMENT.categories[_assessCatIdx];
  const activeQs = getActiveQuestions(cat);
  const totalQs = ASSESSMENT.categories.reduce((sum, c) => sum + getActiveQuestions(c).length, 0);
  const questionOffset = ASSESSMENT.categories.slice(0, _assessCatIdx).reduce((s, c) => s + getActiveQuestions(c).length, 0);
  
  let answeredCount = 0;
  ASSESSMENT.categories.forEach(c => {
    getActiveQuestions(c).forEach(q => {
      if (_assessAnswers[q.id] !== undefined) answeredCount++;
    });
  });
  const progressPct = Math.round((answeredCount / totalQs) * 100);
  
  const fillEl = surveyPanel.querySelector('.assess-progress-fill');
  const labelEl = surveyPanel.querySelector('.assess-progress-label');
  if (fillEl) fillEl.style.width = `${progressPct}%`;
  if (labelEl) {
    labelEl.textContent = `Questions ${questionOffset + 1}–${questionOffset + activeQs.length} of ${totalQs} (${progressPct}% Complete)`;
  }
}

function getRecommendations() {
  const answers = _assessAnswers;
  const recommendationsPool = [
    {
      id: 'f0',
      score: answers['f0'] !== undefined ? answers['f0'] : 2.5,
      title: 'Shift toward a Plant-Rich Diet',
      desc: 'Integrate meatless Mondays or increase plant-based meals weekly.',
      rationale: 'Switching to plant-based meals 3 days a week saves 2.9 kg of CO2e per meal, reducing food emissions by 30% annually (IPCC Sixth Assessment Report).'
    },
    {
      id: 'f1',
      score: answers['f1'] !== undefined ? answers['f1'] : 2.5,
      title: 'Minimize Household Food Waste',
      desc: 'Plan meals, utilize shopping lists, and store food properly to avoid spoil.',
      rationale: 'Wasted food rotting in landfills is a primary driver of methane. Reducing waste cuts global greenhouse emissions from food production (UNEP Emissions Gap Report).'
    },
    {
      id: 't0',
      score: answers['t0'] !== undefined ? answers['t0'] : 2.5,
      title: 'Favor Public Transit or Active Travel',
      desc: 'Walk, cycle, or catch trains and buses instead of driving alone.',
      rationale: 'Active travel and rail transit emit 80-90% less CO2 per kilometer than passenger cars, saving up to 2.2 tons of CO2 annually (UNEP Emissions Gap Report).'
    },
    {
      id: 't2',
      score: answers['t2'] !== undefined ? getQuestionScore('t2', answers['t2']) : 2.5,
      title: 'Carpool and Share Vehicle Trips',
      desc: 'Coordinate with colleagues or neighbors to share vehicle commutes.',
      rationale: 'Sharing car trips doubles passenger fuel efficiency and takes cars off the highway, slashing local carbon output (U.S. EPA).'
    },
    {
      id: 'e0',
      score: answers['e0'] !== undefined ? answers['e0'] : 2.5,
      title: 'Turn Off Inactive Lighting & Appliances',
      desc: 'Flip off switches when leaving rooms and utilize natural daylight.',
      rationale: 'Conserving direct electrical use reduces fossil-fuel generation demands on the grid, optimizing local power consumption (IPCC).'
    },
    {
      id: 'e1',
      score: answers['e1'] !== undefined ? answers['e1'] : 2.5,
      title: 'Unplug Standing Vampire Loads',
      desc: 'Unplug phone chargers and turn off power strips when sleeping.',
      rationale: 'Phantom standby loads account for up to 10% of residential energy consumption without active use (U.S. EPA / Energy Star).'
    },
    {
      id: 'e2',
      score: answers['e2'] !== undefined ? answers['e2'] : 2.5,
      title: 'Optimize Air Conditioning & Heating',
      desc: 'Set AC to 24-26°C and use natural cooling/fans.',
      rationale: 'HVAC accounts for 50% of residential power. Adjusting thermostat settings by 7-10°F for 8 hours daily saves 10% on energy costs (U.S. EPA).'
    },
    {
      id: 'e_eff',
      score: answers['e_eff'] !== undefined ? answers['e_eff'] : 2.5,
      title: 'Upgrade to High Efficiency Tech',
      desc: 'Install smart thermostats, LED bulbs, and Energy-Star appliances.',
      rationale: 'Energy Star models use 50% less energy than standard alternatives, reducing grid demands (U.S. EPA).'
    },
    {
      id: 'e_source',
      score: answers['e_source'] !== undefined ? answers['e_source'] : 2.5,
      title: 'Switch to Renewable Energy Tariffs',
      desc: 'Choose a green power plan from your utility company or install solar.',
      rationale: 'Transitioning home power to clean electricity offsets up to 4.5 tons of carbon emissions annually per household (IPCC).'
    },
    {
      id: 'w0',
      score: answers['w0'] !== undefined ? answers['w0'] : 2.5,
      title: 'Improve Clean Waste Stream Sorting',
      desc: 'Rinse cans and check plastic codes before throwing in sorting bins.',
      rationale: 'Proper recycling preserves manufacturing raw material value, reducing direct energy emissions by up to 40% (Ellen MacArthur Foundation).'
    },
    {
      id: 'w1',
      score: answers['w1'] !== undefined ? answers['w1'] : 2.5,
      title: 'Refuse Single-Use Plastics',
      desc: 'Carry reusable shopping bags, metal straws, and reusable bottles.',
      rationale: 'Plastic manufacturing is heavily carbon-intensive. Refusing plastics helps divert fossil fuel products from landfill and ocean ecosystems (UNEP).'
    },
    {
      id: 'w2',
      score: answers['w2'] !== undefined ? answers['w2'] : 2.5,
      title: 'Donate or Sell Unused Items',
      desc: 'Give old clothes and electronics a second life through donation or resale.',
      rationale: 'Reusing products keeps them out of landfills and reduces the need for resource-intensive new manufacturing (Project Drawdown).'
    }
  ];

  // Only include recommendations where the question was answered
  const activeRecs = recommendationsPool.filter(rec => answers[rec.id] !== undefined);
  
  // Sort by score ascending (lowest score first)
  activeRecs.sort((a, b) => a.score - b.score);
  
  // Return top 3
  return activeRecs.slice(0, 3);
}

function renderResults(scores) {
  setStatus('Your sustainability assessment is complete!');
  const lvl = getEcoLevel(scores.overall);
  const cats = ASSESSMENT.categories;
  
  // Sort categories by score to find strongest and weakest
  const sorted = cats.slice().sort((a, b) => scores[b.id] - scores[a.id]);
  const strongest = sorted[0];
  const weakest = sorted[sorted.length - 1];
  
  // Map perceived weak category ID to name
  const perceivedWeakCatName = cats.find(c => c.id === _assessSelfReflection)?.name || 'Unknown';
  
  // Get recommendations
  const recs = getRecommendations();
  
  surveyPanel.innerHTML = `
    <div class="results-hero">
      <h2>Your Eco Profile 🌿</h2>
      <p>Here is how you scored across the five sustainability categories.</p>
    </div>
    
    <div class="results-score-card-gauge">
      <div class="score-radial-container">
        <svg class="score-ring" viewBox="0 0 100 100">
          <circle class="score-ring-bg" cx="50" cy="50" r="40"></circle>
          <circle class="score-ring-fill" id="results-ring-fill" cx="50" cy="50" r="40" stroke-dasharray="251.2" stroke-dashoffset="251.2"></circle>
        </svg>
        <div class="score-inner-text">
          <span class="score-number" id="score-counter">0</span>
          <span class="score-total">/100</span>
        </div>
      </div>
      <div class="score-grade-badge" id="results-grade-badge" style="background:${lvl.color}">
        ${lvl.emoji} ${lvl.level}
      </div>
      <p class="score-interpretation-text">${getEcoLevelDesc(scores.overall)}</p>
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

    <div class="results-reflection-box" style="margin-bottom:24px;">
      <h3>Mindset Alignment</h3>
      <p style="margin:0;line-height:1.5;font-size:0.92rem;color:var(--text-2);">
        You reflected that you needed the most improvement in <strong>${perceivedWeakCatName}</strong>. 
        Your actual lowest category score is in <strong>${weakest.name} (${scores[weakest.id]}%)</strong>.
        ${_assessSelfReflection === weakest.id 
          ? "🌟 Great self-awareness! Your perception matches your actual assessment results." 
          : "💡 Take note: your actual assessment shows a different opportunity area for growth!"}
      </p>
    </div>

    <div class="analytics-section" style="margin-bottom:24px;">
      <div class="analytics-section-title">🚀 Top 3 Recommended Actions</div>
      <div class="recommendations-container">
        ${recs.map((rec, index) => `
          <div class="recommendation-item">
            <div class="rec-number">#${index + 1}</div>
            <div class="rec-content">
              <h4 class="rec-title">${rec.title}</h4>
              <p class="rec-desc">${rec.desc}</p>
              <div class="rec-rationale">
                <strong>Impact Rationale:</strong> ${rec.rationale}
              </div>
            </div>
          </div>
        `).join('')}
      </div>
    </div>

    <div class="analytics-section" style="margin-bottom:24px;">
      <div class="analytics-section-title">⚖️ Scoring Methodology</div>
      <p class="methodology-text">
        Your EcoScore is calculated using weightings based on the direct environmental impact of daily habits. 
        Each section contributes to the overall score out of 100:
      </p>
      <div class="methodology-breakdown">
        <div class="method-row"><span>🧘 Self-Reflection (Mindset)</span><strong>10%</strong></div>
        <div class="method-row"><span>🥗 Food & Sustainability</span><strong>30%</strong></div>
        <div class="method-row"><span>🚌 Transportation</span><strong>30%</strong></div>
        <div class="method-row"><span>⚡ Energy Conservation</span><strong>15%</strong></div>
        <div class="method-row"><span>♻️ Waste Management</span><strong>15%</strong></div>
      </div>
      <p class="methodology-note">
        Answers are scored based on relative greenhouse gas emissions. For sections where direct utility control is absent (e.g. students and tenants), scores adapt dynamically to measure conservation behaviors, preventing structural bias in scoring.
      </p>
    </div>

    <div class="analytics-section" style="margin-bottom:24px;">
      <div class="analytics-section-title">📚 Educational Resources Library</div>
      <p class="resources-intro">Explore practical materials aligned with the 5 Rs of zero-waste living:</p>
      <div class="resources-accordion">
        <div class="resource-card-item">
          <div class="resource-header" data-body-id="res-refuse">
            <span>🚫 Refuse</span>
            <span class="resource-arrow">▼</span>
          </div>
          <div class="resource-body hidden" id="res-refuse">
            <p>Say "no" to things you don't need before they enter your home. Refuse single-use plastics, plastic cutlery, junk mail, and promotional items. Refusing is the most effective way to eliminate waste at the source.</p>
            <div class="resource-tip"><strong>Action Tip:</strong> Place a "No Junk Mail" sign on your letterbox and politely decline plastic bags at registers.</div>
          </div>
        </div>
        <div class="resource-card-item">
          <div class="resource-header" data-body-id="res-reduce">
            <span>📉 Reduce</span>
            <span class="resource-arrow">▼</span>
          </div>
          <div class="resource-body hidden" id="res-reduce">
            <p>Minimize your overall consumption. Buy only what you need, choose products with minimal packaging, purchase in bulk, and declutter. Decreasing consumption automatically reduces resource extraction and energy usage.</p>
            <div class="resource-tip"><strong>Action Tip:</strong> Plan weekly meals to reduce food waste and buy fresh foods loose rather than pre-packaged in plastic.</div>
          </div>
        </div>
        <div class="resource-card-item">
          <div class="resource-header" data-body-id="res-reuse">
            <span>🔄 Reuse</span>
            <span class="resource-arrow">▼</span>
          </div>
          <div class="resource-body hidden" id="res-reuse">
            <p>Swap disposable items for high-quality reusable alternatives. Purchase secondhand clothing and furniture, repair broken appliances, and upcycle materials creatively. Extending product lifespans reduces landfill burdens.</p>
            <div class="resource-tip"><strong>Action Tip:</strong> Carry a reusable water bottle, coffee cup, and shopping bags at all times.</div>
          </div>
        </div>
        <div class="resource-card-item">
          <div class="resource-header" data-body-id="res-recycle">
            <span>♻️ Recycle</span>
            <span class="resource-arrow">▼</span>
          </div>
          <div class="resource-body hidden" id="res-recycle">
            <p>Recycle items that cannot be refused, reduced, or reused. Ensure proper clean sorting of paper, clean plastics, glass, and metals. Avoid "wishcycling" (throwing non-recyclable items in the recycling bin) to prevent facility contamination.</p>
            <div class="resource-tip"><strong>Action Tip:</strong> Wash food containers before recycling. Check local council rules for accepted plastic types (usually numbers 1, 2, and 5).</div>
          </div>
        </div>
        <div class="resource-card-item">
          <div class="resource-header" data-body-id="res-rot">
            <span>🍂 Rot (Compost)</span>
            <span class="resource-arrow">▼</span>
          </div>
          <div class="resource-body hidden" id="res-rot">
            <p>Compost organic matter like fruit scraps, vegetable peelings, coffee grounds, and yard waste. Composting diverts organic waste from oxygen-free landfills, where it would otherwise decompose into methane, a potent greenhouse gas.</p>
            <div class="resource-tip"><strong>Action Tip:</strong> Set up a worm farm, backyard compost bin, or use local community organic waste collection hubs.</div>
          </div>
        </div>
      </div>
    </div>

    <div class="analytics-section citations-card" style="margin-bottom:24px;">
      <div class="analytics-section-title" style="color:var(--text)">📋 References & Citations</div>
      <p class="citations-text">Our scoring algorithms and customized recommendations are aligned with the following research and environmental databases:</p>
      <ul class="citations-list">
        <li><strong>IPCC Sixth Assessment Report (2022)</strong>: Data on mitigation strategies, carbon footprint offsets, and global warming potentials.</li>
        <li><strong>UNEP Emissions Gap Report (2023)</strong>: Global benchmarks for individual carbon emissions targets.</li>
        <li><strong>Project Drawdown</strong>: Action-based rankings and environmental benefits of carbon-reducing behaviors like plant-rich diets and composting.</li>
        <li><strong>U.S. EPA Carbon Calculator</strong>: Conversions for home electricity conservation, standby power draw, and passenger vehicle fuel efficiencies.</li>
      </ul>
    </div>

    <div style="display:flex;gap:12px;margin-top:16px;">
      <button id="complete-assessment" style="flex:1;font-size:1.05rem">Start My EcoLyfe Journey 🌱</button>
      <button id="retake-assessment" class="secondary-btn" style="padding:12px 20px;border-radius:999px;cursor:pointer;">Retake Assessment 🔄</button>
    </div>
  `;
  showPanel(surveyPanel);
  
  // Set up accordion toggle event listeners
  surveyPanel.querySelectorAll('.resource-header').forEach(header => {
    header.addEventListener('click', () => {
      const bodyId = header.dataset.bodyId;
      const el = document.getElementById(bodyId);
      if (!el) return;
      const arrow = header.querySelector('.resource-arrow');
      
      if (el.classList.contains('hidden')) {
        el.classList.remove('hidden');
        if (arrow) arrow.textContent = '▲';
        header.classList.add('active-header');
      } else {
        el.classList.add('hidden');
        if (arrow) arrow.textContent = '▼';
        header.classList.remove('active-header');
      }
    });
  });

  // Animated counter for overall score
  let count = 0;
  const target = scores.overall;
  const el = document.getElementById('score-counter');
  const stepV = Math.max(1, Math.ceil(target / 40));
  const timer = setInterval(() => {
    count = Math.min(count + stepV, target);
    if (el) el.textContent = count;
    if (count >= target) clearInterval(timer);
  }, 30);
  
  // Animate category score bars
  setTimeout(() => {
    surveyPanel.querySelectorAll('.results-cat-bar[data-width]').forEach(bar => {
      bar.style.width = bar.dataset.width + '%';
    });
    
    // Animate SVG circle ring fill
    const fillRing = document.getElementById('results-ring-fill');
    if (fillRing) {
      const perimeter = 251.2;
      const offset = perimeter - (target / 100) * perimeter;
      fillRing.style.strokeDashoffset = offset;
    }
  }, 300);
  
  document.getElementById('complete-assessment').addEventListener('click', async () => {
    await completeAssessment(scores, _assessSelfReflection);
  });

  document.getElementById('retake-assessment').addEventListener('click', () => {
    _assessAnswers = {};
    _assessSelfReflection = "";
    renderDemographics();
  });
}

async function completeAssessment(scores, perceivedWeak) {
  showLoading();
  const isFirstTime = !state.user.assessmentDone;
  const rewardPoints = isFirstTime ? 150 : 50;
  
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
  await saveAssessment(record);
  state.user.assessmentDone = true;
  state.user.onboarding_complete = 1;
  state.user.role = _assessDemographics.role || "student";
  state.user.programme = _assessDemographics.programme;
  state.user.yearOfStudy = _assessDemographics.yearOfStudy;
  state.user.livingArrangement = _assessDemographics.livingArrangement;
  state.user.studentId = _assessDemographics.studentId || "";
  state.user.name = _assessDemographics.name || "";
  state.user.instagram = _assessDemographics.instagram || "";
  
  // Award points based on first-time or monthly retake
  if (isFirstTime) {
    state.user.eco_score = scores.overall + rewardPoints;
  } else {
    state.user.eco_score = (state.user.eco_score || 0) + rewardPoints;
  }
  
  await saveUserToFirebase(state.user);
  hideLoading();
  
  // Show beautiful congratulations message
  setTimeout(() => {
    alert(`🎉 Assessment Submitted!\n\nThank you for completing your sustainability profile! You scored ${scores.overall}/100 and earned +${rewardPoints} Eco Points!`);
  }, 100);
  
  renderDashboard();
}

function renderStreakCalendar() {
  const container = document.getElementById('streak-calendar-container');
  if (!container) return;
  
  const checkins = state.user.checkins || [];
  const historyDates = new Set(checkins.map(c => c.date));
  const today = new Date();
  
  let html = `
    <p style="margin: 0 0 12px; font-size: 0.88rem; font-weight: 600; color: var(--accent);">
      🔥 Active Streak: <strong>${state.user.loginStreak} days</strong> | 7-Day Habit Tracker
    </p>
    <div class="streak-days-row">
  `;
  
  for (let i = 6; i >= 0; i--) {
    const d = new Date();
    d.setDate(today.getDate() - i);
    const dateStr = d.toISOString().slice(0, 10);
    const isToday = i === 0;
    const isChecked = historyDates.has(dateStr);
    const dayLabel = d.toLocaleDateString('en-US', { weekday: 'short' }).substring(0, 2);
    
    html += `
      <div class="calendar-day-box ${isChecked ? 'checked' : ''} ${isToday ? 'today' : ''}">
        <span class="day-label">${dayLabel}</span>
        <div class="day-indicator">${isChecked ? '✓' : '•'}</div>
      </div>
    `;
  }
  
  html += '</div>';
  container.innerHTML = html;
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
    
    <div id="streak-calendar-container" class="streak-calendar" style="margin-top: 20px;"></div>

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

  localStorage.setItem('ecolyfePanel', 'dashboard');
  showPanel(dashboardPanel);
  document.getElementById('sign-out').addEventListener('click', () => {
    localStorage.removeItem('ecolyfeUser');
    localStorage.removeItem('ecolyfePanel');
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
  renderStreakCalendar();
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
  const today = new Date().toISOString().slice(0, 10);
  const todayRecords = state.user.quizHistory.filter(item => item.date === today);
  const todayAnswersCount = todayRecords.length;

  if (todayAnswersCount >= 5) {
    const totalPoints = todayRecords.reduce((sum, r) => sum + (r.pointsEarned || 0), 0);
    const correctCount = todayRecords.filter(r => r.correct).length;
    quizPanel.innerHTML = `
      <h2>Daily Quiz</h2>
      <p style="color:var(--text-2);font-weight:600;margin-bottom:12px;">🎉 You completed today's quiz!</p>
      <div style="background:var(--bg-alt);padding:16px;border-radius:var(--radius);border:1px solid rgba(0,0,0,0.06);display:grid;gap:8px;">
        <div style="display:flex;justify-content:space-between;"><span>Correct answers:</span><strong>${correctCount}/5</strong></div>
        <div style="display:flex;justify-content:space-between;"><span>Eco Score points earned:</span><strong>+${totalPoints} pts</strong></div>
      </div>
    `;
    return;
  }

  const todayQuizzes = getTodayQuizzes();
  const nextQuiz = todayQuizzes[todayAnswersCount];
  const progressPct = Math.round((todayAnswersCount / 5) * 100);

  quizPanel.innerHTML = `
    <h2>Eco Quiz Challenge</h2>
    <p>Answer daily questions to build your Eco Score.</p>
    
    <div class="quiz-progress" style="margin-top:16px;">
      <span>Question ${todayAnswersCount + 1} of 5</span>
      <div class="quiz-progress-bar">
        <div class="quiz-progress-fill" style="width:${progressPct}%"></div>
      </div>
    </div>

    <div class="form-group quiz-options" style="margin-top:14px;display:grid;gap:10px;">
      <label style="font-size:1.05rem;margin-bottom:8px;display:block;">${nextQuiz.question}</label>
      ${nextQuiz.options.map((option, index) => `
        <label class="quiz-option" id="quiz-opt-label-${index}">
          <input type="radio" name="quiz-answer" value="${index}" style="margin-right:8px;" />
          <span>${option}</span>
        </label>
      `).join('')}
    </div>
    
    <div id="quiz-feedback-box"></div>

    <div class="quiz-actions" style="margin-top:18px;">
      <button id="quiz-submit">Submit Answer</button>
    </div>
  `;
  document.getElementById('quiz-submit').addEventListener('click', () => handleQuizSubmit(nextQuiz, todayAnswersCount));
}

function handleQuizSubmit(quiz, currentIdx) {
  const answer = document.querySelector('input[name="quiz-answer"]:checked');
  if (!answer) return alert('Please choose an answer before submitting.');

  const selectedIndex = Number(answer.value);
  const today = new Date().toISOString().slice(0, 10);
  const correct = selectedIndex === quiz.answer;

  // Disable all inputs
  document.querySelectorAll('input[name="quiz-answer"]').forEach(input => input.disabled = true);

  // Highlight options
  const correctLabel = document.getElementById(`quiz-opt-label-${quiz.answer}`);
  if (correctLabel) correctLabel.classList.add('correct');

  if (!correct) {
    const selectedLabel = document.getElementById(`quiz-opt-label-${selectedIndex}`);
    if (selectedLabel) selectedLabel.classList.add('wrong');
  }

  // Display feedback and scientific explanation card
  const feedbackBox = document.getElementById('quiz-feedback-box');
  if (feedbackBox) {
    if (correct) {
      feedbackBox.innerHTML = `
        <div class="quiz-feedback correct">
          <span>✔️</span>
          <span>Correct! +${quiz.points} points earned.</span>
        </div>
        <div class="quiz-explanation">
          <strong>Did you know?</strong> ${quiz.explanation || ''}
        </div>
      `;
    } else {
      feedbackBox.innerHTML = `
        <div class="quiz-feedback wrong">
          <span>❌</span>
          <span>Incorrect. The correct answer was: ${quiz.options[quiz.answer]}</span>
        </div>
        <div class="quiz-explanation">
          <strong>Did you know?</strong> ${quiz.explanation || ''}
        </div>
      `;
    }
  }

  // Record history
  state.user.quizHistory.push({
    quizId: quiz.id,
    date: today,
    correct: correct,
    pointsEarned: correct ? quiz.points : 0
  });

  if (correct) {
    state.user.eco_score += quiz.points;
  }

  // Save updates and check achievements
  saveUsers();
  checkAchievements();

  // Swap submit button for "Next Question" or "Finish Quiz"
  const submitBtn = document.getElementById('quiz-submit');
  if (currentIdx === 4) {
    submitBtn.textContent = 'Finish Quiz';
  } else {
    submitBtn.textContent = 'Next Question →';
  }

  // Update button listener to progress
  submitBtn.onclick = null; // Remove standard event listener
  const newSubmitBtn = submitBtn.cloneNode(true);
  submitBtn.parentNode.replaceChild(newSubmitBtn, submitBtn);

  newSubmitBtn.addEventListener('click', () => {
    renderDashboard();
  });
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
      ${(state.leaderboard || [])
      .slice(0, 10)
      .map((entry, index) => `
          <div class="leaderboard-row">
            <span class="leaderboard-rank">${index + 1}</span>
            <span>${entry.name || entry.username}</span>
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

  localStorage.setItem('ecolyfePanel', 'feed');
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
        const MAX_WIDTH = 1920;
        const MAX_HEIGHT = 1920;
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
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';
        ctx.drawImage(img, 0, 0, width, height);

        // Compress to tiny JPEG
        pendingImageData = canvas.toDataURL('image/jpeg', 0.88);
        
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

  await savePost(post);
  if (!db) {
    state.posts.push(post);
    renderFeedPanel();
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
  const isLike = idx === -1;
  likePostInFirebase(postId, state.user.username, isLike);

  // Optimistic UI Update
  if (isLike) {
    post.likes.push(state.user.username);
  } else {
    post.likes.splice(idx, 1);
  }
  renderFeedPanel();
}

function handleDeletePost(postId) {
  const post = state.posts.find(p => p.id === postId);
  if (!post || post.username !== state.user.username) return;
  if (!confirm('Delete this post?')) return;

  deletePostInFirebase(postId);

  // Optimistic UI Update
  const idx = state.posts.findIndex(p => p.id === postId);
  if (idx !== -1) {
    state.posts.splice(idx, 1);
    renderFeedPanel();
  }
}

function handleCommentPost(postId, text) {
  const post = state.posts.find(p => p.id === postId);
  if (!post) return;

  const comment = {
    username: state.user.username,
    text,
    timestamp: new Date().toISOString()
  };

  commentOnPostInFirebase(postId, comment);

  // Optimistic UI Update
  post.comments = post.comments || [];
  post.comments.push(comment);
  renderFeedPanel();

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
  localStorage.setItem('ecolyfePanel', 'analytics');
  showPanel(analyticsPanel);
  document.getElementById('back-from-analytics').addEventListener('click', () => renderDashboard());
  
  if (state.assessments && state.assessments.length > 0) {
    renderAnalyticsContent(state.assessments);
  } else {
    fetchAssessments().then(records => {
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

  // Safety timeout: guarantee loading overlay is dismissed within 3 seconds
  const safetyTimer = setTimeout(() => { hideLoading(); }, 3000);

  // ── Step 1: Instantly load cached data from localStorage (no network) ──
  try { const c = localStorage.getItem('ecolyfeLocalLeaderboard'); if (c) state.users = JSON.parse(c); } catch (e) {}
  try { const c = localStorage.getItem('ecolyfeLocalPosts'); if (c) state.posts = JSON.parse(c); } catch (e) {}
  try { const c = localStorage.getItem('ecolyfeLocalAssessments'); if (c) state.assessments = JSON.parse(c); } catch (e) {}

  // ── Step 2: Show UI immediately from cache ──
  const savedUser = localStorage.getItem('ecolyfeUser');
  if (savedUser) {
    // Try to restore user profile from local cache (instant)
    let cachedUser = null;
    try {
      const raw = localStorage.getItem('ecolyfeLocalUsers');
      if (raw) { const arr = JSON.parse(raw); cachedUser = arr.find(u => u.username === savedUser); }
    } catch (e) {}

    if (cachedUser) {
      // Instant render from cache — no network wait
      state.user = cachedUser;
      if (cachedUser.assessmentDone) {
        const panel = localStorage.getItem('ecolyfePanel') || 'dashboard';
        if (panel === 'feed') renderFeedPanel();
        else if (panel === 'analytics') renderAnalytics();
        else renderDashboard();
      } else {
        renderDemographics();
      }
      clearTimeout(safetyTimer);
      hideLoading();

      // Background: refresh user from Firebase and sync login streak (non-blocking)
      if (db) {
        attachUserListener(savedUser);
        fetchUserByUsername(savedUser).then(fresh => {
          if (fresh) { updateLoginStreak(fresh); state.user = fresh; saveUserToFirebase(fresh); }
        }).catch(() => {});
      }
    } else {
      // No local cache for this user — must fetch from network
      await loadUserData(savedUser);
      clearTimeout(safetyTimer);
      hideLoading();
    }
  } else {
    renderLogin();
    clearTimeout(safetyTimer);
    hideLoading();
  }

  // ── Step 3: Attach real-time listeners in background (non-blocking) ──
  if (db) {
    try { attachLeaderboardListener(); } catch (e) {
      console.warn("Failed to attach leaderboard listener:", e);
    }
    try {
      db.ref('posts').orderByChild('timestamp').limitToLast(20).on('value', (snap) => {
        const arr = [];
        snap.forEach(child => {
          const p = child.val();
          p.id = child.key;
          p.likes = p.likes ? Object.keys(p.likes) : [];
          p.comments = p.comments ? Object.values(p.comments) : [];
          arr.push(p);
        });
        arr.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
        state.posts = arr;
        localStorage.setItem('ecolyfeLocalPosts', JSON.stringify(arr));
        if (!feedPanel.hidden) renderFeedPanel();
      });
    } catch (e) {
      console.warn("Failed to attach posts listener:", e);
    }
    try {
      db.ref('assessments').orderByChild('timestamp').limitToLast(50).on('value', (snap) => {
        const arr = [];
        snap.forEach(child => { arr.push(child.val()); });
        state.assessments = arr;
        localStorage.setItem('ecolyfeLocalAssessments', JSON.stringify(arr));
        if (!analyticsPanel.hidden) renderAnalyticsContent(arr);
      });
    } catch (e) {
      console.warn("Failed to attach assessments listener:", e);
    }
  }

  // Background: refresh leaderboard and posts in parallel (non-blocking)
  Promise.all([
    fetchAllUsers().then(u => { state.users = u; }).catch(() => {}),
    fetchAllPosts().then(p => { state.posts = p; if (!feedPanel.hidden) renderFeedPanel(); }).catch(() => {})
  ]);
}

init();
