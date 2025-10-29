'use client';
import { useState } from 'react';
export default function Home() {
  const [gene, setGene] = useState(''); 
  const [variation, setVariation] = useState('');
  const [text, setText] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [apiUrl] = useState('https://your-backend.up.railway.app');  // ← UPDATE AFTER STEP 3

  const handleSubmit = async (e) => {
    e.preventDefault(); setLoading(true);
    const res = await fetch(`${apiUrl}/predict`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ gene, variation, text })
    });
    const data = await res.json();
    setResult(data); setLoading(false);
  };

  return (
    <div style={{ maxWidth: 800, margin: '0 auto', padding: 40, fontFamily: 'Arial' }}>
      <h1 style={{ color: '#0070f3' }}>🧬 Personalized Cancer Mutation Predictor</h1>
      <p><em>Enter gene, mutation, and literature → Get treatment recommendation</em></p>
      <form onSubmit={handleSubmit} style={{ marginTop: 30 }}>
        <input placeholder="Gene (e.g., EGFR)" value={gene} onChange={e=>setGene(e.target.value)} required 
          style={{ width: '100%', padding: 15, margin: 10, borderRadius: 8, border: '1px solid #ddd' }} />
        <input placeholder="Variation (e.g., T790M)" value={variation} onChange={e=>setVariation(e.target.value)} required 
          style={{ width: '100%', padding: 15, margin: 10, borderRadius: 8, border: '1px solid #ddd' }} />
        <textarea placeholder="Paste medical literature..." value={text} onChange={e=>setText(e.target.value)} rows={6} 
          style={{ width: '100%', padding: 15, margin: 10, borderRadius: 8, border: '1px solid #ddd' }} />
        <button type="submit" disabled={loading} 
          style={{ width: '100%', padding: 15, background: '#0070f3', color: 'white', border: 'none', borderRadius: 8, fontSize: 16 }}>
          {loading ? '🔄 Predicting...' : '🚀 Predict Class & Treatment'}
        </button>
      </form>
      {result && (
        <div style={{ marginTop: 30, padding: 25, background: '#e8f5e8', borderRadius: 12, borderLeft: '5px solid #28a745' }}>
          <h2>✅ <strong>Predicted Class: {result.prediction}</strong></h2>
          <p><strong>Confidence: {(result.confidence * 100).toFixed(1)}%</strong></p>
          <p><em>{result.interpretation}</em></p>
        </div>
      )}
      <footer style={{ marginTop: 50, textAlign: 'center', opacity: 0.7 }}>
        <p>Powered by Deep Learning (CNN + PyTorch) | AUC: 0.85+</p>
      </footer>
    </div>
  );
}
