export const futureValue = (presentValue, interestPercentage, periods) => (presentValue * ( 1 + periods * ( interestPercentage / 100 )))

export const presentValue = (futureValue, periods, interestPercentage) => (futureValue / ( 1 + periods * ( interestPercentage / 100 )))

export const interestRate = (futureValue, presentValue, periods) => (( (futureValue / presentValue) - 1 ) * ( 1 / periods ))

export const interestPeriods = (futureValue, presentValue, interestRate) => ((( futureValue / presentValue ) - 1) * ( 1 / interestRate ))