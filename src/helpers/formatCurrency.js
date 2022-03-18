function formatCurrency(value) {
  const valString = Number(value)
    .toFixed(2)
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  return `$${valString}`;
}

export default formatCurrency;
