# LLC Bookkeeping Cost Calculator

Calculadora gratuita y de código abierto para **estimar el costo mensual de bookkeeping de una LLC de EE. UU.** Es una herramienta estática (HTML, CSS y JavaScript), sin dependencias ni backend: se abre en cualquier navegador.

## Versión online

Puedes usar la calculadora online aquí:

https://bookkeepingaldia.com/costo-bookkeeping-llc/

## Qué hace

A partir de unos pocos datos, la calculadora devuelve un **rango de costo mensual estimado** de bookkeeping y, si corresponde, una estimación de la **puesta al día** (catch-up) por meses atrasados.

## Para quién sirve

- Dueños de una LLC de EE. UU. que quieren una idea aproximada del costo del bookkeeping antes de pedir una cotización.
- Emprendedores y no residentes que están organizando la contabilidad de su negocio.
- Cualquier persona que quiera entender qué variables encarecen o abaratan este servicio.

## Variables que toma en cuenta

- **Volumen de transacciones** mensuales (banco, tarjetas y plataformas de pago).
- **Número de cuentas** a conciliar (bancos y tarjetas).
- **Frecuencia** del servicio (mensual o trimestral).
- **Atraso contable**: meses sin conciliar que requieren una puesta al día inicial.
- **Complejidad adicional**: nómina, operaciones en varias monedas, inventario y facturación / cuentas por cobrar.

Los detalles del modelo de cálculo están en [metodologia.md](metodologia.md).

## Uso local

No requiere instalación. Tienes dos opciones:

1. **Abrir el archivo directamente:** haz doble clic en `index.html`.
2. **Servidor local** (recomendado para evitar restricciones del navegador):

   ```bash
   # Con Python 3
   python -m http.server 8000
   ```

   Luego abre `http://localhost:8000` en tu navegador.

## Descargar o clonar

```bash
git clone https://github.com/<tu-usuario>/llc-bookkeeping-cost-calculator.git
cd llc-bookkeeping-cost-calculator
```

O descarga el repositorio como archivo ZIP desde GitHub con el botón **Code → Download ZIP**.

## Estructura del proyecto

```
llc-bookkeeping-cost-calculator/
├── index.html      # Estructura e interfaz de la calculadora
├── styles.css      # Estilos
├── script.js       # Lógica de la estimación
├── metodologia.md  # Cómo se calcula la estimación
├── LICENSE         # Licencia MIT
├── .gitignore
└── README.md
```

## Aviso importante

Esta calculadora ofrece una **estimación educativa** y **no sustituye asesoría contable, fiscal ni legal**. El costo real puede variar según el volumen de transacciones, el número de cuentas, las conciliaciones, el atraso contable y la complejidad de cada LLC. Para conocer el costo de tu caso concreto, consulta con un profesional.

## Créditos

Desarrollada y mantenida por [Bookkeeping al Día](https://bookkeepingaldia.com/).

## Licencia

Distribuida bajo licencia [MIT](LICENSE).
