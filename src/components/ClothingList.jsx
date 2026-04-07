import { weatherConditions, clothingSuggestions } from '../data/mockData';

function ClothingList({ climate }) {
    // Determine weather type based on climate
    const getWeatherType = () => {
        switch (climate) {
            case 'Tropical': return 'Sunny';
            case 'Arid': return 'Sunny';
            case 'Temperate': return 'Cloudy'; // Improving logic slightly for variety
            case 'Polar': return 'Snowy';
            default: return 'Sunny';
        }
    };

    const weatherType = getWeatherType();
    const weather = weatherConditions[weatherType];
    const items = clothingSuggestions[weatherType] || [];

    return (
        <div style={{
            padding: 'var(--spacing-md)',
            backgroundColor: 'white',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--color-border)'
        }}>
            <h3 style={{ marginBottom: 'var(--spacing-md)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span>👕</span> What to Pack
            </h3>
            <p style={{ marginBottom: 'var(--spacing-sm)', color: 'var(--color-text-muted)' }}>
                For {weather.description.toLowerCase()} conditions:
            </p>
            <ul style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                {items.map((item, index) => (
                    <li key={index} style={{
                        padding: '0.25rem 0.75rem',
                        backgroundColor: 'var(--color-bg-body)',
                        borderRadius: '2rem',
                        fontSize: '0.9rem',
                        border: '1px solid var(--color-border)'
                    }}>
                        {item}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default ClothingList;
