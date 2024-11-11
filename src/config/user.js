const getTypes = [0, 1, 2, 3];
const getRoles = [0, 1, 2, 3];
const getDealerClassifications = [0, 1, 2];
const types = {
  STANDARD: 0,
  FACEBOOK: 1,
  GOOGLE: 2,
  APPLE: 3,
};

const roles = {
  ADMIN: 0,
  DEALER: 1,
  INSTITUTION: 2,
  PERSONAL: 3,
};
const rolesReverseForVerifyingRoles = {
  0: "ADMIN",
  1: "DEALER",
  2: "INSTITUTION",
  3: "PERSONAL",
};

const dealerClassifications = {
  NETSELLER: 0,
  SKRILL: 1,
  BTC: 2,
};
module.exports = {
  types,
  roles,
  getTypes,
  getRoles,
  dealerClassifications,
  getDealerClassifications,
  rolesReverseForVerifyingRoles,
};
