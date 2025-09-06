// Dashboard functionality
class Dashboard {
    constructor() {
        this.currentSection = 'home';
        this.tools = this.getToolsData();
        this.init();
    }
    
    init() {
        this.setupNavigation();
        this.setupToolCategories();
        this.populateTools();
        this.setupLabInteractions();
    }
    
    setupNavigation() {
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const section = link.dataset.section;
                this.switchSection(section);
            });
        });
    }
    
    switchSection(sectionName) {
        // Hide all sections
        document.querySelectorAll('.section').forEach(section => {
            section.classList.remove('active');
        });
        
        // Show target section
        document.getElementById(sectionName).classList.add('active');
        
        // Update nav links
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
        });
        document.querySelector(`[data-section="${sectionName}"]`).classList.add('active');
        
        this.currentSection = sectionName;
    }
    
    setupToolCategories() {
        const categoryBtns = document.querySelectorAll('.category-btn');
        categoryBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                categoryBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                this.filterTools(btn.dataset.category);
            });
        });
    }
    
    filterTools(category) {
        const toolsGrid = document.getElementById('toolsGrid');
        const filteredTools = category === 'all' ? this.tools : this.tools.filter(tool => tool.category === category);
        this.renderTools(filteredTools, toolsGrid);
    }
    
    populateTools() {
        const toolsGrid = document.getElementById('toolsGrid');
        this.renderTools(this.tools, toolsGrid);
    }
    
    renderTools(tools, container) {
        container.innerHTML = '';
        tools.forEach(tool => {
            const toolCard = this.createToolCard(tool);
            container.appendChild(toolCard);
        });
    }
    
    createToolCard(tool) {
        const card = document.createElement('div');
        card.className = 'tool-card';
        card.innerHTML = `
            <h3>${tool.name}</h3>
            <p>${tool.description}</p>
            <div class="tool-details">
                <span class="category-tag">${tool.category}</span>
                <div class="tool-commands">
                    <code>${tool.command}</code>
                </div>
            </div>
            <button class="btn-primary" onclick="launchTool('${tool.id}')">Launch Tool</button>
        `;
        return card;
    }
    
    setupLabInteractions() {
        const labCards = document.querySelectorAll('.lab-card');
        labCards.forEach(card => {
            const btn = card.querySelector('.btn-primary');
            btn.addEventListener('click', () => {
                this.launchLab(card.querySelector('h3').textContent);
            });
        });
    }
    
    launchLab(labName) {
        alert(`Launching ${labName}...\n\nThis would open a secure sandbox environment for ethical hacking practice.`);
    }
    
    getToolsData() {
        return [
            {
                id: 'nmap',
                name: '🔍 Nmap',
                category: 'recon',
                description: 'Network discovery and security auditing tool',
                command: 'nmap -sS -O target_ip'
            },
            {
                id: 'metasploit',
                name: '💥 Metasploit',
                category: 'exploit',
                description: 'Penetration testing framework',
                command: 'msfconsole'
            },
            {
                id: 'aircrack',
                name: '📶 Aircrack-ng',
                category: 'wireless',
                description: 'Wireless network security assessment',
                command: 'aircrack-ng capture.cap'
            },
            {
                id: 'burpsuite',
                name: '🕷️ Burp Suite',
                category: 'web',
                description: 'Web application security testing',
                command: 'burpsuite'
            },
            {
                id: 'sqlmap',
                name: '🗄️ SQLMap',
                category: 'web',
                description: 'Automatic SQL injection tool',
                command: 'sqlmap -u "http://target.com/page?id=1"'
            },
            {
                id: 'hashcat',
                name: '🔐 Hashcat',
                category: 'password',
                description: 'Advanced password recovery',
                command: 'hashcat -m 0 hashes.txt wordlist.txt'
            },
            {
                id: 'john',
                name: '🔓 John the Ripper',
                category: 'password',
                description: 'Password cracking tool',
                command: 'john --wordlist=rockyou.txt hashes.txt'
            },
            {
                id: 'nessus',
                name: '🛡️ Nessus',
                category: 'vuln',
                description: 'Vulnerability scanner',
                command: 'nessus-service'
            },
            {
                id: 'wireshark',
                name: '📊 Wireshark',
                category: 'recon',
                description: 'Network protocol analyzer',
                command: 'wireshark'
            },
            {
                id: 'hydra',
                name: '🌊 Hydra',
                category: 'password',
                description: 'Network login cracker',
                command: 'hydra -l admin -P passwords.txt ssh://target'
            },
            {
                id: 'nikto',
                name: '🔎 Nikto',
                category: 'web',
                description: 'Web server scanner',
                command: 'nikto -h http://target.com'
            },
            {
                id: 'maltego',
                name: '🕸️ Maltego',
                category: 'recon',
                description: 'Link analysis and data mining',
                command: 'maltego'
            }
        ];
    }
}

// Global functions
function launchTool(toolId) {
    const messages = {
        'nmap': 'Initializing network scan...\nTarget acquisition in progress...',
        'metasploit': 'Loading Metasploit Framework...\nExploit modules ready...',
        'aircrack': 'Starting wireless audit...\nMonitoring air traffic...',
        'burpsuite': 'Launching web proxy...\nIntercepting HTTP traffic...',
        'sqlmap': 'SQL injection scanner ready...\nDatabase enumeration starting...',
        'hashcat': 'GPU acceleration enabled...\nPassword cracking initiated...',
        'john': 'Dictionary attack configured...\nBrute force in progress...',
        'nessus': 'Vulnerability scan initiated...\nThreat assessment running...',
        'wireshark': 'Packet capture started...\nNetwork analysis active...',
        'hydra': 'Brute force attack ready...\nCredential testing initiated...',
        'nikto': 'Web server scan starting...\nVulnerability detection active...',
        'maltego': 'OSINT gathering initiated...\nData correlation in progress...'
    };
    
    alert(messages[toolId] || 'Tool launching...');
}

function logout() {
    if (confirm('Are you sure you want to exit the system?')) {
        window.location.href = 'index.html';
    }
}

// Initialize dashboard
document.addEventListener('DOMContentLoaded', () => {
    new Dashboard();
});