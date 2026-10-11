function FrenchArticleText({ text, highlighted }) {
  if (!highlighted) return text

  const articlePattern = /(^|[^\p{L}\p{N}_])(le|un|la|une|les)(?=$|[^\p{L}\p{N}_])/giu
  const parts = []
  let cursor = 0

  for (const match of text.matchAll(articlePattern)) {
    const articleStart = match.index + match[1].length
    parts.push(text.slice(cursor, articleStart))
    parts.push(
      <span
        key={articleStart}
        style={{
          color: /^(les)$/i.test(match[2]) ? '#75ffca' : /^(le|un)$/i.test(match[2]) ? '#75aaff' : '#ff7585',
        }}
      >
        {match[2]}
      </span>,
    )
    cursor = articleStart + match[2].length
  }

  parts.push(text.slice(cursor))
  return parts
}

export default FrenchArticleText
