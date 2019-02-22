import { upperFirst } from "./upperFirst";

describe("utils/upperFirst()", () => {
  it("capitilizes the first letter of a string", () => {
    const testStr = "moo";

    expect(upperFirst(testStr)).toEqual("Moo");
  });
});
