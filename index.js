const express = require('express');
const fs = require('fs');
const app = express();

app.get('/track', (req, res) => {
  // Log click data
  const data = `${new Date().toISOString()} | IP: ${req.ip} | User-Agent: ${req.get('User-Agent')} | Referrer: ${req.get('Referrer') || 'None'}\n`;
  fs.appendFileSync('clicks.txt', data);
  // Redirect to image
  res.redirect('/photo.jpg');
});

// Serve static files (e.g., photo.jpg)
app.use(express.static('public'));

// Preview page for WhatsApp
app.get('/preview', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
    <head>
      <meta property="og:image" content="https://<your-vercel-domain>.vercel.app/photo.jpg">
      <meta property="og:title" content="View My Photo">
      <meta property="og:description" content="Click to see the full image!">
      <meta http-equiv="refresh" content="0; url=/track">
    </head>
    <body>
      <p>Redirecting to image...</p>
    </body>
    </html>
  `);
});

app.listen(process.env.PORT || 3000, () => console.log('Server running'));
