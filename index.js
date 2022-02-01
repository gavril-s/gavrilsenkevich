const express = require('express');
const path = require('path');
const fs = require('fs')

const app = express();

app.get('/info.json', (req, res) => {
    let info = {};
    fs.readFile(path.join(__dirname, 'public', 'info.json'), function(err, data) {
        if (err) throw err;
        info = JSON.parse(data);
        res.json(info)
    });
});

app.put('/info.json', (req, res) => {
    let info = {};
    fs.readFile(path.join(__dirname, 'public', 'info.json'), function(err, data) {
        if (err) throw err;
        info = JSON.parse(data);
        info.hype_bar_clicks += 1;
        fs.writeFile(path.join(__dirname, 'public', 'info.json'), JSON.stringify(info), err => { if (err) throw err; });
        res.json(info)
    });
});

app.use(express.static(path.join(__dirname, 'public')))
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));