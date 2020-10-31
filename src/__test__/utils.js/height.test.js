import { getTotalHeightInUnit } from '../../utils/height'

describe('Calculating height utility function', () => {
  test('Returns the original height if no unit is passed', () => {
    const originalHeight = 200
    const returnedHeight = getTotalHeightInUnit({ rows: [{ values: { height: originalHeight } }] })

    expect(returnedHeight).toEqual(originalHeight)
  })

  test('Returns the sum of all integer value heights in cm if no unit is passed and has unknown/non integer values', () => {
    const returnedHeight = getTotalHeightInUnit({
      rows: [
        { values: { height: 200 } },
        { values: { height: 'unknown' } },
        { values: { height: 150 } }
      ]
    })

    expect(returnedHeight).toEqual(350)
  })

  test('Returns the sum of all heights in foot', () => {
    const returnedHeight = getTotalHeightInUnit({
      unit: 'foot',
      rows: [{ values: { height: 120 } }, { values: { height: 150 } }, { values: { height: 176 } }]
    })

    expect(returnedHeight).toEqual('14.63')
  })

  test('Returns the sum of all heights in inches', () => {
    const returnedHeight = getTotalHeightInUnit({
      unit: 'inches',
      rows: [{ values: { height: 100 } }, { values: { height: 50 } }, { values: { height: 50 } }]
    })

    expect(returnedHeight).toEqual('78.74')
  })
})
