import Cabecera from '../componentes/Cabecera.jsx';
import PiePagina from '../componentes/PiePagina.jsx';
import { estructura, textos } from '../datos/contenido.js';
import { useI18n } from '../i18n/I18nContext.jsx';

const MARCAS = { bien: '✅', mal: '⛔', revisar: '👁️' };

export default function Consejos() {
  const { idioma, t } = useI18n();
  const contenido = textos(idioma);

  return (
    <>
      <Cabecera titulo={t('consejos.titulo')} />

      <main className="contenedor pagina">
        <h1>{t('consejos.titulo')}</h1>
        <p className="subtitulo">{t('consejos.intro')}</p>

        <div className="consejos">
          {estructura.consejos.map(({ id, icono }) => (
            <article className="consejo" key={id}>
              <span className="consejo__icono" aria-hidden="true">
                {icono}
              </span>
              <div>
                <h3>{contenido.consejos[id].titulo}</h3>
                <p className="regla__texto">{contenido.consejos[id].texto}</p>
              </div>
            </article>
          ))}
        </div>

        <h2>{t('consejos.errores_titulo')}</h2>
        <p className="subtitulo">{t('consejos.errores_intro')}</p>

        <div className="galeria">
          {estructura.fotos.map(({ id, archivo, estado }) => (
            <figure className="error-foto" key={id}>
              <img
                className="error-foto__img"
                src={`./img/fotos/${archivo}`}
                alt={contenido.fotos[id].titulo}
                loading="lazy"
              />
              <figcaption className="error-foto__pie">
                <p className="error-foto__titulo">
                  <span aria-hidden="true">{MARCAS[estado]}</span>
                  {contenido.fotos[id].titulo}
                </p>
                <p className="error-foto__texto">{contenido.fotos[id].texto}</p>
                {estado === 'revisar' && <p className="nota-revisar">{t('comun.revisar')}</p>}
              </figcaption>
            </figure>
          ))}
        </div>

        <PiePagina />
      </main>
    </>
  );
}
