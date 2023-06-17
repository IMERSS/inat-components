const fs = require('fs');
const indexFile = './public/index.html';

fs.watchFile(indexFile, (curr, prev) => {
    fs.copyFileSync(indexFile, './build/index.html');
});
