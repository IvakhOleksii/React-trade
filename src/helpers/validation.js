export const validateSingleField = (field) => {
  const validate =
    field === null || field === "" || field === undefined ? false : true;
  return validate;
};

export const validateObject = (fields) => {
  for (const field in fields) {
    if (!validateSingleField(fields[field])) {
      return false;
    }
  }
  return true;
};

export const validateMaxLength = (fields, length) => {
  var number = Math.ceil(Math.log10(fields + 1));
  if (number - 1 > length) {
    return false;
  } else {
    return true;
  }
};

export const GetLocationCoordinates = () => {
  function showPosition(position) {
    var location = {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude,
    };
    return location;
  }
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    alert("Geolocation is not supported by this browser.");
    return null;
  }
};
