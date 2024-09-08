import { PermissionSection } from '@/types/role'

export const permissionsConfig: Record<string, PermissionSection> = {
  MOBILE: {
    access: {
      defaultValue: false,
      description: 'Allow access on Mobile App.',
    },
    videosProcess: {
      defaultValue: false,
      description: 'Allow video processing on Mobile App.',
    },
  },
  WEB: {
    access: {
      defaultValue: false,
      description: 'Allow access on Web.',
    },
    manageGeometry: {
      defaultValue: false,
      description: 'Allow managing geometry on Web.',
    },
    roleSetting: {
      defaultValue: false,
      description: 'Allow role setting on Web.',
    },
  },
}
