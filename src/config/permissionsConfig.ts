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
    member: {
      invite: {
        defaultValue: false,
        description: 'Allow inviting members.',
      },
    },
    role: {
      create: {
        defaultValue: false,
        description: 'Allow creating roles.',
      },
      delete: {
        defaultValue: false,
        description: 'Allow deleting roles.',
      },
      managePermission: {
        defaultValue: false,
        description: 'Allow managing role permissions.',
      },
      manageMember: {
        defaultValue: false,
        description: 'Allow managing role members.',
      },
    },
  },
}
