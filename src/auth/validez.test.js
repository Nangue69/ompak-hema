import { describe, expect, it } from 'vitest';
import { diasRestantes, estadoClave, MS_POR_DIA } from './validez.js';

const INICIO = new Date('2026-10-01T08:00:00Z').getTime();
const hace = (dias) => INICIO + dias * MS_POR_DIA;

describe('estadoClave', () => {
  it('sin fecha de inicio la clave esta sin usar', () => {
    expect(estadoClave(null)).toBe('sin_usar');
  });

  it('es valida el mismo dia del primer uso', () => {
    expect(estadoClave(INICIO, hace(0))).toBe('activa');
  });

  it('sigue siendo valida el cuarto dia', () => {
    expect(estadoClave(INICIO, hace(4))).toBe('activa');
  });

  it('caduca justo al cumplirse los cinco dias', () => {
    expect(estadoClave(INICIO, hace(5))).toBe('caducada');
  });

  it('caduca pasados los cinco dias', () => {
    expect(estadoClave(INICIO, hace(6))).toBe('caducada');
  });

  it('caduca si el reloj del movil se atrasa antes del primer uso', () => {
    expect(estadoClave(INICIO, hace(-1))).toBe('caducada');
  });

  it('caduca con una fecha corrupta', () => {
    expect(estadoClave('no-es-una-fecha')).toBe('caducada');
  });
});

describe('diasRestantes', () => {
  it('devuelve cinco dias en el primer uso', () => {
    expect(diasRestantes(INICIO, hace(0))).toBe(5);
  });

  it('devuelve un dia en la ultima jornada', () => {
    expect(diasRestantes(INICIO, hace(4))).toBe(1);
  });

  it('devuelve cero cuando ya ha caducado', () => {
    expect(diasRestantes(INICIO, hace(5))).toBe(0);
  });
});
