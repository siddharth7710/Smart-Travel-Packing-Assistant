import { weatherConditions } from '../data/mockData';

function WeatherCard({ climate }) {
    // Logic to determine weather based on climate
    const getWeather = () => {
        switch (climate) {
            case 'Tropical': return weatherConditions.Sunny;
            case 'Arid': return weatherConditions.Sunny;
            case 'Temperate': return weatherConditions.Cloudy; // Or Random
            case 'Polar': return weatherConditions.Snowy;
            default: return weatherConditions.Sunny;
        }
    };

    const weather = getWeather();
    const temp = Math.floor(Math.random() * (weather.tempRange[1] - weather.tempRange[0] + 1)) + weather.tempRange[0];

    return (
        <div style={{
            textAlign: 'center',
            padding: 'var(--spacing-md)',
            background: 'linear-gradient(135deg, #e0f2fe 0%, #f0f9ff 100%)',
            borderRadius: 'var(--radius-md)',
            marginBottom: 'var(--spacing-lg)'
        }}>
            <div style={{ fontSize: '4rem', marginBottom: 'var(--spacing-sm)' }}>{weather.icon}</div>
            <h3 style={{ fontSize: '2rem', marginBottom: '0' }}>{temp}°C</h3>
            <p style={{ color: 'var(--color-text-muted)', fontSize: 'var(--font-size-lg)' }}>{weather.description}</p>
            <div style={{ marginTop: 'var(--spacing-sm)', fontSize: '0.9rem', color: 'var(--color-primary)' }}>
                Climate: {climate}
            </div>
        </div>
    );
}

export default WeatherCard;
