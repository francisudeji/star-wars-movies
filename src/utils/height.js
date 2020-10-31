export function getTotalHeightInUnit({ unit = 'cm', rows }) {
  const total = [...rows]
    .filter((row) => row.values.height !== 'unknown')
    .reduce((totalHeight, row) => totalHeight + Number(row.values.height), 0)

  if (unit === 'foot') {
    return Number(total / 30.48).toFixed(2)
  }

  if (unit === 'inches') {
    return Number(total / 2.54).toFixed(2)
  }
  return total
}
