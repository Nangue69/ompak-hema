import { useState } from 'react';
import Cabecera from '../componentes/Cabecera.jsx';
import PiePagina from '../componentes/PiePagina.jsx';
import { estructura, textos } from '../datos/contenido.js';
import { useI18n } from '../i18n/I18nContext.jsx';

const { niveles, objetivo } = estructura.standard;
const META = niveles.find((nivel) => nivel.id === objetivo);

export default function Standard() {
  const { idioma, t } = useI18n();
  const [picks, setPicks] = useState('');
  const [horas, setHoras] = useState('');

  const contenido = textos(idioma).standard;

  const picksNum = Number(picks.replace(',', '.'));
  const horasNum = Number(horas.replace(',', '.'));
  const calculable = picksNum > 0 && horasNum > 0;

  const ritmo = calculable ? Math.round(picksNum / horasNum) : 0;
  const porcentaje = calculable ? Math.round((ritmo / META.picks) * 100) : 0;

  const mensaje = porcentaje >= 100 ? 'resultado_bien' : porcentaje >= 80 ? 'resultado_cerca' : 'resultado_bajo';

  return (
    <>
      <Cabecera titulo={t('standard.titulo')} />

      <main className="contenedor pagina">
        <h1>{t('standard.titulo')}</h1>
        <p className="subtitulo">{t('standard.intro')}</p>

        {niveles.map((nivel) => (
          <section className={`nivel ${nivel.id === objetivo ? 'nivel--objetivo' : ''}`} key={nivel.id}>
            <div className="nivel__cabeza">
              <h2>{contenido[nivel.id].nombre}</h2>
              <span className="nivel__periodo">{contenido[nivel.id].periodo}</span>
            </div>
            <p className="regla__texto">{contenido[nivel.id].texto}</p>

            <div className="cifras">
              <div className="cifra">
                <div className="cifra__valor">{nivel.picks}</div>
                <div className="cifra__etiqueta">{t('standard.picks_hora')}</div>
              </div>
              <div className="cifra">
                <div className="cifra__valor">{nivel.cajas}</div>
                <div className="cifra__etiqueta">{t('standard.cajas_hora')}</div>
              </div>
            </div>

            <div
              className="barra"
              role="img"
              aria-label={`${Math.round((nivel.picks / META.picks) * 100)}% ${t('standard.del_objetivo')}`}
            >
              <div className="barra__relleno" style={{ width: `${(nivel.picks / META.picks) * 100}%` }} />
            </div>
          </section>
        ))}

        <section className="calculadora">
          <h2>{t('standard.calculadora_titulo')}</h2>
          <p className="subtitulo">{t('standard.calculadora_intro')}</p>

          <div className="calculadora__campos">
            <label className="campo" style={{ marginBottom: 0 }}>
              <span className="campo__etiqueta">{t('standard.picks_hechos')}</span>
              <input
                className="campo__entrada"
                type="number"
                inputMode="numeric"
                min="0"
                value={picks}
                onChange={(evento) => setPicks(evento.target.value)}
              />
            </label>

            <label className="campo" style={{ marginBottom: 0 }}>
              <span className="campo__etiqueta">{t('standard.horas')}</span>
              <input
                className="campo__entrada"
                type="number"
                inputMode="decimal"
                min="0"
                step="0.5"
                value={horas}
                onChange={(evento) => setHoras(evento.target.value)}
              />
            </label>
          </div>

          <div className="calculadora__resultado" aria-live="polite">
            {calculable ? (
              <>
                <div className="calculadora__porcentaje">{porcentaje}%</div>
                <div className="cifra__etiqueta">{t('standard.del_objetivo')}</div>
                <p className="calculadora__mensaje" style={{ marginTop: '8px' }}>
                  {t('standard.tu_ritmo', { n: ritmo })} · {t(`standard.${mensaje}`)}
                </p>
              </>
            ) : (
              <p className="calculadora__mensaje" style={{ margin: 0 }}>
                {t('standard.rellena')}
              </p>
            )}
          </div>
        </section>

        <PiePagina />
      </main>
    </>
  );
}
