import { onlyLettersAndNumbers } from '../utilities/stringConversions';

const constructPath = (item: any, dataType: string, weapon?: string) => {
  const getAgentLinkPath = (displayName: string) => {
    const agentName = displayName === 'KAY/O' ? 'Kayo' : displayName.replace('/', '');
    return `/agent/${agentName}`;
  };

  const getWeaponLinkPath = (displayName: string) => {
    return `/weapon/${displayName}`;
  };

  const getWeaponSkinLinkPath = (displayName: string) => {
    const skinName = onlyLettersAndNumbers(displayName);
    return `/weapon/${weapon}/skins/${skinName}`;
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
    /* PLACEHOLDER LINKS */
    case 'sprays':
      linkPath = '/';
      break;
    case 'buddies':
      linkPath = '/';
      break;
    default:
      break;
  }
  return linkPath;
}

export default constructPath
