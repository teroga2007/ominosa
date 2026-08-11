import { useEffect, useState } from 'react'
import { ArrowDownRight, ArrowUpRight, Camera, ChevronDown, Menu, X } from 'lucide-react'
import es from './content/es.json'
import en from './content/en.json'

type Copy = typeof es
type Language = 'es' | 'en'

const MUSIC = {
  spotifyAlbum: 'https://open.spotify.com/album/3V64EE9lTZfv3ydNu4T0z3?si=Y9CdBH2uRv6yEVF2qnlaKA&utm_source=copy-link',
  spotifyArtist: 'https://open.spotify.com/artist/0h4E9tSTCR7z5XZlkGsTNO?si=GYD6MHVGT3i1qZAFi598jw',
  bandcamp: 'https://ominosacr.bandcamp.com/',
  appleMusic: 'https://music.apple.com/mx/artist/ominosa/1448986140',
  instagram: 'https://instagram.com/ominosacr',
  tiktok: 'https://tiktok.com/@ominosacr',
  youtube: 'https://www.youtube.com/@ominosacr',
  soundcloud: 'https://m.soundcloud.com/ominosa-cr',
}
const platforms = [
  { name: 'Spotify', href: MUSIC.spotifyArtist },
  { name: 'Bandcamp', href: MUSIC.bandcamp },
  { name: 'Apple Music', href: MUSIC.appleMusic },
  { name: 'YouTube', href: MUSIC.youtube },
  { name: 'SoundCloud', href: MUSIC.soundcloud },
  { name: 'Instagram', href: MUSIC.instagram },
  { name: 'TikTok', href: MUSIC.tiktok },
]

const External = ({ className = '' }: { className?: string }) => <ArrowUpRight className={className} strokeWidth={1.6} aria-hidden="true" />
const formatTitle = (text: string) => text.split('\n').map((line, i) => <span key={line}>{line}{i === 0 && <br />}</span>)

export default function App() {
  const [language, setLanguage] = useState<Language>('es')
  const [menuOpen, setMenuOpen] = useState(false)
  const copy: Copy = language === 'es' ? es : en

  useEffect(() => {
    document.documentElement.lang = language
    document.title = `Ominosa — ${copy.hero.title.replace('\n', ' ')}`
  }, [language, copy.hero.title])

  const changeLanguage = () => setLanguage(language === 'es' ? 'en' : 'es')
  const go = (id: string) => { setMenuOpen(false); document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }) }

  return <main>
    <nav className="topbar" aria-label="Primary navigation">
      <button className="wordmark" onClick={() => go('top')} aria-label="Ominosa home"><img src="/assets/ominosa-wordmark.png" alt="Ominosa" /></button>
      <div className="nav-links">
        <button onClick={() => go('album')}>{copy.nav.album}</button>
        <button onClick={() => go('story')}>{copy.nav.story}</button>
        <button onClick={() => go('members')}>{copy.nav.members}</button>
        <button onClick={() => go('listen')}>{copy.nav.listen}</button>
      </div>
      <div className="nav-actions">
        <button className="language" onClick={changeLanguage} aria-label="Change language">{language === 'es' ? 'EN' : 'ES'}</button>
        <button className="menu-button" onClick={() => setMenuOpen(!menuOpen)} aria-label="Open menu">{menuOpen ? <X /> : <Menu />}</button>
      </div>
    </nav>

    {menuOpen && <div className="mobile-menu">
      {(['album', 'story', 'members', 'listen'] as const).map(id => <button key={id} onClick={() => go(id)}>{copy.nav[id]}</button>)}
    </div>}

    <section id="top" className="hero section-shell">
      <div className="hero-art" aria-hidden="true" />
      <div className="noise" aria-hidden="true" />
      <div className="hero-content">
        <p className="eyebrow"><i />{copy.hero.eyebrow}</p>
        <div className="release-note"><span className="pulse" /> {copy.hero.release}</div>
        <h1>{formatTitle(copy.hero.title)}</h1>
        <p className="hero-description">{copy.hero.description}</p>
        <div className="hero-ctas">
          <a className="button button-primary" href={MUSIC.spotifyAlbum} target="_blank" rel="noreferrer">{copy.hero.primary} <External /></a>
          <button className="text-link" onClick={() => go('album')}>{copy.hero.secondary} <ArrowDownRight /></button>
        </div>
      </div>
      <div className="hero-index"><span>01</span><span>05</span></div>
      <div className="hero-side">DEATH · MELODIC · METAL</div>
      <button className="scroll-cue" onClick={() => go('album')} aria-label="Scroll to album"><ChevronDown /></button>
    </section>

    <section id="album" className="section-shell album-section">
      <div className="section-label">{copy.album.eyebrow}</div>
      <div className="album-grid">
        <h2>{formatTitle(copy.album.title)}</h2>
        <div className="album-copy">
          <p>{copy.album.body}</p>
          <div className="album-meta">{copy.album.meta.map(item => <span key={item}>{item}</span>)}</div>
          <a className="button button-ghost" href={MUSIC.bandcamp} target="_blank" rel="noreferrer">{copy.album.cta} <External /></a>
        </div>
      </div>
      <div className="album-artwork">
        <img src="/assets/deaf-and-blinded-god.jpg" alt="Deaf and Blinded God — Ominosa" />
        <div className="art-credit"><span className="rule" />{copy.album.credit}</div>
      </div>
    </section>

    <section className="section-shell tracks-section">
      <div className="section-header"><div className="section-label">{copy.tracks.eyebrow}</div><h2>{copy.tracks.title}</h2></div>
      <div className="track-list">
        {copy.tracks.items.map(track => <article className="track" key={track.number}>
          <span className="track-number">{track.number}</span>
          <h3>{track.name}</h3>
          <p>{track.text}</p>
          <a href={MUSIC.spotifyAlbum} target="_blank" rel="noreferrer" aria-label={`Listen to ${track.name}`}><External /></a>
        </article>)}
      </div>
    </section>

    <section id="story" className="section-shell story-section">
      <div className="story-orb" aria-hidden="true" />
      <div className="section-label">{copy.story.eyebrow}</div>
      <div className="story-grid"><h2>{formatTitle(copy.story.title)}</h2><div><p className="lead">{copy.story.body}</p><p className="production">{copy.story.production}</p></div></div>
    </section>

    <section id="members" className="section-shell members-section">
      <div className="section-label">{copy.members.eyebrow}</div>
      <div className="members-heading"><h2>{formatTitle(copy.members.title)}</h2><p>OMINOSA / CR</p></div>
      <div className="member-grid">{copy.members.items.map((member, i) => <article className="member" key={member.name}><span>0{i + 1}</span><h3>{member.name}</h3><p>{member.role}</p></article>)}</div>
    </section>

    <section id="listen" className="listen-section">
      <div className="section-shell listen-inner">
        <div><div className="section-label">{copy.listen.eyebrow}</div><h2>{formatTitle(copy.listen.title)}</h2><p>{copy.listen.body}</p></div>
        <div className="platforms">{platforms.map(platform => <a key={platform.name} href={platform.href} target="_blank" rel="noreferrer"><span>{platform.name}</span><External /></a>)}</div>
      </div>
    </section>

    <footer className="section-shell footer"><div><img className="footer-logo" src="/assets/ominosa-wordmark.png" alt="Ominosa" /><span>{copy.footer.location}</span></div><div className="footer-links"><a href="mailto:ominosacr@gmail.com">{copy.footer.booking}</a><a href={MUSIC.instagram} target="_blank" rel="noreferrer"><Camera /> Instagram</a><a href="https://www.instagram.com/sdigital.cr/" target="_blank" rel="noreferrer">{copy.footer.credit} <External /></a></div><small>{copy.footer.rights}</small></footer>
  </main>
}
