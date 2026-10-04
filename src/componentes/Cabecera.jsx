import { useNavigate } from 'react-router';
import { IDIOMAS, useI18n } from '../i18n/I18nContext.jsx';
import { useTema } from '../tema/TemaContext.jsx';
import { useAuth } from '../auth/AuthContext.jsx';

export default function Cabecera({ titulo, inicio = false }) {
  const navegar = useNavigate();
  const { idioma, setIdioma, t } = useI18n();
  const { tema, alternar } = useTema();
  const { cerrarSesion } = useAuth();

  const salir = () => {
    if (window.confirm(t('sesion.salir_confirmar'))) cerrarSesion();
  };

  return (
    <header className="cabecera">
      <div className="contenedor cabecera__interior">
        {inicio ? (
          <img className="cabecera__logo" src="./img/logo-hema.png" alt="HEMA" />
        ) : (
          <button type="button" className="boton-icono" onClick={() => navegar('/')} aria-label={t('nav.inicio')}>
            ←
          </button>
        )}

        <span className="cabecera__titulo">{titulo}</span>

        <select
          className="selector-idioma"
          value={idioma}
          onChange={(evento) => setIdioma(evento.target.value)}
          aria-label={t('nav.idioma')}
        >
          {IDIOMAS.map(({ codigo, bandera }) => (
            <option key={codigo} value={codigo}>
              {bandera} {codigo.toUpperCase()}
            </option>
          ))}
        </select>

        <button type="button" className="boton-icono" onClick={alternar} aria-label={t('nav.tema')}>
          {tema === 'claro' ? '🌙' : '☀️'}
        </button>

        {inicio && (
          <button type="button" className="boton-icono" onClick={salir} aria-label={t('nav.salir')}>
            ⏻
          </button>
        )}
      </div>
    </header>
  );
}
