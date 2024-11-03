const main_service = '/main'
const logs_service = '/log-sv'

const apiEndpoints = {
  auth: {
    signIn: `${main_service}/auth/login`,
    refresh: `${process.env.API_URL}${main_service}/auth/refresh`,
  },
  dashboard: {
    getAssets: `${main_service}/assets/orgId`,
  },
  geolocation: {
    patchGeolocationOrganizationBorder: `${main_service}/geolocation/organization-border`,
    getGeolocationOrganizationBorder: `${main_service}/geolocation`,
  },
  member: {
    getRecentMembers: (limit: number) =>
      `${main_service}/member/recent?limit=${limit}`,
    getTotalMembers: `${main_service}/dashboard/member`,
    getTotalInvitees: `${main_service}/dashboard/invite`,
    inviteMembers: `${main_service}/member/invite`,
  },
  register: {
    checkRegisterToken: `${main_service}/register/check`,
    registerUser: `${main_service}/register`,
  },
  role: {
    getRolesTable: `${main_service}/role`,
    getRoleManagement: (roleId: string) => `${main_service}/role/${roleId}`,
    getListOfUnRoleMembers: `${main_service}/role/unassigned`,
    updateRoleName: `${main_service}/role/update-role-name`,
    updateRolePermissions: `${main_service}/role/permission`,
    createRole: `${main_service}/role/new-role`,
    assignRole: `${main_service}/role/assign-role`,
    unassignRole: `${main_service}/role/unassign-role`,
    deleteRole: (targetRoleId: string) =>
      `${main_service}/role/remove/${targetRoleId}`,
    getRoleOptions: `${main_service}/role/option`,
  },
  user: {
    changePassword: `${main_service}/user/change-password`,
  },
  logs: {
    getUserActivityLogs: (userId: string) =>
      `${logs_service}/logs/user/${userId}`,
  },
  owner: {
    org: {
      getAllOrganization: `${main_service}/organization/all`,
      createOrganization: `${main_service}/organization/create`,
      getOrganizationInfo: (orgId: string) =>
        `${main_service}organization/information/${orgId}`,
    },
    role: {
      getRolesByOrgId: (orgId: string) => `${main_service}/role/org/${orgId}`,
    },
    member: {
      getMemberByOrgId: (orgId: string) =>
        `${main_service}/member/recent/org/${orgId}`,
    },
  },
}

export default apiEndpoints
