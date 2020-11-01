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

  function navigateToCreate() {
    cy.get('[aria-label="Toggle Menu"]').click();
    cy.get('[aria-label="Create a Table"]').click();
  }

  function navigateToJoin() {
    cy.get('[aria-label="Toggle Menu"]').click();
    cy.get('[aria-label="Join a Table"]').click();
  }

  function createGame() {
    navigateToCreate();
  }

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
      navigateToJoin();
      cy.url().should("include", "join-table");
    });

    it("joins table", () => {
      // Create Table
      navigateToCreate();

      cy.get("label").contains("Name").type("E2E User");
      cy.get('[type="submit"]').click();

      // Get ID
      cy.get("h2")
        .invoke("text")
        .then((tableId) => {
          // Leave Created Table
          cy.get('[aria-label="Toggle Menu"]').click();
          cy.get('[aria-label="Leave Table"]').click();

          navigateToJoin();

          // Join Created table as someone else
          cy.get("label").contains("Game ID").type(tableId);
          cy.get("label").contains("Name").type("New E2E User");
          cy.get('[type="submit"]').click();
        });
    });
  });
  describe("create table", () => {
    it("navigates to create page", () => {
      navigateToCreate();
      cy.url().should("include", "create-table");
    });

    it("create table", () => {
      navigateToCreate();

      cy.get("label").contains("Name").type("E2E User");
      cy.get('[type="submit"]').click();

      cy.url().should("include", "scoreboard");
    });
  });
});
