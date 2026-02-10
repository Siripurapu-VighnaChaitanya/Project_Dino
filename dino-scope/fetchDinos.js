import fs from 'fs';

const OUTPUT_FILE = './src/data/dinos.ts';

// Helper to generate frames for T-Rex (simulated or real path)
const generateHeroFrames = () => {
    return Array.from({ length: 194 }, (_, i) =>
        `/dinos/hero/ezgif-frame-${String(i + 1).padStart(3, '0')}.jpg`
    );
};

// 24 High Quality Dinos Seed
const seedDinos = [
    {
        id: 'tyrannosaurus',
        name: 'Tyrannosaurus Rex',
        type: 'Carnivore',
        era: 'Cretaceous',
        description: 'The King of Tyrant Lizards, ruling the late Cretaceous.',
        longDescription: 'Tyrannosaurus rex was one of the largest meat-eating dinosaurs that ever lived. Everything about this ferocious predator, from its thick, heavy skull to its 4-foot-long (1.2-meter-long) jaw, was designed for maximum bone-crushing action.',
        image: 'https://upload.wikimedia.org/wikipedia/commons/9/94/Tyrannosaurus_Rex_Holotype.jpg',
        images: generateHeroFrames() // Use the frames here!
    },
    {
        id: 'triceratops',
        name: 'Triceratops',
        type: 'Herbivore',
        era: 'Cretaceous',
        description: 'Three-horned face, the tank of the Cretaceous period.',
        longDescription: 'Triceratops is one of the most recognizable dinosaurs, with its three horns and large bony frill.',
        image: 'https://upload.wikimedia.org/wikipedia/commons/0/04/Triceratops_horridus_Marsh_1889.jpg',
        images: ['https://upload.wikimedia.org/wikipedia/commons/0/04/Triceratops_horridus_Marsh_1889.jpg']
    },
    {
        id: 'velociraptor',
        name: 'Velociraptor',
        type: 'Carnivore',
        era: 'Cretaceous',
        description: 'A swift thief, intelligent and deadly pack hunter.',
        longDescription: 'Velociraptor was a small, bird-like dinosaur that lived in Mongolia during the Late Cretaceous period.',
        image: 'https://upload.wikimedia.org/wikipedia/commons/a/a6/Velociraptor_scale.png',
        images: ['https://upload.wikimedia.org/wikipedia/commons/a/a6/Velociraptor_scale.png']
    },
    {
        id: 'brachiosaurus',
        name: 'Brachiosaurus',
        type: 'Herbivore',
        era: 'Jurassic',
        description: 'A colossal sauropod with a giraffe-like stance.',
        longDescription: 'Brachiosaurus was a massive sauropod dinosaur that lived in North America during the Late Jurassic period.',
        image: 'https://upload.wikimedia.org/wikipedia/commons/0/03/Brachiosaurus_DB.jpg',
        images: ['https://upload.wikimedia.org/wikipedia/commons/0/03/Brachiosaurus_DB.jpg']
    },
    {
        id: 'stegosaurus',
        name: 'Stegosaurus',
        type: 'Herbivore',
        era: 'Jurassic',
        description: 'Known for its double row of kite-shaped plates.',
        longDescription: 'Stegosaurus had a distinctive double row of bony plates running along its back.',
        image: 'https://upload.wikimedia.org/wikipedia/commons/8/82/Stegosaurus_ungulatus.jpg',
        images: ['https://upload.wikimedia.org/wikipedia/commons/8/82/Stegosaurus_ungulatus.jpg']
    },
    {
        id: 'spinosaurus',
        name: 'Spinosaurus',
        type: 'Carnivore',
        era: 'Cretaceous',
        description: 'The largest carnivorous dinosaur, even bigger than T-Rex.',
        longDescription: 'Spinosaurus is known for the distinctive sail on its back and its crocodile-like snout.',
        image: 'https://upload.wikimedia.org/wikipedia/commons/9/90/Spinosaurus_aegyptiacus_skeletal_reconstruction.png',
        images: ['https://upload.wikimedia.org/wikipedia/commons/9/90/Spinosaurus_aegyptiacus_skeletal_reconstruction.png']
    },
    {
        id: 'ankylosaurus',
        name: 'Ankylosaurus',
        type: 'Herbivore',
        era: 'Cretaceous',
        description: 'A heavily armored dinosaur.',
        longDescription: 'Ankylosaurus was a tank-like dinosaur covered in bony armor plates.',
        image: 'https://upload.wikimedia.org/wikipedia/commons/6/6f/Ankylosaurus_magniventris_reconstruction.png',
        images: ['https://upload.wikimedia.org/wikipedia/commons/6/6f/Ankylosaurus_magniventris_reconstruction.png']
    },
    {
        id: 'allosaurus',
        name: 'Allosaurus',
        type: 'Carnivore',
        era: 'Jurassic',
        description: 'The top predator of the Jurassic period.',
        longDescription: 'Allosaurus was a large bipedal predator.',
        image: 'https://upload.wikimedia.org/wikipedia/commons/c/c2/Allosaurus_fragilis_reconstruction.png',
        images: ['https://upload.wikimedia.org/wikipedia/commons/c/c2/Allosaurus_fragilis_reconstruction.png']
    },
    {
        id: 'diplodocus',
        name: 'Diplodocus',
        type: 'Herbivore',
        era: 'Jurassic',
        description: 'One of the longest dinosaurs to ever live.',
        longDescription: 'Diplodocus had an incredibly long neck and tail.',
        image: 'https://upload.wikimedia.org/wikipedia/commons/6/6c/Diplodocus_carnegii.jpg',
        images: ['https://upload.wikimedia.org/wikipedia/commons/6/6c/Diplodocus_carnegii.jpg']
    },
    {
        id: 'parasaurolophus',
        name: 'Parasaurolophus',
        type: 'Herbivore',
        era: 'Cretaceous',
        description: 'Known for its large, tube-like crest.',
        longDescription: 'Parasaurolophus had a long, hollow crest on its head.',
        image: 'https://upload.wikimedia.org/wikipedia/commons/8/87/Parasaurolophus_walkeri.jpg',
        images: ['https://upload.wikimedia.org/wikipedia/commons/8/87/Parasaurolophus_walkeri.jpg']
    },
    {
        id: 'carnotaurus',
        name: 'Carnotaurus',
        type: 'Carnivore',
        era: 'Cretaceous',
        description: 'The meat-eating bull with horns.',
        longDescription: 'Carnotaurus was a fast-running predator with two distinctive horns above its eyes.',
        image: 'https://upload.wikimedia.org/wikipedia/commons/0/07/Carnotaurus_sastrei.jpg',
        images: ['https://upload.wikimedia.org/wikipedia/commons/0/07/Carnotaurus_sastrei.jpg']
    },
    { id: 'baryonyx', name: 'Baryonyx', type: 'Carnivore', era: 'Cretaceous', description: 'Fish-eater with heavy claws.', longDescription: 'Baryonyx had a crocodile-like snout.', image: 'https://upload.wikimedia.org/wikipedia/commons/c/c5/Baryonyx_walkeri.jpg', images: ['https://upload.wikimedia.org/wikipedia/commons/c/c5/Baryonyx_walkeri.jpg'] },
    { id: 'archaeopteryx', name: 'Archaeopteryx', type: 'Carnivore', era: 'Jurassic', description: 'The first bird.', longDescription: 'Link between birds and dinos.', image: 'https://upload.wikimedia.org/wikipedia/commons/8/8e/Archaeopteryx_lithographica.jpg', images: ['https://upload.wikimedia.org/wikipedia/commons/8/8e/Archaeopteryx_lithographica.jpg'] },
    { id: 'dilophosaurus', name: 'Dilophosaurus', type: 'Carnivore', era: 'Jurassic', description: 'Double-crested lizard.', longDescription: 'Had two crests on its head.', image: 'https://upload.wikimedia.org/wikipedia/commons/2/29/Dilophosaurus_wetherilli.jpg', images: ['https://upload.wikimedia.org/wikipedia/commons/2/29/Dilophosaurus_wetherilli.jpg'] },
    { id: 'oviraptor', name: 'Oviraptor', type: 'Omnivore', era: 'Cretaceous', description: 'The egg thief.', longDescription: 'Actually protected its nest.', image: 'https://upload.wikimedia.org/wikipedia/commons/b/b5/Oviraptor_philoceratops.jpg', images: ['https://upload.wikimedia.org/wikipedia/commons/b/b5/Oviraptor_philoceratops.jpg'] },
    { id: 'microraptor', name: 'Microraptor', type: 'Carnivore', era: 'Cretaceous', description: 'Four-winged dino.', longDescription: 'Small gliding dinosaur.', image: 'https://upload.wikimedia.org/wikipedia/commons/0/05/Microraptor_gui_holotype.png', images: ['https://upload.wikimedia.org/wikipedia/commons/0/05/Microraptor_gui_holotype.png'] },
    { id: 'therizinosaurus', name: 'Therizinosaurus', type: 'Herbivore', era: 'Cretaceous', description: 'Longest claws.', longDescription: 'Huge claws for pulling branches.', image: 'https://upload.wikimedia.org/wikipedia/commons/d/d3/Therizinosaurus_cheloniformis.png', images: ['https://upload.wikimedia.org/wikipedia/commons/d/d3/Therizinosaurus_cheloniformis.png'] },
    { id: 'argentinosaurus', name: 'Argentinosaurus', type: 'Herbivore', era: 'Cretaceous', description: 'Largest land animal.', longDescription: 'Massive titanosaur.', image: 'https://upload.wikimedia.org/wikipedia/commons/6/6f/Argentinosaurus_huinculensis.jpg', images: ['https://upload.wikimedia.org/wikipedia/commons/6/6f/Argentinosaurus_huinculensis.jpg'] },
    { id: 'mosasaurus', name: 'Mosasaurus', type: 'Carnivore', era: 'Cretaceous', description: 'Sea ruler.', longDescription: 'Apex marine predator.', image: 'https://upload.wikimedia.org/wikipedia/commons/a/a2/Mosasaurus_hoffmannii.jpg', images: ['https://upload.wikimedia.org/wikipedia/commons/a/a2/Mosasaurus_hoffmannii.jpg'] },
    { id: 'pteranodon', name: 'Pteranodon', type: 'Carnivore', era: 'Cretaceous', description: 'Flying reptile.', longDescription: 'Large crest, no teeth.', image: 'https://upload.wikimedia.org/wikipedia/commons/f/f6/Pteranodon_longiceps.jpg', images: ['https://upload.wikimedia.org/wikipedia/commons/f/f6/Pteranodon_longiceps.jpg'] },
    { id: 'gallimimus', name: 'Gallimimus', type: 'Omnivore', era: 'Cretaceous', description: 'Chicken mimic.', longDescription: 'Fast runner.', image: 'https://upload.wikimedia.org/wikipedia/commons/6/60/Gallimimus_bullatus.jpg', images: ['https://upload.wikimedia.org/wikipedia/commons/6/60/Gallimimus_bullatus.jpg'] },
    { id: 'iguanodon', name: 'Iguanodon', type: 'Herbivore', era: 'Cretaceous', description: 'Thumb spikes.', longDescription: 'Herbivore with spikes.', image: 'https://upload.wikimedia.org/wikipedia/commons/3/37/Iguanodon_bernissartensis.jpg', images: ['https://upload.wikimedia.org/wikipedia/commons/3/37/Iguanodon_bernissartensis.jpg'] },
    { id: 'pachycephalosaurus', name: 'Pachycephalosaurus', type: 'Herbivore', era: 'Cretaceous', description: 'Thick headed.', longDescription: 'Domed skull.', image: 'https://upload.wikimedia.org/wikipedia/commons/2/22/Pachycephalosaurus_wyomingensis.png', images: ['https://upload.wikimedia.org/wikipedia/commons/2/22/Pachycephalosaurus_wyomingensis.png'] }
];

const processData = () => {
    console.log('Generating 1000 dinosaurs...');
    let dinos = [...seedDinos];

    const target = 1005;
    let i = 0;
    while (dinos.length < target) {
        const original = seedDinos[i % seedDinos.length];
        const variantNum = Math.floor(dinos.length / seedDinos.length) + 1;

        // Create a variation
        dinos.push({
            ...original,
            id: `${original.id}-v${variantNum}`,
            name: `${original.name} (Specimen ${variantNum})`,
            description: original.description.replace('.', '') + ` - Variant ${variantNum}.`,
            // We reuse the image for now as we don't have 1000 unique images
        });
        i++;
    }

    const fileContent = `export interface Dinosaur {
  id: string;
  name: string;
  type: 'Carnivore' | 'Herbivore' | 'Omnivore';
  era: 'Triassic' | 'Jurassic' | 'Cretaceous';
  description: string;
  longDescription: string;
  image: string; // Preview image
  images: string[]; // Gallery images
}

// RESTORED: Local animation frames logic for Hero (keeping it safe if needed by component, though strict typing might ignore it if not in interface)
// We will export the array directly.

export const dinosaurs: Dinosaur[] = ${JSON.stringify(dinos, null, 2)};
`;

    fs.writeFileSync(OUTPUT_FILE, fileContent);
    console.log(`Successfully wrote ${dinos.length} dinosaurs to ${OUTPUT_FILE}`);
};

processData();
