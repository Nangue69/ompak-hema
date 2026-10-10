import comandos from './comandos.json';
import consejos from './consejos.json';
import fotos from './fotos.json';
import glosario from './glosario.json';
import pasos from './pasos.json';
import standard from './standard.json';

import pasosEs from './pasos.es.json';
import pasosEn from './pasos.en.json';
import pasosNl from './pasos.nl.json';
import pasosPl from './pasos.pl.json';

import comandosEs from './comandos.es.json';
import comandosEn from './comandos.en.json';
import comandosNl from './comandos.nl.json';
import comandosPl from './comandos.pl.json';

import reglasEs from './reglas.es.json';
import reglasEn from './reglas.en.json';
import reglasNl from './reglas.nl.json';
import reglasPl from './reglas.pl.json';

import consejosEs from './consejos.es.json';
import consejosEn from './consejos.en.json';
import consejosNl from './consejos.nl.json';
import consejosPl from './consejos.pl.json';

import fotosEs from './fotos.es.json';
import fotosEn from './fotos.en.json';
import fotosNl from './fotos.nl.json';
import fotosPl from './fotos.pl.json';

import glosarioEs from './glosario.es.json';
import glosarioEn from './glosario.en.json';
import glosarioNl from './glosario.nl.json';
import glosarioPl from './glosario.pl.json';

import standardEs from './standard.es.json';
import standardEn from './standard.en.json';
import standardNl from './standard.nl.json';
import standardPl from './standard.pl.json';

const TEXTOS = {
  es: { pasos: pasosEs, comandos: comandosEs, reglas: reglasEs, consejos: consejosEs, fotos: fotosEs, glosario: glosarioEs, standard: standardEs },
  en: { pasos: pasosEn, comandos: comandosEn, reglas: reglasEn, consejos: consejosEn, fotos: fotosEn, glosario: glosarioEn, standard: standardEn },
  nl: { pasos: pasosNl, comandos: comandosNl, reglas: reglasNl, consejos: consejosNl, fotos: fotosNl, glosario: glosarioNl, standard: standardNl },
  pl: { pasos: pasosPl, comandos: comandosPl, reglas: reglasPl, consejos: consejosPl, fotos: fotosPl, glosario: glosarioPl, standard: standardPl }
};

export const estructura = { pasos, comandos, consejos, fotos, glosario, standard };

export function textos(idioma) {
  return TEXTOS[idioma] || TEXTOS.es;
}
