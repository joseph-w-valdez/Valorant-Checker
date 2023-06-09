import { meleeStats } from '../data/meleeInfo';
import { convertCamelCase, convertContainsColons, roundLongDecimals } from '../utilities/stringConversions';

export const convertWeaponStats = (weaponStats) => {
  // If the weapon stats are null, return the melee stats
  if (!weaponStats) {
    return meleeStats;
  }
  const convertedStats = {};

  const processProperty = (prop, value) => {
    const convertedProp = convertCamelCase(prop);
    let convertedValue = convertContainsColons(value);
    convertedValue = convertCamelCase(convertedValue);
    convertedValue = roundLongDecimals(convertedValue);
    // Exclude key-value pair if the value is null, NaN, or matches other exclusion rules
    if (
      convertedValue !== null &&
      !isNaN(convertedValue) &&
      !(
        (convertedProp === 'Burst Count' || convertedProp === 'Shotgun Pellet Count') &&
        convertedValue === 1
      )
    ) {
      convertedStats[convertedProp] = convertedValue;
    }
  };

  const processNestedObject = (prefix, obj) => {
    for (const prop in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, prop)) {
        const nestedProp = prop;
        const nestedValue = obj[prop];

        if (typeof nestedValue === 'object' && nestedValue !== null) {
          processNestedObject(nestedProp, nestedValue);
        } else {
          processProperty(nestedProp, nestedValue);
        }
      }
    }
  };

  for (const prop in weaponStats) {
    if (Object.prototype.hasOwnProperty.call(weaponStats, prop)) {
      const value = weaponStats[prop];

      if (typeof value === 'object' && value !== null) {
        processNestedObject(prop, value);
      } else {
        processProperty(prop, value);
      }
    }
  }

  return convertedStats;
};

export const filterProps = (props, weaponData) => {
  const displayName = weaponData?.displayName?.toLowerCase();
  const categoryIncludesMelee = weaponData?.category?.toLowerCase().includes('melee');
  const categoryIncludesShotgun = weaponData?.category?.toLowerCase().includes('shotgun');

  // If the category includes 'melee' or 'shotgun', return all props as is
  if (categoryIncludesMelee) {
    return props;
  }

  // If the displayName is 'bulldog', filter out the 'shotgun' and 'range' props
  if (displayName === 'bulldog') {
    const filteredProps = {};
    for (const [prop, value] of Object.entries(props)) {
      const lowerCaseProp = prop.toLowerCase();
      if (!lowerCaseProp.includes('shotgun') && !lowerCaseProp.includes('range')) {
        filteredProps[prop] = value;
      }
    }
    return filteredProps;
  }

  // Filter out 'burst' and 'range' props from shotguns
  if (categoryIncludesShotgun || displayName === 'shorty' || displayName === 'classic') {
    const filteredProps = {};
    for (const [prop, value] of Object.entries(props)) {
      const lowerCaseProp = prop.toLowerCase();
      if (!lowerCaseProp.includes('burst') && !lowerCaseProp.includes('range') && !lowerCaseProp.includes('accuracy')) {
        filteredProps[prop] = value;
      }
    }
    return filteredProps;
  }

  // Filter out 'shotgun', 'burst', and 'range' props from any other weapons
  const filteredProps = {};
  for (const [prop, value] of Object.entries(props)) {
    const lowerCaseProp = prop.toLowerCase();
    if (
      !lowerCaseProp.includes('shotgun') &&
      !lowerCaseProp.includes('burst') &&
      !lowerCaseProp.includes('range')
    ) {
      filteredProps[prop] = value;
    }
  }

  return filteredProps;
};

export const modifyAccuracyProps = (props) => {
  const modifiedProps = {};

  for (const [prop, value] of Object.entries(props)) {
    const lowerCaseProp = prop.toLowerCase();
    let modifiedValue = value;

    if (lowerCaseProp.includes('accuracy')) {
      modifiedValue = (1 - parseFloat(value)) * 100; // Subtract the value from one and multiply by 100
      modifiedValue = Math.round(modifiedValue); // Round the modified value
      modifiedValue = `${modifiedValue}%`; // Append the '%' symbol
    }

    modifiedProps[prop] = modifiedValue;
  }

  return modifiedProps;
};
