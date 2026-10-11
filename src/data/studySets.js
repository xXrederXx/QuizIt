import Papa from 'papaparse'

const setFiles = import.meta.glob('../sets/*.csv', { eager: true, query: '?raw', import: 'default' })
const displayName = (path) => path.split('/').pop().replace(/\.csv$/i, '').replace(/[-_]+/g, ' ').replace(/\b\w/g, (letter) => letter.toUpperCase())

export const sets = Object.entries(setFiles).map(([path, csv]) => {
  const rows = Papa.parse(csv, { header: true, skipEmptyLines: true }).data
  return {
    id: path,
    name: displayName(path),
    cards: rows
      .map((row, index) => ({
        id: `${path}-${index}`,
        question: String(row.question ?? '').trim(),
        answer: String(row.answer ?? '').trim(),
      }))
      .filter((card) => card.question && card.answer),
  }
}).filter((set) => set.cards.length)
