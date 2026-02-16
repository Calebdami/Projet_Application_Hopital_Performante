import { ROLES } from '@/constants/roles'

export const permissions = {
  [ROLES.ADMIN]: {
    dashboard: true,
    patients: true,
    doctors: true,
    appointments: true,
    rooms: true,
    users: true,
  },

  [ROLES.DOCTOR]: {
    dashboard: true,
    patients: true,
    doctors: false,
    appointments: true,
    rooms: false,
    users: false,
  },

  [ROLES.RECEPTIONIST]: {
    dashboard: true,
    patients: true,
    doctors: false,
    appointments: true,
    rooms: true,
    users: false,
  },
}

export function canAccess(role, module) {
  return permissions[role]?.[module] || false
}
