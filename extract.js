const fs = require('fs');
const pdf = require('pdf-parse');

let dataBuffer = fs.readFileSync('TDR Forum Juin.pdf');

pdf(dataBuffer).then(function(data) {
    fs.writeFileSync('tdr_text.txt', data.text);
    console.log('TDR Done.');
});

let dataBuffer2 = fs.readFileSync('gt Forum année passée.pdf');

pdf(dataBuffer2).then(function(data) {
    fs.writeFileSync('gt_text.txt', data.text);
    console.log('GT Done.');
});
