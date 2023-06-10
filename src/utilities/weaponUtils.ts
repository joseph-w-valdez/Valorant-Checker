import { meleeStats } from '../data/meleeInfo';
import { convertCamelCase, convertContainsColons, roundLongDecimals } from './stringConversions';

export const convertWeaponStats = (weaponStats: any) => {
  // If the weapon stats are null, return the melee stats
  if (!weaponStats) {
    return meleeStats;
  }
  const convertedStats: any = {};

  const processProperty = (prop: string, value: string) => {
    const convertedProp = convertCamelCase(prop);
    let convertedValue = convertContainsColons(value);
    convertedValue = convertCamelCase(convertedValue);
    convertedValue = roundLongDecimals(convertedValue);
    // Exclude key-value pair if the value is null, NaN, or matches other exclusion rules
    if (
      convertedValue !== null &&
      !isNaN(Number(convertedValue)) &&
      !(
        (convertedProp === 'Burst Count' || convertedProp === 'Shotgun Pellet Count') &&
        convertedValue === '1'
      )
    ) {
      convertedStats[convertedProp] = convertedValue;
    }
  };

  const processNestedObject = (prefix: string, obj: any) => {
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

export const filterProps = (props: any, weaponData: any) => {
  const displayName = weaponData?.displayName?.toLowerCase();
  const categoryIncludesMelee = weaponData?.category?.toLowerCase().includes('melee');
  const categoryIncludesShotgun = weaponData?.category?.toLowerCase().includes('shotgun');

  // If the category includes 'melee' or 'shotgun', return all props as is
  if (categoryIncludesMelee) {
    return props;
  }

  // If the displayName is 'bulldog', filter out the 'shotgun' and 'range' props
  if (displayName === 'bulldog') {
    const filteredProps: any = {};
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
    const filteredProps: any = {};
    for (const [prop, value] of Object.entries(props)) {
      const lowerCaseProp = prop.toLowerCase();
      if (!lowerCaseProp.includes('burst') && !lowerCaseProp.includes('range') && !lowerCaseProp.includes('accuracy')) {
        filteredProps[prop] = value;
      }
    }
    return filteredProps;
  }

  // Filter out 'shotgun', 'burst', and 'range' props from any other weapons
  const filteredProps: any = {};
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

export const modifyAccuracyProps = (props: any) => {
  const modifiedProps: any = {};

  for (const [prop, value] of Object.entries(props)) {
    const lowerCaseProp = prop.toLowerCase();
    let modifiedValue = value;

    if (lowerCaseProp.includes('accuracy')) {
      modifiedValue = (1 - parseFloat(value as string)) * 100; // Type assertion for value as string
      modifiedValue = Math.round(modifiedValue as number); // Type assertion for modifiedValue as number
      modifiedValue = `${modifiedValue}%`; // Append the '%' symbol
    }

    modifiedProps[prop] = modifiedValue;
  }

  return modifiedProps;
};
