import React, { useState, useMemo } from 'react';

// Local images (from public/)
const images = [
  { id:1, src: '/Chair.jpg', title:'Modern Chair', category:'Chairs', price:'₹1200' },
  { id:2, src: '/sofa.svg', title:'Luxury Sofa', category:'Sofas', price:'$399' },
  { id:3, src: '/table.svg', title:'Dining Table', category:'Tables', price:'$199' },
  { id:4, src: '/bed.svg', title:'Comfort Bed', category:'Beds', price:'$299' },
  { id:5, src: '/wardrobe.svg', title:'Stylish Wardrobe', category:'Wardrobes', price:'$249' },
  { id:6, src: '/chair.svg', title:'Accent Chair', category:'Chairs', price:'$129' },
  { id:7, src: '/sofa.svg', title:'Compact Sofa', category:'Sofas', price:'$279' },
  { id:8, src: '/table.svg', title:'Coffee Table', category:'Tables', price:'$79' }
];

const Gallery = () => {
  const [selected, setSelected] = useState(null);
  const [activeCat, setActiveCat] = useState('All');
  const [search, setSearch] = useState('');

  const categories = useMemo(() => {
    const cats = Array.from(new Set(images.map(i => i.category)));
    return ['All', ...cats];
  }, []);

  const filtered = useMemo(() => {
    return images.filter(i => {
      const matchCat = activeCat === 'All' ? true : i.category === activeCat;
      const matchSearch = search.trim() === '' ? true : (i.title + ' ' + i.category).toLowerCase().includes(search.toLowerCase());
      return matchCat && matchSearch;
    });
  }, [activeCat, search]);

  return (
    <div>
      <div style={{display:'flex',gap:12,flexWrap:'wrap',alignItems:'center',marginBottom:12}}>
        <div className="filters">
          {categories.map(cat => (
            <button
              key={cat}
              className={`filter-btn ${activeCat===cat ? 'active':''}`}
              onClick={() => setActiveCat(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
        <div style={{marginLeft:'auto'}}>
          <input
            type="search"
            placeholder="Search items..."
            value={search}
            onChange={e=>setSearch(e.target.value)}
            style={{padding:'8px 10px',borderRadius:8,border:'1px solid #e5e7eb'}}
          />
        </div>
      </div>

      <div className="grid">
        {filtered.map(item => (
          <div className="card" key={item.id} onClick={()=>setSelected(item)}>
            <img src={item.src} alt={item.title} />
            <div className="card-body">
              <h3 className="title">{item.title}</h3>
              <div className="meta">{item.category} • {item.price}</div>
            </div>
          </div>
        ))}
      </div>

      {selected && (
        <div className="modal-backdrop" onClick={()=>setSelected(null)}>
          <div className="modal-content" onClick={e=>e.stopPropagation()}>
            <button className="close-btn" onClick={()=>setSelected(null)}>Close</button>
            <img src={selected.src} alt={selected.title}/>
            <h2 style={{marginTop:12}}>{selected.title}</h2>
            <p style={{color:'#6b7280'}}>{selected.category} • {selected.price}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Gallery;
