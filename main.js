/*

READ INSTRUCTIONS.txt BEFORE CONTUINING

*/

import fs from 'fs';
import { login } from 'masto';

const masto = await login({
  url: 'https://tinkertofu.com',
  accessToken: '',
  // This access token is in applications/api/keys
  // The API Hard limit is an IP limit
});

// Read the contents of the JSON file
fs.readFile('./data.json', 'utf8', (err, data) => {
  if (err) throw err;
  const JSONdata = JSON.parse(data);
  //console.log(JSONdata);
  generateAccountsList(JSONdata);
});

// Password generator
function generatePassword(length) {
  let chars =
    'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890!@#$%^&*()_+';
  let password = '';
  for (var i = 0; i < length; i++) {
    password += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return password;
}

async function generateAccountsList(data) {
  const email = data.email; // email is an array of emails
  const name = data.name; // name is an array of names

  for (let i = 0; i < email.length; i++) {
    const formattedName = name[i].split(' ').join('');
    console.log('...');
    const password = generatePassword(10); // Minimum is 8 Chars for a mastodon password. We use 10
    const details = `Account details for ${name[i]}: ${email[i]}, ${password}, ${formattedName}\n`;
    console.log(details);
    createAccount(email[i], password, formattedName);
    fs.appendFile('data.txt', details, (err) => {
      if (err) throw err;
      console.log('Data saved to file');
    });
    await delay();
  }
}

function delay() {
  return new Promise((resolve) => setTimeout(resolve, 5000));
}

async function createAccount(email, password, username) {
  const status = await masto.v1.accounts.create({
    agreement: 'true',
    email: email,
    locale: 'en',
    password: password,
    username: username,
  });
}
