import { useState } from 'react'
import './styles/main.css'
import DestinationSearch from './components/DestinationSearch'
import WeatherCard from './components/WeatherCard'
import ClothingList from './components/ClothingList'
import EssentialsChecklist from './components/EssentialsChecklist'
import Attractions from './components/Attractions'
import MonologueGenerator from './components/MonologueGenerator'

function App() {
  // Application State
  const [destination, setDestination] = useState(null)
  const [selectedAttractions, setSelectedAttractions] = useState([])

  return (
    <div className="container">
      <header style={{ textAlign: 'center', margin: '2rem 0' }}>
        <h1 style={{ fontSize: '2.5rem', color: 'var(--color-primary)' }}>Smart Travel Companion 🌍✈️</h1>
        <p style={{ color: 'var(--color-text-muted)' }}>Plan your perfect trip with personalized insights.</p>
      </header>

      <main>
        {!destination ? (
          <section style={{ marginBottom: '3rem', textAlign: 'center' }}>
            <DestinationSearch onSelect={setDestination} />
          </section>
        ) : (
          <div className="card" style={{ position: 'relative' }}>
            <button
              onClick={() => {
                setDestination(null);
                setSelectedAttractions([]);
              }}
              style={{
                position: 'absolute',
                top: 'var(--spacing-lg)',
                left: 'var(--spacing-lg)',
                padding: '0.5rem 1rem',
                backgroundColor: 'transparent',
                border: '1px solid var(--color-border)',
                borderRadius: 'var(--radius-sm)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                color: 'var(--color-text-main)',
                fontSize: '0.9rem',
                transition: 'background-color 0.2s'
              }}
              onMouseEnter={(e) => e.target.style.backgroundColor = 'var(--color-bg-body)'}
              onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
            >
              ← Back
            </button>
            <h2 style={{ textAlign: 'center', marginBottom: '2rem' }}>Trip to {destination.name}</h2>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
              <section>
                <div style={{ marginBottom: '2rem' }}>
                  <h3 style={{ marginBottom: '1rem' }}>Current Weather</h3>
                  <WeatherCard climate={destination.climate} />
                </div>
                <div>
                  <ClothingList climate={destination.climate} />
                </div>
              </section>

              <section>
                <div style={{ marginBottom: '2rem' }}>
                  <EssentialsChecklist destination={destination} />
                </div>
                <div>
                  <Attractions
                    destination={destination}
                    onSelectionChange={setSelectedAttractions}
                  />
                </div>
              </section>
            </div>

            <MonologueGenerator
              destination={destination}
              selectedAttractions={selectedAttractions}
            />
          </div>
        )}
      </main>
    </div>
  )
}

export default App
