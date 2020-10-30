export function getTotalHeightInUnit({ unit = 'cm', rows }) {
  return [...rows]
    .filter((row) => Number.isInteger(Number(row.values.height)))
    .reduce((totalHeight, row) => {
      if (unit === 'foot') {
        return Number((Number(totalHeight) + Number(row.values.height)) / 30.48).toFixed(2)
      }

      if (unit === 'inches') {
        return Number((Number(totalHeight) + Number(row.values.height)) / 2.54).toFixed(2)
      }

      return Number(totalHeight) + Number(row.values.height)
    }, 0)
}
