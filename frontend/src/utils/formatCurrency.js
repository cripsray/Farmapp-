/**
 * Formatea un número como moneda colombiana (COP)
 * @param {number} amount - Cantidad a formatear
 * @returns {string} - String formateado como "$XX.XXX"
 */
export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount);
};

/**
 * Formatea un número como moneda colombiana sin símbolo
 * @param {number} amount - Cantidad a formatear
 * @returns {string} - String formateado como "XX.XXX"
 */
export const formatCurrencyNoSymbol = (amount) => {
  return new Intl.NumberFormat('es-CO', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount);
};

