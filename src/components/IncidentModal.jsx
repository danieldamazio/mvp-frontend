import React, { useState } from 'react';
import { supabase } from '../supabaseClient'; // Ajuste o caminho se necessário

export function IncidentModal({ onClose }) {
  const [formData, setFormData] = useState({
    title: '',
    category: 'Trilha Bloqueada',
    severity: 'Moderada',
    description: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await supabase.from('incidents').insert([formData]);
      await new Promise(resolve => setTimeout(resolve, 1500));
      setIsSuccess(true);
    } catch (error) {
      console.error("Erro ao reportar:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="modal fade-in">
      <div className="modal-overlay" onClick={onClose}></div>
      <div className="modal-content" style={{ maxWidth: '500px', borderTop: '6px solid #eab308' }}>
        <button className="btn-close" onClick={onClose}>×</button>
        {isSuccess ? (
          <div style={{ textAlign: 'center', padding: '2rem 0' }}>
            <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>✅</div>
            <h3 style={{ color: 'var(--text-dark)', marginBottom: '1rem' }}>Incidente Registrado!</h3>
            <p style={{ color: 'var(--text-muted)' }}>A equipe do parque foi notificada. Obrigado por ajudar a preservar o meio ambiente.</p>
            <button className="btn btn-primary btn-full" onClick={onClose} style={{ marginTop: '2rem' }}>
              Fechar Painel
            </button>
          </div>
        ) : (
          <>
            <h3 style={{ color: 'var(--text-dark)', marginBottom: '0.5rem' }}>Reportar Incidente 🚨</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '2rem' }}>
              Viu algo errado nas trilhas? Lixo, árvores caídas ou focos de incêndio? Avise nossa equipe.
            </p>
            <form onSubmit={handleSubmit} className="form-group">
              <input
                type="text"
                placeholder="Título rápido do problema"
                className="input-field"
                required
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              />

              <div style={{ display: 'flex', gap: '1rem' }}>
                <select
                  className="input-field"
                  style={{ flex: 1 }}
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                >
                  <option>Trilha Bloqueada</option>
                  <option>Foco de Incêndio</option>
                  <option>Descarte de Lixo</option>
                  <option>Animal Ferido</option>
                  <option>Outro</option>
                </select>

                <select
                  className="input-field"
                  style={{ flex: 1, fontWeight: 'bold', color: formData.severity === 'Crítica' ? '#dc2626' : 'inherit' }}
                  value={formData.severity}
                  onChange={(e) => setFormData({ ...formData, severity: e.target.value })}
                >
                  <option>Baixa</option>
                  <option>Moderada</option>
                  <option style={{ color: '#dc2626' }}>Crítica</option>
                </select>
              </div>

              <textarea
                placeholder="Descreva o local e os detalhes..."
                className="input-field"
                rows="4"
                required
                style={{ resize: 'none' }}
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              ></textarea>

              <button type="submit" className="btn btn-primary btn-full" disabled={isSubmitting}>
                {isSubmitting ? 'Registrando...' : 'Enviar Reporte'}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}