/* global cy */

function getTestId(id) {
  return `[data-test-id="${id}"]`;
}
describe("App", () => {
  const pointTypes = [
    "military",
    "treasury",
    "wonders",
    "civilian",
    "commerce",
    "guilds",
    "science"
  ];

  beforeEach(() => {
    cy.visit("/");
    cy.viewport("iphone-6");
    cy.scrollTo(0, 0);
  });

  it("increments and decrements", () => {
    pointTypes.forEach(p => {
      cy.get(getTestId(p)).within(() => {
        cy.get(getTestId("increment")).click();
      });
      cy.get(getTestId("totalPoints")).contains(1);
      cy.get(getTestId(p)).within(() => {
        cy.get(getTestId("decrement")).click();
      });
      cy.get(getTestId("totalPoints")).contains(0);
    });
  });

  it("sums up the total of each point type", () => {
    pointTypes.forEach(p => {
      cy.get(getTestId(p)).within(() => {
        cy.get(getTestId("increment")).click();
      });
    });

    cy.get(getTestId("totalPoints")).contains(pointTypes.length);
  });

  it("navigates to point detail", () => {
    pointTypes.forEach(p => {
      cy.visit("/");
      cy.get(getTestId(p)).within(() => {
        cy.get(getTestId("detail")).click();
      });
      cy.get(getTestId(`${p}-detail`)).should("exist");
    });
  });

  it("navigates to science calculator", () => {
    cy.get(getTestId("science-calculator")).click();
    cy.url().should("include", "science-calculator");
  });
});
