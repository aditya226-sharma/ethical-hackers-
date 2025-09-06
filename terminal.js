// Terminal simulator
class HackerTerminal {
    constructor() {
        this.terminal = document.getElementById('terminal');
        this.commandInput = document.getElementById('commandInput');
        this.commandHistory = [];
        this.historyIndex = -1;
        this.currentDirectory = '/home/hacker';
        this.isProcessing = false;
        
        this.commands = {
            'help': this.showHelp.bind(this),
            'clear': this.clearTerminal.bind(this),
            'ls': this.listFiles.bind(this),
            'pwd': this.printWorkingDirectory.bind(this),
            'cd': this.changeDirectory.bind(this),
            'nmap': this.runNmap.bind(this),
            'sqlmap': this.runSqlmap.bind(this),
            'aircrack-ng': this.runAircrack.bind(this),
            'metasploit': this.runMetasploit.bind(this),
            'whoami': this.whoami.bind(this),
            'uname': this.uname.bind(this),
            'ps': this.listProcesses.bind(this),
            'netstat': this.netstat.bind(this),
            'ifconfig': this.ifconfig.bind(this),
            'hack': this.hackSimulation.bind(this),
            'matrix': this.matrixMode.bind(this),
            'exit': this.exitTerminal.bind(this)
        };
        
        this.init();
    }
    
    init() {
        this.commandInput.addEventListener('keydown', (e) => this.handleKeydown(e));
        this.commandInput.addEventListener('input', () => this.updateCursor());
    }
    
    handleKeydown(e) {
        if (this.isProcessing) return;
        
        switch(e.key) {
            case 'Enter':
                this.executeCommand();
                break;
            case 'ArrowUp':
                e.preventDefault();
                this.navigateHistory(-1);
                break;
            case 'ArrowDown':
                e.preventDefault();
                this.navigateHistory(1);
                break;
            case 'Tab':
                e.preventDefault();
                this.autoComplete();
                break;
        }
    }
    
    executeCommand() {
        const command = this.commandInput.value.trim();
        if (!command) return;
        
        this.addToHistory(command);
        this.addTerminalLine('prompt', `root@cyberx:${this.currentDirectory}#`, command);
        
        const [cmd, ...args] = command.split(' ');
        
        if (this.commands[cmd]) {
            this.commands[cmd](args);
        } else {
            this.addTerminalLine('error', '', `Command not found: ${cmd}. Type 'help' for available commands.`);
        }
        
        this.commandInput.value = '';
        this.scrollToBottom();
    }
    
    addTerminalLine(type, prompt, content) {
        const line = document.createElement('div');
        line.className = 'terminal-line';
        
        if (prompt) {
            const promptSpan = document.createElement('span');
            promptSpan.className = 'prompt';
            promptSpan.textContent = prompt;
            line.appendChild(promptSpan);
        }
        
        const contentSpan = document.createElement('span');
        contentSpan.className = type;
        contentSpan.textContent = content;
        line.appendChild(contentSpan);
        
        // Insert before the input line
        const inputLine = this.terminal.lastElementChild;
        this.terminal.insertBefore(line, inputLine);
    }
    
    addToHistory(command) {
        this.commandHistory.push(command);
        this.historyIndex = this.commandHistory.length;
    }
    
    navigateHistory(direction) {
        const newIndex = this.historyIndex + direction;
        if (newIndex >= 0 && newIndex <= this.commandHistory.length) {
            this.historyIndex = newIndex;
            this.commandInput.value = this.commandHistory[this.historyIndex] || '';
        }
    }
    
    scrollToBottom() {
        this.terminal.scrollTop = this.terminal.scrollHeight;
    }
    
    updateCursor() {
        // Cursor animation is handled by CSS
    }
    
    // Command implementations
    showHelp() {
        const helpText = [
            'Available Commands:',
            '==================',
            'help          - Show this help message',
            'clear         - Clear terminal screen',
            'ls            - List directory contents',
            'pwd           - Print working directory',
            'cd <dir>      - Change directory',
            'whoami        - Display current user',
            'uname         - System information',
            'ps            - List running processes',
            'netstat       - Network connections',
            'ifconfig      - Network interface info',
            '',
            'Hacking Tools:',
            '==============',
            'nmap <target> - Network scanner',
            'sqlmap <url>  - SQL injection tool',
            'aircrack-ng   - WiFi security testing',
            'metasploit    - Penetration testing framework',
            'hack <target> - Automated hacking simulation',
            'matrix        - Enter the matrix',
            'exit          - Close terminal'
        ];
        
        helpText.forEach(line => {
            this.addTerminalLine('output', '', line);
        });
    }
    
    clearTerminal() {
        const lines = this.terminal.querySelectorAll('.terminal-line:not(:last-child)');
        lines.forEach(line => line.remove());
    }
    
    listFiles() {
        const files = [
            'drwxr-xr-x  2 root root 4096 Jan 15 10:30 exploits/',
            'drwxr-xr-x  2 root root 4096 Jan 15 10:30 payloads/',
            'drwxr-xr-x  2 root root 4096 Jan 15 10:30 wordlists/',
            '-rw-r--r--  1 root root 1337 Jan 15 10:30 targets.txt',
            '-rw-r--r--  1 root root 2048 Jan 15 10:30 passwords.txt',
            '-rwxr-xr-x  1 root root 4096 Jan 15 10:30 hack.sh'
        ];
        
        files.forEach(file => {
            this.addTerminalLine('output', '', file);
        });
    }
    
    printWorkingDirectory() {
        this.addTerminalLine('output', '', this.currentDirectory);
    }
    
    changeDirectory(args) {
        if (args.length === 0) {
            this.currentDirectory = '/home/hacker';
        } else {
            this.currentDirectory = args[0].startsWith('/') ? args[0] : `${this.currentDirectory}/${args[0]}`;
        }
        // Simulate directory change
    }
    
    whoami() {
        this.addTerminalLine('success', '', 'root');
    }
    
    uname() {
        this.addTerminalLine('output', '', 'Linux cyberx 5.15.0-kali3-amd64 #1 SMP Debian 5.15.15-2kali1 x86_64 GNU/Linux');
    }
    
    listProcesses() {
        const processes = [
            'PID  TTY      TIME CMD',
            '1337 pts/0    00:00:01 bash',
            '1338 pts/0    00:00:00 nmap',
            '1339 pts/0    00:00:00 metasploit',
            '1340 pts/0    00:00:00 aircrack-ng'
        ];
        
        processes.forEach(proc => {
            this.addTerminalLine('output', '', proc);
        });
    }
    
    netstat() {
        const connections = [
            'Active Internet connections',
            'Proto Recv-Q Send-Q Local Address           Foreign Address         State',
            'tcp        0      0 0.0.0.0:22              0.0.0.0:*               LISTEN',
            'tcp        0      0 127.0.0.1:3306          0.0.0.0:*               LISTEN',
            'tcp        0      0 0.0.0.0:80              0.0.0.0:*               LISTEN'
        ];
        
        connections.forEach(conn => {
            this.addTerminalLine('output', '', conn);
        });
    }
    
    ifconfig() {
        const interfaces = [
            'eth0: flags=4163<UP,BROADCAST,RUNNING,MULTICAST>  mtu 1500',
            '        inet 192.168.1.100  netmask 255.255.255.0  broadcast 192.168.1.255',
            '        ether 00:0c:29:xx:xx:xx  txqueuelen 1000  (Ethernet)',
            '',
            'wlan0: flags=4163<UP,BROADCAST,RUNNING,MULTICAST>  mtu 1500',
            '        inet 192.168.0.50  netmask 255.255.255.0  broadcast 192.168.0.255',
            '        ether 02:00:00:xx:xx:xx  txqueuelen 1000  (Ethernet)'
        ];
        
        interfaces.forEach(iface => {
            this.addTerminalLine('output', '', iface);
        });
    }
    
    async runNmap(args) {
        const target = args[0] || '192.168.1.1';
        this.isProcessing = true;
        
        this.addTerminalLine('output', '', `Starting Nmap scan on ${target}...`);
        await this.delay(1000);
        
        this.addTerminalLine('scan-progress', '', 'Initiating SYN Stealth Scan...');
        await this.delay(1500);
        
        this.addTerminalLine('scan-progress', '', 'Scanning 1000 ports...');
        await this.delay(2000);
        
        const results = [
            'PORT     STATE SERVICE',
            '22/tcp   open  ssh',
            '80/tcp   open  http',
            '443/tcp  open  https',
            '3306/tcp open  mysql'
        ];
        
        for (const result of results) {
            this.addTerminalLine('scan-result', '', result);
            await this.delay(300);
        }
        
        this.addTerminalLine('success', '', 'Nmap scan completed successfully!');
        this.isProcessing = false;
    }
    
    async runSqlmap(args) {
        const url = args[0] || 'http://target.com/login.php?id=1';
        this.isProcessing = true;
        
        this.addTerminalLine('output', '', `Testing SQL injection on ${url}...`);
        await this.delay(1000);
        
        this.addTerminalLine('scan-progress', '', 'Testing connection to the target URL...');
        await this.delay(1500);
        
        this.addTerminalLine('scan-progress', '', 'Testing for SQL injection vulnerabilities...');
        await this.delay(2000);
        
        this.addTerminalLine('warning', '', 'Parameter "id" appears to be vulnerable!');
        await this.delay(1000);
        
        this.addTerminalLine('success', '', 'SQL injection vulnerability confirmed!');
        this.addTerminalLine('output', '', 'Database: mysql_db');
        this.addTerminalLine('output', '', 'Tables: users, admin, products');
        
        this.isProcessing = false;
    }
    
    async runAircrack() {
        this.isProcessing = true;
        
        this.addTerminalLine('output', '', 'Starting wireless security assessment...');
        await this.delay(1000);
        
        this.addTerminalLine('scan-progress', '', 'Scanning for wireless networks...');
        await this.delay(2000);
        
        const networks = [
            'BSSID              PWR  Beacons    #Data, #/s  CH  MB   ENC  ESSID',
            '00:14:6C:7E:40:80  -30       10        0    0  11  54e  WPA2 HomeNetwork',
            '00:14:6C:7A:40:80  -45        8        0    0   6  54e  WEP  OldRouter',
            '00:18:39:7A:40:80  -60        5        0    0   1  54e  WPA2 OfficeWiFi'
        ];
        
        for (const network of networks) {
            this.addTerminalLine('scan-result', '', network);
            await this.delay(500);
        }
        
        this.addTerminalLine('success', '', 'Wireless scan completed!');
        this.isProcessing = false;
    }
    
    async runMetasploit() {
        this.isProcessing = true;
        
        const asciiArt = `
    =[ metasploit v6.2.26-dev                          ]
+ -- --=[ 2230 exploits - 1177 auxiliary - 398 post       ]
+ -- --=[ 867 payloads - 45 encoders - 11 nops            ]
+ -- --=[ 9 evasion                                        ]
        `;
        
        this.addTerminalLine('ascii-art', '', asciiArt);
        await this.delay(2000);
        
        this.addTerminalLine('output', '', 'msf6 > use exploit/multi/handler');
        await this.delay(1000);
        
        this.addTerminalLine('output', '', 'msf6 exploit(multi/handler) > set payload windows/meterpreter/reverse_tcp');
        await this.delay(1000);
        
        this.addTerminalLine('success', '', 'Metasploit framework ready for exploitation!');
        this.isProcessing = false;
    }
    
    async hackSimulation(args) {
        const target = args[0] || 'target.com';
        this.isProcessing = true;
        
        this.addTerminalLine('hack-animation', '', `Initiating hack sequence on ${target}...`);
        await this.delay(1000);
        
        const steps = [
            'Scanning for open ports...',
            'Enumerating services...',
            'Testing for vulnerabilities...',
            'Exploiting weak authentication...',
            'Gaining shell access...',
            'Escalating privileges...',
            'Installing backdoor...',
            'Covering tracks...'
        ];
        
        for (const step of steps) {
            this.addTerminalLine('hack-animation', '', step);
            await this.delay(800);
        }
        
        this.addTerminalLine('success', '', `Successfully compromised ${target}!`);
        this.addTerminalLine('warning', '', 'Remember: This is for educational purposes only!');
        this.isProcessing = false;
    }
    
    matrixMode() {
        this.addTerminalLine('success', '', 'Entering the Matrix...');
        this.addTerminalLine('output', '', 'Wake up, Neo...');
        // Matrix effect is already running in background
    }
    
    exitTerminal() {
        this.addTerminalLine('output', '', 'Goodbye, hacker. Stay ethical!');
        setTimeout(() => {
            window.close();
        }, 2000);
    }
    
    autoComplete() {
        const input = this.commandInput.value;
        const matches = Object.keys(this.commands).filter(cmd => cmd.startsWith(input));
        
        if (matches.length === 1) {
            this.commandInput.value = matches[0];
        } else if (matches.length > 1) {
            this.addTerminalLine('output', '', matches.join('  '));
        }
    }
    
    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}

// Initialize terminal
document.addEventListener('DOMContentLoaded', () => {
    new HackerTerminal();
});