"use client";

import { useState } from "react";

/* ============================================================
   DESIGN TOKENS — same system as HomePage.jsx, kept in sync
============================================================ */
const COLORS = {
  navy: "#0B3D91",
  blue: "#2B7FFF",
  gold: "#C49A3C",
  paleBlue: "#EAF2FF",
  ink: "#1A1A18",
  slate: "#6B7280",
  warm: "#FAFAF8",
  card: "#FFFFFF",
  line: "#E8E5DF",
  white: "#FFFFFF",
};

/* ============================================================
   PLACEHOLDER DATA
   Extend / replace with real listings. Lat/lng are fake offsets
   used only to position pins on the placeholder map panel.
============================================================ */
const LISTINGS = [
  {
    id: 1,
    title: "Harbor View Residence",
    location: "Seattle, WA",
    price: 389750,
    beds: 4,
    baths: 3,
    sqft: 264,
    type: "House",
    image:
      "https://images.unsplash.com/photo-1605146769289-440113cc3d00?q=80&w=800&auto=format&fit=crop",
    agent: { name: "Maya Rodriguez", image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=200&auto=format&fit=crop" },
    pin: { top: "22%", left: "38%" },
  },
  {
    id: 2,
    title: "Aureo Glass House",
    location: "Malibu, CA",
    price: 1250000,
    beds: 5,
    baths: 4,
    sqft: 383,
    type: "House",
    image:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=800&auto=format&fit=crop",
    agent: { name: "Daniel Kessler", image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=200&auto=format&fit=crop" },
    pin: { top: "48%", left: "62%" },
  },
  {
    id: 3,
    title: "Cedarbrook Cottage",
    location: "Portland, OR",
    price: 560250,
    beds: 3,
    baths: 2,
    sqft: 184,
    type: "Apartment",
    image:
      "https://images.unsplash.com/photo-1570129477492-45c003edd2be?q=80&w=800&auto=format&fit=crop",
    agent: { name: "Aisha Brooks", image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop" },
    pin: { top: "65%", left: "30%" },
  },
  {
    id: 4,
    title: "Lakeside Minimalist",
    location: "Austin, TX",
    price: 778300,
    beds: 4,
    baths: 3,
    sqft: 287,
    type: "House",
    image:
      "https://images.unsplash.com/photo-1613977257363-707ba9348227?q=80&w=800&auto=format&fit=crop",
    agent: { name: "Maya Rodriguez", image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=200&auto=format&fit=crop" },
    pin: { top: "35%", left: "78%" },
  },
  {
    id: 5,
    title: "Birchwood Studio Loft",
    location: "Denver, CO",
    price: 245900,
    beds: 1,
    baths: 1,
    sqft: 71,
    type: "Apartment",
    image:
      "https://images.unsplash.com/photo-1600210492493-0946911123ea?q=80&w=800&auto=format&fit=crop",
    agent: { name: "Daniel Kessler", image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=200&auto=format&fit=crop" },
    pin: { top: "55%", left: "20%" },
  },
  {
    id: 6,
    title: "Maplecourt Townhome",
    location: "Raleigh, NC",
    price: 412000,
    beds: 3,
    baths: 2,
    sqft: 200,
    type: "Condo",
    image:
      "https://images.unsplash.com/photo-1480074568708-e7b720bb3f09?q=80&w=800&auto=format&fit=crop",
    agent: { name: "Aisha Brooks", image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop" },
    pin: { top: "15%", left: "55%" },
  },
];

const AGENTS_MINI = [
  { id: 1, name: "Maya Rodriguez", listings: 18, image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=200&auto=format&fit=crop" },
  { id: 2, name: "Daniel Kessler", listings: 11, image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=200&auto=format&fit=crop" },
  { id: 3, name: "Aisha Brooks", listings: 9, image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop" },
];

const TYPE_COUNTS = [
  { type: "House", count: 142 },
  { type: "Apartment", count: 98 },
  { type: "Condo", count: 54 },
  { type: "Commercial", count: 21 },
];

function formatPrice(n) {
  return `$${n.toLocaleString()}`;
}

/* ============================================================
   ICONS — small inline SVGs, no external icon library needed
============================================================ */
function IconBed() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 9V6a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v3" />
      <path d="M2 11h20v6H2z" />
      <path d="M2 17v3" />
      <path d="M22 17v3" />
      <path d="M6 11V8a1 1 0 0 1 1-1h3a1 1 0 0 1 1 1v3" />
    </svg>
  );
}
function IconBath() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 6V4a2 2 0 0 1 4 0v2" />
      <path d="M4 11h16v2a6 6 0 0 1-6 6H10a6 6 0 0 1-6-6z" />
      <path d="M6 19v2" />
      <path d="M16 19v2" />
    </svg>
  );
}
function IconArea() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="1" />
      <path d="M3 9h4v4H3z" />
    </svg>
  );
}

/* ============================================================
   SHARED BITS
============================================================ */
function Navbar() {
  return (
    <nav className="lp-nav">
      <div className="lp-nav__inner">
        <a href="/" className="lp-logo">
          <span className="lp-logo__mark">⌂</span> Haven
        </a>
        <div className="lp-nav__links">
          <a href="#" className="is-active">Properties</a>
          <a href="#">Agents</a>
          <a href="#">About</a>
          <a href="#">Contact</a>
        </div>
        <button className="lp-btn lp-btn--outline">Sign in</button>
      </div>
    </nav>
  );
}

function PropertyCard({ listing, compact, selected, onSelect }) {
  return (
    <article
      className={`lp-card ${compact ? "lp-card--compact" : ""} ${selected ? "is-selected" : ""}`}
      onClick={() => onSelect?.(listing.id)}
    >
      <div className="lp-card__image-wrap">
        <img src={listing.image} alt={listing.title} loading="lazy" />
        <span className="lp-card__price">{formatPrice(listing.price)}</span>
        {listing.agent && (
          <img
            className="lp-card__agent-badge"
            src={listing.agent.image}
            alt={listing.agent.name}
            title={listing.agent.name}
          />
        )}
      </div>
      <div className="lp-card__body">
        <h3>{listing.title}</h3>
        <p className="lp-card__location">{listing.location}</p>
        <div className="lp-card__meta">
          <span><IconBed /> {listing.beds}</span>
          <span><IconBath /> {listing.baths}</span>
          <span><IconArea /> {listing.sqft.toLocaleString()} m²</span>
        </div>
      </div>
    </article>
  );
}

/* A reusable placeholder map: either "static" (just pins on a flat
   tinted panel) or "interactive" (adds hover state + zoom controls
   to suggest real map behavior, no external map library required).
   Clicking a pin opens a floating popup card (image 1 style) and
   reports the selection up via onSelectPin so the list can sync. */
function MapPanel({ listings, mode, height = "100%", selectedId, onSelectPin }) {
  const selected = listings.find((l) => l.id === selectedId);

  return (
    <div className="lp-map" style={{ height }}>
      <div className="lp-map__surface">
        {listings.map((l) => (
          <button
            key={l.id}
            className={`lp-map__pin ${selectedId === l.id ? "is-selected" : ""}`}
            style={{ top: l.pin.top, left: l.pin.left }}
            title={`${l.title} — ${formatPrice(l.price)}`}
            onClick={() => onSelectPin?.(l.id)}
          >
            {formatPrice(l.price)}
          </button>
        ))}

        {selected && (
          <div
            className="lp-map__popup"
            style={{ top: selected.pin.top, left: selected.pin.left }}
          >
            <button
              className="lp-map__popup-close"
              onClick={() => onSelectPin?.(null)}
              aria-label="Close"
            >
              ×
            </button>
            <div className="lp-map__popup-image-wrap">
              <img src={selected.image} alt={selected.title} />
            </div>
            <div className="lp-map__popup-body">
              <span className="lp-map__popup-price">{formatPrice(selected.price)}</span>
              <div className="lp-map__popup-meta">
                <span><IconBed /> {selected.beds}</span>
                <span><IconBath /> {selected.baths}</span>
                <span><IconArea /> {selected.sqft.toLocaleString()} m²</span>
              </div>
              <p className="lp-map__popup-address">{selected.title}</p>
              <p className="lp-map__popup-location">{selected.location}</p>
            </div>
          </div>
        )}
      </div>
      {mode === "interactive" && (
        <div className="lp-map__controls">
          <button aria-label="Zoom in">+</button>
          <button aria-label="Zoom out">−</button>
        </div>
      )}
      <span className="lp-map__badge">
        {mode === "interactive" ? "Interactive map" : "Map preview"}
      </span>
    </div>
  );
}

/* ============================================================
   LAYOUT 1 — Grid + Map (image 1 / Housi)
   Top filter pills, 2-col card grid left, map right
============================================================ */
/* ============================================================
   LAYOUT 2 — Sidebar Filters (image 7 / Scotland dashboard)
   Left detailed filter sidebar, center card list, right map
============================================================ */
function LayoutSidebarFilters({ listings, mapMode, selectedId, onSelectPin }) {
  return (
    <div className="lp-layout lp-layout--sidebar">
      <aside className="lp-sidebar">
        <h2>Filter</h2>

        <div className="lp-sidebar__group">
          <label>Location</label>
          <select defaultValue="seattle">
            <option value="seattle">Seattle, WA</option>
            <option value="austin">Austin, TX</option>
          </select>
        </div>

        <div className="lp-sidebar__group">
          <label>Type of place</label>
          <div className="lp-checkrow"><input type="checkbox" defaultChecked /> All</div>
          <div className="lp-checkrow"><input type="checkbox" /> House</div>
          <div className="lp-checkrow"><input type="checkbox" /> Apartment</div>
          <div className="lp-checkrow"><input type="checkbox" /> Condo</div>
        </div>

        <div className="lp-sidebar__group">
          <label>Price range</label>
          <input type="range" min="100000" max="1500000" defaultValue="700000" />
          <div className="lp-sidebar__range-labels">
            <span>$100K</span>
            <span>$1.5M</span>
          </div>
        </div>

        <div className="lp-sidebar__group">
          <label>Size (sqft)</label>
          <div className="lp-sidebar__minmax">
            <input placeholder="Min" />
            <input placeholder="Max" />
          </div>
        </div>

        <div className="lp-sidebar__group">
          <label>Features</label>
          <div className="lp-checkrow"><input type="checkbox" defaultChecked /> AC & heating</div>
          <div className="lp-checkrow"><input type="checkbox" /> Garage</div>
          <div className="lp-checkrow"><input type="checkbox" /> Pool</div>
          <div className="lp-checkrow"><input type="checkbox" /> Fitness center</div>
        </div>

        <button className="lp-btn lp-btn--solid lp-sidebar__apply">
          Apply filters
        </button>
      </aside>

      <div className="lp-sidebar__cards">
        <p className="lp-results-count">{listings.length} results in Seattle, WA</p>
        <div className="lp-sidebar__card-list">
          {listings.map((l) => (
            <PropertyCard
              key={l.id}
              listing={l}
              compact
              selected={selectedId === l.id}
              onSelect={onSelectPin}
            />
          ))}
        </div>
      </div>

      <MapPanel
        listings={listings}
        mode={mapMode}
        selectedId={selectedId}
        onSelectPin={onSelectPin}
      />
    </div>
  );
}

/* ============================================================
   LAYOUT 3 — Sidebar + Map on top (image 10 / Grandview Realty)
   Left filter sidebar, right: map panel above card grid
============================================================ */
function LayoutSidebarMapTop({ listings, mapMode, selectedId, onSelectPin }) {
  return (
    <div className="lp-layout lp-layout--sidebarmaptop">
      <aside className="lp-sidebar">
        <div className="lp-toggle-row">
          <button className="lp-toggle is-active">Buy</button>
          <button className="lp-toggle">Rent</button>
        </div>

        <div className="lp-sidebar__group">
          <label>Rental period</label>
          <div className="lp-checkrow"><input type="checkbox" defaultChecked /> Long term</div>
          <div className="lp-checkrow"><input type="checkbox" /> Short term</div>
        </div>

        <div className="lp-sidebar__group">
          <label>Price</label>
          <input type="range" min="100000" max="1500000" defaultValue="700000" />
        </div>

        <div className="lp-sidebar__group">
          <label>Bedrooms</label>
          <div className="lp-pill-row">
            <button>1</button>
            <button className="is-active">2</button>
            <button>3</button>
            <button>4+</button>
          </div>
        </div>

        <div className="lp-sidebar__group">
          <label>Bathrooms</label>
          <div className="lp-pill-row">
            <button className="is-active">Any</button>
            <button>1</button>
            <button>2+</button>
          </div>
        </div>

        <div className="lp-sidebar__group">
          <label>View</label>
          <div className="lp-pill-row">
            <button className="is-active">Any</button>
            <button>Courtyard</button>
            <button>Street</button>
          </div>
        </div>
      </aside>

      <div className="lp-sidebarmaptop__main">
        <MapPanel
          listings={listings}
          mode={mapMode}
          height="320px"
          selectedId={selectedId}
          onSelectPin={onSelectPin}
        />
        <p className="lp-results-count">New in your town</p>
        <div className="lp-gridmap__cards lp-gridmap__cards--3col">
          {listings.map((l) => (
            <PropertyCard
              key={l.id}
              listing={l}
              selected={selectedId === l.id}
              onSelect={onSelectPin}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   LAYOUT 4 — Dashboard (image 11 / EstateJB, adapted)
   Stat widgets row, then 3-col: agents / map widget / type chart,
   with a card list underneath
============================================================ */
function LayoutDashboard({ listings, mapMode, selectedId, onSelectPin }) {
  const maxCount = Math.max(...TYPE_COUNTS.map((t) => t.count));

  return (
    <div className="lp-layout lp-layout--dashboard">
      <div className="lp-dash-stats">
        <div className="lp-dash-stat">
          <span className="lp-dash-stat__label">Total listings</span>
          <strong>5.6K</strong>
        </div>
        <div className="lp-dash-stat">
          <span className="lp-dash-stat__label">Active agents</span>
          <strong>312</strong>
        </div>
        <div className="lp-dash-stat">
          <span className="lp-dash-stat__label">Avg. days on market</span>
          <strong>14</strong>
        </div>
        <div className="lp-dash-stat">
          <span className="lp-dash-stat__label">This week</span>
          <strong>+142</strong>
        </div>
      </div>

      <div className="lp-dash-grid">
        <div className="lp-dash-panel">
          <h3>Top agents</h3>
          {AGENTS_MINI.map((a) => (
            <div key={a.id} className="lp-dash-agent">
              <img src={a.image} alt={a.name} />
              <div>
                <strong>{a.name}</strong>
                <span>{a.listings} listings</span>
              </div>
            </div>
          ))}
        </div>

        <div className="lp-dash-panel lp-dash-panel--map">
          <h3>Properties around you</h3>
          <MapPanel
            listings={listings}
            mode={mapMode}
            height="280px"
            selectedId={selectedId}
            onSelectPin={onSelectPin}
          />
        </div>

        <div className="lp-dash-panel">
          <h3>Property type</h3>
          {TYPE_COUNTS.map((t) => (
            <div key={t.type} className="lp-dash-bar-row">
              <span>{t.type}</span>
              <div className="lp-dash-bar-track">
                <div
                  className="lp-dash-bar-fill"
                  style={{ width: `${(t.count / maxCount) * 100}%` }}
                />
              </div>
              <span className="lp-dash-bar-count">{t.count}</span>
            </div>
          ))}
        </div>
      </div>

      <p className="lp-results-count">Recent listings</p>
      <div className="lp-gridmap__cards lp-gridmap__cards--3col">
        {listings.map((l) => (
          <PropertyCard
            key={l.id}
            listing={l}
            selected={selectedId === l.id}
            onSelect={onSelectPin}
          />
        ))}
      </div>
    </div>
  );
}

const LAYOUTS = {
  sidebar: { label: "Sidebar filters", Component: LayoutSidebarFilters },
  sidebarmaptop: { label: "Sidebar + map top", Component: LayoutSidebarMapTop },
  dashboard: { label: "Dashboard", Component: LayoutDashboard },
};

/* ============================================================
   DEV-ONLY SWITCHER BAR
   Remove once a layout + map mode are chosen.
============================================================ */
function SwitcherBar({ layout, onLayout, mapMode, onMapMode }) {
  return (
    <div className="lp-switcher">
      <div className="lp-switcher__group">
        <span>Layout:</span>
        {Object.entries(LAYOUTS).map(([key, { label }]) => (
          <button
            key={key}
            className={layout === key ? "is-active" : ""}
            onClick={() => onLayout(key)}
          >
            {label}
          </button>
        ))}
      </div>
      <div className="lp-switcher__group">
        <span>Map:</span>
        <button
          className={mapMode === "interactive" ? "is-active" : ""}
          onClick={() => onMapMode("interactive")}
        >
          Interactive
        </button>
        <button
          className={mapMode === "static" ? "is-active" : ""}
          onClick={() => onMapMode("static")}
        >
          Static
        </button>
      </div>
    </div>
  );
}

/* ============================================================
   PAGE
============================================================ */
export default function DashboardPage() {
  const [selectedId, setSelectedId] = useState(null);

  return (
    <div className="lp-page">
      <Navbar />
      <LayoutDashboard
        listings={LISTINGS}
        mapMode="interactive"
        selectedId={selectedId}
        onSelectPin={setSelectedId}
      />

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@500;600;700&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap');

        :root {
          --navy: ${COLORS.navy};
          --blue: ${COLORS.blue};
          --gold: ${COLORS.gold};
          --pale-blue: ${COLORS.paleBlue};
          --ink: ${COLORS.ink};
          --slate: ${COLORS.slate};
          --warm: ${COLORS.warm};
          --card: ${COLORS.card};
          --line: ${COLORS.line};
        }
        * { box-sizing: border-box; }
        .lp-page {
          font-family: "Plus Jakarta Sans", -apple-system, sans-serif;
          color: var(--ink);
          background: var(--warm);
          min-height: 100vh;
          -webkit-font-smoothing: antialiased;
        }
        .lp-page h1, .lp-page h2, .lp-page h3 {
          font-family: "Playfair Display", Georgia, serif;
          font-weight: 600;
          margin: 0;
        }

        /* ---------- Dev switcher ---------- */
        .lp-switcher {
          display: flex;
          flex-wrap: wrap;
          gap: 20px;
          padding: 10px 24px;
          background: #fffbe6;
          border-bottom: 1px solid #f0d97a;
          font-size: 13px;
        }
        .lp-switcher__group {
          display: flex;
          align-items: center;
          gap: 6px;
          flex-wrap: wrap;
        }
        .lp-switcher__group span {
          color: var(--slate);
          font-weight: 600;
          margin-right: 4px;
        }
        .lp-switcher__group button {
          padding: 5px 12px;
          border-radius: 999px;
          border: 1px solid var(--line);
          background: #fff;
          cursor: pointer;
          font-size: 12px;
        }
        .lp-switcher__group button.is-active {
          background: var(--navy);
          color: #fff;
          border-color: var(--navy);
        }

        /* ---------- Navbar ---------- */
        .lp-nav { border-bottom: 1px solid var(--line); background: var(--warm); }
        .lp-nav__inner {
          width: 100%;
          margin: 0 auto;
          padding: 18px clamp(20px, 4vw, 56px);
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .lp-logo {
          font-family: "Playfair Display", serif;
          font-weight: 700;
          font-size: 21px;
          color: var(--ink);
          text-decoration: none;
          display: flex;
          align-items: center;
          gap: 6px;
          letter-spacing: -0.3px;
        }
        .lp-logo__mark { color: var(--navy); }
        .lp-nav__links { display: flex; gap: 28px; }
        .lp-nav__links a {
          color: var(--slate);
          text-decoration: none;
          font-size: 14px;
          font-weight: 500;
        }
        .lp-nav__links a.is-active { color: var(--navy); font-weight: 700; }

        .lp-btn {
          font-family: "Plus Jakarta Sans", sans-serif;
          font-size: 13px;
          font-weight: 600;
          padding: 9px 18px;
          border-radius: 8px;
          cursor: pointer;
        }
        .lp-btn--outline {
          background: transparent;
          border: 1.5px solid var(--ink);
          color: var(--ink);
        }
        .lp-btn--solid {
          background: var(--navy);
          color: #fff;
          border: none;
        }

        /* ---------- Shared property card ---------- */
        .lp-card {
          border: 1px solid var(--line);
          border-radius: 16px;
          overflow: hidden;
          background: var(--card);
          cursor: pointer;
          transition: transform 0.18s, box-shadow 0.18s, border-color 0.18s;
        }
        .lp-card:hover {
          border-color: var(--blue);
          transform: translateY(-2px);
          box-shadow: 0 12px 28px rgba(26, 26, 24, 0.08);
        }
        .lp-card.is-selected {
          border-color: var(--navy);
          box-shadow: 0 0 0 2px rgba(11, 61, 145, 0.15);
        }
        .lp-card__image-wrap { position: relative; height: 168px; }
        .lp-card--compact .lp-card__image-wrap { height: 124px; }
        .lp-card__image-wrap > img {
          width: 100%; height: 100%; object-fit: cover; display: block;
        }
        .lp-card__price {
          position: absolute;
          bottom: 10px; left: 10px;
          background: rgba(255,255,255,0.96);
          backdrop-filter: blur(4px);
          color: var(--gold);
          font-weight: 700;
          font-size: 13px;
          padding: 5px 11px;
          border-radius: 8px;
          font-family: "Plus Jakarta Sans", sans-serif;
        }
        .lp-card__image-wrap > .lp-card__agent-badge {
          position: absolute;
          top: 10px; right: 10px;
          width: 30px;
          height: 30px;
          border-radius: 50%;
          object-fit: cover;
          border: 2px solid #fff;
          box-shadow: 0 2px 6px rgba(26, 26, 24, 0.25);
        }
        .lp-card__body { padding: 16px; }
        .lp-card__body h3 {
          font-family: "Playfair Display", serif;
          font-size: 16px;
          font-weight: 600;
          margin-bottom: 4px;
          color: var(--ink);
        }
        .lp-card__location { color: var(--slate); font-size: 13px; margin: 0 0 11px; }
        .lp-card__meta {
          display: flex;
          gap: 14px;
          font-size: 12px;
          color: var(--slate);
          padding-top: 10px;
          border-top: 1px solid var(--line);
        }
        .lp-card__meta span {
          display: inline-flex;
          align-items: center;
          gap: 4px;
        }
        .lp-card__meta svg { color: var(--navy); flex-shrink: 0; }

        .lp-results-count {
          font-family: "Playfair Display", serif;
          font-size: 16px;
          font-weight: 600;
          color: var(--ink);
          margin: 24px 0 18px;
        }

        /* ---------- Map panel (shared) ---------- */
        .lp-map {
          position: relative;
          border-radius: 14px;
          overflow: hidden;
          background: var(--pale-blue);
          min-height: 200px;
        }
        .lp-map__surface {
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(43,127,255,0.06) 1px, transparent 1px),
            linear-gradient(90deg, rgba(43,127,255,0.06) 1px, transparent 1px);
          background-size: 32px 32px;
        }
        .lp-map__pin {
          position: absolute;
          transform: translate(-50%, -100%);
          background: var(--navy);
          color: #fff;
          border: none;
          font-size: 11px;
          font-weight: 700;
          padding: 5px 9px;
          border-radius: 999px;
          cursor: pointer;
          white-space: nowrap;
          box-shadow: 0 4px 10px rgba(11,61,145,0.3);
          z-index: 1;
        }
        .lp-map__pin:hover { background: var(--blue); }
        .lp-map__pin.is-selected {
          background: var(--blue);
          transform: translate(-50%, -100%) scale(1.1);
        }
        .lp-map__controls {
          position: absolute;
          top: 12px; right: 12px;
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
        .lp-map__controls button {
          width: 28px; height: 28px;
          border-radius: 6px;
          border: 1px solid var(--line);
          background: #fff;
          cursor: pointer;
          font-size: 15px;
        }
        .lp-map__badge {
          position: absolute;
          top: 12px; left: 12px;
          background: rgba(255,255,255,0.9);
          font-size: 11px;
          font-weight: 600;
          color: var(--slate);
          padding: 4px 10px;
          border-radius: 999px;
        }

        /* Map pin popup card — image 1 style */
        .lp-map__popup {
          position: absolute;
          transform: translate(-50%, calc(-100% - 16px));
          background: #fff;
          border-radius: 12px;
          box-shadow: 0 16px 40px rgba(15, 23, 42, 0.2);
          width: 240px;
          display: flex;
          gap: 10px;
          padding: 10px;
          z-index: 2;
        }
        .lp-map__popup-close {
          position: absolute;
          top: 4px; right: 4px;
          width: 20px; height: 20px;
          border-radius: 50%;
          border: none;
          background: var(--pale-blue);
          color: var(--navy);
          font-size: 14px;
          line-height: 1;
          cursor: pointer;
        }
        .lp-map__popup-image-wrap {
          width: 76px;
          height: 76px;
          border-radius: 8px;
          overflow: hidden;
          flex-shrink: 0;
        }
        .lp-map__popup-image-wrap img {
          width: 100%; height: 100%; object-fit: cover; display: block;
        }
        .lp-map__popup-body { min-width: 0; }
        .lp-map__popup-price {
          display: block;
          font-weight: 700;
          font-size: 14px;
          color: var(--gold);
          margin-bottom: 4px;
        }
        .lp-map__popup-meta {
          display: flex;
          gap: 8px;
          font-size: 11px;
          color: var(--slate);
          margin-bottom: 6px;
        }
        .lp-map__popup-meta span {
          display: inline-flex;
          align-items: center;
          gap: 3px;
        }
        .lp-map__popup-meta svg { color: var(--blue); }
        .lp-map__popup-address {
          font-size: 12px;
          font-weight: 600;
          margin: 0;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .lp-map__popup-location {
          font-size: 11px;
          color: var(--slate);
          margin: 2px 0 0;
        }

        /* Card grid utility — used by Layout 3 (map-top) and Layout 4 (dashboard) */
        .lp-gridmap__cards {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 16px;
        }
        .lp-gridmap__cards--3col { grid-template-columns: repeat(3, 1fr); }

        /* ---------- Layout 2: sidebar filters ---------- */
        .lp-layout--sidebar {
          width: 100%;
          margin: 0 auto;
          padding: 24px clamp(20px, 4vw, 56px);
          display: grid;
          grid-template-columns: 260px 1fr 1fr;
          gap: 24px;
          align-items: start;
        }
        .lp-sidebar {
          border: 1px solid var(--line);
          border-radius: 16px;
          padding: 22px;
          background: var(--card);
        }
        .lp-sidebar h2 {
          font-family: "Playfair Display", serif;
          font-size: 19px;
          margin-bottom: 18px;
        }
        .lp-sidebar__group { margin-bottom: 20px; }
        .lp-sidebar__group label {
          display: block;
          font-size: 12px;
          font-weight: 700;
          color: var(--slate);
          text-transform: uppercase;
          letter-spacing: 0.4px;
          margin-bottom: 8px;
        }
        .lp-sidebar__group select,
        .lp-sidebar__minmax input {
          width: 100%;
          padding: 8px 10px;
          border-radius: 8px;
          border: 1px solid var(--line);
          font-size: 13px;
          font-family: inherit;
        }
        .lp-checkrow {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 13px;
          margin-bottom: 6px;
          color: var(--ink);
        }
        .lp-sidebar__minmax { display: flex; gap: 8px; }
        .lp-sidebar__range-labels {
          display: flex;
          justify-content: space-between;
          font-size: 11px;
          color: var(--slate);
          margin-top: 4px;
        }
        .lp-sidebar__apply { width: 100%; }
        .lp-sidebar__cards { min-width: 0; }
        .lp-sidebar__card-list {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .lp-sidebar__card-list .lp-card { display: grid; grid-template-columns: 110px 1fr; }
        .lp-sidebar__card-list .lp-card__image-wrap { height: 100%; min-height: 0; min-width: 0; }
        .lp-layout--sidebar > .lp-map { height: 100%; min-height: 500px; }

        /* ---------- Layout 3: sidebar + map top ---------- */
        .lp-layout--sidebarmaptop {
          width: 100%;
          margin: 0 auto;
          padding: 24px clamp(20px, 4vw, 56px);
          display: grid;
          grid-template-columns: 260px 1fr;
          gap: 24px;
          align-items: start;
        }
        .lp-toggle-row { display: flex; gap: 8px; margin-bottom: 20px; }
        .lp-toggle {
          flex: 1;
          padding: 8px;
          border-radius: 8px;
          border: 1px solid var(--line);
          background: #fff;
          font-size: 13px;
          font-weight: 600;
          cursor: pointer;
        }
        .lp-toggle.is-active { background: var(--ink); color: #fff; border-color: var(--ink); }
        .lp-pill-row { display: flex; gap: 6px; flex-wrap: wrap; }
        .lp-pill-row button {
          padding: 6px 12px;
          border-radius: 999px;
          border: 1px solid var(--line);
          background: #fff;
          font-size: 12px;
          cursor: pointer;
        }
        .lp-pill-row button.is-active { background: var(--ink); color: #fff; border-color: var(--ink); }
        .lp-sidebarmaptop__main { display: flex; flex-direction: column; }

        /* ---------- Layout 4: dashboard ---------- */
        .lp-layout--dashboard { width: 100%; margin: 0 auto; padding: 24px clamp(20px, 4vw, 56px); }
        .lp-dash-stats {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 16px;
          margin-bottom: 24px;
        }
        .lp-dash-stat {
          border: 1px solid var(--line);
          border-radius: 16px;
          padding: 20px;
          display: flex;
          flex-direction: column;
          gap: 6px;
          background: var(--card);
        }
        .lp-dash-stat__label { font-size: 12px; color: var(--slate); font-weight: 600; }
        .lp-dash-stat strong { font-family: "Playfair Display", serif; font-size: 28px; color: var(--navy); }
        .lp-dash-grid {
          display: grid;
          grid-template-columns: 1fr 1.3fr 1fr;
          gap: 16px;
          margin-bottom: 8px;
        }
        .lp-dash-panel {
          border: 1px solid var(--line);
          border-radius: 16px;
          padding: 20px;
          background: var(--card);
        }
        .lp-dash-panel h3 {
          font-family: "Playfair Display", serif;
          font-size: 15px;
          margin-bottom: 14px;
        }
        .lp-dash-agent {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 8px 0;
          border-top: 1px solid var(--line);
        }
        .lp-dash-agent:first-of-type { border-top: none; }
        .lp-dash-agent img { width: 36px; height: 36px; border-radius: 50%; object-fit: cover; }
        .lp-dash-agent div { display: flex; flex-direction: column; }
        .lp-dash-agent strong { font-size: 13px; }
        .lp-dash-agent span { font-size: 12px; color: var(--slate); }
        .lp-dash-bar-row {
          display: grid;
          grid-template-columns: 80px 1fr 30px;
          align-items: center;
          gap: 10px;
          margin-bottom: 12px;
          font-size: 12px;
        }
        .lp-dash-bar-track {
          height: 8px;
          background: var(--pale-blue);
          border-radius: 999px;
          overflow: hidden;
        }
        .lp-dash-bar-fill { height: 100%; background: var(--blue); border-radius: 999px; }
        .lp-dash-bar-count { color: var(--slate); text-align: right; }

        /* ---------- Responsive ---------- */
        @media (max-width: 1100px) {
          .lp-layout--sidebar { grid-template-columns: 1fr; }
          .lp-layout--sidebarmaptop { grid-template-columns: 1fr; }
          .lp-dash-grid { grid-template-columns: 1fr; }
          .lp-dash-stats { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 700px) {
          .lp-nav__links { display: none; }
          .lp-gridmap__cards,
          .lp-gridmap__cards--3col { grid-template-columns: 1fr; }
          .lp-dash-stats { grid-template-columns: 1fr; }
          .lp-map__popup { width: min(220px, 70vw); }
          .lp-sidebar__card-list .lp-card { grid-template-columns: 90px 1fr; }
        }
      `}</style>
    </div>
  );
}
