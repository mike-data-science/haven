const fs = require('fs');
const https = require('https');

https.get('https://raw.githubusercontent.com/FortAwesome/Font-Awesome/6.x/svgs/brands/viber.svg', (res) => {
  let data = '';
  res.on('data', (chunk) => data += chunk);
  res.on('end', () => {
    fs.writeFileSync('viber.svg', data);
    console.log('Downloaded viber.svg');
  });
}).on('error', (err) => console.log('Error: ', err.message));
