import { onlyLettersAndNumbers } from '../utilities/stringConversions';

const constructPath = (item: any, dataType: string, weapon?: string) => {
  const getAgentLinkPath = (displayName: string) => {
    const agentName = displayName === 'KAY/O' ? 'Kayo' : displayName.replace('/', '');
    return `/agent/${[agentName]}`;
  };

  const getWeaponLinkPath = (displayName: string) => {
    return `/weapon/${displayName}`;
  };

  const getWeaponSkinLinkPath = (displayName: string) => {
    const skinName = onlyLettersAndNumbers(displayName);
    return `/weapon/${weapon}/skins/${skinName}`;
  };

  const getBuddyLinkPath = (displayName: string) => {
    const buddyName = onlyLettersAndNumbers(displayName);
    return `/buddy/${buddyName}`;
  };

  const getSprayLinkPath = (displayName: string) => {
    const sprayName = onlyLettersAndNumbers(displayName);
    return `/spray/${sprayName}`;
  };

  /* handle row click link navigations */
  let linkPath = '';

  switch (dataType) {
    case 'agents':
      linkPath = getAgentLinkPath(item.displayName);
      break;
    case 'weapons':
      linkPath = getWeaponLinkPath(item.displayName);
      break;
    case 'weapon-skins':
      linkPath = getWeaponSkinLinkPath(item.displayName);
      break;
    case 'sprays':
      linkPath = getSprayLinkPath(item.displayName);
      break;
    case 'buddies':
      linkPath = getBuddyLinkPath(item.displayName);
      break;
    default:
      break;
  }
  return linkPath;
}

export default constructPath
