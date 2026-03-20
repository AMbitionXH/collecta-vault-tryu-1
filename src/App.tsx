import { useState } from 'react'
import './App.css'

export default function App() {
  const [page, setPage] = useState('browse')

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
            <input type="text" placeholder="Search cards..." />
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
              <input type="text" placeholder="Search by card name, character, or set..." />
              <button>Search</button>
            </div>
          </div>

          <div className="stats-row">
            <div className="stat"><div className="stat-num">12,400+</div><div className="stat-label">Cards tracked</div></div>
            <div className="stat"><div className="stat-num">Live</div><div className="stat-label">eBay prices</div></div>
            <div className="stat"><div className="stat-num">All tiers</div><div className="stat-label">UR · ZR · HR · SR · R</div></div>
          </div>

          <div className="section">
            <div className="section-header">
              <div className="section-title">Most popular this week</div>
              <div className="see-all">See all</div>
            </div>
            <div className="section-sub">Top 6 most searched and added to collections</div>
            <div className="cards-row">
              {[
                { name: 'Kurama', tier: 'ZR', wave: 'Wave 2', num: '#044', price: '$340', change: '+21%', up: true, emoji: '🦊', rank: 1 },
                { name: 'Sasuke Uchiha', tier: 'ZR', wave: 'Wave 1', num: '#002', price: '$210', change: '+8%', up: true, emoji: '⚡', rank: 2 },
                { name: 'Naruto Uzumaki', tier: 'UR', wave: 'Wave 1', num: '#001', price: '$84', change: '+12%', up: true, emoji: '🍥', rank: 3 },
                { name: 'Itachi Uchiha', tier: 'SR', wave: 'Wave 2', num: '#038', price: '$45', change: '+5%', up: true, emoji: '👁️', rank: 4 },
                { name: 'Minato Namikaze', tier: 'HR', wave: 'Wave 2', num: '#021', price: '$178', change: '+9%', up: true, emoji: '⚡', rank: 5 },
                { name: 'Obito Uchiha', tier: 'UR', wave: 'Wave 3', num: '#009', price: '$72', change: '-2%', up: false, emoji: '🌀', rank: 6 },
              ].map(card => (
                <div className="card" key={card.rank}>
                  <div className={`card-img tier-${card.tier.toLowerCase()}`}>
                    <span className="card-char">{card.emoji}</span>
                    <span className="card-rank">#{card.rank}</span>
                    <span className={`card-badge badge-${card.tier.toLowerCase()}`}>{card.tier}</span>
                  </div>
                  <div className="card-info">
                    <div className="card-name">{card.name}</div>
                    <div className="card-set">{card.wave} · {card.num}</div>
                    <div className="card-price">{card.price}<span className={card.up ? 'price-up' : 'price-down'}>{card.change}</span></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {page === 'sets' && (
        <div className="section">
          <div className="section-header"><div className="section-title">All sets</div></div>
          <div className="sets-grid">
            {[
              { wave: 'Wave 1', name: 'Naruto Kayou Series 1', cards: 148, year: 2022, pct: 72 },
              { wave: 'Wave 1', name: 'Naruto Kayou Series 2', cards: 132, year: 2022, pct: 58 },
              { wave: 'Wave 2', name: 'Naruto Kayou Series 3', cards: 160, year: 2023, pct: 44 },
              { wave: 'Wave 2', name: 'Naruto Kayou Series 4', cards: 144, year: 2023, pct: 31 },
              { wave: 'Wave 3', name: 'Naruto Kayou Series 5', cards: 156, year: 2024, pct: 19 },
              { wave: 'Wave 3', name: 'Naruto Kayou Series 6', cards: 128, year: 2024, pct: 9 },
            ].map(set => (
              <div className="set-card" key={set.name}>
                <div className="set-wave">{set.wave}</div>
                <div className="set-name">{set.name}</div>
                <div className="set-meta">{set.cards} cards · Released {set.year}</div>
                <div className="set-bar"><div className="set-bar-fill" style={{ width: `${set.pct}%` }}></div></div>
                <div className="set-bar-label">{set.pct}% of collectors own this</div>
              </div>
            ))}
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
            <div className="metric"><div className="metric-label">Total value</div><div className="metric-value">$1,240</div></div>
            <div className="metric"><div className="metric-label">Cards owned</div><div className="metric-value">34</div></div>
            <div className="metric"><div className="metric-label">This month</div><div className="metric-value green">+$180</div></div>
          </div>
        </div>
      )}

      {page === 'wanted' && (
        <div className="section">
          <div className="section-header">
            <div className="section-title">Wanted list</div>
            <button className="btn-signup">+ Add to wanted</button>
          </div>
          <p className="section-sub">Cards you're hunting for. Set a target price and get alerted when they drop.</p>
          <div className="list">
            {[
              { name: 'Minato Namikaze', tier: 'ZR', wave: 'Wave 2', target: '$150', price: '$178', met: false, emoji: '⚡' },
              { name: 'Obito Uchiha', tier: 'UR', wave: 'Wave 3', target: '$60', price: '$72', met: false, emoji: '🌀' },
              { name: 'Kakashi Hatake', tier: 'HR', wave: 'Wave 1', target: '$30', price: '$28', met: true, emoji: '🔵' },
            ].map(card => (
              <div className="list-item" key={card.name}>
                <div className="item-left">
                  <div className="item-dot">{card.emoji}</div>
                  <div>
                    <div className="item-name">{card.name} <span className="wanted-badge">Watching</span></div>
                    <div className="item-meta">{card.wave} · {card.tier} · Target: under {card.target}</div>
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div className="item-price">{card.price}</div>
                  <button className={card.met ? 'wanted-btn met' : 'wanted-btn alert'}>{card.met ? 'Price met!' : 'Alert on'}</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}