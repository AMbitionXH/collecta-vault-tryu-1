import { useState, useEffect } from 'react'
import './App.css'
import { supabase } from './supabase'

interface Card {
  id: string
  name: string
  character: string
  tier: string
  wave: string
  series: string
  card_number: string
}

export default function App() {
  const [page, setPage] = useState('browse')
  const [cards, setCards] = useState<Card[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')

  useEffect(() => {
    fetchCards()
  }, [])

  async function fetchCards() {
    setLoading(true)
    const { data, error } = await supabase.from('cards').select('*')
    if (error) console.error(error)
    else setCards(data || [])
    setLoading(false)
  }

  const tierColors: Record<string, string> = {
    SE: '#faeeda', SP: '#FBEAF0', BP: '#E6F1FB', AR: '#E1F5EE',
    UR: '#faeeda', ZR: '#FBEAF0', HR: '#E6F1FB', SR: '#E1F5EE', R: '#F1EFE8'
  }

  const tierBadge: Record<string, string> = {
    SE: 'badge-ur', SP: 'badge-zr', BP: 'badge-hr', AR: 'badge-sr',
    UR: 'badge-ur', ZR: 'badge-zr', HR: 'badge-hr', SR: 'badge-sr', R: 'badge-r'
  }

  const filteredCards = cards.filter(card =>
    card.name.toLowerCase().includes(search.toLowerCase()) ||
    card.character.toLowerCase().includes(search.toLowerCase()) ||
    card.series.toLowerCase().includes(search.toLowerCase())
  )

  const wave1Cards = cards.filter(c => c.wave === 'Wave 1')
  const wave2Cards = cards.filter(c => c.wave === 'Wave 2')

  return (
    <div className="app">
      <nav className="nav">
        <div className="logo">Collecta<span>Vault</span></div>
        <div className="nav-tabs">
          <button className={page === 'browse' ? 'nav-tab active' : 'nav-tab'} onClick={() => setPage('browse')}>Browse</button>
          <button className={page === 'sets' ? 'nav-tab active' : 'nav-tab'} onClick={() => setPage('sets')}>Sets</button>
          <button className={page === 'collection' ? 'nav-tab active' : 'nav-tab'} onClick={() => setPage('collection')}>My collection</button>
          <button className={page === 'wanted' ? 'nav-tab active' : 'nav-tab'} onClick={() => setPage('wanted')}>Wanted list</button>
        </div>
        <div className="nav-right">
          <div className="nav-search">
            <input type="text" placeholder="Search cards..." value={search} onChange={e => setSearch(e.target.value)} onFocus={() => setPage('browse')} />
          </div>
          <button className="btn-login">Log in</button>
          <button className="btn-signup">Sign up</button>
        </div>
      </nav>

      {page === 'browse' && (
        <div>
          <div className="hero">
            <div className="hero-eyebrow">Now tracking: Naruto Kayou · More games coming soon</div>
            <h1>Your card collection,<br /><span>all in one vault</span></h1>
            <p>Track prices, manage your collection, and know what every card is worth.</p>
            <div className="hero-search">
              <input type="text" placeholder="Search by card name, character, or set..." value={search} onChange={e => setSearch(e.target.value)} />
              <button>Search</button>
            </div>
          </div>
          <div className="stats-row">
            <div className="stat"><div className="stat-num">{cards.length}</div><div className="stat-label">Cards tracked</div></div>
            <div className="stat"><div className="stat-num">Live</div><div className="stat-label">eBay prices</div></div>
            <div className="stat"><div className="stat-num">4 tiers</div><div className="stat-label">SE · SP · BP · AR</div></div>
          </div>
          {loading ? (
            <div style={{ textAlign: 'center', padding: '48px', color: '#888' }}>Loading cards...</div>
          ) : (
            <div className="section">
              <div className="section-header">
                <div className="section-title">{search ? `Results for "${search}"` : 'All cards'}</div>
                <div className="see-all">{filteredCards.length} cards</div>
              </div>
              {filteredCards.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '48px', color: '#888' }}>No cards found</div>
              ) : (
                <div className="cards-grid">
                  {filteredCards.map(card => (
                    <div className="card" key={card.id}>
                      <div className="card-img" style={{ background: tierColors[card.tier] || '#f5f5f5' }}>
                        <span className="card-char">card</span>
                        <span className={`card-badge ${tierBadge[card.tier] || 'badge-r'}`}>{card.tier}</span>
                      </div>
                      <div className="card-info">
                        <div className="card-name">{card.name}</div>
                        <div className="card-set">{card.wave} · {card.card_number}</div>
                        <div className="card-price">—</div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      )}

{page === 'sets' && (
  <div className="section">
    <div className="section-header">
      <div className="section-title">All sets</div>
      <div className="see-all">{cards.length} total cards</div>
    </div>
    <div className="sets-grid">
      {['Wave 1', 'Wave 2'].map(wave => {
        const waveCards = cards.filter(c => c.wave === wave)
        const series = [...new Set(waveCards.map(c => c.series))]
        const tiers = [...new Set(waveCards.map(c => c.tier))]
        return (
          <div className="set-card" key={wave}>
            <div className="set-wave">{wave}</div>
            <div className="set-name">Naruto Kayou {wave === 'Wave 1' ? 'NRSA01' : 'NRSA02'}</div>
            <div className="set-meta">{waveCards.length} cards · {series.length} series</div>
            <div className="set-bar">
              <div className="set-bar-fill" style={{ width: '100%' }}></div>
            </div>
            <div className="set-bar-label">{tiers.join(' · ')} tiers</div>
            <div style={{ marginTop: '12px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
              {tiers.map(tier => (
                <div key={tier} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px' }}>
                  <span style={{ color: '#666' }}>{tier}</span>
                  <span style={{ fontWeight: 500 }}>{waveCards.filter(c => c.tier === tier).length} cards</span>
                </div>
              ))}
            </div>
          </div>
        )
      })}
    </div>
  </div>
)}

      {page === 'collection' && (
        <div className="section">
          <div className="section-header">
            <div className="section-title">My collection</div>
            <button className="btn-signup">+ Add card</button>
          </div>
          <div className="metrics">
            <div className="metric"><div className="metric-label">Total value</div><div className="metric-value">$0</div></div>
            <div className="metric"><div className="metric-label">Cards owned</div><div className="metric-value">0</div></div>
            <div className="metric"><div className="metric-label">This month</div><div className="metric-value green">+$0</div></div>
          </div>
          <div style={{ textAlign: 'center', padding: '48px', color: '#888' }}>Sign in to track your collection</div>
        </div>
      )}

      {page === 'wanted' && (
        <div className="section">
          <div className="section-header">
            <div className="section-title">Wanted list</div>
            <button className="btn-signup">+ Add to wanted</button>
          </div>
          <div style={{ textAlign: 'center', padding: '48px', color: '#888' }}>Sign in to build your wanted list</div>
        </div>
      )}
    </div>
  )
}