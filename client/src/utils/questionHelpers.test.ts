import {
  isChoiceType,
  getOptionsByQuestionType,
  normalizeQuestions,
} from "./questionHelpers";

describe("questionHelpers", () => {
  it("detects choice types correctly", () => {
    expect(isChoiceType("MULTIPLE_CHOICE")).toBe(true);
    expect(isChoiceType("CHECKBOX")).toBe(true);
    expect(isChoiceType("TEXT")).toBe(false);
  });

  it("returns one empty option for choice type", () => {
    expect(getOptionsByQuestionType("MULTIPLE_CHOICE")).toEqual([""]);
  });

  it("returns empty array for non-choice type", () => {
    expect(getOptionsByQuestionType("TEXT")).toEqual([]);
  });

  it("normalizes questions and removes empty options", () => {
    const questions = [
      {
        id: "1",
        label: "  Test question  ",
        type: "MULTIPLE_CHOICE" as const,
        options: ["Yes", " ", "No"],
      },
    ];

    expect(normalizeQuestions(questions)).toEqual([
      {
        label: "Test question",
        type: "MULTIPLE_CHOICE",
        options: ["Yes", "No"],
      },
    ]);
  });
});
