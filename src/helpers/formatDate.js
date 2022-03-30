/**
 * @param {string | number | Date} date
 * @param {Intl.DateTimeFormatOptions} options
 * @returns {string}
 */
function formatDate(date, options) {
  const replaceMap = {
    "/": "-",
    ",": "",
  };

  return Intl.DateTimeFormat(navigator.language, options)
    .format(new Date(date))
    .replace(/\/|,/g, (match) => replaceMap[match]);
}

export default formatDate;
