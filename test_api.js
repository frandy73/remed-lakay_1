import fetch from 'node-fetch';

const apiKey = 'sec_2W71WJtidQvSHf7apqefDFL3QU5Yuo6K';
const sourceId = 'cha_EMbofeNnZ2xCS51tYkvTd';

async function test() {
  console.log('Testing ChatPDF API...');
  try {
    const response = await fetch('https://api.chatpdf.com/v1/chats/message', {
      method: 'POST',
      headers: {
        'x-api-key': apiKey,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        sourceId: sourceId,
        messages: [{ role: 'user', content: 'test' }],
      }),
    });

    if (!response.ok) {
      console.error('API Error:', response.status);
      const errorData = await response.text();
      console.error('Error Details:', errorData);
    } else {
      const data = await response.json();
      console.log('Response Body:', JSON.stringify(data, null, 2));
    }
  } catch (err) {
    console.error('Network or Parse Error:', err.message);
  }
}

test();
