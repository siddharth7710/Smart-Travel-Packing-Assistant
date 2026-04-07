import { useState } from 'react';

function MonologueGenerator({ destination, selectedAttractions }) {
    const [monologue, setMonologue] = useState('');
    const [loading, setLoading] = useState(false);

    const generateMonologue = () => {
        setLoading(true);
        // Simulate API delay
        setTimeout(() => {
            const attractionsText = selectedAttractions.length > 0
                ? `I can't wait to visit ${selectedAttractions.slice(0, -1).join(', ')}${selectedAttractions.length > 1 ? ' and ' : ''}${selectedAttractions[selectedAttractions.length - 1]}.`
                : "I'm excited to explore all the hidden gems.";

            const mood = "adventurous"; // Could be a state selection

            const story = `Get ready for an unforgettable journey to ${destination.name}! 
      The weather is looking ${destination.climate.toLowerCase()}, so I've packed accordingly. 
      ${attractionsText} 
      This trip is going to be ${mood} and full of memories. 
      Let's go! ✈️`;

            setMonologue(story);
            setLoading(false);
        }, 1000);
    };

    if (!destination) return null;

    return (
        <div style={{
            marginTop: 'var(--spacing-xl)',
            padding: 'var(--spacing-lg)',
            backgroundColor: 'var(--color-bg-body)',
            borderRadius: 'var(--radius-lg)',
            textAlign: 'center'
        }}>
            <h3 style={{ marginBottom: 'var(--spacing-md)' }}>📝 Your Travel Story</h3>

            <textarea
                value={monologue}
                onChange={(e) => setMonologue(e.target.value)}
                placeholder="Write your travel monologue here, or click the button below to generate one automatically..."
                style={{
                    width: '100%',
                    maxWidth: '800px',
                    minHeight: '150px',
                    padding: '1rem',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--color-border)',
                    marginBottom: '1rem',
                    fontFamily: 'inherit',
                    fontSize: '1.05rem',
                    lineHeight: '1.6',
                    resize: 'vertical',
                    boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.05)'
                }}
            />

            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginTop: '1rem' }}>
                <button
                    onClick={generateMonologue}
                    disabled={loading}
                    className="btn-primary"
                    style={{ padding: '0.75rem 2rem', fontSize: '1rem' }}
                >
                    {loading ? 'Writing...' : (monologue ? 'Regenerate Monologue' : 'Generate Monologue')}
                </button>
                
                {monologue && (
                    <button
                        onClick={() => setMonologue('')}
                        style={{
                            padding: '0.75rem 1.5rem',
                            fontSize: '1rem',
                            backgroundColor: 'transparent',
                            color: 'var(--color-text-muted)',
                            border: '1px solid var(--color-border)',
                            borderRadius: 'var(--radius-md)',
                            cursor: 'pointer',
                            transition: 'all 0.2s'
                        }}
                        onMouseEnter={(e) => {
                            e.target.style.backgroundColor = 'var(--color-bg-card)';
                            e.target.style.color = 'var(--color-text-main)';
                        }}
                        onMouseLeave={(e) => {
                            e.target.style.backgroundColor = 'transparent';
                            e.target.style.color = 'var(--color-text-muted)';
                        }}
                    >
                        Clear
                    </button>
                )}
            </div>
        </div>
    );
}

export default MonologueGenerator;
