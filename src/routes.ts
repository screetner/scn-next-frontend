export enum Routes {
  DASHBOARD,
  GEOMETRY,
  MEMBER,
  ROLE,
  ROLE_SETTING,

  TEST,
}

export function fillRoute(route: Routes, roleId?: string) {
  switch (route) {
    case Routes.DASHBOARD:
      return '/dashboard'
    case Routes.GEOMETRY:
      return '/geometry'
    case Routes.MEMBER:
      return '/member'
    case Routes.ROLE:
      return `/role/`
    case Routes.ROLE_SETTING:
      return `/role/${roleId}/setting`
    case Routes.TEST:
      return '/admin/test'
  }
}
