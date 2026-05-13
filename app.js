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
  users: []
};

const loginPanel = document.getElementById('login-panel');
const surveyPanel = document.getElementById('survey-panel');
const dashboardPanel = document.getElementById('dashboard-panel');
const leaderboardPanel = document.getElementById('leaderboard-panel');
const feedPanel = document.getElementById('feed-panel');
const statusBar = document.getElementById('status-bar');

function setStatus(message) {
  statusBar.textContent = message;
}

function showPanel(panel) {
  [loginPanel, surveyPanel, dashboardPanel, leaderboardPanel, feedPanel].forEach(node => {
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
  if (user.onboarding_complete) {
    renderDashboard();
  } else {
    renderSurvey();
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
  renderSurvey();
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
  if (user.onboarding_complete) {
    renderDashboard();
  } else {
    renderSurvey();
  }
}

function renderSurvey() {
  setStatus('Complete the baseline survey to unlock your Eco Score.');
  surveyPanel.innerHTML = `
    <h2>Baseline Eco Survey</h2>
    <p>Tell us a little about your current habits so we can set your baseline Eco Score.</p>
    <div class="form-group">
      <label>How often do you use reusable bags?</label>
      <select id="q1">
        <option value="never">Never</option>
        <option value="rarely">Rarely</option>
        <option value="sometimes">Sometimes</option>
        <option value="often">Often</option>
        <option value="always">Always</option>
      </select>
    </div>
    <div class="form-group">
      <label>Do you compost food scraps?</label>
      <select id="q2">
        <option value="never">Never</option>
        <option value="rarely">Rarely</option>
        <option value="sometimes">Sometimes</option>
        <option value="often">Often</option>
        <option value="always">Always</option>
      </select>
    </div>
    <div class="form-group">
      <label>How often do you choose public transit or biking over driving?</label>
      <select id="q3">
        <option value="never">Never</option>
        <option value="rarely">Rarely</option>
        <option value="sometimes">Sometimes</option>
        <option value="often">Often</option>
        <option value="always">Always</option>
      </select>
    </div>
    <div class="form-group">
      <label>Do you avoid single-use plastics?</label>
      <select id="q4">
        <option value="never">Never</option>
        <option value="rarely">Rarely</option>
        <option value="sometimes">Sometimes</option>
        <option value="often">Often</option>
        <option value="always">Always</option>
      </select>
    </div>
    <div class="form-group">
      <label>Do you recycle or reuse household packaging?</label>
      <select id="q5">
        <option value="never">Never</option>
        <option value="rarely">Rarely</option>
        <option value="sometimes">Sometimes</option>
        <option value="often">Often</option>
        <option value="always">Always</option>
      </select>
    </div>
    <div class="form-group">
      <label>Do you use energy-saving habits like LED bulbs or unplugging devices?</label>
      <select id="q6">
        <option value="never">Never</option>
        <option value="rarely">Rarely</option>
        <option value="sometimes">Sometimes</option>
        <option value="often">Often</option>
        <option value="always">Always</option>
      </select>
    </div>
    <button id="survey-submit">Save my baseline score</button>
  `;
  showPanel(surveyPanel);
  document.getElementById('survey-submit').addEventListener('click', submitSurvey);
}

function submitSurvey() {
  const answers = {
    q1: document.getElementById('q1').value,
    q2: document.getElementById('q2').value,
    q3: document.getElementById('q3').value,
    q4: document.getElementById('q4').value,
    q5: document.getElementById('q5').value,
    q6: document.getElementById('q6').value
  };
  state.user.eco_score = calculateBaselineScore(answers);
  state.user.onboarding_complete = 1;
  saveUsers();
  renderDashboard();
}

function calculateBaselineScore(answers) {
  const scoring = {
    never: 0,
    rarely: 2,
    sometimes: 5,
    often: 8,
    always: 12
  };
  const keys = ['q1', 'q2', 'q3', 'q4', 'q5', 'q6'];
  return 40 + keys.reduce((sum, key) => {
    const response = answers[key] || 'never';
    return sum + (scoring[response] ?? 0);
  }, 0);
}

function renderDashboard() {
  checkAchievements();

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
          <button class="nav-btn outline" id="sign-out">Sign out</button>
        </div>
      </div>
    </div>
    <div class="score-badge">Eco Score: ${state.user.eco_score}</div>
    <div id="prompt-list" class="card-grid"></div>
    <section class="panel" id="bonus-panel"></section>
    <section class="panel" id="quiz-panel"></section>
    <section class="panel" id="achievements-panel"></section>
    <div class="toast">Use actions, bonus challenges, and quizzes to build your score. Each has its own reward path.</div>
  `;
  showPanel(dashboardPanel);
  document.getElementById('sign-out').addEventListener('click', () => {
    localStorage.removeItem('ecolyfeUser');
    state.user = null;
    renderLogin();
  });
  document.getElementById('go-feed').addEventListener('click', () => {
    renderFeedPanel();
  });
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
