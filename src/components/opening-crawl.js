export function OpeningCrawl({ openingCrawl }) {
  return (
    <section className="star-wars">
      <div className="crawl">
        {openingCrawl.split('\n').map((oc, i) => (
          <p key={i + oc}>{oc}</p>
        ))}
      </div>
    </section>
  )
}
