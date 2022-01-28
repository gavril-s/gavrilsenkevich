const http = require('http');
const path = require('path');
const fs = require('fs');

const server = http.createServer((req, res) => {
    let file_path = path.join(__dirname, 'public', req.url === '/' ? 'index.html' : req.url);
    let extname = path.extname(file_path);
    let content_type = 'text/html';
    switch (extname)
    {
        case '.js':
            content_type = 'text/javascript';
            break;
        case '.css':
            content_type = 'text/css';
            break;
        case '.json':
            content_type = 'application/json';
            break;
        case '.png':
            content_type = 'image/png';
            break;
        case '.jpg':
            content_type = 'image/jpg';
            break;
        case '.svg':
            content_type = 'image/svg';
            break;
    }

    fs.readFile(file_path, (err, content) => {
        if (err)
        {
            if (err.code === 'ENOENT') // Page not found
            {
                fs.readFile(path.join(__dirname, 'public', '404.html'), (err, content) => {
                    res.writeHead(200, { 'Content-Type': 'text/html' });
                    res.end(content, 'utf8');
                });
            }
            else
            {
                res.writeHead(500);
                res.end(`Server error: ${err.code}`);
            }
        }
        else
        {
            res.writeHead(200, { 'Content-Type': content_type });
            res.end(content, 'utf8');
        }
    });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));