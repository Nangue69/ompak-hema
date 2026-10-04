import { Link } from 'react-router';

export default function TarjetaMenu({ a, icono, titulo, descripcion }) {
  return (
    <Link className="tarjeta-menu" to={a}>
      <span className="tarjeta-menu__icono" aria-hidden="true">
        {icono}
      </span>
      <span className="tarjeta-menu__texto">
        <h2>{titulo}</h2>
        <span className="tarjeta-menu__desc">{descripcion}</span>
      </span>
      <span className="tarjeta-menu__flecha" aria-hidden="true">
        ›
      </span>
    </Link>
  );
}
