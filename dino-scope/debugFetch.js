import https from 'https';

const API_URL = 'https://dinoapi.brunosouzadev.com/api/dinosaurs';

https.get(API_URL, (res) => {
    let data = '';
    res.on('data', (chunk) => data += chunk);
    res.on('end', () => {
        try {
            const json = JSON.parse(data);
            console.log('Is Array?', Array.isArray(json));
            if (Array.isArray(json) && json.length > 0) {
                console.log('First item keys:', Object.keys(json[0]));
                console.log('First item:', JSON.stringify(json[0], null, 2));
            } else {
                console.log('Response:', json);
            }
        } catch (e) {
            console.error('Error parsing JSON:', e);
            console.log('Raw data snippet:', data.substring(0, 200));
        }
    });
}).on('error', console.error);
