# 📧 Plantillas de Correo HTML – Lucero Express

Colección oficial de plantillas de correo electrónico transaccionales y operativas diseñadas para **Lucero Express**, alineadas 100% con la identidad visual, tipografía, paleta de colores y componentes del sitio web (`lucero.com.ve`).

---

## 📂 Estructura de la Carpeta `/emails`

| # | Archivo | Asunto / Tópico | Etapa / Uso |
|---|---|---|---|
| **01** | [`01-bienvenida.html`](./01-bienvenida.html) | **Bienvenida al Casillero** | Registro de nuevos clientes, asignación de código y direcciones de almacén Miami/China. |
| **02** | [`02-carga-recibida-costo-estimado.html`](./02-carga-recibida-costo-estimado.html) | **Carga Recibida + Costo Estimado ($$$$)** | Paquete ingresado a bodega en origen con peso, volumen y cotización preliminar. |
| **03** | [`03-su-carga-ha-zarpado.html`](./03-su-carga-ha-zarpado.html) | **Su Carga ha Zarpado** | Notificación de salida del buque desde el puerto de origen hacia Venezuela. |
| **04** | [`04-su-carga-se-encuentra-navegando.html`](./04-su-carga-se-encuentra-navegando.html) | **Su Carga se Encuentra Navegando** | Actualización en ruta marítima con barra de progreso de la travesía. |
| **05** | [`05-fecha-estimada-llegada.html`](./05-fecha-estimada-llegada.html) | **Estimación de Llegada (ETA)** | Confirmación formal de fecha estimada de atraque en puerto venezolano. |
| **06** | [`06-en-aduana-prenotificacion.html`](./06-en-aduana-prenotificacion.html) | **En Aduana (Pre-Notificación)** | Aviso de ingreso a aduana nacional y trámite de desaduanamiento incluido. |
| **07** | [`07-notificacion-de-cobro.html`](./07-notificacion-de-cobro.html) | **Notificación de Cobro** | Emisión de factura, desglose de liquidación y datos bancarios (Zelle, Bs, USDT). |
| **08** | [`08-carga-lista-para-retirar.html`](./08-carga-lista-para-retirar.html) | **Carga Lista para Retirar (Cobro Pendiente)** | Aviso de disponibilidad en sede/almacén con recordatorio de saldo pendiente por cancelar. |
| **09** | [`09-feedback-calificacion.html`](./09-feedback-calificacion.html) | **Feedback & Calificación** | Encuesta de satisfacción interactiva de 1 a 5 estrellas con cupón de descuento. |
| **—** | [`preview.html`](./preview.html) | **Visor Interactivo en Vivo** | Dashboard para previsualizar los 9 correos en Desktop (640px) y Móvil (380px), y copiar código. |

---

## 🖥️ Cómo Previsualizar los Correos en tu Navegador

Simplemente abre el archivo [`preview.html`](./preview.html) en cualquier navegador (doble clic o abriéndolo con Live Server / Vite).  
En este visor podrás:
1. Navegar entre las 9 plantillas con un solo clic.
2. Probar la vista en **Desktop (640px)** y **Móvil (380px)**.
3. Copiar el código fuente directamente con el botón **"Copiar Código"**.

---

## 🏷️ Variables de Reemplazo (Placeholders)

Cada plantilla utiliza variables entre llaves dobles `{{VARIABLE}}` listas para ser reemplazadas dinámicamente mediante plantillas de backend (Handlebars, EJS, Mustache, Jinja2, Blade, o `.replace()`):

### Generales
- `{{NOMBRE_CLIENTE}}` - Nombre y apellido del destinatario.
- `{{NUMERO_GUIA}}` - Código de guía de Lucero Express (ej. `LC-84920`).
- `{{CODIGO_CASILLERO}}` - ID único del casillero del cliente (ej. `VE-4021`).

### Almacén y Costos
- `{{COSTO_ESTIMADO}}` - Monto en USD cotizado al recibir la carga (ej. `48.50`).
- `{{TRACKING_ORIGEN}}` - Número de tracking de origen de Amazon / FedEx / UPS / etc.
- `{{MODALIDAD_SERVICIO}}` - "Marítimo Consolidado LCL" o "Aéreo Express".
- `{{PESO_LB}}` - Peso en libras (ej. `12.4`).
- `{{VOLUMEN_FT3}}` - Volumen en pies cúbicos (ej. `0.85`).
- `{{PIEZAS_CANTIDAD}}` - Cantidad de bultos o cajas.
- `{{DESCRIPCION_CARGA}}` - Contenido declarado (ej. `Repuestos automotrices`).
- `{{DESTINO_CIUDAD}}` - Ciudad de destino en Venezuela (ej. `Valencia, Carabobo`).

### Navegación y Fechas
- `{{PUERTO_ORIGEN}}` - Puerto o bodega de salida (ej. `Puerto de Miami, FL`).
- `{{PUERTO_LLEGADA}}` - Puerto de llegada (ej. `Puerto Cabello, Carabobo`).
- `{{FECHA_ZARPE}}` - Fecha del zarpe (ej. `28 de Octubre, 2026`).
- `{{FECHA_ESTIMADA_LLEGADA}}` - Fecha estimada de arribo (ETA) (ej. `15 de Noviembre, 2026`).
- `{{NOMBRE_BUQUE}}` - Nombre de la embarcación o naviera.
- `{{PORCENTAJE_TRAVESIA}}` - Número del porcentaje de navegación (ej. `65`).
- `{{DIAS_RESTANTES}}` - Días estimados para el arribo (ej. `4`).

### Aduana y Cobro
- `{{ADUANA_NOMBRE}}` - Aduana de proceso (ej. `Aduana Principal de Puerto Cabello`).
- `{{TIEMPO_ESTIMADO_ADUANA}}` - Tiempo estimado de inspección (ej. `48 a 72 horas hábiles`).
- `{{TOTAL_A_PAGAR_USD}}` - Saldo total a cancelar en USD (ej. `125.00`).
- `{{TOTAL_A_PAGAR_BS}}` - Monto en Bolívares según tasa oficial (ej. `4,625.00`).
- `{{TASA_BCV}}` - Tasa de cambio oficial del día.
- `{{MONTO_FLETE}}` - Subtotal de flete.
- `{{MONTO_ADUANA}}` - Subtotal de trámite y aforo aduanal.
- `{{MONTO_SEGURO}}` - Subtotal de póliza de seguro de carga.
- `{{MONTO_MANEJO}}` - Subtotal por manejo y reempaque.

### Retiro en Sede
- `{{SEDE_NOMBRE}}` - Nombre de la sede (ej. `Sede Central Valencia`).
- `{{SEDE_DIRECCION_COMPLETA}}` - Dirección física de la sede para el retiro.

---

## 💻 Ejemplo de Envío en Node.js (Nodemailer / Resend)

```javascript
import fs from 'fs';
import nodemailer from 'nodemailer';

// 1. Cargar plantilla HTML
let template = fs.readFileSync('./emails/02-carga-recibida-costo-estimado.html', 'utf8');

// 2. Reemplazar variables dinámicamente
const emailHtml = template
  .replace(/{{NOMBRE_CLIENTE}}/g, 'Carlos Mendoza')
  .replace(/{{NUMERO_GUIA}}/g, 'LC-92814')
  .replace(/{{COSTO_ESTIMADO}}/g, '65.00')
  .replace(/{{ALMACEN_ORIGEN}}/g, 'Miami, FL')
  .replace(/{{TRACKING_ORIGEN}}/g, '1Z9999999999999999')
  .replace(/{{MODALIDAD_SERVICIO}}/g, 'Marítimo Puerta a Puerta')
  .replace(/{{PESO_LB}}/g, '18.5')
  .replace(/{{VOLUMEN_FT3}}/g, '1.20')
  .replace(/{{PIEZAS_CANTIDAD}}/g, '1')
  .replace(/{{DESCRIPCION_CARGA}}/g, 'Herramientas eléctricas')
  .replace(/{{DESTINO_CIUDAD}}/g, 'Valencia, Carabobo');

// 3. Enviar correo
const transporter = nodemailer.createTransport({
  host: 'smtp.tuservidor.com',
  port: 465,
  secure: true,
  auth: {
    user: 'notificaciones@lucero.com.ve',
    pass: process.env.SMTP_PASSWORD,
  },
});

await transporter.sendMail({
  from: '"Lucero Express" <notificaciones@lucero.com.ve>',
  to: 'cliente@ejemplo.com',
  subject: '¡Tu carga ha sido recibida en almacén! – Guía #LC-92814',
  html: emailHtml,
});
```

---

## 🎨 Especificaciones de Diseño
- **Paleta de Colores**:
  - Dorado Lucero: `#F2A900` / Hover: `#D99600` / Fondo Suave: `#FEF3C7`
  - Carbón Oscuro: `#1C1917` / `#292524` / `#141210`
  - Fondo Exterior: `#F5F5F4`
  - Acentos de Estado: Verde Éxito `#10B981`, Azul Tránsito `#0284C7`, Ámbar Aduana `#D97706`, Rojo Alerta `#EF4444`.
- **Compatibilidad**:
  - Layout basado en tablas anidadas y estilos inline (`mso-` tags para Outlook).
  - Ancho máximo estándar de **600px**, centrado y responsivo para pantallas móviles con `@media only screen and (max-width: 620px)`.
