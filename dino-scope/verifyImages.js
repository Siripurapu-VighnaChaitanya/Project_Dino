import https from 'https';

const urls = [
    'https://upload.wikimedia.org/wikipedia/commons/9/94/Tyrannosaurus_Rex_Holotype.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/0/04/Triceratops_horridus_Marsh_1889.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/a/a6/Velociraptor_scale.png',
    'https://upload.wikimedia.org/wikipedia/commons/4/4b/Brachiosaurus.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/1/18/Stegosaurus_stenops_reconstruction.png',
    'https://upload.wikimedia.org/wikipedia/commons/a/a2/Spinosaurus_Scale.png',
    'https://upload.wikimedia.org/wikipedia/commons/7/77/Ankylosaurus_dinosaur_size_comparison.png',
    'https://upload.wikimedia.org/wikipedia/commons/c/c2/Allosaurus_fragilis_reconstruction.png',
    'https://upload.wikimedia.org/wikipedia/commons/6/6c/Diplodocus_carnegii.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/8/87/Parasaurolophus_walkeri.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/0/07/Carnotaurus_sastrei.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/c/c5/Baryonyx_walkeri.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/8/8e/Archaeopteryx_lithographica.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/2/29/Dilophosaurus_wetherilli.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/b/b5/Oviraptor_philoceratops.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/0/05/Microraptor_gui_holotype.png',
    'https://upload.wikimedia.org/wikipedia/commons/d/d3/Therizinosaurus_cheloniformis.png',
    'https://upload.wikimedia.org/wikipedia/commons/6/6f/Argentinosaurus_huinculensis.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/a/a2/Mosasaurus_hoffmannii.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/f/f6/Pteranodon_longiceps.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/6/60/Gallimimus_bullatus.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/3/37/Iguanodon_bernissartensis.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/2/22/Pachycephalosaurus_wyomingensis.png'
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
