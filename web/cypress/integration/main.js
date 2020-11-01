/* global cy */
const homeUrl = "";
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

  it("increments and decrements", () => {
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

  it("sums up the total of each point type", () => {
    pointTypes.forEach((p) => {
      cy.get(getTestId(p)).within(() => {
        cy.get(getTestId("increment")).click();
      });
    });

    cy.get(getTestId("totalPoints")).contains(pointTypes.length);
  });

  it("navigates to point detail", () => {
    pointTypes.forEach((p) => {
      cy.visit(homeUrl);
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

  describe("join table", () => {
    it("navigates to join page", () => {
      cy.get('[aria-label="Toggle Menu"]').click();
      cy.get('[aria-label="Join a Table"]').click();

      cy.url().should("include", "join-table");
    });
  });
});
