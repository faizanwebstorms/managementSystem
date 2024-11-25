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
  },
  {
    name: "Papara Account",
    status: 1,
    type: paymentMethodTypes.PAPARA,
  },
  {
    name: "Payfix Account",
    status: 1,
    type: paymentMethodTypes.PAYFIX,
  },
];

module.exports = {
  paymentMethodTypes,
  paymentTypesSeederData,
};
