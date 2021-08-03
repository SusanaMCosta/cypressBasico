describe("Tickets", () => {
    beforeEach(() => cy.visit("https://ticket-box.s3.eu-central-1.amazonaws.com/index.html"));
    
    it("fills all the text input fields", () => {
        const firtsName = "Susana";
        const lastName = "Moreira";

        cy.get("#first-name").type(firtsName);
        cy.get("#last-name").type(lastName);
        cy.get("#email").type("susana@susana.com");
        cy.get("#requests").type("Vegetariana");
        cy.get("#signature").type(`${firtsName} ${lastName}`);
    });

    it("select two tickets", () => {
        cy.get("#ticket-quantity").select("2");
    });

    it("select 'vip' ticket type", () => {
        cy.get("#vip").check();
    });

    it("selects 'social media' checkbox", () => {
        cy.get("#social-media").check();
    });

    it("selects 'friend' and 'publication' then uncheck 'friend'", () => {
        cy.get("#friend").check();
        cy.get("#publication").check();
        cy.get("#friend").uncheck();
    });

    it("alerts on invalid email", () => {
        cy.get("#email")
            .as("email")
            .type("susana-susana.com");

        cy.get("@email")
            .should("exist");

        cy.get("@email")
            .clear()
            .type("susanamoreira@gmail.com");

        cy.get("#email.invalid").should("not.exist");
    });

    it("has 'TICKETBOX' header's heading", () => {
        cy.get("header h1").should("contain", "TICKETBOX");
    });


    it("fills and reset the form", () => {
        const firtsName = "Susana";
        const lastName = "Moreira";
        const fullName = `${firtsName} ${lastName}`;

        cy.get("#first-name").type(firtsName);
        cy.get("#last-name").type(lastName);
        cy.get("#email").type("susana@susana.com");
        cy.get("#ticket-quantity").select("2");
        cy.get("#vip").check();
        cy.get("#friend").check();
        cy.get("#requests").type("Wine");

        cy.get(".agreement p").should(
            "contain", 
            `I, ${fullName}, wish to buy 2 VIP tickets.`
        );

        cy.get("#agree").click();
        cy.get("#signature").type(fullName);

        cy.get("button[type='submit']")
            .as("submitButton")
            .should("not.be.disabled");

        cy.get("button[type='reset']").click();

        cy.get("@submitButton").should("be.disabled");
    });

    it("fills mandatory  fields using support command", () => {
        const customer = {
            firtsName: "Susa",
            lastName: "Moreira",
            email: "susa@susa.com"
        };

        cy.fillMandatoryFields(customer);

        cy.get("button[type='submit']")
            .as("submitButton")
            .should("not.be.disabled");

        cy.get("#agree").uncheck();

        cy.get("@submitButton").should("be.disabled");

    })
});