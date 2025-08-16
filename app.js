// Application Data
const appData = {
  "surveyQuestions": [
    {
      "id": 1,
      "type": "multiple_choice",
      "question": "What is your primary occupation?",
      "options": ["Agriculture", "Manufacturing", "Services", "Government", "Self-employed", "Student", "Unemployed"],
      "category": "Employment"
    },
    {
      "id": 2,
      "type": "rating",
      "question": "How satisfied are you with government services?",
      "scale": 5,
      "category": "Governance"
    },
    {
      "id": 3,
      "type": "text",
      "question": "What are the main challenges in your locality?",
      "category": "Infrastructure"
    }
  ],
  "responseData": [
    {
      "id": 1,
      "respondent": "R001",
      "state": "Karnataka",
      "district": "Bengaluru Urban",
      "occupation": "Services",
      "satisfaction": 4,
      "timestamp": "2024-08-14T10:30:00",
      "deviceType": "Smartphone",
      "responseTime": 245,
      "gpsLocation": "12.9716,77.5946"
    },
    {
      "id": 2,
      "respondent": "R002", 
      "state": "Rajasthan",
      "district": "Jaipur",
      "occupation": "Agriculture",
      "satisfaction": 3,
      "timestamp": "2024-08-14T11:15:00",
      "deviceType": "Feature Phone",
      "responseTime": 312,
      "gpsLocation": "26.9124,75.7873"
    }
  ],
  "enumerators": [
    {
      "id": "E001",
      "name": "Priya Sharma",
      "state": "Karnataka",
      "surveysCompleted": 127,
      "qualityScore": 92,
      "avgResponseTime": 8.3,
      "lastActive": "2024-08-14T14:20:00"
    },
    {
      "id": "E002",
      "name": "Rajesh Kumar",
      "state": "Rajasthan", 
      "surveysCompleted": 89,
      "qualityScore": 88,
      "avgResponseTime": 9.1,
      "lastActive": "2024-08-14T13:45:00"
    }
  ],
  "indiaStates": [
    {"name": "Andhra Pradesh", "responses": 1240, "completion": 78},
    {"name": "Karnataka", "responses": 1456, "completion": 85},
    {"name": "Rajasthan", "responses": 987, "completion": 72},
    {"name": "Maharashtra", "responses": 1678, "completion": 89},
    {"name": "Tamil Nadu", "responses": 1234, "completion": 82},
    {"name": "Gujarat", "responses": 1098, "completion": 76},
    {"name": "West Bengal", "responses": 1345, "completion": 79}
  ],
  "languages": [
    {"code": "en", "name": "English", "isDefault": true},
    {"code": "hi", "name": "हिंदी (Hindi)", "rtl": false},
    {"code": "bn", "name": "বাংলা (Bengali)", "rtl": false},
    {"code": "te", "name": "తెలుగు (Telugu)", "rtl": false},
    {"code": "mr", "name": "मराठी (Marathi)", "rtl": false},
    {"code": "ta", "name": "தমிழ் (Tamil)", "rtl": false},
    {"code": "gu", "name": "ગુજરાતી (Gujarati)", "rtl": false},
    {"code": "ur", "name": "اردو (Urdu)", "rtl": true}
  ],
  "qualityMetrics": [
    {"metric": "Response Rate", "value": 82, "trend": "+5%", "status": "good"},
    {"metric": "Data Completeness", "value": 94, "trend": "+2%", "status": "excellent"},
    {"metric": "Response Time", "value": 7.8, "trend": "-0.3min", "status": "good", "unit": "min"},
    {"metric": "Quality Score", "value": 91, "trend": "+3%", "status": "excellent"}
  ],
  "distributionChannels": [
    {"channel": "WhatsApp", "sent": 15000, "completed": 12500, "rate": "83%"},
    {"channel": "Phone/IVR", "sent": 8000, "completed": 6200, "rate": "78%"},
    {"channel": "Web Portal", "sent": 5000, "completed": 4100, "rate": "82%"},
    {"channel": "Email", "sent": 3000, "completed": 2100, "rate": "70%"}
  ],
  "aiInsights": [
    "Rural respondents show 15% higher satisfaction with digital services compared to last survey",
    "WhatsApp surveys achieve 23% higher completion rates than traditional methods", 
    "Response quality improves by 18% when using local language options",
    "Peak response times are between 7-9 PM across all demographics"
  ]
};

// Global Variables
let currentSection = 'dashboard';
let surveyQuestions = [];
let charts = {};
let aiGeneratedSuggestions = [];

// Initialize Application
document.addEventListener('DOMContentLoaded', function() {
    console.log('Initializing MoSPI Smart Survey Platform...');
    initializeNavigation();
    initializeTabs();
    initializeSurveyBuilder();
    initializeAvatarInterface();
    initializeModals();
    
    // Initialize charts after a short delay to ensure elements are rendered
    setTimeout(() => {
        initializeCharts();
    }, 100);
    
    console.log('Application initialized successfully');
});

// Navigation System
function initializeNavigation() {
    console.log('Setting up navigation...');
    const navItems = document.querySelectorAll('.nav-item');
    
    navItems.forEach((item, index) => {
        console.log(`Setting up nav item ${index}: ${item.getAttribute('data-section')}`);
        item.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            const sectionId = this.getAttribute('data-section');
            console.log(`Navigation clicked: ${sectionId}`);
            switchSection(sectionId);
        });
    });
}

function switchSection(sectionId) {
    console.log(`Switching to section: ${sectionId}`);
    
    // Hide all sections
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        section.classList.remove('active');
    });
    
    // Show selected section
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.classList.add('active');
        console.log(`Section ${sectionId} activated`);
    } else {
        console.error(`Section ${sectionId} not found`);
        return;
    }
    
    // Update navigation
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        item.classList.remove('active');
    });
    
    const activeNavItem = document.querySelector(`[data-section="${sectionId}"]`);
    if (activeNavItem) {
        activeNavItem.classList.add('active');
    }
    
    currentSection = sectionId;
    
    // Initialize section-specific functionality
    setTimeout(() => {
        if (sectionId === 'monitoring') {
            initializeMonitoringCharts();
        } else if (sectionId === 'analytics') {
            initializeAnalyticsCharts();
        } else if (sectionId === 'quality') {
            initializeQualityCharts();
        }
    }, 100);
    
    // Show notification
    showNotification(`Switched to ${sectionId.replace('-', ' ')} section`, 'success');
}

// Tab System
function initializeTabs() {
    console.log('Setting up tabs...');
    const tabBtns = document.querySelectorAll('.tab-btn');
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const tabId = this.getAttribute('data-tab');
            const container = this.closest('.distribution-tabs');
            switchTab(tabId, container);
        });
    });
}

function switchTab(tabId, container) {
    console.log(`Switching to tab: ${tabId}`);
    
    // Hide all tab panels
    const panels = container.querySelectorAll('.tab-panel');
    panels.forEach(panel => {
        panel.classList.remove('active');
    });
    
    // Show selected panel
    const targetPanel = container.querySelector(`#${tabId}`);
    if (targetPanel) {
        targetPanel.classList.add('active');
    }
    
    // Update tab buttons
    const tabBtns = container.querySelectorAll('.tab-btn');
    tabBtns.forEach(btn => {
        btn.classList.remove('active');
    });
    
    const activeBtn = container.querySelector(`[data-tab="${tabId}"]`);
    if (activeBtn) {
        activeBtn.classList.add('active');
    }
    
    showNotification(`Switched to ${tabId} channel`, 'success');
}

// Survey Builder
function initializeSurveyBuilder() {
    console.log('Setting up survey builder...');
    const questionTypes = document.querySelectorAll('.question-type');
    const canvas = document.getElementById('survey-canvas');
    
    if (!canvas) {
        console.error('Survey canvas not found');
        return;
    }
    
    questionTypes.forEach(type => {
        type.addEventListener('dragstart', function(e) {
            e.dataTransfer.setData('text/plain', this.getAttribute('data-type'));
            console.log(`Dragging question type: ${this.getAttribute('data-type')}`);
        });
    });
    
    canvas.addEventListener('dragover', function(e) {
        e.preventDefault();
    });
    
    canvas.addEventListener('drop', function(e) {
        e.preventDefault();
        const questionType = e.dataTransfer.getData('text/plain');
        console.log(`Dropped question type: ${questionType}`);
        addQuestionToSurvey(questionType);
    });
}

function addQuestionToSurvey(type) {
    const canvas = document.getElementById('survey-canvas');
    if (!canvas) return;
    
    const questionElement = createQuestionElement(type);
    
    // Clear placeholder if this is the first question
    const placeholder = canvas.querySelector('.canvas-placeholder');
    if (placeholder) {
        canvas.innerHTML = '';
    }
    
    canvas.appendChild(questionElement);
    surveyQuestions.push({
        id: surveyQuestions.length + 1,
        type: type,
        question: getDefaultQuestionText(type)
    });
    
    showNotification(`Added ${getDefaultQuestionText(type)}`, 'success');
}

function createQuestionElement(type) {
    const div = document.createElement('div');
    div.className = 'survey-question';
    div.style.cssText = `
        background: var(--color-surface);
        border: 1px solid var(--color-border);
        border-radius: var(--radius-base);
        padding: var(--space-16);
        margin-bottom: var(--space-16);
        cursor: pointer;
        transition: all 0.2s ease;
    `;
    
    div.innerHTML = `
        <div style="display: flex; justify-content: space-between; align-items: center;">
            <div>
                <h4 style="margin: 0 0 8px 0; color: var(--mospi-navy);">${getQuestionTypeIcon(type)} ${getDefaultQuestionText(type)}</h4>
                <p style="margin: 0; color: var(--mospi-gray); font-size: var(--font-size-sm);">Click to edit this question</p>
            </div>
            <button onclick="removeQuestion(this)" style="background: none; border: none; color: var(--color-error); cursor: pointer; font-size: 1.2rem; padding: 4px;">🗑️</button>
        </div>
    `;
    
    // Add hover effect
    div.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-2px)';
        this.style.boxShadow = 'var(--shadow-md)';
    });
    
    div.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
        this.style.boxShadow = 'var(--shadow-sm)';
    });
    
    return div;
}

function getQuestionTypeIcon(type) {
    const icons = {
        'multiple_choice': '☑️',
        'rating': '⭐',
        'text': '📝',
        'conditional': '🔀'
    };
    return icons[type] || '❓';
}

function getDefaultQuestionText(type) {
    const defaults = {
        'multiple_choice': 'New Multiple Choice Question',
        'rating': 'New Rating Scale Question',
        'text': 'New Text Input Question',
        'conditional': 'New Conditional Question'
    };
    return defaults[type] || 'New Question';
}

function removeQuestion(button) {
    const questionElement = button.closest('.survey-question');
    if (questionElement) {
        questionElement.style.transition = 'all 0.3s ease';
        questionElement.style.opacity = '0';
        questionElement.style.transform = 'translateX(-20px)';
        
        setTimeout(() => {
            questionElement.remove();
            showNotification('Question removed', 'success');
        }, 300);
    }
}

// AI Question Generator
function generateAIQuestion() {
    const promptInput = document.getElementById('ai-prompt');
    const suggestionsDiv = document.getElementById('ai-suggestions');
    
    if (!promptInput || !suggestionsDiv) {
        console.error('AI generator elements not found');
        return;
    }
    
    const prompt = promptInput.value.trim();
    
    if (!prompt) {
        showNotification('Please enter a description of what you want to ask.', 'error');
        return;
    }
    
    console.log(`Generating AI questions for prompt: ${prompt}`);
    
    // Simulate AI processing
    suggestionsDiv.innerHTML = '<div style="text-align: center; color: var(--mospi-gray); padding: var(--space-16);"><em>🤖 AI is generating questions...</em></div>';
    suggestionsDiv.classList.remove('hidden');
    
    setTimeout(() => {
        const suggestions = generateQuestionSuggestions(prompt);
        displayAISuggestions(suggestions);
    }, 2000);
}

function generateQuestionSuggestions(prompt) {
    // Simple AI simulation based on keywords
    const suggestions = [];
    const lowerPrompt = prompt.toLowerCase();
    
    if (lowerPrompt.includes('income') || lowerPrompt.includes('salary') || lowerPrompt.includes('earning')) {
        suggestions.push({
            type: 'multiple_choice',
            question: 'What is your monthly household income range?',
            options: ['Below ₹20,000', '₹20,000-₹50,000', '₹50,000-₹1,00,000', 'Above ₹1,00,000']
        });
    }
    
    if (lowerPrompt.includes('satisfaction') || lowerPrompt.includes('service') || lowerPrompt.includes('rating')) {
        suggestions.push({
            type: 'rating',
            question: 'How would you rate your satisfaction with local government services?',
            scale: 5
        });
    }
    
    if (lowerPrompt.includes('challenge') || lowerPrompt.includes('problem') || lowerPrompt.includes('issue')) {
        suggestions.push({
            type: 'text',
            question: 'What are the main challenges faced by your community?'
        });
    }
    
    if (lowerPrompt.includes('age') || lowerPrompt.includes('demographic')) {
        suggestions.push({
            type: 'multiple_choice',
            question: 'What is your age group?',
            options: ['18-25 years', '26-35 years', '36-45 years', '46-60 years', 'Above 60 years']
        });
    }
    
    if (lowerPrompt.includes('education') || lowerPrompt.includes('qualification')) {
        suggestions.push({
            type: 'multiple_choice',
            question: 'What is your highest educational qualification?',
            options: ['Primary School', 'Secondary School', 'Graduate', 'Post Graduate', 'Professional Degree']
        });
    }
    
    // Default suggestion if no matches
    if (suggestions.length === 0) {
        suggestions.push({
            type: 'text',
            question: 'Please provide your thoughts on: ' + prompt
        });
    }
    
    aiGeneratedSuggestions = suggestions;
    return suggestions;
}

function displayAISuggestions(suggestions) {
    const suggestionsDiv = document.getElementById('ai-suggestions');
    let html = '<h4 style="margin: 0 0 12px 0; color: var(--mospi-navy);">🤖 AI Generated Questions:</h4>';
    
    suggestions.forEach((suggestion, index) => {
        html += `
            <div style="background: var(--color-surface); border: 1px solid var(--color-success); border-radius: var(--radius-base); padding: var(--space-12); margin-bottom: var(--space-8);">
                <div style="font-weight: var(--font-weight-medium); margin-bottom: var(--space-8); color: var(--color-text);">${suggestion.question}</div>
                ${suggestion.options ? '<div style="font-size: var(--font-size-sm); color: var(--mospi-gray);">Options: ' + suggestion.options.join(', ') + '</div>' : ''}
                ${suggestion.scale ? '<div style="font-size: var(--font-size-sm); color: var(--mospi-gray);">Scale: 1 to ' + suggestion.scale + '</div>' : ''}
                <button onclick="addAIQuestionToSurvey(${index})" style="background: var(--mospi-blue); color: white; border: none; padding: 6px 12px; border-radius: var(--radius-sm); font-size: var(--font-size-xs); margin-top: var(--space-8); cursor: pointer; transition: background 0.2s ease;">✅ Add to Survey</button>
            </div>
        `;
    });
    
    suggestionsDiv.innerHTML = html;
}

function addAIQuestionToSurvey(index) {
    if (index < aiGeneratedSuggestions.length) {
        const suggestion = aiGeneratedSuggestions[index];
        addQuestionToSurvey(suggestion.type);
        showNotification('AI question added to survey! 🎉', 'success');
    }
}

// AI Avatar Interface
function initializeAvatarInterface() {
    console.log('Setting up avatar interface...');
    const avatarOptions = document.querySelectorAll('.avatar-option');
    
    avatarOptions.forEach(option => {
        option.addEventListener('click', function() {
            avatarOptions.forEach(opt => opt.classList.remove('active'));
            this.classList.add('active');
            
            const avatarType = this.getAttribute('data-avatar');
            updateAvatar(avatarType);
        });
    });
}

function updateAvatar(type) {
    const avatarFace = document.querySelector('.avatar-face');
    if (avatarFace) {
        avatarFace.textContent = type === 'female' ? '👩' : '👨';
        showNotification(`Avatar changed to ${type}`, 'success');
    }
}

function startAvatarSurvey() {
    console.log('Starting avatar survey...');
    const conversationLog = document.getElementById('conversation-log');
    const avatarSpeaking = document.getElementById('avatar-speaking');
    const avatarStatus = document.getElementById('avatar-status');
    
    if (!conversationLog || !avatarSpeaking || !avatarStatus) {
        console.error('Avatar interface elements not found');
        return;
    }
    
    // Show speaking indicator
    avatarSpeaking.classList.remove('hidden');
    avatarStatus.textContent = 'Speaking...';
    
    showNotification('Avatar survey started! 🤖', 'success');
    
    // Simulate avatar asking questions
    setTimeout(() => {
        addAvatarMessage("Let's start with your basic information. What is your primary occupation?", true);
        avatarSpeaking.classList.add('hidden');
        avatarStatus.textContent = 'Waiting for response...';
    }, 2000);
    
    setTimeout(() => {
        addAvatarMessage("Agriculture", false);
        avatarSpeaking.classList.remove('hidden');
        avatarStatus.textContent = 'Speaking...';
    }, 4000);
    
    setTimeout(() => {
        addAvatarMessage("Thank you! How would you rate your satisfaction with government services on a scale of 1 to 5?", true);
        avatarSpeaking.classList.add('hidden');
        avatarStatus.textContent = 'Waiting for response...';
    }, 6000);
    
    setTimeout(() => {
        addAvatarMessage("4", false);
        avatarSpeaking.classList.remove('hidden');
        avatarStatus.textContent = 'Speaking...';
    }, 8000);
    
    setTimeout(() => {
        addAvatarMessage("Excellent! Thank you for participating in our survey. Your responses will help improve government services.", true);
        avatarSpeaking.classList.add('hidden');
        avatarStatus.textContent = 'Survey completed';
    }, 10000);
}

function pauseAvatarSurvey() {
    const avatarStatus = document.getElementById('avatar-status');
    const avatarSpeaking = document.getElementById('avatar-speaking');
    
    if (avatarStatus) {
        avatarStatus.textContent = 'Survey paused';
    }
    if (avatarSpeaking) {
        avatarSpeaking.classList.add('hidden');
    }
    
    showNotification('Avatar survey paused', 'success');
}

function resetAvatarSurvey() {
    const conversationLog = document.getElementById('conversation-log');
    const avatarStatus = document.getElementById('avatar-status');
    const avatarSpeaking = document.getElementById('avatar-speaking');
    
    if (conversationLog) {
        conversationLog.innerHTML = `
            <div class="conversation-item avatar-message">
                <div class="message-avatar">🤖</div>
                <div class="message-content">
                    <p>Hello! I'm Priya, your AI survey assistant. I'll help you complete this survey in your preferred language. Shall we begin?</p>
                </div>
            </div>
        `;
    }
    
    if (avatarStatus) {
        avatarStatus.textContent = 'Ready to start survey';
    }
    
    if (avatarSpeaking) {
        avatarSpeaking.classList.add('hidden');
    }
    
    showNotification('Avatar survey reset', 'success');
}

function addAvatarMessage(message, isAvatar) {
    const conversationLog = document.getElementById('conversation-log');
    if (!conversationLog) return;
    
    const messageDiv = document.createElement('div');
    messageDiv.className = `conversation-item ${isAvatar ? 'avatar-message' : 'user-message'}`;
    messageDiv.style.opacity = '0';
    messageDiv.style.transform = 'translateY(10px)';
    
    messageDiv.innerHTML = `
        <div class="message-avatar">${isAvatar ? '🤖' : '👤'}</div>
        <div class="message-content">
            <p>${message}</p>
        </div>
    `;
    
    conversationLog.appendChild(messageDiv);
    
    // Animate in
    setTimeout(() => {
        messageDiv.style.transition = 'all 0.3s ease';
        messageDiv.style.opacity = '1';
        messageDiv.style.transform = 'translateY(0)';
    }, 100);
    
    conversationLog.scrollTop = conversationLog.scrollHeight;
}

// Chart Initialization
function initializeCharts() {
    console.log('Setting up charts...');
    // Charts will be initialized when their respective sections are accessed
}

function initializeMonitoringCharts() {
    console.log('Initializing monitoring charts...');
    
    if (charts.responseChart) {
        charts.responseChart.destroy();
    }
    
    const ctx = document.getElementById('responseChart');
    if (ctx) {
        try {
            charts.responseChart = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                    datasets: [{
                        label: 'Daily Responses',
                        data: [3200, 2800, 3500, 4100, 3900, 2200, 1800],
                        borderColor: '#1FB8CD',
                        backgroundColor: 'rgba(31, 184, 205, 0.1)',
                        tension: 0.4,
                        fill: true
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            display: false
                        }
                    },
                    scales: {
                        y: {
                            beginAtZero: true,
                            grid: {
                                color: 'rgba(0,0,0,0.1)'
                            }
                        },
                        x: {
                            grid: {
                                display: false
                            }
                        }
                    }
                }
            });
            console.log('Response chart created successfully');
        } catch (error) {
            console.error('Error creating response chart:', error);
        }
    }
}

function initializeAnalyticsCharts() {
    console.log('Initializing analytics charts...');
    initializeStateChart();
    initializeChannelChart();
}

function initializeStateChart() {
    if (charts.stateChart) {
        charts.stateChart.destroy();
    }
    
    const ctx = document.getElementById('stateChart');
    if (ctx) {
        try {
            charts.stateChart = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: appData.indiaStates.map(state => state.name),
                    datasets: [{
                        label: 'Responses',
                        data: appData.indiaStates.map(state => state.responses),
                        backgroundColor: ['#1FB8CD', '#FFC185', '#B4413C', '#ECEBD5', '#5D878F', '#DB4545', '#D2BA4C']
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            display: false
                        }
                    },
                    scales: {
                        y: {
                            beginAtZero: true,
                            grid: {
                                color: 'rgba(0,0,0,0.1)'
                            }
                        },
                        x: {
                            grid: {
                                display: false
                            }
                        }
                    }
                }
            });
            console.log('State chart created successfully');
        } catch (error) {
            console.error('Error creating state chart:', error);
        }
    }
}

function initializeChannelChart() {
    if (charts.channelChart) {
        charts.channelChart.destroy();
    }
    
    const ctx = document.getElementById('channelChart');
    if (ctx) {
        try {
            charts.channelChart = new Chart(ctx, {
                type: 'doughnut',
                data: {
                    labels: appData.distributionChannels.map(ch => ch.channel),
                    datasets: [{
                        data: appData.distributionChannels.map(ch => ch.completed),
                        backgroundColor: ['#1FB8CD', '#FFC185', '#B4413C', '#ECEBD5']
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            position: 'bottom'
                        }
                    }
                }
            });
            console.log('Channel chart created successfully');
        } catch (error) {
            console.error('Error creating channel chart:', error);
        }
    }
}

function initializeQualityCharts() {
    console.log('Initializing quality charts...');
    initializeResponseTimeChart();
    initializeDeviceChart();
}

function initializeResponseTimeChart() {
    if (charts.responseTimeChart) {
        charts.responseTimeChart.destroy();
    }
    
    const ctx = document.getElementById('responseTimeChart');
    if (ctx) {
        try {
            charts.responseTimeChart = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: ['<2 min', '2-5 min', '5-10 min', '10-15 min', '>15 min'],
                    datasets: [{
                        label: 'Response Count',
                        data: [120, 850, 1200, 650, 180],
                        backgroundColor: '#1FB8CD'
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            display: false
                        }
                    },
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    }
                }
            });
            console.log('Response time chart created successfully');
        } catch (error) {
            console.error('Error creating response time chart:', error);
        }
    }
}

function initializeDeviceChart() {
    if (charts.deviceChart) {
        charts.deviceChart.destroy();
    }
    
    const ctx = document.getElementById('deviceChart');
    if (ctx) {
        try {
            charts.deviceChart = new Chart(ctx, {
                type: 'pie',
                data: {
                    labels: ['Smartphone', 'Feature Phone', 'Tablet', 'Desktop'],
                    datasets: [{
                        data: [65, 25, 7, 3],
                        backgroundColor: ['#1FB8CD', '#FFC185', '#B4413C', '#ECEBD5']
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            position: 'bottom'
                        }
                    }
                }
            });
            console.log('Device chart created successfully');
        } catch (error) {
            console.error('Error creating device chart:', error);
        }
    }
}

// Modal System
function initializeModals() {
    console.log('Setting up modals...');
    const modals = document.querySelectorAll('.modal');
    
    modals.forEach(modal => {
        const closeBtn = modal.querySelector('.modal-close');
        
        if (closeBtn) {
            closeBtn.addEventListener('click', function() {
                modal.classList.add('hidden');
            });
        }
        
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                modal.classList.add('hidden');
            }
        });
    });
}

function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('hidden');
    }
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add('hidden');
    }
}

// Utility Functions
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#1FB8CD' : '#DC2626'};
        color: white;
        padding: 12px 16px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 1001;
        font-size: 14px;
        font-weight: 500;
        max-width: 300px;
        animation: slideIn 0.3s ease-out;
    `;
    
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-in forwards';
        setTimeout(() => {
            if (document.body.contains(notification)) {
                document.body.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from { 
            transform: translateX(100%); 
            opacity: 0; 
        }
        to { 
            transform: translateX(0); 
            opacity: 1; 
        }
    }
    
    @keyframes slideOut {
        from { 
            transform: translateX(0); 
            opacity: 1; 
        }
        to { 
            transform: translateX(100%); 
            opacity: 0; 
        }
    }
    
    .survey-question:hover {
        transform: translateY(-2px);
        box-shadow: var(--shadow-md);
    }
`;
document.head.appendChild(style);

// Export functions to global scope for HTML onclick handlers
window.switchSection = switchSection;
window.generateAIQuestion = generateAIQuestion;
window.addAIQuestionToSurvey = addAIQuestionToSurvey;
window.startAvatarSurvey = startAvatarSurvey;
window.pauseAvatarSurvey = pauseAvatarSurvey;
window.resetAvatarSurvey = resetAvatarSurvey;
window.removeQuestion = removeQuestion;
window.openModal = openModal;
window.closeModal = closeModal;