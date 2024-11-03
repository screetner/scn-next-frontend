export enum Routes {
  DASHBOARD,
  GEOMETRY,
  MEMBER,
  ROLE,
  ROLE_SETTING,

  OWNER_DASHBOARD,
  OWNER_ORGANIZATION,
  OWNER_ORGANIZATION_MNG,
}

export function fillRoute(route: Routes, roleId?: string, orgId?: string) {
  switch (route) {
    case Routes.DASHBOARD:
      return '/dashboard'
    case Routes.GEOMETRY:
      return '/geometry'
    case Routes.MEMBER:
      return '/member'
    case Routes.ROLE:
      return '/role'
    case Routes.ROLE_SETTING:
      return `/role/${roleId}/setting`
    case Routes.OWNER_DASHBOARD:
      return '/owner'
    case Routes.OWNER_ORGANIZATION:
      return `/owner/organization`
    case Routes.OWNER_ORGANIZATION_MNG:
      return `/owner/organization/${orgId}`
    default:
      throw new Error('Invalid route')
  }
}
