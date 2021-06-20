import SherwoodItemSheet from "./item-sheet.js";

export default class SherwoodItemSheetObject extends SherwoodItemSheet {
  static get defaultOptions() {
    return foundry.utils.mergeObject(super.defaultOptions, {
      width: 800,
      height: 400,
      template: "systems/sherwood/templates/sheets/items/object-sheet.hbs",
      resizable: false,
      classes: ["sherwood", "object-sheet"],
    });
  }
}
