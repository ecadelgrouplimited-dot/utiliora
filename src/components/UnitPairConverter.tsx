"use client";

import { useMemo, useState } from "react";
import { convertUnitValue } from "@/lib/converters";
import type { UnitQuantity } from "@/lib/types";

interface UnitPairConverterProps {
  quantity: UnitQuantity;
  fromUnit: string;
  toUnit: string;
  fromAbbr: string;
  toAbbr: string;
  fromName: string;
  toName: string;
  initialValue: number;
}

function formatResult(value: number): string {
  if (!Number.isFinite(value)) return "-";
  const abs = Math.abs(value);
  const decimals = abs >= 1000 ? 2 : abs >= 1 ? 4 : 6;
  return value.toFixed(decimals).replace(/\.?0+$/, "") || "0";
}

export function UnitPairConverter({
  quantity,
  fromUnit,
  toUnit,
  fromAbbr,
  toAbbr,
  fromName,
  toName,
  initialValue,
}: UnitPairConverterProps) {
  const [rawValue, setRawValue] = useState(String(initialValue));
  const [swapped, setSwapped] = useState(false);

  const activeFrom = swapped ? toUnit : fromUnit;
  const activeTo = swapped ? fromUnit : toUnit;
  const activeFromAbbr = swapped ? toAbbr : fromAbbr;
  const activeToAbbr = swapped ? fromAbbr : toAbbr;
  const activeFromName = swapped ? toName : fromName;
  const activeToName = swapped ? fromName : toName;

  const result = useMemo(() => {
    const parsed = Number.parseFloat(rawValue);
    if (!Number.isFinite(parsed)) return null;
    return convertUnitValue(quantity, parsed, activeFrom, activeTo);
  }, [rawValue, quantity, activeFrom, activeTo]);

  return (
    <section className="content-block info-card" aria-label={`${activeFromName} to ${activeToName} converter`}>
      <div className="field-grid">
        <label className="field-label" htmlFor="pair-converter-input">
          {activeFromName.charAt(0).toUpperCase() + activeFromName.slice(1)} ({activeFromAbbr})
        </label>
        <input
          id="pair-converter-input"
          className="text-input"
          type="number"
          inputMode="decimal"
          value={rawValue}
          onChange={(event) => setRawValue(event.target.value)}
          aria-describedby="pair-converter-result"
        />
      </div>
      <div className="button-row">
        <button className="action-button secondary" type="button" onClick={() => setSwapped((current) => !current)}>
          Swap ({activeToAbbr} to {activeFromAbbr})
        </button>
      </div>
      <div id="pair-converter-result" className="result-list" aria-live="polite">
        <div className="result-row">
          <span>Result</span>
          <strong>
            {result === null
              ? "Enter a number to convert."
              : `${rawValue || 0} ${activeFromAbbr} = ${formatResult(result)} ${activeToAbbr}`}
          </strong>
        </div>
      </div>
    </section>
  );
}
