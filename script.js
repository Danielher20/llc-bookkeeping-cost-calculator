// LLC Bookkeeping Cost Calculator
// Estimación educativa del costo mensual de bookkeeping para una LLC de EE. UU.
// Todas las cifras son aproximaciones en USD y NO constituyen una cotización.

(function () {
  "use strict";

  // Base mensual según volumen de transacciones (USD).
  const VOLUME_BASE = {
    "0-30": 150,
    "31-75": 250,
    "76-150": 400,
    "151-300": 600,
    "301+": 900,
  };

  // Recargos por complejidad (USD por mes).
  const ADDONS = {
    payroll: 75, // Nómina
    multicurrency: 60, // Operaciones en varias monedas
    inventory: 80, // Control de inventario
    invoicing: 50, // Facturación / cuentas por cobrar
  };

  // Cuentas (bancos + tarjetas) incluidas en la base antes de cobrar extra.
  const ACCOUNTS_INCLUDED = 2;
  const COST_PER_EXTRA_ACCOUNT = 25;

  // Margen del rango estimado (+/- 20%).
  const RANGE_SPREAD = 0.2;

  const els = {
    volume: document.getElementById("volume"),
    accounts: document.getElementById("accounts"),
    frequency: document.getElementById("frequency"),
    backlog: document.getElementById("backlog"),
    addons: Array.prototype.slice.call(
      document.querySelectorAll('input[name="addon"]')
    ),
    results: document.getElementById("results"),
    calculate: document.getElementById("calculate"),
    copy: document.getElementById("copy"),
  };

  const money = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  });

  function clampNumber(value, min) {
    const n = Number(value);
    if (!Number.isFinite(n) || n < min) return min;
    return n;
  }

  function monthlyEstimate() {
    let base = VOLUME_BASE[els.volume.value] || VOLUME_BASE["0-30"];

    const accounts = clampNumber(els.accounts.value, 0);
    const extraAccounts = Math.max(0, accounts - ACCOUNTS_INCLUDED);
    base += extraAccounts * COST_PER_EXTRA_ACCOUNT;

    els.addons.forEach(function (addon) {
      if (addon.checked && ADDONS[addon.value]) {
        base += ADDONS[addon.value];
      }
    });

    // El trabajo trimestral concentra el cierre, pero el costo equivalente
    // por mes suele ser algo menor que un servicio mensual continuo.
    if (els.frequency.value === "quarterly") {
      base *= 0.85;
    }

    return base;
  }

  function render() {
    const monthly = monthlyEstimate();
    const low = Math.round((monthly * (1 - RANGE_SPREAD)) / 5) * 5;
    const high = Math.round((monthly * (1 + RANGE_SPREAD)) / 5) * 5;
    const backlogMonths = clampNumber(els.backlog.value, 0);

    let html =
      '<div class="result">' +
      "<strong>Costo mensual estimado de bookkeeping</strong>" +
      '<p class="amount">' +
      money.format(low) +
      " – " +
      money.format(high) +
      "</p>" +
      '<p class="small">Rango aproximado para el trabajo recurrente de conciliación y categorización, según los datos ingresados.</p>' +
      "</div>";

    if (backlogMonths > 0) {
      // Puesta al día (catch-up): trabajo único para meses atrasados.
      const catchupLow = Math.round((monthly * 0.7 * backlogMonths) / 25) * 25;
      const catchupHigh = Math.round((monthly * 1.0 * backlogMonths) / 25) * 25;
      html +=
        '<div class="result">' +
        "<strong>Puesta al día (trabajo único) por " +
        backlogMonths +
        " mes(es) atrasado(s)</strong>" +
        '<p class="amount">' +
        money.format(catchupLow) +
        " – " +
        money.format(catchupHigh) +
        "</p>" +
        '<p class="small">Estimación de una sola vez para regularizar meses sin conciliar antes de iniciar el servicio recurrente.</p>' +
        "</div>";
    }

    html +=
      '<p class="small warning">Importante: es una estimación educativa, no una cotización. El costo real depende del volumen y la complejidad de tu LLC.</p>';

    els.results.innerHTML = html;
  }

  els.calculate.addEventListener("click", render);

  els.copy.addEventListener("click", async function () {
    const text = els.results.innerText.trim();
    if (!text) return;
    try {
      await navigator.clipboard.writeText(text);
      els.copy.textContent = "Copiado";
      setTimeout(function () {
        els.copy.textContent = "Copiar resultado";
      }, 1600);
    } catch (err) {
      // Si el navegador bloquea el portapapeles, no interrumpimos al usuario.
    }
  });

  render();
})();
