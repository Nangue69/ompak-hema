export const DIAS_VALIDEZ = 5;
export const MS_POR_DIA = 24 * 60 * 60 * 1000;

const MS_VALIDEZ = DIAS_VALIDEZ * MS_POR_DIA;

export function estadoClave(fechaInicio, ahora = Date.now()) {
  if (fechaInicio == null) return 'sin_usar';

  const inicio = new Date(fechaInicio).getTime();
  if (Number.isNaN(inicio)) return 'caducada';

  const transcurrido = ahora - inicio;
  if (transcurrido < 0) return 'caducada';

  return transcurrido < MS_VALIDEZ ? 'activa' : 'caducada';
}

export function diasRestantes(fechaInicio, ahora = Date.now()) {
  if (estadoClave(fechaInicio, ahora) !== 'activa') return 0;

  const inicio = new Date(fechaInicio).getTime();
  return Math.ceil((inicio + MS_VALIDEZ - ahora) / MS_POR_DIA);
}
