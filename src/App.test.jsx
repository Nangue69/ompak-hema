import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react';
import App from './App.jsx';
import { MS_POR_DIA } from './auth/validez.js';

const USUARIO = 'ompak01';
const PASSWORD = 'ompak-azul-2026';
const ADMIN = 'admin';
const PASSWORD_ADMIN = 'duna-duna-3269-brisa';

function entrar(usuario = USUARIO, password = PASSWORD) {
  fireEvent.change(screen.getByLabelText('Key-user'), { target: { value: usuario } });
  fireEvent.change(screen.getByLabelText('Contraseña'), { target: { value: password } });
  fireEvent.click(screen.getByRole('button', { name: 'Entrar' }));
}

beforeEach(() => {
  localStorage.clear();
  localStorage.setItem('hema_idioma', 'es');
});

afterEach(cleanup);

describe('acceso', () => {
  it('arranca en la pantalla de acceso', () => {
    render(<App />);
    expect(screen.getByRole('heading', { name: 'Acceso' })).toBeTruthy();
  });

  it('rechaza una contrasena incorrecta', async () => {
    render(<App />);
    entrar(USUARIO, 'otra-cosa');
    await waitFor(() => expect(screen.getByRole('alert').textContent).toContain('incorrectos'));
  });

  it('entra con un key-user valido y muestra el menu', async () => {
    render(<App />);
    entrar();
    await waitFor(() => expect(screen.getByText('Bienvenidos al departamento de Ompak')).toBeTruthy());
    expect(screen.getByText('Comandos básicos')).toBeTruthy();
    expect(screen.getByText('Standard de producción')).toBeTruthy();
  });

  it('entra tambien sin crypto.subtle, como pasa en el movil por http', async () => {
    vi.stubGlobal('crypto', {});

    render(<App />);
    entrar();
    await waitFor(() => expect(screen.getByText('Bienvenidos al departamento de Ompak')).toBeTruthy());

    vi.unstubAllGlobals();
  });

  it('el administrador entra aunque su clave sea de hace meses', async () => {
    localStorage.setItem('hema_keys', JSON.stringify({ [ADMIN]: new Date(Date.now() - 90 * MS_POR_DIA).toISOString() }));
    render(<App />);
    entrar(ADMIN, PASSWORD_ADMIN);

    await waitFor(() => expect(screen.getByText('Acceso de administrador, sin caducidad.')).toBeTruthy());
  });

  it('mantiene abierta la sesion del administrador', async () => {
    localStorage.setItem('hema_sesion', ADMIN);
    render(<App />);

    await waitFor(() => expect(screen.getByText('Bienvenidos al departamento de Ompak')).toBeTruthy());
  });

  it('bloquea un key-user usado hace mas de cinco dias', async () => {
    localStorage.setItem('hema_keys', JSON.stringify({ [USUARIO]: new Date(Date.now() - 6 * MS_POR_DIA).toISOString() }));
    render(<App />);
    entrar();
    await waitFor(() => expect(screen.getByRole('alert').textContent).toContain('caducado'));
  });

  it('cierra la sesion abierta cuando la clave ya ha caducado', async () => {
    localStorage.setItem('hema_sesion', USUARIO);
    localStorage.setItem('hema_keys', JSON.stringify({ [USUARIO]: new Date(Date.now() - 6 * MS_POR_DIA).toISOString() }));
    render(<App />);
    await waitFor(() => expect(screen.getByRole('heading', { name: 'Acceso' })).toBeTruthy());
  });
});

describe('secciones', () => {
  beforeEach(() => {
    localStorage.setItem('hema_sesion', USUARIO);
    localStorage.setItem('hema_keys', JSON.stringify({ [USUARIO]: new Date().toISOString() }));
  });

  it('muestra los ocho pasos a seguir con sus fotos', async () => {
    window.location.hash = '#/pasos';
    render(<App />);

    expect(await screen.findByText('Coloca la caja en la balanza')).toBeTruthy();
    expect(screen.getByText('Cierra el palet con F6')).toBeTruthy();
    expect(screen.getAllByRole('listitem').length).toBe(8);
    expect(screen.getAllByRole('img').length).toBeGreaterThan(0);
  });

  it('abre comandos y despliega una tecla', async () => {
    window.location.hash = '#/comandos';
    render(<App />);

    const tecla = await screen.findByRole('button', { name: /Declarar producto dañado/ });
    fireEvent.click(tecla);

    expect(screen.getByText(/Declare damaged/)).toBeTruthy();
  });

  it('cambia entre reglas de la casa y de Ompak', async () => {
    window.location.hash = '#/reglas';
    render(<App />);

    expect(await screen.findByText('Llega puntual y ficha')).toBeTruthy();

    fireEvent.click(screen.getByRole('tab', { name: 'De Ompak' }));
    expect(screen.getByText('Escanea siempre')).toBeTruthy();
  });

  it('calcula el porcentaje del standard', async () => {
    window.location.hash = '#/standard';
    render(<App />);

    fireEvent.change(await screen.findByLabelText('Picks hechos'), { target: { value: '1800' } });
    fireEvent.change(screen.getByLabelText('Horas trabajadas'), { target: { value: '2' } });

    expect(screen.getByText('100%')).toBeTruthy();
  });

  it('muestra la galeria de fotos en consejos', async () => {
    window.location.hash = '#/consejos';
    render(<App />);

    expect(await screen.findByText('Elige bien la caja')).toBeTruthy();
    expect(screen.getAllByRole('img').length).toBeGreaterThan(0);
  });

  it('traduce la pantalla al cambiar de idioma', async () => {
    window.location.hash = '#/';
    render(<App />);

    fireEvent.change(await screen.findByLabelText('Idioma'), { target: { value: 'nl' } });
    expect(screen.getByText('Welkom bij de afdeling Ompak')).toBeTruthy();
  });
});
