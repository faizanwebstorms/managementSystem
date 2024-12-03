const paymentMethodTypes = {
  BANK: 0,
  PAPARA: 1,
  PAYFIX: 2,
};

const paymentTypesSeederData = [
  {
    name: "Bank Account",
    status: 1,
    type: paymentMethodTypes.BANK,
    isParent: true,
  },
  {
    name: "Papara Account",
    status: 1,
    type: paymentMethodTypes.PAPARA,
    isParent: true,
  },
  {
    name: "Payfix Account",
    status: 1,
    type: paymentMethodTypes.PAYFIX,
    isParent: true,
  },
];

const passiveActiveStatuses = {
  PASSIVE: 0,
  ACTIVE: 1,
};

const depositStatus = {
  PENDING: 0,
  APPROVED: 1,
  DECLINED: 2,
};
module.exports = {
  paymentMethodTypes,
  paymentTypesSeederData,
  passiveActiveStatuses,
  depositStatus,
};
