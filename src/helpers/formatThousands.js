function formatThousands(value) {
  if (!value) return value;
  const valString = String(value).replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  return valString;
}

export default formatThousands;
