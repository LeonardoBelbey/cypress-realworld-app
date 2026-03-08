export const uniqueSuffix = () => `${Date.now()}-${Cypress._.random(1000, 9999)}`

export const bankAccountData = () => {
  const suffix = uniqueSuffix()

  return {
    bankName: `Bank ${suffix}`,
    routingNumber: `${Cypress._.random(100000000, 999999999)}`,
    accountNumber: `${Cypress._.random(100000000, 999999999)}`
  }
}

export const paymentData = () => {
  const suffix = uniqueSuffix()

  return {
    amount: "25",
    note: `payment-${suffix}`
  }
}