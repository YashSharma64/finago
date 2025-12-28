
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function getApiKey() {
  try {
    const envPath = path.join(__dirname, '.env');
    if (!fs.existsSync(envPath)) return null;
    const envContent = fs.readFileSync(envPath, 'utf8');
    const match = envContent.match(/VITE_GEMINI_API_KEY\s*=\s*(.*)/);
    return match ? match[1].trim().replace(/^["']|["']$/g, '') : null;
  } catch (e) {
    return null;
  }
}

const API_KEY = getApiKey();

async function testModel(version, model) {
  process.stdout.write(`Testing ${version}/${model}... `);
  try {
    const response = await fetch(`https://generativelanguage.googleapis.com/${version}/models/${model}:generateContent?key=${API_KEY}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ contents: [{ parts: [{ text: 'hi' }] }] })
    });
    const json = await response.json();
    if (json.error) {
      console.log(`Error: ${json.error.message}`);
    } else {
      console.log(`SUCCESS!`);
      return true;
    }
  } catch (e) {
    console.log(`Fetch error: ${e.message}`);
  }
  return false;
}

async function main() {
  const modelsToTest = [
    { v: 'v1', m: 'gemini-1.5-flash' },
    { v: 'v1', m: 'gemini-1.5-flash-latest' },
    { v: 'v1', m: 'gemini-1.5-pro' },
    { v: 'v1', m: 'gemini-2.0-flash' },
    { v: 'v1beta', m: 'gemini-flash-latest' },
    { v: 'v1beta', m: 'gemini-pro-latest' },
    { v: 'v1beta', m: 'gemini-1.5-flash' }
  ];

  for (const { v, m } of modelsToTest) {
    const success = await testModel(v, m);
    if (success) {
      console.log(`\nRECOMMENDED MODEL: ${v}/models/${m}`);
    }
  }
}

main();
