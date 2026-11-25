import React from 'react';
import {
  CalendarBlank,
  FileText,
  GearSix,
  House,
  Key,
  ListNumbers,
  SignOut,
  UserCheck,
  UserCircle,
  Users,
  UsersThree,
  type Icon,
  type IconProps,
} from '@phosphor-icons/react';

export const NAV_PHOSPHOR_ICONS: Record<string, Icon> = {
  home: House,
  'list-ordered': ListNumbers,
  users: Users,
  calendar: CalendarBlank,
  'user-check': UserCheck,
  'users-round': UsersThree,
  'key-round': Key,
  'file-text': FileText,
  settings: GearSix,
  'user-circle': UserCircle,
  'log-out': SignOut,
};

export interface NavIconProps extends Omit<IconProps, 'weight'> {
  name: string;
  active?: boolean;
}

export const NavIcon: React.FC<NavIconProps> = ({
  name,
  active = false,
  size = 20,
  color,
  className = 'shrink-0 align-middle',
  ...rest
}) => {
  const IconComponent = NAV_PHOSPHOR_ICONS[name] || House;
  return (
    <IconComponent
      size={size}
      weight={active ? 'duotone' : 'regular'}
      color={active ? '#1976B2' : color}
      className={className}
      {...rest}
    />
  );
};
