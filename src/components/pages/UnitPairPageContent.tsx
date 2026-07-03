import { UnitPairConverter } from "@/components/UnitPairConverter";
import {
  buildPairFaq,
  buildPairFormulaText,
  convertPairValue,
  formatPairNumber,
  getRelatedUnitPairs,
  getReverseUnitPair,
  getUnitRate,
  type UnitPairDefinition,
} from "@/lib/unit-pairs";

interface UnitPairPageContentProps {
  pairDef: UnitPairDefinition;
}

function capitalize(text: string): string {
  return text.charAt(0).toUpperCase() + text.slice(1);
}

export function UnitPairPageContent({ pairDef }: UnitPairPageContentProps) {
  const reverse = getReverseUnitPair(pairDef);
  const related = getRelatedUnitPairs(pairDef);
  const faq = buildPairFaq(pairDef);
  const formulaText = buildPairFormulaText(pairDef);
  const isTemperature = pairDef.quantity === "temperature";
  const rate = getUnitRate(pairDef);
  const exampleValue = pairDef.tableValues[12] ?? 25;
  const exampleResult = formatPairNumber(convertPairValue(pairDef, exampleValue));

  return (
    <div className="site-container page-stack">
      <nav className="breadcrumbs" aria-label="Breadcrumb">
        <a href="/">Home</a>
        <span>/</span>
        <a href="/converters">Converters</a>
        <span>/</span>
        <span aria-current="page">
          {pairDef.fromAbbr} to {pairDef.toAbbr}
        </span>
      </nav>

      <section className="tool-hero">
        <p className="eyebrow">Unit Converter</p>
        <h1>
          {capitalize(pairDef.fromName)} to {capitalize(pairDef.toName)} Converter
        </h1>
        <p>
          Convert {pairDef.fromName} ({pairDef.fromAbbr}) to {pairDef.toName} ({pairDef.toAbbr}) instantly. Free,
          accurate, and browser-based — no signup, no ads in your way.
        </p>
        <div className="chip-row">
          <span className="chip-link">Instant result</span>
          <span className="chip-link">Exact formula shown</span>
          <span className="chip-link">Conversion table included</span>
        </div>
      </section>

      <UnitPairConverter
        quantity={pairDef.quantity}
        fromUnit={pairDef.fromUnit}
        toUnit={pairDef.toUnit}
        fromAbbr={pairDef.fromAbbr}
        toAbbr={pairDef.toAbbr}
        fromName={pairDef.fromName}
        toName={pairDef.toName}
        initialValue={pairDef.tableValues[0] ?? 1}
      />

      <section className="content-block">
        <h2>
          How to convert {pairDef.fromName} to {pairDef.toName}
        </h2>
        <p>{formulaText}</p>
        <p>
          Example: {formatPairNumber(exampleValue)} {pairDef.fromAbbr} ={" "}
          {isTemperature ? "" : `${formatPairNumber(exampleValue)} × ${rate} = `}
          {exampleResult} {pairDef.toAbbr}.
        </p>
      </section>

      <section className="content-block">
        <h2>
          {capitalize(pairDef.fromName)} to {pairDef.toName} conversion table
        </h2>
        <div className="table-scroll">
          <table className="table">
            <thead>
              <tr>
                <th scope="col">
                  {capitalize(pairDef.fromName)} ({pairDef.fromAbbr})
                </th>
                <th scope="col">
                  {capitalize(pairDef.toName)} ({pairDef.toAbbr})
                </th>
              </tr>
            </thead>
            <tbody>
              {pairDef.tableValues.map((value) => (
                <tr key={value}>
                  <td>{formatPairNumber(value)}</td>
                  <td>{formatPairNumber(convertPairValue(pairDef, value))}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {reverse ? (
        <section className="content-block info-card">
          <h2>Convert the other way</h2>
          <p>
            Need {pairDef.toAbbr} to {pairDef.fromAbbr} instead? Use the dedicated{" "}
            <a href={`/converters/${reverse.slug}`}>
              {capitalize(reverse.fromName)} to {capitalize(reverse.toName)} converter
            </a>
            .
          </p>
        </section>
      ) : null}

      <section className="faq" aria-label="Frequently asked questions">
        <h2>FAQ</h2>
        {faq.map((item) => (
          <details key={item.question}>
            <summary>{item.question}</summary>
            <p>{item.answer}</p>
          </details>
        ))}
      </section>

      <section className="content-block">
        <h2>More unit converters</h2>
        <div className="chip-row">
          {related.map((entry) => (
            <a key={entry.slug} className="chip-link" href={`/converters/${entry.slug}`}>
              {entry.fromAbbr} to {entry.toAbbr}
            </a>
          ))}
          <a className="chip-link" href="/converters">
            All converters
          </a>
        </div>
      </section>
    </div>
  );
}
