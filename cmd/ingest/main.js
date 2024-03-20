
import Config from '../../internal/config/config.js';
import Qdrant from '../../internal/vDB/Qdrant.js';
import ChatGPT from '../../internal/llms/ChatGPT.js';
import Ingestion from '../../internal/ingestion/Ingestion.js';

const vDB = new Qdrant(Config.vDB);
const llm = new ChatGPT(Config.llm);

// farm animals, jungle animals, dessert animals

const data = [
"Farm animals are the heart of rural life, bustling with activity and contributing to the livelihoods of many. Cows graze peacefully in the lush green pastures, their gentle lowing echoing across the fields. Chickens peck at the ground, scratching for worms and insects, while roosters proudly announce the arrival of each new day with their crowing. Sheep huddle together, their fluffy coats providing warmth and comfort, as the farmer shears them with practiced hands. Horses gallop freely in the paddocks, their powerful muscles rippling beneath sleek coats as they enjoy the freedom of the open space. Each animal plays a vital role in the farm ecosystem, their presence a reminder of the symbiotic relationship between humans and the land.",
"The jungle is a cacophony of life, teeming with exotic creatures and vibrant foliage. Monkeys swing effortlessly from tree to tree, their playful antics a joy to behold as they chatter amongst themselves. Elephants lumber through the dense undergrowth, their majestic forms towering above the canopy as they forage for food. Tigers prowl stealthily through the shadows, their golden coats blending seamlessly with the dappled sunlight filtering through the leaves. Birds of every color imaginable flit through the air, their melodic songs creating a symphony of sound that reverberates through the jungle. Snakes slither sinuously along the forest floor, their sleek bodies a testament to their adaptability in this wild and untamed realm.",
"The desert is a harsh and unforgiving environment, yet it is home to a surprising array of resilient creatures. Camels trek stoically across the vast expanse of sand, their humps laden with precious cargo as they navigate the blistering heat. Scorpions scuttle across the desert floor, their armored exoskeletons providing protection from the searing sun. Lizards dart between rocks and cacti, their scales shimmering in the intense sunlight as they search for insects to prey upon. Falcons soar overhead, their keen eyesight allowing them to spot prey from great distances as they circle effortlessly on thermal currents. Despite the harsh conditions, these desert animals have adapted to thrive in this harsh and inhospitable landscape, proving that life can flourish even in the most unlikely of places."
];

/*
const data = [
    "I have 10 dogs"
];
*/

const ingestion = new Ingestion(llm, vDB);


async function main() {
    
    const success = await ingestion.FromTextArray(data)

    console.log(success);
}

main()