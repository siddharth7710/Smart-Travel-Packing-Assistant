import { useState, useEffect } from 'react';
import { essentials } from '../data/mockData';

function EssentialsChecklist({ destination }) {
    const [items, setItems] = useState([]);

    useEffect(() => {
        // Generate checklist based on rules
        const newItems = new Set([
            ...essentials.Health,
            ...essentials.Tech
        ]);

        const isInternational = !destination.name.includes("India");
        if (isInternational) {
            essentials.International.forEach(item => newItems.add(item));
        }

        if (destination.climate === "Tropical") {
            essentials.Beach.forEach(item => newItems.add(item));
        }

        // Add default Adventure items if it has specific attractions, mock for now
        if (destination.attractions.some(a => a.includes("Rice") || a.includes("Hiking"))) {
            essentials.Adventure.forEach(item => newItems.add(item));
        }

        setItems(Array.from(newItems).map(label => ({ label, checked: false })));
    }, [destination]);

    const toggleItem = (index) => {
        const newItems = [...items];
        newItems[index].checked = !newItems[index].checked;
        setItems(newItems);
    };

    return (
        <div style={{
            padding: 'var(--spacing-md)',
            backgroundColor: 'white',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--color-border)'
        }}>
            <h3 style={{ marginBottom: 'var(--spacing-md)' }}>✅ Travel Essentials</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {items.map((item, index) => (
                    <label key={index} style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.75rem',
                        cursor: 'pointer',
                        padding: '0.5rem',
                        borderRadius: 'var(--radius-sm)',
                        transition: 'background-color 0.2s',
                    }}
                        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--color-bg-body)'}
                        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                    >
                        <input
                            type="checkbox"
                            checked={item.checked}
                            onChange={() => toggleItem(index)}
                            style={{ width: '1.2rem', height: '1.2rem', accentColor: 'var(--color-secondary)' }}
                        />
                        <span style={{
                            textDecoration: item.checked ? 'line-through' : 'none',
                            color: item.checked ? 'var(--color-text-muted)' : 'var(--color-text-main)'
                        }}>
                            {item.label}
                        </span>
                    </label>
                ))}
            </div>
        </div>
    );
}

export default EssentialsChecklist;
