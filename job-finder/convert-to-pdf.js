const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

async function convertHtmlToPdf() {
  try {
    // Read the HTML file
    const htmlPath = path.join(__dirname, 'demo-resume.html');
    const htmlContent = fs.readFileSync(htmlPath, 'utf8');
    
    // Launch browser
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    
    // Set content and wait for it to load
    await page.setContent(htmlContent, { waitUntil: 'networkidle0' });
    
    // Generate PDF
    const pdfPath = path.join(__dirname, 'demo-resume.pdf');
    await page.pdf({
      path: pdfPath,
      format: 'A4',
      margin: {
        top: '0.5in',
        right: '0.5in',
        bottom: '0.5in',
        left: '0.5in'
      },
      printBackground: true
    });
    
    console.log(`PDF created successfully at: ${pdfPath}`);
    
    await browser.close();
  } catch (error) {
    console.error('Error converting HTML to PDF:', error);
  }
}

// Check if puppeteer is installed
try {
  require('puppeteer');
  convertHtmlToPdf();
} catch (error) {
  console.log('Puppeteer not installed. Installing...');
  const { execSync } = require('child_process');
  try {
    execSync('npm install puppeteer', { cwd: __dirname, stdio: 'inherit' });
    console.log('Puppeteer installed successfully. Converting to PDF...');
    convertHtmlToPdf();
  } catch (installError) {
    console.error('Failed to install puppeteer:', installError);
    console.log('You can manually install puppeteer with: npm install puppeteer');
  }
} 