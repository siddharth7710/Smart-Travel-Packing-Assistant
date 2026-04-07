import { useState } from 'react';
import { destinations } from '../data/mockData';
import '../styles/main.css';

// Inline styles for this component for now, or could use a module
const styles = {
    container: {
        position: 'relative',
        maxWidth: '500px',
        margin: '0 auto',
    },
    dropdown: {
        position: 'absolute',
        top: '100%',
        left: 0,
        right: 0,
        backgroundColor: 'white',
        border: '1px solid var(--color-border)',
        borderRadius: '0 0 var(--radius-md) var(--radius-md)',
        maxHeight: '200px',
        overflowY: 'auto',
        zIndex: 1000,
        boxShadow: 'var(--shadow-lg)',
    },
    item: {
        padding: 'var(--spacing-md)',
        cursor: 'pointer',
        borderBottom: '1px solid var(--color-bg-body)',
    },
    itemHover: {
        backgroundColor: 'var(--color-bg-body)'
    }
};

function DestinationSearch({ onSelect }) {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const [showDropdown, setShowDropdown] = useState(false);

    const handleSearch = (e) => {
        const value = e.target.value;
        setQuery(value);

        if (value.length > 0) {
            const filtered = destinations.filter(dest =>
                dest.name.toLowerCase().includes(value.toLowerCase())
            );
            setResults(filtered);
            setShowDropdown(true);
        } else {
            setResults([]);
            setShowDropdown(false);
        }
    };

    const handleSelect = (dest) => {
        setQuery(dest.name);
        setShowDropdown(false);
        onSelect(dest);
    };

    return (
        <div style={styles.container}>
            <input
                type="text"
                placeholder="Where do you want to go? (e.g., Paris, Tokyo)"
                value={query}
                onChange={handleSearch}
                style={{ width: '100%', padding: '1rem', fontSize: '1.1rem' }}
            />

            {showDropdown && results.length > 0 && (
                <ul style={styles.dropdown}>
                    {results.map((dest) => (
                        <li
                            key={dest.id}
                            style={styles.item}
                            onClick={() => handleSelect(dest)}
                            onMouseEnter={(e) => e.target.style.backgroundColor = 'var(--color-bg-body)'}
                            onMouseLeave={(e) => e.target.style.backgroundColor = 'white'}
                        >
                            {dest.name}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default DestinationSearch;
