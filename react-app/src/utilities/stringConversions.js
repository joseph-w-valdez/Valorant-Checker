export const convertCamelCase = (str) => {
  if (str === 'ADS') {
    return 'ADS';
  }
  if (str === 'VFX') {
    return 'VFX'
  }
  if (str === 'ROFIncrease') {
    return 'ROF Increase';
  }
  if (typeof str === 'string') {
    let convertedStr = str.replace(/([A-Z])/g, ' $1');
    convertedStr = convertedStr.trim().split(' ')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');

    // Replace specific strings in the converted string
    convertedStr = convertedStr.replace(/Meters/g, '(meters)');
    convertedStr = convertedStr.replace(/Seconds/g, '(seconds)');

    return convertedStr;
  }
  return str;
};

export const convertContainsColons = (str) => {
  // Check if the input is a string and contains '::'
  if (typeof str === 'string' && str.includes('::')) {
    // Extract the string value after ':::'
    const convertedStr = str.split('::')[1].trim();
    // Split the converted string by '::' and return the last element
    return convertedStr;
  }

  return str;
};

export const roundLongDecimals = (value) => {
  if (!isNaN(value)) {
    const roundedValue = parseFloat(value);
    if (roundedValue % 1 !== 0) {
      const decimalString = roundedValue.toString();
      const decimalSeparatorIndex = decimalString.indexOf('.') !== -1 ? decimalString.indexOf('.') : decimalString.indexOf(',');
      if (decimalSeparatorIndex !== -1) {
        const decimalPlaces = decimalString.substring(decimalSeparatorIndex + 1).length;
        if (decimalPlaces > 2) {
          return roundedValue.toFixed(2);
        }
      }
    }
    return roundedValue.toString();
  }
  return value;
};

export const shortenLevelText = (inputString) => {
  const levelIndex = inputString.indexOf('Level');
  if (levelIndex !== -1) {
    const textAfterLevel = inputString.slice(levelIndex + 6).trim();
    const hyphenIndex = textAfterLevel.indexOf('-');
    if (hyphenIndex !== -1) {
      const newText = textAfterLevel.slice(hyphenIndex + 1).trim();
      return `Level ${textAfterLevel.slice(0, hyphenIndex).trim()} (${newText})`;
    }
    return `Level ${textAfterLevel}`;
  }
  return '';
};
