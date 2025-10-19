// Test script to verify Google Sheets connection
const fs = require('fs');
const path = require('path');

// Manually load .env file
function loadEnv() {
  try {
    const envFile = fs.readFileSync(path.join(__dirname, '.env'), 'utf8');
    const lines = envFile.split('\n');
    
    for (const line of lines) {
      if (line.trim() && !line.startsWith('#')) {
        const [key, ...valueParts] = line.split('=');
        if (key && valueParts.length > 0) {
          let value = valueParts.join('=');
          // Remove quotes if present
          if ((value.startsWith('"') && value.endsWith('"')) || 
              (value.startsWith("'") && value.endsWith("'"))) {
            value = value.slice(1, -1);
          }
          process.env[key.trim()] = value;
        }
      }
    }
  } catch (error) {
    console.error('Error loading .env file:', error.message);
  }
}

loadEnv();

async function testGoogleSheets() {
  try {
    console.log('Testing Google Sheets connection...');
    
    // Check environment variables
    console.log('GOOGLE_SHEET_ID:', process.env.GOOGLE_SHEET_ID ? 'SET' : 'NOT SET');
    console.log('GOOGLE_SERVICE_ACCOUNT_EMAIL:', process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL ? 'SET' : 'NOT SET');
    console.log('GOOGLE_PRIVATE_KEY length:', process.env.GOOGLE_PRIVATE_KEY ? process.env.GOOGLE_PRIVATE_KEY.length : 'NOT SET');
    
    if (!process.env.GOOGLE_SHEET_ID || !process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL || !process.env.GOOGLE_PRIVATE_KEY) {
      throw new Error('Missing required Google Sheets environment variables');
    }
    
    const { JWT } = require('google-auth-library');
    const { GoogleSpreadsheet } = await import('google-spreadsheet');
    
    const SHEET_ID = process.env.GOOGLE_SHEET_ID;
    const CLIENT_EMAIL = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
    const PRIVATE_KEY = process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n');
    
    console.log('Creating JWT auth...');
    const serviceAccountAuth = new JWT({
      email: CLIENT_EMAIL,
      key: PRIVATE_KEY,
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });
    
    console.log('Connecting to Google Spreadsheet...');
    const doc = new GoogleSpreadsheet(SHEET_ID, serviceAccountAuth);
    
    console.log('Loading document info...');
    await doc.loadInfo();
    
    console.log('✅ Success! Connected to Google Sheet:');
    console.log('Title:', doc.title);
    console.log('Sheets:', doc.sheetsByIndex.map(sheet => sheet.title));
    
    // Check if the sheet has the right headers
    const sheet = doc.sheetsByIndex[0];
    console.log('First sheet title:', sheet.title);
    
    await sheet.loadHeaderRow();
    console.log('Headers:', sheet.headerValues);
    
    const expectedHeaders = ['id', 'name', 'description', 'price', 'image', 'category', 'stock', 'badge'];
    const missingHeaders = expectedHeaders.filter(header => !sheet.headerValues.includes(header));
    
    if (missingHeaders.length > 0) {
      console.log('⚠️  Missing headers:', missingHeaders);
      console.log('Please add these columns to your Google Sheet');
    } else {
      console.log('✅ All required headers are present');
    }
    
  } catch (error) {
    console.error('❌ Error:', error.message);
    if (error.code === 'ENOTFOUND') {
      console.error('Network error - check your internet connection');
    } else if (error.message.includes('403')) {
      console.error('Permission denied - make sure the service account has access to the sheet');
    } else if (error.message.includes('404')) {
      console.error('Sheet not found - check the GOOGLE_SHEET_ID');
    }
  }
}

testGoogleSheets();