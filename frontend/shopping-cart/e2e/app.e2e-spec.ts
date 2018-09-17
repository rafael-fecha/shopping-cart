import { AppPage } from "./app.po";

import { Constants } from "./constants";

describe("shopping-cart app", () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it("should display transactions list", () => {
    page.navigateTo(Constants.routes.transactions).then(() => {
      expect(
        page.isElementDisplayed(Constants.elementClasses.transaction)
      ).toBeTruthy();
    });
  });

  it("clicking in a transaction should display items list", () => {
    page.click(Constants.elementClasses.transaction).then(() => {
      expect(
        page.isElementDisplayed(Constants.elementClasses.product)
      ).toBeTruthy();
    });
  });

  it("clicking in an item should display editable section", () => {
    page.click(Constants.elementClasses.product).then(() => {
      expect(
        page.isElementDisplayed(Constants.elementClasses.editableButton)
      ).toBeTruthy();
    });
  });

  it("edit description should change text in item description detail", () => {
    page
      .editInputBox(
        Constants.elementClasses.descriptionInput,
        Constants.textSimulations.description
      )
      .then(() => {
        page.click(Constants.elementClasses.saveEditButton).then(() => {
          expect(
            page.getElementText(Constants.elementClasses.productDescription)
          ).toMatch(Constants.textSimulations.description);
        });
      });
  });
});
