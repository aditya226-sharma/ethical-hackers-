// Authentication and form handling
class AuthSystem {
    constructor() {
        this.loginForm = document.getElementById('loginForm');
        this.registerForm = document.getElementById('registerForm');
        this.statusMessage = document.getElementById('statusMessage');
        
        this.init();
    }
    
    init() {
        this.loginForm.addEventListener('submit', (e) => this.handleLogin(e));
        this.registerForm.addEventListener('submit', (e) => this.handleRegister(e));
    }
    
    async handleLogin(e) {
        e.preventDefault();
        
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        
        if (!username || !password) {
            this.showError('⚠ All fields required for system access');
            return;
        }
        
        this.showLoading(true);
        
        // Simulate authentication delay
        await this.delay(2000);
        
        // Demo credentials
        if (username === 'admin' && password === 'hack123') {
            this.showSuccess('✓ Access Granted... Redirecting to Hackers Hub');
            await this.delay(1500);
            this.redirectToDashboard();
        } else {
            this.showError('⚠ Unauthorized Access Detected - Invalid Credentials');
            this.showLoading(false);
        }
    }
    
    async handleRegister(e) {
        e.preventDefault();
        
        const email = document.getElementById('regEmail').value;
        const alias = document.getElementById('regAlias').value;
        const password = document.getElementById('regPassword').value;
        
        if (!email || !alias || !password) {
            this.showError('⚠ All fields required for network access');
            return;
        }
        
        if (password.length < 6) {
            this.showError('⚠ Access key must be at least 6 characters');
            return;
        }
        
        this.showLoading(true);
        
        // Simulate registration delay
        await this.delay(2000);
        
        this.showSuccess('✓ Hacker profile created successfully');
        await this.delay(1500);
        this.showLogin();
        this.showLoading(false);
    }
    
    showError(message) {
        this.statusMessage.className = 'status-message error';
        this.statusMessage.textContent = message;
        
        // Add shake effect to login card
        document.querySelector('.login-card').style.animation = 'shake 0.5s ease';
        setTimeout(() => {
            document.querySelector('.login-card').style.animation = 'glow 2s ease-in-out infinite alternate';
        }, 500);
    }
    
    showSuccess(message) {
        this.statusMessage.className = 'status-message success';
        typeText(this.statusMessage, message, 30);
    }
    
    showLoading(show) {
        const button = document.querySelector('.btn-primary');
        if (show) {
            button.classList.add('loading');
            button.disabled = true;
        } else {
            button.classList.remove('loading');
            button.disabled = false;
        }
    }
    
    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
    
    redirectToDashboard() {
        window.location.href = 'dashboard.html';
    }
}

// Form switching functions
function showRegister() {
    document.getElementById('loginForm').classList.add('hidden');
    document.getElementById('registerForm').classList.remove('hidden');
    document.getElementById('statusMessage').textContent = '';
}

function showLogin() {
    document.getElementById('registerForm').classList.add('hidden');
    document.getElementById('loginForm').classList.remove('hidden');
    document.getElementById('statusMessage').textContent = '';
}

// Initialize auth system
document.addEventListener('DOMContentLoaded', () => {
    new AuthSystem();
});