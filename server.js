const fs = require('fs');
const path = require('path');
const http = require('http');

const PORT = process.env.PORT || 3000;
const SIGNUPS_FILE = path.join(__dirname, 'signups.json');

// Ensure signups.json exists
if (!fs.existsSync(SIGNUPS_FILE)) {
    fs.writeFileSync(SIGNUPS_FILE, JSON.stringify([], null, 2));
}

const server = http.createServer((req, res) => {
    // Set CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        res.writeHead(200);
        res.end();
        return;
    }

    // Serve index.html
    if (req.url === '/' && req.method === 'GET') {
        const filePath = path.join(__dirname, 'index.html');
        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) {
                res.writeHead(404, { 'Content-Type': 'text/plain' });
                res.end('Not Found');
                return;
            }
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(data);
        });
        return;
    }

    // Handle signup API
    if (req.url === '/api/signup' && req.method === 'POST') {
        let body = '';

        req.on('data', chunk => {
            body += chunk.toString();
        });

        req.on('end', () => {
            try {
                const signupData = JSON.parse(body);

                // Validate email
                if (!signupData.email || !signupData.email.includes('@')) {
                    res.writeHead(400, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ error: 'Invalid email' }));
                    return;
                }

                // Read existing signups
                let signups = JSON.parse(fs.readFileSync(SIGNUPS_FILE, 'utf8'));

                // Add new signup
                signups.push({
                    ...signupData,
                    id: Date.now().toString(),
                    timestamp: new Date().toISOString()
                });

                // Save to file
                fs.writeFileSync(SIGNUPS_FILE, JSON.stringify(signups, null, 2));

                console.log(`✓ New signup: ${signupData.email} from ${signupData.company || 'Unknown'}`);

                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ success: true, message: 'Signup recorded' }));
            } catch (error) {
                console.error('Error processing signup:', error);
                res.writeHead(500, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: 'Internal server error' }));
            }
        });
        return;
    }

    // Serve signups.json (for admin viewing)
    if (req.url === '/api/signups' && req.method === 'GET') {
        fs.readFile(SIGNUPS_FILE, 'utf8', (err, data) => {
            if (err) {
                res.writeHead(404, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: 'Not found' }));
                return;
            }
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(data);
        });
        return;
    }

    // 404
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not Found');
});

server.listen(PORT, () => {
    console.log(`🚀 AI Agent Platform landing page running at http://localhost:${PORT}`);
    console.log(`📊 View signups at http://localhost:${PORT}/api/signups`);
});
