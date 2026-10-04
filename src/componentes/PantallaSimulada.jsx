export default function PantallaSimulada({ texto }) {
  const [barra, ...lineas] = texto.split('\n');

  return (
    <div className="pantalla" role="img" aria-label={texto}>
      <div className="pantalla__barra">{barra}</div>
      <pre className="pantalla__cuerpo">
        {lineas.join('\n')}
        <span className="pantalla__cursor" aria-hidden="true" />
      </pre>
    </div>
  );
}
