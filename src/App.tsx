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
  image_url: string | null
}

export default function App() {
  const [page, setPage] = useState('browse')
  const [cards, setCards] = useState<Card[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [selectedWave, setSelectedWave] = useState<string | null>(null)
  const [selectedCard, setSelectedCard] = useState<Card | null>(null)
  const [priceTab, setPriceTab] = useState('1w')

  useEffect(() => { fetchCards() }, [])

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

  const Nav = ({ activePage }: { activePage: string }) => (
    <nav className="nav">
      <div className="logo">Collecta<span>Vault</span></div>
      <div className="nav-tabs">
        <button className={activePage === 'browse' ? 'nav-tab active' : 'nav-tab'} onClick={() => { setSelectedCard(null); setSelectedWave(null); setPage('browse') }}>Browse</button>
        <button className={activePage === 'sets' ? 'nav-tab active' : 'nav-tab'} onClick={() => { setSelectedCard(null); setSelectedWave(null); setPage('sets') }}>Sets</button>
        <button className={activePage === 'collection' ? 'nav-tab active' : 'nav-tab'} onClick={() => { setSelectedCard(null); setSelectedWave(null); setPage('collection') }}>My collection</button>
        <button className={activePage === 'wanted' ? 'nav-tab active' : 'nav-tab'} onClick={() => { setSelectedCard(null); setSelectedWave(null); setPage('wanted') }}>Wanted list</button>
      </div>
      <div className="nav-right">
        <div className="nav-search">
          <input type="text" placeholder="Search cards..." value={search} onChange={e => setSearch(e.target.value)} onFocus={() => { setSelectedCard(null); setSelectedWave(null); setPage('browse') }} />
        </div>
        <button className="btn-login">Log in</button>
        <button className="btn-signup">Sign up</button>
      </div>
    </nav>
  )

  if (selectedCard) {
    return (
      <div className="app">
        <Nav activePage={page} />
        <div className="detail-page">
          <div className="breadcrumb">
            <span onClick={() => { setSelectedCard(null); setPage('browse') }}>Naruto Kayou</span> ›{' '}
            <span onClick={() => { setSelectedCard(null); setPage('sets') }}>{selectedCard.wave} · {selectedCard.series}</span> ›{' '}
            {selectedCard.name}
          </div>
          <div className="detail-top">
            <div className="detail-card-img" style={{ background: tierColors[selectedCard.tier] || '#f5f5f5' }}>
              {selectedCard.image_url
                ? <img src={selectedCard.image_url} alt={selectedCard.name} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '12px' }} />
                : <span className="detail-card-char">🃏</span>
              }
              <span className={`card-badge ${tierBadge[selectedCard.tier]}`}>{selectedCard.tier}</span>
            </div>
            <div className="detail-info">
              <div className="detail-name">{selectedCard.name}</div>
              <div className="detail-sub">Naruto Kayou · {selectedCard.wave} · {selectedCard.card_number}</div>
              <div className="detail-price-row">
                <div className="detail-price">—</div>
                <div className="detail-change">Price coming soon</div>
              </div>
              <div className="detail-price-meta">eBay price tracking coming soon</div>
              <div className="detail-btn-row">
                <button className="btn-primary-sm">+ Add to collection</button>
                <button className="btn-secondary-sm">+ Wishlist</button>
              </div>
              <div className="detail-meta-grid">
                <div className="detail-meta-item"><div className="detail-meta-label">Tier</div><div className="detail-meta-value">{selectedCard.tier}</div></div>
                <div className="detail-meta-item"><div className="detail-meta-label">Wave</div><div className="detail-meta-value">{selectedCard.wave}</div></div>
                <div className="detail-meta-item"><div className="detail-meta-label">All time high</div><div className="detail-meta-value">—</div></div>
                <div className="detail-meta-item"><div className="detail-meta-label">All time low</div><div className="detail-meta-value">—</div></div>
              </div>
            </div>
            <div className="detail-chart-col">
              <div className="detail-chart-header">
                <div className="detail-chart-title">Price history</div>
                <div className="detail-chart-tabs">
                  {['1w','1m','3m'].map(t => (
                    <button key={t} className={priceTab === t ? 'chart-tab active' : 'chart-tab'} onClick={() => setPriceTab(t)}>{t}</button>
                  ))}
                </div>
              </div>
              <div className="detail-chart-placeholder">
                <div style={{ textAlign: 'center', color: '#888', fontSize: '13px' }}>
                  Price chart coming soon<br />
                  <span style={{ fontSize: '11px' }}>eBay integration in progress</span>
                </div>
              </div>
            </div>
          </div>
          <div className="detail-divider" />
          <div className="detail-two-col">
            <div>
              <div className="detail-section-title">Last sold</div>
              <div className="detail-list">
                {[1,2,3,4,5].map(i => (
                  <div className="detail-list-item" key={i}>
                    <div><div className="detail-list-price">—</div><div className="detail-list-meta">Coming soon</div></div>
                    <div className="detail-list-badge">Near mint</div>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <div className="detail-section-title">Active listings</div>
              <div className="detail-list">
                {[1,2,3,4,5].map(i => (
                  <div className="detail-list-item" key={i}>
                    <div><div className="detail-list-price">—</div><div className="detail-list-meta">eBay listings coming soon</div></div>
                    <button className="listing-btn">View on eBay</button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (selectedWave) {
    const waveCards = cards.filter(c => c.wave === selectedWave)
    const tiers = [...new Set(waveCards.map(c => c.tier))]
    return (
      <div className="app">
        <Nav activePage="sets" />
        <div className="detail-page">
          <div className="breadcrumb">
            <span onClick={() => setSelectedWave(null)}>Sets</span> › {selectedWave === 'Wave 1' ? 'NRSA01' : 'NRSA02'}
          </div>
          <div className="section-header" style={{ marginTop: '16px', marginBottom: '20px' }}>
            <div>
              <div className="section-title">Naruto Kayou {selectedWave === 'Wave 1' ? 'NRSA01' : 'NRSA02'}</div>
              <div className="section-sub">{waveCards.length} cards · {tiers.join(' · ')} tiers</div>
            </div>
          </div>
          {tiers.map(tier => (
            <div key={tier} style={{ marginBottom: '28px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
                <span className={`card-badge ${tierBadge[tier]}`} style={{ fontSize: '12px', padding: '4px 10px' }}>{tier}</span>
                <span style={{ fontSize: '13px', color: '#888' }}>{waveCards.filter(c => c.tier === tier).length} cards</span>
              </div>
              <div className="cards-grid">
                {waveCards.filter(c => c.tier === tier).map(card => (
                  <div className="card" key={card.id} onClick={() => setSelectedCard(card)}>
                    <div className="card-img" style={{ background: tierColors[card.tier] || '#f5f5f5' }}>
                      {card.image_url
                        ? <img src={card.image_url} alt={card.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        : <span className="card-char">🃏</span>
                      }
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
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="app">
      <Nav activePage={page} />
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
                    <div className="card" key={card.id} onClick={() => setSelectedCard(card)}>
                      <div className="card-img" style={{ background: tierColors[card.tier] || '#f5f5f5' }}>
                        {card.image_url
                          ? <img src={card.image_url} alt={card.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                          : <span className="card-char">🃏</span>
                        }
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
              const tiers = [...new Set(waveCards.map(c => c.tier))]
              return (
                <div className="set-card" key={wave} onClick={() => setSelectedWave(wave)}>
                  <div className="set-wave">{wave}</div>
                  <div className="set-name">Naruto Kayou {wave === 'Wave 1' ? 'NRSA01' : 'NRSA02'}</div>
                  <div className="set-meta">{waveCards.length} cards</div>
                  <div className="set-bar"><div className="set-bar-fill" style={{ width: '100%' }}></div></div>
                  <div className="set-bar-label">{tiers.join(' · ')} tiers</div>
                  <div style={{ marginTop: '12px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    {tiers.map(tier => (
                      <div key={tier} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px' }}>
                        <span style={{ color: '#666' }}>{tier}</span>
                        <span style={{ fontWeight: 500 }}>{waveCards.filter(c => c.tier === tier).length} cards</span>
                      </div>
                    ))}
                  </div>
                  <div style={{ marginTop: '12px', fontSize: '12px', color: '#378ADD' }}>View all cards →</div>
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