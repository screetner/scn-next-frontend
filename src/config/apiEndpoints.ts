const apiEndpoints = {
  dashboard: {
    getAssets: `/assets/orgId`,
  },
  geolocation: {
    patchGeolocationOrganizationBorder: `/geolocation/organization-border`,
    getGeolocationOrganizationBorder: `/geolocation`,
  },
  member: {
    getRecentMembers: (limit: number) => `/member/recent?limit=${limit}`,
    getTotalMembers: `/dashboard/member`,
    getTotalInvitees: `/dashboard/invite`,
    inviteMembers: `/member/invite`,
  },
  register: {
    checkRegisterToken: `/register/check`,
    registerUser: `/register`,
  },
  role: {
    getRolesTable: `/role`,
    getRoleManagement: (roleId: string) => `/role/${roleId}`,
    getListOfUnRoleMembers: `/role/unassigned`,
    updateRoleName: `/role/update-role-name`,
    updateRolePermissions: `/role/permission`,
    createRole: `/role/new-role`,
    assignRole: `/role/assign-role`,
    unassignRole: `/role/unassign-role`,
    deleteRole: (targetRoleId: string) => `/role/remove/${targetRoleId}`,
    getRoleOptions: `/role/option`,
  },
}

export default apiEndpoints
