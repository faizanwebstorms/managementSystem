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

const fastTransferStatus = {
  ACTIVE: 0,
  PASSIVE: 1,
};
const bankAccountStatus = {
  ACTIVE: 0,
  PASSIVE: 1,
};
module.exports = {
  paymentMethodTypes,
  paymentTypesSeederData,
  fastTransferStatus,
  bankAccountStatus,
};
