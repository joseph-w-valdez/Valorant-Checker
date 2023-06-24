import React from 'react';
import { weaponSkinExceptions } from '../data/weaponSkinExceptions';
import { meleeIcon } from '../data/meleeInfo';

type RenderIconProps = {
  item: any;
  dataType: string;
};

const RenderIcon: React.FC<RenderIconProps> = ({ item, dataType }) => {
  const isMelee = item.displayName === 'Melee';
  const hasDisplayIcon = item.displayIcon && !weaponSkinExceptions.includes(item.displayName);

  let iconClasses = 'h-10';

  switch (dataType) {
    case 'buddies':
      iconClasses = 'h-full mr-[3.5rem] p-[2px]';
      break;
    case 'agents':
    case 'sprays':
      iconClasses = 'h-full mr-[3rem]';
      break;
    default:
      break;
  }

  return (
    <div className={iconClasses}>
      {isMelee ? (
        <img
          className="flex-end h-full object-contain sm:mr-8 lg:mr-32"
          src={meleeIcon}
          alt={`${item.displayName} portrait`}
        />
      ) : (
        <img
          className="flex-end h-full object-contain sm:mr-8 lg:mr-32"
          src={hasDisplayIcon ? item.displayIcon : item.chromas[0]?.fullRender}
          alt={`${item.displayName} portrait`}
        />
      )}
    </div>
  );
};

export default RenderIcon;
