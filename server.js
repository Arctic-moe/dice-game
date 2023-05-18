const http = require('http');
const fs = require('fs');
const path = require('path');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
    console.log(`Request for ${req.url} received.`);

    // Serve index.html file
    if (req.url === '/') {
        const filePath = path.join(__dirname, 'index.html');
        const stat = fs.statSync(filePath);

        res.writeHead(200, {
            'Content-Type': 'text/html; charset=utf-8',
            'Content-Length': stat.size
        });

        const readStream = fs.createReadStream(filePath);
        readStream.pipe(res);
    }
    else if (req.url === '/css/index.css') {
        const filePath = path.join(__dirname, '/css/index.css');
        const stat = fs.statSync(filePath);

        res.writeHead(200, {
            'Content-Type': 'text/css; charset=utf-8',
            'Content-Length': stat.size
        });

        const readStream = fs.createReadStream(filePath);
        readStream.pipe(res);
        console.log('css done');
    }
    // Serve JavaScript file
    else if (req.url === '/js/index.js') {
        let files = ['/js/tools.js', '/js/colonies.js', '/js/blueprints.js', '/js/projects.js', '/js/index.js'];
        let total_size = 0;
        res.writeHead(200, {
            'Content-Type': 'text/javascript; charset=utf-8'
        });
        files.forEach(function(file) {
            console.log(file);
            let filePath = path.join(__dirname, file);
            const contents = fs.readFileSync(filePath, 'utf8');
            const stat = fs.statSync(filePath);
            total_size += stat.size;
            
            res.write(contents);
        });
        
        res.end();
    }
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});