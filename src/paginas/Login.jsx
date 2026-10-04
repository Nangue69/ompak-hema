import { useState } from 'react';
import { Navigate, useLocation } from 'react-router';
import { useAuth } from '../auth/AuthContext.jsx';
import { IDIOMAS, useI18n } from '../i18n/I18nContext.jsx';
import { useTema } from '../tema/TemaContext.jsx';
import PiePagina from '../componentes/PiePagina.jsx';

export default function Login() {
  const { autenticado, entrar } = useAuth();
  const { idioma, setIdioma, t } = useI18n();
  const { tema, alternar } = useTema();
  const ubicacion = useLocation();

  const [usuario, setUsuario] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [enviando, setEnviando] = useState(false);

  if (autenticado) return <Navigate to={ubicacion.state?.desde || '/'} replace />;

  const enviar = (evento) => {
    evento.preventDefault();
    setError('');

    if (!usuario.trim() || !password) {
      setError(t('login.error_vacio'));
      return;
    }

    setEnviando(true);

    try {
      const resultado = entrar(usuario, password);
      if (!resultado.ok) {
        setError(t(resultado.motivo === 'caducada' ? 'login.error_caducado' : 'login.error_credenciales'));
      }
    } catch (fallo) {
      setError(`${t('login.error_inesperado')} (${fallo.message})`);
    } finally {
      setEnviando(false);
    }
  };

  return (
    <main className="contenedor login">
      <img className="login__logo" src="./img/logo-hema.png" alt="HEMA" />

      <div className="barra-idioma">
        {IDIOMAS.map(({ codigo, bandera, nombre }) => (
          <button
            key={codigo}
            type="button"
            className="barra-idioma__boton"
            aria-pressed={idioma === codigo}
            onClick={() => setIdioma(codigo)}
          >
            {bandera} {nombre}
          </button>
        ))}
      </div>

      <form className="login__caja" onSubmit={enviar}>
        <h1>{t('login.titulo')}</h1>
        <p className="subtitulo">{t('login.intro')}</p>

        {error && (
          <p className="aviso aviso--error" role="alert">
            <span aria-hidden="true">⚠️</span> {error}
          </p>
        )}

        <label className="campo">
          <span className="campo__etiqueta">{t('login.usuario')}</span>
          <input
            className="campo__entrada"
            type="text"
            value={usuario}
            onChange={(evento) => setUsuario(evento.target.value)}
            autoCapitalize="none"
            autoCorrect="off"
            autoComplete="username"
            inputMode="text"
          />
        </label>

        <label className="campo">
          <span className="campo__etiqueta">{t('login.password')}</span>
          <input
            className="campo__entrada"
            type="password"
            value={password}
            onChange={(evento) => setPassword(evento.target.value)}
            autoComplete="current-password"
          />
        </label>

        <button className="boton-principal" type="submit" disabled={enviando}>
          {enviando ? t('login.entrando') : t('login.entrar')}
        </button>

        <button type="button" className="boton-secundario" onClick={alternar}>
          {tema === 'claro' ? '🌙' : '☀️'} {t('nav.tema')}
        </button>

        <p className="aviso aviso--info" style={{ marginTop: '20px', marginBottom: 0 }}>
          <span aria-hidden="true">ℹ️</span> {t('login.aviso_validez')}
        </p>
      </form>

      <PiePagina />
    </main>
  );
}
