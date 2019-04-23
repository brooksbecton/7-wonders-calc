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

  it("increments and decrements", () => {
    cy.visit("/");

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
    cy.visit("/");

    pointTypes.forEach(p => {
      cy.get(getTestId(p)).within(() => {
        cy.get(getTestId("increment")).click();
      });
    });
    
    cy.get(getTestId("totalPoints")).contains(pointTypes.length);
  });
});
