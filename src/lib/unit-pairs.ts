import { convertUnitValue, getUnitsForQuantity } from "@/lib/converters";
import type { UnitQuantity } from "@/lib/types";

export interface UnitPairDefinition {
  /** URL slug under /converters/, e.g. "kg-to-lbs" */
  slug: string;
  quantity: UnitQuantity;
  /** unit `value` in the converter engine */
  fromUnit: string;
  toUnit: string;
  /** Short everyday names used in copy, e.g. "kilograms" / "pounds" */
  fromName: string;
  toName: string;
  /** Abbreviations for headings and tables, e.g. "kg" / "lb" */
  fromAbbr: string;
  toAbbr: string;
  /** Extra search phrasings worked into the description */
  keywords: string[];
  /** Sample values rendered in the conversion table */
  tableValues: number[];
}

const COMMON = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 15, 20, 25, 30, 40, 50, 75, 100, 250, 500];
const SMALL = [0.5, 1, 2, 3, 4, 5, 8, 10, 12, 15, 20, 25, 30, 40, 50, 60, 75, 100, 150, 200];
const TEMPS = [-40, -30, -20, -10, 0, 5, 10, 15, 20, 25, 30, 35, 37, 40, 50, 60, 80, 100, 180, 200];
const BIG = [1, 2, 4, 5, 8, 10, 16, 20, 25, 32, 50, 64, 100, 128, 200, 256, 500, 512, 750, 1000];

type PairSeed = Omit<UnitPairDefinition, "tableValues"> & { tableValues?: number[] };

function pair(seed: PairSeed): UnitPairDefinition {
  return { tableValues: COMMON, ...seed };
}

const UNIT_PAIRS: UnitPairDefinition[] = [
  // Weight
  pair({ slug: "kg-to-lbs", quantity: "weight", fromUnit: "kilogram", toUnit: "pound", fromName: "kilograms", toName: "pounds", fromAbbr: "kg", toAbbr: "lb", keywords: ["kilograms to pounds", "kilos to pounds", "kg to pounds"] }),
  pair({ slug: "lbs-to-kg", quantity: "weight", fromUnit: "pound", toUnit: "kilogram", fromName: "pounds", toName: "kilograms", fromAbbr: "lb", toAbbr: "kg", keywords: ["pounds to kilograms", "pounds to kilos", "lb to kg"] }),
  pair({ slug: "grams-to-ounces", quantity: "weight", fromUnit: "gram", toUnit: "ounce", fromName: "grams", toName: "ounces", fromAbbr: "g", toAbbr: "oz", keywords: ["g to oz", "gram to ounce"], tableValues: SMALL }),
  pair({ slug: "ounces-to-grams", quantity: "weight", fromUnit: "ounce", toUnit: "gram", fromName: "ounces", toName: "grams", fromAbbr: "oz", toAbbr: "g", keywords: ["oz to g", "ounce to gram"], tableValues: SMALL }),
  pair({ slug: "ounces-to-pounds", quantity: "weight", fromUnit: "ounce", toUnit: "pound", fromName: "ounces", toName: "pounds", fromAbbr: "oz", toAbbr: "lb", keywords: ["oz to lb", "ounce to pound"], tableValues: SMALL }),
  pair({ slug: "pounds-to-ounces", quantity: "weight", fromUnit: "pound", toUnit: "ounce", fromName: "pounds", toName: "ounces", fromAbbr: "lb", toAbbr: "oz", keywords: ["lb to oz", "pound to ounce"], tableValues: SMALL }),
  pair({ slug: "stone-to-kg", quantity: "weight", fromUnit: "stone", toUnit: "kilogram", fromName: "stone", toName: "kilograms", fromAbbr: "st", toAbbr: "kg", keywords: ["stone to kilograms", "st to kg", "body weight stone to kg"], tableValues: SMALL }),
  pair({ slug: "kg-to-stone", quantity: "weight", fromUnit: "kilogram", toUnit: "stone", fromName: "kilograms", toName: "stone", fromAbbr: "kg", toAbbr: "st", keywords: ["kilograms to stone", "kg to st", "body weight kg to stone"] }),
  pair({ slug: "stone-to-pounds", quantity: "weight", fromUnit: "stone", toUnit: "pound", fromName: "stone", toName: "pounds", fromAbbr: "st", toAbbr: "lb", keywords: ["stone to lbs", "st to lb"], tableValues: SMALL }),

  // Length
  pair({ slug: "cm-to-inches", quantity: "length", fromUnit: "centimeter", toUnit: "inch", fromName: "centimeters", toName: "inches", fromAbbr: "cm", toAbbr: "in", keywords: ["centimeters to inches", "cm to in"] }),
  pair({ slug: "inches-to-cm", quantity: "length", fromUnit: "inch", toUnit: "centimeter", fromName: "inches", toName: "centimeters", fromAbbr: "in", toAbbr: "cm", keywords: ["inches to centimeters", "in to cm"] }),
  pair({ slug: "mm-to-inches", quantity: "length", fromUnit: "millimeter", toUnit: "inch", fromName: "millimeters", toName: "inches", fromAbbr: "mm", toAbbr: "in", keywords: ["millimeters to inches", "mm to in"], tableValues: SMALL }),
  pair({ slug: "inches-to-mm", quantity: "length", fromUnit: "inch", toUnit: "millimeter", fromName: "inches", toName: "millimeters", fromAbbr: "in", toAbbr: "mm", keywords: ["inches to millimeters", "in to mm"], tableValues: SMALL }),
  pair({ slug: "meters-to-feet", quantity: "length", fromUnit: "meter", toUnit: "foot", fromName: "meters", toName: "feet", fromAbbr: "m", toAbbr: "ft", keywords: ["m to ft", "metres to feet"] }),
  pair({ slug: "feet-to-meters", quantity: "length", fromUnit: "foot", toUnit: "meter", fromName: "feet", toName: "meters", fromAbbr: "ft", toAbbr: "m", keywords: ["ft to m", "feet to metres"] }),
  pair({ slug: "km-to-miles", quantity: "length", fromUnit: "kilometer", toUnit: "mile", fromName: "kilometers", toName: "miles", fromAbbr: "km", toAbbr: "mi", keywords: ["kilometers to miles", "km to mi"] }),
  pair({ slug: "miles-to-km", quantity: "length", fromUnit: "mile", toUnit: "kilometer", fromName: "miles", toName: "kilometers", fromAbbr: "mi", toAbbr: "km", keywords: ["miles to kilometers", "mi to km"] }),
  pair({ slug: "meters-to-yards", quantity: "length", fromUnit: "meter", toUnit: "yard", fromName: "meters", toName: "yards", fromAbbr: "m", toAbbr: "yd", keywords: ["m to yd", "metres to yards"] }),
  pair({ slug: "yards-to-meters", quantity: "length", fromUnit: "yard", toUnit: "meter", fromName: "yards", toName: "meters", fromAbbr: "yd", toAbbr: "m", keywords: ["yd to m", "yards to metres"] }),
  pair({ slug: "feet-to-cm", quantity: "length", fromUnit: "foot", toUnit: "centimeter", fromName: "feet", toName: "centimeters", fromAbbr: "ft", toAbbr: "cm", keywords: ["feet to centimeters", "height feet to cm"], tableValues: SMALL }),
  pair({ slug: "cm-to-feet", quantity: "length", fromUnit: "centimeter", toUnit: "foot", fromName: "centimeters", toName: "feet", fromAbbr: "cm", toAbbr: "ft", keywords: ["centimeters to feet", "height cm to feet"] }),
  pair({ slug: "feet-to-inches", quantity: "length", fromUnit: "foot", toUnit: "inch", fromName: "feet", toName: "inches", fromAbbr: "ft", toAbbr: "in", keywords: ["ft to in", "foot to inches"], tableValues: SMALL }),
  pair({ slug: "inches-to-feet", quantity: "length", fromUnit: "inch", toUnit: "foot", fromName: "inches", toName: "feet", fromAbbr: "in", toAbbr: "ft", keywords: ["in to ft", "inch to feet"] }),

  // Temperature
  pair({ slug: "celsius-to-fahrenheit", quantity: "temperature", fromUnit: "c", toUnit: "f", fromName: "Celsius", toName: "Fahrenheit", fromAbbr: "°C", toAbbr: "°F", keywords: ["c to f", "centigrade to fahrenheit", "degrees celsius to fahrenheit"], tableValues: TEMPS }),
  pair({ slug: "fahrenheit-to-celsius", quantity: "temperature", fromUnit: "f", toUnit: "c", fromName: "Fahrenheit", toName: "Celsius", fromAbbr: "°F", toAbbr: "°C", keywords: ["f to c", "fahrenheit to centigrade", "degrees fahrenheit to celsius"], tableValues: TEMPS }),

  // Volume
  pair({ slug: "liters-to-gallons", quantity: "volume", fromUnit: "liter", toUnit: "gallon-us", fromName: "liters", toName: "US gallons", fromAbbr: "L", toAbbr: "gal", keywords: ["l to gal", "litres to gallons"] }),
  pair({ slug: "gallons-to-liters", quantity: "volume", fromUnit: "gallon-us", toUnit: "liter", fromName: "US gallons", toName: "liters", fromAbbr: "gal", toAbbr: "L", keywords: ["gal to l", "gallons to litres"] }),
  pair({ slug: "ml-to-oz", quantity: "volume", fromUnit: "milliliter", toUnit: "fluid-ounce-us", fromName: "milliliters", toName: "US fluid ounces", fromAbbr: "mL", toAbbr: "fl oz", keywords: ["milliliters to ounces", "ml to fluid ounces"], tableValues: SMALL }),
  pair({ slug: "oz-to-ml", quantity: "volume", fromUnit: "fluid-ounce-us", toUnit: "milliliter", fromName: "US fluid ounces", toName: "milliliters", fromAbbr: "fl oz", toAbbr: "mL", keywords: ["ounces to milliliters", "fluid ounces to ml"], tableValues: SMALL }),
  pair({ slug: "cups-to-ml", quantity: "volume", fromUnit: "cup-us", toUnit: "milliliter", fromName: "US cups", toName: "milliliters", fromAbbr: "cup", toAbbr: "mL", keywords: ["cups to milliliters", "cup to ml"], tableValues: SMALL }),
  pair({ slug: "ml-to-cups", quantity: "volume", fromUnit: "milliliter", toUnit: "cup-us", fromName: "milliliters", toName: "US cups", fromAbbr: "mL", toAbbr: "cup", keywords: ["milliliters to cups", "ml to cup"], tableValues: SMALL }),
  pair({ slug: "teaspoons-to-ml", quantity: "volume", fromUnit: "teaspoon-us", toUnit: "milliliter", fromName: "US teaspoons", toName: "milliliters", fromAbbr: "tsp", toAbbr: "mL", keywords: ["tsp to ml", "teaspoon to milliliters"], tableValues: SMALL }),
  pair({ slug: "tablespoons-to-ml", quantity: "volume", fromUnit: "tablespoon-us", toUnit: "milliliter", fromName: "US tablespoons", toName: "milliliters", fromAbbr: "tbsp", toAbbr: "mL", keywords: ["tbsp to ml", "tablespoon to milliliters"], tableValues: SMALL }),
  pair({ slug: "tablespoons-to-teaspoons", quantity: "volume", fromUnit: "tablespoon-us", toUnit: "teaspoon-us", fromName: "US tablespoons", toName: "US teaspoons", fromAbbr: "tbsp", toAbbr: "tsp", keywords: ["tbsp to tsp", "tablespoon to teaspoon"], tableValues: SMALL }),
  pair({ slug: "cups-to-oz", quantity: "volume", fromUnit: "cup-us", toUnit: "fluid-ounce-us", fromName: "US cups", toName: "US fluid ounces", fromAbbr: "cup", toAbbr: "fl oz", keywords: ["cups to ounces", "cup to fl oz"], tableValues: SMALL }),
  pair({ slug: "oz-to-cups", quantity: "volume", fromUnit: "fluid-ounce-us", toUnit: "cup-us", fromName: "US fluid ounces", toName: "US cups", fromAbbr: "fl oz", toAbbr: "cup", keywords: ["ounces to cups", "fl oz to cup"], tableValues: SMALL }),
  pair({ slug: "liters-to-ml", quantity: "volume", fromUnit: "liter", toUnit: "milliliter", fromName: "liters", toName: "milliliters", fromAbbr: "L", toAbbr: "mL", keywords: ["litres to ml", "l to ml"], tableValues: SMALL }),
  pair({ slug: "ml-to-liters", quantity: "volume", fromUnit: "milliliter", toUnit: "liter", fromName: "milliliters", toName: "liters", fromAbbr: "mL", toAbbr: "L", keywords: ["ml to litres", "ml to l"], tableValues: BIG }),

  // Speed
  pair({ slug: "kph-to-mph", quantity: "speed", fromUnit: "kph", toUnit: "mph", fromName: "kilometers per hour", toName: "miles per hour", fromAbbr: "km/h", toAbbr: "mph", keywords: ["kmh to mph", "kph to mph"] }),
  pair({ slug: "mph-to-kph", quantity: "speed", fromUnit: "mph", toUnit: "kph", fromName: "miles per hour", toName: "kilometers per hour", fromAbbr: "mph", toAbbr: "km/h", keywords: ["mph to kmh", "mph to km/h"] }),
  pair({ slug: "knots-to-mph", quantity: "speed", fromUnit: "knot", toUnit: "mph", fromName: "knots", toName: "miles per hour", fromAbbr: "kn", toAbbr: "mph", keywords: ["knot to mph", "nautical speed to mph"] }),
  pair({ slug: "mph-to-knots", quantity: "speed", fromUnit: "mph", toUnit: "knot", fromName: "miles per hour", toName: "knots", fromAbbr: "mph", toAbbr: "kn", keywords: ["mph to knot", "mph to nautical"] }),

  // Temperature (Kelvin)
  pair({ slug: "celsius-to-kelvin", quantity: "temperature", fromUnit: "c", toUnit: "k", fromName: "Celsius", toName: "Kelvin", fromAbbr: "°C", toAbbr: "K", keywords: ["c to k", "degrees celsius to kelvin"], tableValues: TEMPS }),
  pair({ slug: "kelvin-to-celsius", quantity: "temperature", fromUnit: "k", toUnit: "c", fromName: "Kelvin", toName: "Celsius", fromAbbr: "K", toAbbr: "°C", keywords: ["k to c", "kelvin to degrees celsius"], tableValues: [0, 100, 173, 200, 233, 253, 263, 273, 283, 293, 298, 303, 310, 313, 323, 333, 353, 373, 473, 573] }),

  // Time
  pair({ slug: "hours-to-minutes", quantity: "time", fromUnit: "hour", toUnit: "minute", fromName: "hours", toName: "minutes", fromAbbr: "hr", toAbbr: "min", keywords: ["hr to min", "hours in minutes"], tableValues: SMALL }),
  pair({ slug: "minutes-to-hours", quantity: "time", fromUnit: "minute", toUnit: "hour", fromName: "minutes", toName: "hours", fromAbbr: "min", toAbbr: "hr", keywords: ["min to hr", "minutes in hours"], tableValues: BIG }),
  pair({ slug: "days-to-hours", quantity: "time", fromUnit: "day", toUnit: "hour", fromName: "days", toName: "hours", fromAbbr: "d", toAbbr: "hr", keywords: ["days in hours", "day to hr"], tableValues: SMALL }),

  // Area
  pair({ slug: "sqft-to-sqm", quantity: "area", fromUnit: "sqft", toUnit: "sqm", fromName: "square feet", toName: "square meters", fromAbbr: "sq ft", toAbbr: "m²", keywords: ["square feet to square meters", "ft2 to m2"] }),
  pair({ slug: "sqm-to-sqft", quantity: "area", fromUnit: "sqm", toUnit: "sqft", fromName: "square meters", toName: "square feet", fromAbbr: "m²", toAbbr: "sq ft", keywords: ["square meters to square feet", "m2 to ft2"] }),
  pair({ slug: "acres-to-hectares", quantity: "area", fromUnit: "acre", toUnit: "hectare", fromName: "acres", toName: "hectares", fromAbbr: "ac", toAbbr: "ha", keywords: ["acre to hectare", "acres to ha"] }),
  pair({ slug: "hectares-to-acres", quantity: "area", fromUnit: "hectare", toUnit: "acre", fromName: "hectares", toName: "acres", fromAbbr: "ha", toAbbr: "ac", keywords: ["hectare to acre", "ha to acres"] }),
  pair({ slug: "acres-to-square-feet", quantity: "area", fromUnit: "acre", toUnit: "sqft", fromName: "acres", toName: "square feet", fromAbbr: "ac", toAbbr: "sq ft", keywords: ["acre to sq ft", "acres to sqft"] }),

  // Data storage
  pair({ slug: "gb-to-mb", quantity: "data-storage", fromUnit: "gigabyte", toUnit: "megabyte", fromName: "gigabytes", toName: "megabytes", fromAbbr: "GB", toAbbr: "MB", keywords: ["gigabytes to megabytes", "gb to mb"], tableValues: BIG }),
  pair({ slug: "mb-to-gb", quantity: "data-storage", fromUnit: "megabyte", toUnit: "gigabyte", fromName: "megabytes", toName: "gigabytes", fromAbbr: "MB", toAbbr: "GB", keywords: ["megabytes to gigabytes", "mb to gb"], tableValues: BIG }),
  pair({ slug: "tb-to-gb", quantity: "data-storage", fromUnit: "terabyte", toUnit: "gigabyte", fromName: "terabytes", toName: "gigabytes", fromAbbr: "TB", toAbbr: "GB", keywords: ["terabytes to gigabytes", "tb to gb"], tableValues: BIG }),

  // Pressure
  pair({ slug: "bar-to-psi", quantity: "pressure", fromUnit: "bar", toUnit: "psi", fromName: "bar", toName: "pounds per square inch", fromAbbr: "bar", toAbbr: "psi", keywords: ["bar to psi", "tyre pressure bar to psi"], tableValues: SMALL }),
  pair({ slug: "psi-to-bar", quantity: "pressure", fromUnit: "psi", toUnit: "bar", fromName: "pounds per square inch", toName: "bar", fromAbbr: "psi", toAbbr: "bar", keywords: ["psi to bar", "tire pressure psi to bar"], tableValues: SMALL }),

  // Energy
  pair({ slug: "calories-to-kilojoules", quantity: "energy", fromUnit: "calorie", toUnit: "kilojoule", fromName: "calories", toName: "kilojoules", fromAbbr: "cal", toAbbr: "kJ", keywords: ["cal to kj", "calories to kj"] }),
  pair({ slug: "kilojoules-to-calories", quantity: "energy", fromUnit: "kilojoule", toUnit: "calorie", fromName: "kilojoules", toName: "calories", fromAbbr: "kJ", toAbbr: "cal", keywords: ["kj to cal", "kj to calories"] }),
];

const pairLookup = new Map(UNIT_PAIRS.map((entry) => [entry.slug, entry]));

export function getAllUnitPairs(): UnitPairDefinition[] {
  return [...UNIT_PAIRS];
}

export function getUnitPairBySlug(slug: string): UnitPairDefinition | null {
  return pairLookup.get(slug) ?? null;
}

export function getReverseUnitPair(pairDef: UnitPairDefinition): UnitPairDefinition | null {
  return (
    UNIT_PAIRS.find(
      (entry) => entry.fromUnit === pairDef.toUnit && entry.toUnit === pairDef.fromUnit && entry.quantity === pairDef.quantity,
    ) ?? null
  );
}

export function getRelatedUnitPairs(pairDef: UnitPairDefinition, limit = 6): UnitPairDefinition[] {
  const sameQuantity = UNIT_PAIRS.filter((entry) => entry.quantity === pairDef.quantity && entry.slug !== pairDef.slug);
  const others = UNIT_PAIRS.filter((entry) => entry.quantity !== pairDef.quantity);
  return [...sameQuantity, ...others].slice(0, limit);
}

export function convertPairValue(pairDef: UnitPairDefinition, value: number): number {
  return convertUnitValue(pairDef.quantity, value, pairDef.fromUnit, pairDef.toUnit);
}

/** Round to 4 significant decimals and trim trailing zeros. */
export function formatPairNumber(value: number): string {
  if (!Number.isFinite(value)) return "-";
  const abs = Math.abs(value);
  const decimals = abs >= 1000 ? 2 : abs >= 1 ? 4 : 6;
  const fixed = value.toFixed(decimals);
  return fixed.replace(/\.?0+$/, "") || "0";
}

/** One-unit conversion, e.g. what 1 kg is in lb — used in formula copy. */
export function getUnitRate(pairDef: UnitPairDefinition): string {
  return formatPairNumber(convertPairValue(pairDef, 1));
}

export function buildPairFormulaText(pairDef: UnitPairDefinition): string {
  if (pairDef.quantity === "temperature") {
    if (pairDef.fromUnit === "c" && pairDef.toUnit === "f") {
      return "°F = (°C × 9/5) + 32. Multiply the Celsius temperature by 9, divide by 5, then add 32.";
    }
    if (pairDef.fromUnit === "f" && pairDef.toUnit === "c") {
      return "°C = (°F − 32) × 5/9. Subtract 32 from the Fahrenheit temperature, then multiply by 5 and divide by 9.";
    }
    if (pairDef.fromUnit === "c" && pairDef.toUnit === "k") {
      return "K = °C + 273.15. Add 273.15 to the Celsius temperature to get Kelvin.";
    }
    if (pairDef.fromUnit === "k" && pairDef.toUnit === "c") {
      return "°C = K − 273.15. Subtract 273.15 from the Kelvin temperature to get Celsius.";
    }
  }
  const rate = getUnitRate(pairDef);
  return `1 ${pairDef.fromAbbr} = ${rate} ${pairDef.toAbbr}. Multiply the ${pairDef.fromName} value by ${rate} to get ${pairDef.toName}.`;
}

export function buildPairTitle(pairDef: UnitPairDefinition): string {
  const from = capitalize(pairDef.fromName);
  return `${from} to ${capitalize(pairDef.toName)} Converter (${pairDef.fromAbbr} to ${pairDef.toAbbr})`;
}

export function buildPairDescription(pairDef: UnitPairDefinition): string {
  const rate = getUnitRate(pairDef);
  const example =
    pairDef.quantity === "temperature"
      ? `Includes the exact formula and a quick reference table.`
      : `1 ${pairDef.fromAbbr} equals ${rate} ${pairDef.toAbbr}. Includes the exact formula and a conversion table.`;
  return `Convert ${pairDef.fromName} to ${pairDef.toName} instantly, free and without signup. ${example}`;
}

export function buildPairFaq(pairDef: UnitPairDefinition): Array<{ question: string; answer: string }> {
  const rate = getUnitRate(pairDef);
  const sample = pairDef.tableValues[9] ?? 10;
  const sampleResult = formatPairNumber(convertPairValue(pairDef, sample));
  const reverse = getReverseUnitPair(pairDef);

  const faq = [
    {
      question: `How do I convert ${pairDef.fromName} to ${pairDef.toName}?`,
      answer: buildPairFormulaText(pairDef),
    },
    {
      question: `What is ${formatPairNumber(sample)} ${pairDef.fromAbbr} in ${pairDef.toAbbr}?`,
      answer: `${formatPairNumber(sample)} ${pairDef.fromName} equals ${sampleResult} ${pairDef.toName}. Type any value into the converter above for an instant exact result.`,
    },
    {
      question: `Is this ${pairDef.fromAbbr} to ${pairDef.toAbbr} converter free?`,
      answer: "Yes. Every Utiliora tool is free, open source, works in your browser, and never asks you to sign up.",
    },
  ];

  if (pairDef.quantity !== "temperature") {
    faq.splice(1, 0, {
      question: `How many ${pairDef.toName} are in one ${pairDef.fromName.replace(/s$/, "")}?`,
      answer: `One ${pairDef.fromName.replace(/s$/, "")} (${pairDef.fromAbbr}) equals ${rate} ${pairDef.toName} (${pairDef.toAbbr}).`,
    });
  }

  if (reverse) {
    faq.push({
      question: `Can I convert the other way, from ${pairDef.toAbbr} to ${pairDef.fromAbbr}?`,
      answer: `Yes — use the ${capitalize(pairDef.toName)} to ${capitalize(pairDef.fromName)} converter at /converters/${reverse.slug}, or press the swap button in the converter above.`,
    });
  }

  return faq;
}

export function getUnitLabel(quantity: UnitQuantity, unitValue: string): string {
  return getUnitsForQuantity(quantity).find((unit) => unit.value === unitValue)?.label ?? unitValue;
}

function capitalize(text: string): string {
  return text.charAt(0).toUpperCase() + text.slice(1);
}
