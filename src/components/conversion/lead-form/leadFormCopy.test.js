import { describe, expect, it } from "vitest";
import { leadFormCopy } from "./leadFormCopy";

const shape = (value) =>
  value && typeof value === "object" && !Array.isArray(value)
    ? Object.fromEntries(Object.entries(value).map(([key, child]) => [key, shape(child)]))
    : Array.isArray(value)
      ? value.map(shape)
      : typeof value;

describe("leadFormCopy", () => {
  it("has the same structure in English and Arabic", () => {
    expect(shape(leadFormCopy.ar)).toEqual(shape(leadFormCopy.en));
  });

  it("has no empty strings", () => {
    const empty = [];
    const walk = (value, path) => {
      if (typeof value === "string" && value.trim() === "") empty.push(path);
      else if (value && typeof value === "object") {
        Object.entries(value).forEach(([key, child]) => walk(child, `${path}.${key}`));
      }
    };
    walk(leadFormCopy, "leadFormCopy");
    expect(empty).toEqual([]);
  });

  it("makes no security or delivery promises it cannot keep", () => {
    const text = JSON.stringify(leadFormCopy).toLowerCase();
    expect(text).not.toMatch(/encrypted|never shared|لا يتم مشاركتها|مشفرة/);
  });
});
