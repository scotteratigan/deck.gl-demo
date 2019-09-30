function cleanUserData(userData) {
  // removes hashed password, formats columns in camelCase:
  return {
    active: userData.user_date_active,
    id: userData.id,
    name: userData.user_name,
    permissions: userData.user_permissions,
    type: userData.user_type
  };
}

module.exports = {
  cleanUserData
};
