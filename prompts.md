# Prompts del proyecto

Registro de las peticiones del usuario y de lo que se entregó en cada una.
Se actualiza cada vez que se cumple un prompt.

---

## 1 · 2026-10-02 · Creación de la app

**Prompt:** "Procede a crear esta app según el documento AGENTE.md en la raíz de este proyecto."

**Decisiones acordadas antes de empezar:**

| Pregunta | Respuesta del usuario |
|---|---|
| Tecnología | React + Vite, PWA instalable |
| Key-user y los 5 días | Validación local en el dispositivo, sin backend |
| Contenido (F1–F12, reglas…) | Borradores editables en archivos de datos |
| Idiomas | Los cuatro completos: ES, EN, NL, PL |

**Entregado:**

- Proyecto React 19 + Vite 7 (JavaScript, sin TypeScript), PWA instalable y con uso offline.
- Rutas independientes con HashRouter: `/login`, `/`, `/comandos`, `/reglas`, `/consejos`, `/standard`.
  Todas protegidas menos `/login`.
- Key-user con contraseña en hash SHA-256 y caducidad de 5 días desde el primer uso,
  con detección de reloj retrasado.
- Tema claro/oscuro y cuatro idiomas, ambos persistidos en el dispositivo.
- Contenido de las cuatro secciones en los cuatro idiomas, en archivos de datos editables.
- Las fotos de `img/` optimizadas de 28 MB a 960 KB en WebP.
- 20 tests automáticos (caducidad del key-user, acceso, navegación, idiomas, calculadora).

**Hallazgo durante el trabajo:** tres de las fotos de `img/` son capturas reales del sistema
del puesto (WITRON Logistic Bus System, módulo Repacking). De ahí salen las teclas reales
F5 (Confirm tote / Do counting by scale), F6 (Finish article), F7 (Manco), F11 (Go back) y
F12 (Cancel), que ya están incorporadas. El resto de teclas son borradores marcados en la app.

**Pendiente del usuario:** ver la sección "Qué falta por revisar" del README.

---

## 2 · 2026-10-03 · No arrancaba y el móvil se quedaba colgado

**Prompt:** "No puedo abrir la prueba ni instalarlo en el teléfono, guíame paso a paso" y
después "en el teléfono se queda comprobando y no avanza".

**Entregado:**

- Guía paso a paso para arrancar el servidor y abrir la app en el móvil de la misma wifi.
- **Corregido un fallo real:** el login se quedaba colgado en "Comprobando..." en el móvil.
  El navegador solo presta su función de cifrado en `localhost` o con `https`, así que por la
  dirección de red la comprobación de la contraseña nunca terminaba. Ahora la app lleva su
  propio cálculo (`js-sha256`) y funciona en cualquier sitio; además el formulario avisa del
  error en vez de quedarse esperando.
- Test nuevo que reproduce esa situación del móvil para que no vuelva a colarse.

---

## 3 · 2026-10-04 · Ajustes de contenido del puesto

**Prompt:** lista de cambios en comandos, reglas, consejos y standard, con el encargo expreso
de no romper nada que ya funcione y conservar el diseño.

**Entregado (solo contenido, cero cambios de diseño):**

- **Comandos:** reescritas F2, F3, F7, F8, F9 y F10 con el uso real del puesto; ampliadas F4
  y F5. F3, F7 y F8 pasan a ser funciones de supervisión y F10 no se utiliza. Las teclas sin
  pantalla propia ya no dibujan ese bloque. Desaparecen los avisos de "texto provisional":
  todas las teclas están confirmadas.
- **Glosario:** nueva definición de PU/Carton y de Manco (lo declara el supervisor).
- **Reglas de la casa:** eliminada la del badge; quitada la frase de prioridad de las
  carretillas.
- **Reglas de Ompak:** nueva regla de etiquetas ilegibles o ausentes, nuevo texto de mesa
  despejada y de pedir ayuda (al supervisor, ya no a F9), y dos reglas nuevas: cambio de
  hojilla en la ventanilla y guardar las cosas en el locker.
- **Consejos:** fuera los cuatro primeros; entran elegir bien la caja, reglas de llenado
  (25 kg y línea del 75%) y reempaquetado de botellas sueltas.
- **Standard:** 650/35 (semana 1), 800/40 (semana 2) y 900/43 (semana 3).

**Corregido de paso:** la regla "No dejes tu sesión abierta" decía "cierra con F12", pero F12
es Cancelar. Ya no nombra ninguna tecla.

**Repaso del mismo día:** F10 pasa a decir que no tiene ningún efecto en el sistema; la regla
del locker se mueve a *Reglas de la casa* y "Pide ayuda a tiempo" deja de ser regla y pasa a
*Consejos útiles*. La observación sobre F7 (en pantalla "Manco", pero la ejecuta el supervisor)
se queda como estaba.
