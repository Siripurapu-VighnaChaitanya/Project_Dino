import https from 'https';

const urls = [
    'https://upload.wikimedia.org/wikipedia/commons/4/4b/Brachiosaurus.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/1/18/Stegosaurus_stenops_reconstruction.png',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/Spinosaurus_aegyptiacus_2020.jpg/640px-Spinosaurus_aegyptiacus_2020.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/a/a2/Spinosaurus_Scale.png',
    'https://upload.wikimedia.org/wikipedia/commons/4/4e/Ankylosaurus_magniventris_reconstruction_01.png'
];

const checkUrl = (url) => {
    return new Promise((resolve) => {
        https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
            resolve({ url, status: res.statusCode });
        }).on('error', (e) => resolve({ url, status: 'Error: ' + e.message }));
    });
};

(async () => {
    console.log('Checking Image URLs...');
    for (const url of urls) {
        const result = await checkUrl(url);
        console.log(`${result.status}: ${result.url}`);
    }
})();
