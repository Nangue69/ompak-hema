import Cabecera from '../componentes/Cabecera.jsx';
import PiePagina from '../componentes/PiePagina.jsx';
import TarjetaMenu from '../componentes/TarjetaMenu.jsx';
import { useAuth } from '../auth/AuthContext.jsx';
import { useI18n } from '../i18n/I18nContext.jsx';

const SECCIONES = [
  { a: '/pasos', icono: '👣', clave: 'pasos' },
  { a: '/comandos', icono: '⌨️', clave: 'comandos' },
  { a: '/reglas', icono: '📋', clave: 'reglas' },
  { a: '/consejos', icono: '💡', clave: 'consejos' },
  { a: '/standard', icono: '📊', clave: 'standard' }
];

export default function Home() {
  const { t } = useI18n();
  const { usuario, diasRestantes } = useAuth();

  return (
    <>
      <Cabecera titulo={usuario?.toUpperCase()} inicio />

      <main className="contenedor pagina">
        <div className="portada">
          <img className="portada__logo" src="./img/logo-hema.png" alt="HEMA" />
          <h1>{t('app.bienvenida')}</h1>
          <p className="subtitulo">{t('app.subtitulo')}</p>
        </div>

        <nav className="menu">
          {SECCIONES.map(({ a, icono, clave }) => (
            <TarjetaMenu
              key={a}
              a={a}
              icono={icono}
              titulo={t(`menu.${clave}_titulo`)}
              descripcion={t(`menu.${clave}_desc`)}
            />
          ))}
        </nav>

        <p className="aviso aviso--info" style={{ marginTop: '24px' }}>
          <span aria-hidden="true">🔑</span>{' '}
          {diasRestantes === 1 ? t('login.dias_restantes_uno') : t('login.dias_restantes_varios', { n: diasRestantes })}
        </p>

        <PiePagina />
      </main>
    </>
  );
}
