import { describe, it } from 'mocha';

/* global cy */
const homeUrl = "";
function getTestId(id) {
  return `[data-test-id="${id}"]`;
}
function getByAriaLabel(label) {
  return `[aria-label="${label}"]`;
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
      cy.url().should("include", "science-calculator");
      cy.get(getTestId("science-total")).contains("0");
    });
    it("+7 combos", () => {
      cy.get(getTestId("science-calculator")).click();
      cy.url().should("include", "science-calculator");

      cy.get(getTestId("gear-slider")).first().click();

      cy.get(getTestId("masonry-slider")).first().click();

      cy.get(getTestId("language-slider")).first().click();

      cy.get(getTestId("science-total")).contains("76");
    });
    it("no combos", () => {
      cy.get(getTestId("science-calculator")).click();
      cy.get(getTestId("gear-slider")).first().click();

      cy.get(getTestId("language-slider")).first().click();
      cy.get(getTestId("science-total")).contains("32");
    });
  });
  it.only("resets scores", () => {
    pointTypes.forEach((p) => {
      cy.get(getTestId(p)).within(() => {
        cy.get(getTestId("increment")).click();
      });
    });
    cy.get(getByAriaLabel("Open Menu")).click();
    cy.get(getTestId("reset")).click();


    cy.get(getTestId("totalPoints")).contains(0);

  });
});
