import { useState } from 'react';
export default function App() {
  const [budget, setBudget] = useState(280);
  const [status, setStatus] = useState('Sin comprobar');
  const [loading, setLoading] = useState(false);
  async function checkApi() {
    setLoading(true);
    try {
      const response = await fetch('/api/health', { signal: AbortSignal.timeout(5000) });
      if (!response.ok) throw new Error('Unavailable');
      const data = await response.json();
      if (data.status !== 'ok') throw new Error('Invalid response');
      setStatus('Backend conectado');
    } catch { setStatus('Backend no disponible. Inicia el servidor local.'); }
    finally { setLoading(false); }
  }
  return <main>
    <header><a className="brand" href="#home">⌂ RoomieMatch</a><span className="badge">Prototipo académico</span></header>
    <section className="hero" id="home"><div><p className="eyebrow">TU ESPACIO. TU GENTE.</p>
      <h1>Compartir hogar empieza por conocerse.</h1>
      <p>Explora habitaciones y conversa sobre hábitos antes de decidir con quién vivir.</p>
      <a className="button" href="#rooms">Explorar habitaciones</a></div>
      <aside><span className="avatar">RM</span><h2>Más que compartir alquiler</h2><p>Presupuesto, horarios, limpieza y acuerdos claros desde el inicio.</p><span className="badge">Datos ilustrativos</span></aside></section>
    <section id="rooms"><div className="section-title"><div><p className="eyebrow">ENCUENTRA TU ESPACIO</p><h2>Habitaciones en Quito</h2></div>
      <label>Presupuesto máximo: USD {budget}<input aria-label="Presupuesto máximo" type="range" min="150" max="400" step="10" value={budget} onChange={e => setBudget(Number(e.target.value))}/></label></div>
      <p className="muted">Datos ilustrativos. No son anuncios reales ni reservas disponibles.</p>
      <div className="grid">{[{name:'La Floresta',price:250,detail:'Habitación individual · Servicios incluidos'}, {name:'Centro norte',price:300,detail:'Espacio amoblado · Cocina compartida'}].filter(r=>r.price<=budget).map(r=><article key={r.name}><div className="room-art" aria-hidden="true">⌂</div><h3>{r.name}</h3><strong>USD {r.price} / mes</strong><p>{r.detail}</p></article>)}
      {budget<250&&<p role="status">No hay habitaciones ilustrativas dentro de este presupuesto.</p>}</div>
    </section>
    <section className="principles"><h2>Tú controlas tus datos</h2><p>El cuestionario Big Five será voluntario. Benford será una herramienta exploratoria para datos agregados; no verifica identidades ni detecta bots.</p></section>
    <footer><div><strong>Entorno de desarrollo</strong><p role="status">{status}</p></div><button disabled={loading} onClick={checkApi}>{loading?'Comprobando…':'Comprobar backend'}</button></footer>
  </main>;
}
