export type RolesTable = {
  id: string
  roleName: string
  members: number
}

type MobilePermission = {
  access: boolean
  videosProcess: boolean
}

type WebPermission = {
  access: boolean
  manageGeometry: boolean
  roleSetting: boolean
}

export type PermissionResponse = {
  mobile: MobilePermission
  web: WebPermission
}

export type PermissionField = {
  defaultValue: boolean
  description: string
}

export type PermissionSection = {
  [key: string]: PermissionField
}

export const mockRoles: RolesTable[] = [
  { id: '1', roleName: 'Admin', members: 1 },
  { id: '2', roleName: 'Editor', members: 2 },
  { id: '3', roleName: 'Viewer', members: 3 },
  { id: '4', roleName: 'Contributor', members: 4 },
]

export const mockPermissions: PermissionResponse = {
  mobile: {
    access: true,
    videosProcess: false,
  },
  web: {
    access: true,
    manageGeometry: true,
    roleSetting: false,
  },
}
