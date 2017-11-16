const compoundinterest = () => ({
  futureValue: (presentValue, interestPercentage, periods) => (presentValue * Math.pow( (1 + (interestPercentage / 100) ), periods)),

  presentValue: (futureValue, periods, interestPercentage) => (futureValue / Math.pow( (1 + (interestPercentage / 100) ), periods)),

  interestRate: (futureValue, presentValue, periods) => ((Math.pow((futureValue / presentValue), (1 / periods))) - 1),

  interestPeriods: (futureValue, presentValue, interestRate) => ((Math.log(futureValue / presentValue)) / Math.log(1 + interestRate)),
})

export default compoundinterest