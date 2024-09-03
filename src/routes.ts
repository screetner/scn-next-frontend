export enum Routes {
  DASHBOARD,
  GEOMETRY,
  ROLE,
  ROLE_SETTING,
}

export function fillRoute(route: Routes, roleId?: string) {
  switch (route) {
    case Routes.DASHBOARD:
      return '/dashboard'
    case Routes.GEOMETRY:
      return '/geometry'
    case Routes.ROLE:
      return `/role/`
    case Routes.ROLE_SETTING:
      return `/role/${roleId}/setting`
  }
}
