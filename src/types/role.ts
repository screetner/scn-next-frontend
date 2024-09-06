export type RolesTable = {
  roleId: string
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

export type RoleMember = {
  userId: string
  email: string
  username: string
}

export type RoleInfo = {
  roleId: string
  roleName: string
}

export type RoleManagementResponse = {
  orgRole: RoleInfo[]
  roleInfo: RoleInfo
  roleMembers: RoleMember[]
  rolePermissions: PermissionResponse
}

export const mockRoles: RolesTable[] = [
  { roleId: 'cjld2cjxh0000qzrmn831i7rn', roleName: 'Admin', members: 1 },
  { roleId: 'cjld2cjxh0001qzrmn831i7ro', roleName: 'Editor', members: 2 },
  { roleId: 'cjld2cjxh0002qzrmn831i7rp', roleName: 'Viewer', members: 3 },
  { roleId: 'cjld2cjxh0003qzrmn831i7rq', roleName: 'Contributor', members: 4 },
]

export const mockRoleManagementResponse: RoleManagementResponse = {
  orgRole: [
    { roleId: 'cjld2cjxh0000qzrmn831i7rn', roleName: 'Admin' },
    { roleId: 'cjld2cjxh0001qzrmn831i7ro', roleName: 'Editor' },
    { roleId: 'cjld2cjxh0002qzrmn831i7rp', roleName: 'Viewer' },
    { roleId: 'cjld2cjxh0003qzrmn831i7rq', roleName: 'Contributor' },
  ],
  roleInfo: {
    roleId: 'cjld2cjxh0000qzrmn831i7rn', // Matches the 'Admin' role from mockRoles
    roleName: 'Admin',
  },
  roleMembers: [
    {
      userId: 'cjld2ck8c0000qzrmn8j1i7rn',
      email: 'admin@example.com',
      username: 'adminUser',
    },
    {
      userId: 'cjld2ck8c0001qzrmn8j1i7ro',
      email: 'editor@example.com',
      username: 'editorUser',
    },
  ],
  rolePermissions: {
    mobile: {
      access: true,
      videosProcess: true,
    },
    web: {
      access: true,
      manageGeometry: false,
      roleSetting: true,
    },
  },
}

export const listOfUnRoleMembers: RoleMember[] = [
  {
    userId: 'cjld2ck8c0000qzrmn8j1i7rn',
    email: 'xxx@example.com',
    username: 'xxx',
  },
  {
    userId: 'cjld2ck8c0001qzrmn8j1i7ry',
    email: 'yyy@example.com',
    username: 'yyy',
  },
]
