/* global cy */
const homeUrl = "/7-wonders-calc/";
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
    "science",
  ];

  beforeEach(() => {
    cy.visit(homeUrl);
    cy.viewport("iphone-6");
    // cy.scrollTo(0, 0);
  });

  it.skip("increments and decrements", () => {
    pointTypes.forEach((p) => {
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

  it.skip("sums up the total of each point type", () => {
    pointTypes.forEach((p) => {
      cy.get(getTestId(p)).within(() => {
        cy.get(getTestId("increment")).click();
      });
    });

    cy.get(getTestId("totalPoints")).contains(pointTypes.length);
  });

  it.skip("navigates to point detail", () => {
    pointTypes.forEach((p) => {
      cy.visit(homeUrl);
      cy.get(getTestId(p)).within(() => {
        cy.get(getTestId("detail")).click();
      });
      cy.get(getTestId(`${p}-detail`)).should("exist");
    });
  });

  it.skip("navigates to science calculator", () => {
    cy.get(getTestId("science-calculator")).click();
    cy.url().should("include", "science-calculator");
  });
  describe("calculates science score", () => {
    it("starts at 0", () => {
      cy.get(getTestId("science-calculator")).click();

      cy.get("p").contains("0");
    });
    it("+7 combos", () => {
      cy.get(getTestId("science-calculator")).click();
      cy.get(`[aria-label="gear point slider"]`)
        .first()
        .focus()
        .type("{rightarrow}")
        .type("{rightarrow}")
        .type("{rightarrow}");

      cy.get(`[aria-label="masonry point slider"]`)
        .first()
        .focus()
        .type("{rightarrow}")
        .type("{rightarrow}");
      cy.get(`[aria-label="language point slider"]`)
        .first()
        .focus()
        .type("{rightarrow}");

      cy.get("p").contains("21");
    });
    it("no combos", () => {
      cy.get(getTestId("science-calculator")).click();
      cy.get(`[aria-label="gear point slider"]`)
        .first()
        .focus()
        .type("{rightarrow}")
        .type("{rightarrow}")
        .type("{rightarrow}");

      cy.get(`[aria-label="language point slider"]`)
        .first()
        .focus()
        .type("{rightarrow}")
        .type("{rightarrow}");

      cy.get("p").contains("13");
    });
  });
});
