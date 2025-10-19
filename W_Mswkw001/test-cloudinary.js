// Test script to verify Cloudinary connection
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

async function testCloudinary() {
  try {
    console.log('Testing Cloudinary connection...');
    
    // Check environment variables
    console.log('CLOUDINARY_CLOUD_NAME:', process.env.CLOUDINARY_CLOUD_NAME ? 'SET' : 'NOT SET');
    console.log('CLOUDINARY_API_KEY:', process.env.CLOUDINARY_API_KEY ? 'SET' : 'NOT SET');
    console.log('CLOUDINARY_API_SECRET:', process.env.CLOUDINARY_API_SECRET ? 'SET' : 'NOT SET');
    
    if (!process.env.CLOUDINARY_CLOUD_NAME || !process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) {
      throw new Error('Missing required Cloudinary environment variables');
    }
    
    const { v2: cloudinary } = require('cloudinary');
    
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
      secure: true,
    });
    
    console.log('Testing Cloudinary API...');
    
    // Test API connection by getting account usage
    const result = await cloudinary.api.usage();
    console.log('✅ Cloudinary connection successful!');
    console.log('Account info:');
    console.log('- Credits used:', result.credits);
    console.log('- Resources:', result.resources);
    console.log('- Transformations:', result.transformations);
    
  } catch (error) {
    console.error('❌ Cloudinary Error:', error.message);
    if (error.http_code === 401) {
      console.error('Authentication failed - check your API credentials');
    } else if (error.http_code === 403) {
      console.error('Access forbidden - check your account permissions');
    }
  }
}

testCloudinary();