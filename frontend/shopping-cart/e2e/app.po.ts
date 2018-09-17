import { browser, by, element, protractor } from "protractor";

const EC = protractor.ExpectedConditions;

export class AppPage {
  navigateTo(url) {
    return browser.get(url);
  }

  click(className): any {
    browser.wait(EC.visibilityOf(element.all(by.className(className)).first()));
    return element
      .all(by.className(className))
      .first()
      .click();
  }

  editInputBox(className, text) {
    const $elementToEdit = element.all(by.className(className)).first();
    return $elementToEdit.sendKeys(text);
  }

  getElementText(elementClass) {
    return element
      .all(by.className(elementClass))
      .first()
      .getText()
      .then(text => {
        return text;
      });
  }

  isElementDisplayed(className): any {
    browser.wait(EC.visibilityOf(element.all(by.className(className)).first()));
    return element
      .all(by.className(className))
      .first()
      .isDisplayed()
      .then(displayed => {
        return displayed;
      });
  }
}
