import fs from 'fs';
import path from 'path';

const csvPath = 'Top Indian Places to Visit.csv';
const outputPath = 'src/data/mockData.js';

// Climate logic
const getClimate = (state, zone) => {
    const s = state.trim();
    if (['Rajasthan', 'Gujarat'].includes(s)) return 'Arid';
    if (['Kerala', 'Goa', 'Tamil Nadu', 'Karnataka', 'Andhra Pradesh', 'Telangana'].includes(s)) return 'Tropical';
    if (['Himachal Pradesh', 'Jammu and Kashmir', 'Ladakh', 'Uttarakhand', 'Sikkim'].includes(s)) return 'Polar';
    if (['Maharashtra', 'West Bengal', 'Odisha'].includes(s)) return 'Temperate';
    return 'Temperate'; // Default
};

// Existing static data to preserve
const staticDestinations = [
    { id: 1, name: "Paris, France", climate: "Temperate", attractions: ["Eiffel Tower", "Louvre Museum", "Notre-Dame Cathedral"] },
    { id: 2, name: "Tokyo, Japan", climate: "Temperate", attractions: ["Senso-ji Temple", "Tokyo Tower", "Shibuya Crossing"] },
    { id: 3, name: "New York City, USA", climate: "Continental", attractions: ["Statue of Liberty", "Central Park", "Times Square"] },
    { id: 4, name: "Bali, Indonesia", climate: "Tropical", attractions: ["Uluwatu Temple", "Sacred Monkey Forest", "Tegallalang Rice Terrace"] },
    { id: 5, name: "Reykjavik, Iceland", climate: "Polar", attractions: ["Blue Lagoon", "Hallgrímskirkja", "Golden Circle"] },
    { id: 6, name: "Cairo, Egypt", climate: "Arid", attractions: ["Pyramids of Giza", "The Sphinx", "Egyptian Museum"] },
];

const weatherConditions = {
    Sunny: { icon: "☀️", tempRange: [20, 30], description: "Bright and sunny" },
    Rainy: { icon: "🌧️", tempRange: [10, 20], description: "Showers expected" },
    Cloudy: { icon: "☁️", tempRange: [15, 25], description: "Overcast skies" },
    Snowy: { icon: "❄️", tempRange: [-5, 5], description: "Light snowfall" },
    Windy: { icon: "💨", tempRange: [10, 18], description: "Strong breeze" },
};

const clothingSuggestions = {
    Sunny: ["Sunglasses", "Sunscreen", "Hat", "T-shirt", "Shorts"],
    Rainy: ["Umbrella", "Raincoat", "Waterproof Boots", "Jacket"],
    Cloudy: ["Light Jacket", "Jeans", "Comfortable Shoes"],
    Snowy: ["Heavy Coat", "Gloves", "Scarf", "Thermal Wear", "Boots"],
    Windy: ["Windbreaker", "Scarf", "Long Pants"],
};

const essentials = {
    International: ["Passport", "Visa", "Travel Insurance", "Adapter"],
    Health: ["First Aid Kit", "Prescriptions", "Hand Sanitizer"],
    Tech: ["Power Bank", "Chargers", "Headphones"],
    "Beach": ["Swimwear", "Beach Towel", "Flip Flops"],
    "Adventure": ["Hiking Boots", "Backpack", "Water Bottle"],
};

// Parsing Logic
try {
    const data = fs.readFileSync(csvPath, 'utf8');
    const lines = data.split('\n');
    const headers = lines[1].split(','); // Based on file view, line 0 is empty/index, line 1 has headers? Wait, let's re-verify. 
    // Line 1: ,Zone,State,City,Name,Type,...

    const citiesMap = {}; // { "Delhi": { state: "Delhi", attractions: [] } }

    // Start from line 2 (index 1 if 0-based is empty, but view_file showed line 1 has headers)
    // view_file showed:
    // 1: ,Zone,State,City,Name,Type,...
    // 2: 0,Northern,Delhi,Delhi,India Gate,...

    for (let i = 1; i < lines.length; i++) {
        const line = lines[i].trim();
        if (!line) continue;

        // CSV splitting constraint: simple split by comma might fail if quotes are used, but looking at file it seems simple.
        // However, some fields might have commas. Let's assume standard simple CSV for now or use a basic regex if needed.
        // The data looked simple: "0,Northern,Delhi,Delhi,India Gate,..."

        const parts = line.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/); // Split by comma ignoring commas in quotes

        if (parts.length < 5) continue;

        const zone = parts[1];
        const state = parts[2];
        const city = parts[3];
        const attractionName = parts[4];
        const type = parts[5];

        if (!citiesMap[city]) {
            citiesMap[city] = {
                state,
                zone,
                attractions: []
            };
        }

        // Add unique attractions
        if (!citiesMap[city].attractions.some(a => a.name === attractionName)) {
            citiesMap[city].attractions.push({ name: attractionName, type });
        }
    }

    // Convert map to destinations array
    let currentId = 7; // Start after static ones
    const newDestinations = [];
    const newAttractionsData = {}; // To append to attractionsData

    Object.keys(citiesMap).forEach(city => {
        const data = citiesMap[city];
        const destinationName = `${city}, India`;
        const climate = getClimate(data.state, data.zone);
        const topAttractions = data.attractions.slice(0, 5); // Take top 5

        newDestinations.push({
            id: currentId++,
            name: destinationName,
            climate: climate,
            attractions: topAttractions.map(a => a.name)
        });

        // Generate attraction data
        topAttractions.forEach(a => {
            newAttractionsData[a.name] = {
                type: a.type,
                image: `https://via.placeholder.com/150?text=${encodeURIComponent(a.name)}`
            };
        });
    });

    const finalDestinations = [...staticDestinations, ...newDestinations];

    // Existing attractions data to merge
    const existingAttractionsData = {
        "Eiffel Tower": { type: "Culture", image: "https://via.placeholder.com/150?text=Eiffel+Tower" },
        "Louvre Museum": { type: "Culture", image: "https://via.placeholder.com/150?text=Louvre" },
        "Senso-ji Temple": { type: "Culture", image: "https://via.placeholder.com/150?text=Senso-ji" },
        "Blue Lagoon": { type: "Nature", image: "https://via.placeholder.com/150?text=Blue+Lagoon" },
        "Pyramids of Giza": { type: "History", image: "https://via.placeholder.com/150?text=Pyramids" },
    };

    const finalAttractionsData = { ...existingAttractionsData, ...newAttractionsData };

    // Generate File Content
    const fileContent = `
export const destinations = ${JSON.stringify(finalDestinations, null, 2)};

export const weatherConditions = ${JSON.stringify(weatherConditions, null, 2)};

export const clothingSuggestions = ${JSON.stringify(clothingSuggestions, null, 2)};

export const essentials = ${JSON.stringify(essentials, null, 2)};

export const attractionsData = ${JSON.stringify(finalAttractionsData, null, 2)};
  `;

    fs.writeFileSync(outputPath, fileContent);
    console.log('Successfully generated mockData.js with ' + newDestinations.length + ' new Indian destinations.');

} catch (error) {
    console.error('Error processing CSV:', error);
}
