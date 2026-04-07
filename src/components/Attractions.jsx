import { useState, useEffect } from 'react';
import { attractionsData } from '../data/mockData';

function Attractions({ destination, onSelectionChange }) {
    const [availableAttractions, setAvailableAttractions] = useState([]);
    const [selected, setSelected] = useState([]);

    useEffect(() => {
        // In a real app, this would query an API
        // For now, use the mock data attached to destination object + some global enrichments
        if (destination && destination.attractions) {
            setAvailableAttractions(destination.attractions.map(name => ({
                name,
                // Fallback to generic if not in attractionsData
                ...(attractionsData[name] || { type: 'General', image: 'https://via.placeholder.com/150' })
            })));
            setSelected([]); // Reset selection on new destination
            onSelectionChange([]);
        }
    }, [destination]);

    const toggleAttraction = (name) => {
        let newSelected;
        if (selected.includes(name)) {
            newSelected = selected.filter(s => s !== name);
        } else {
            newSelected = [...selected, name];
        }
        setSelected(newSelected);
        onSelectionChange(newSelected);
    };

    if (!availableAttractions.length) return null;

    return (
        <div style={{
            marginTop: 'var(--spacing-lg)',
            padding: 'var(--spacing-md)',
            backgroundColor: 'white',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--color-border)'
        }}>
            <h3 style={{ marginBottom: 'var(--spacing-md)' }}>🏰 Must-Visit Attractions</h3>
            <p style={{ marginBottom: 'var(--spacing-md)', fontSize: '0.9rem', color: 'var(--color-text-muted)' }}>
                Select places you plan to visit for a personalized monologue.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))', gap: '1rem' }}>
                {availableAttractions.map((attr) => (
                    <div
                        key={attr.name}
                        onClick={() => toggleAttraction(attr.name)}
                        style={{
                            cursor: 'pointer',
                            border: selected.includes(attr.name) ? '2px solid var(--color-primary)' : '1px solid var(--color-border)',
                            borderRadius: 'var(--radius-md)',
                            overflow: 'hidden',
                            transition: 'all 0.2s ease',
                            opacity: selected.includes(attr.name) ? 1 : 0.8
                        }}
                    >
                        <div style={{ height: '80px', backgroundColor: '#ddd', backgroundImage: `url(${attr.image})`, backgroundSize: 'cover' }} />
                        <div style={{ padding: '0.5rem' }}>
                            <div style={{ fontWeight: 'bold', fontSize: '0.85rem', marginBottom: '0.25rem' }}>{attr.name}</div>
                            <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>{attr.type}</div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Attractions;
