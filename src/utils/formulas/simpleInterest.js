const simpleinterest = ()  => ({
  futureValue: (presentValue, interestPercentage, periods) => (presentValue * ( 1 + periods * ( interestPercentage / 100 ))),

  presentValue: (futureValue, periods, interestPercentage) => (futureValue / ( 1 + periods * ( interestPercentage / 100 ))),

  interestRate: (futureValue, presentValue, periods) => (( (futureValue / presentValue) - 1 ) * ( 1 / periods )),

  interestPeriods: (futureValue, presentValue, interestRate) => ((( futureValue / presentValue ) - 1) * ( 1 / interestRate )),
})

export default simpleinterest