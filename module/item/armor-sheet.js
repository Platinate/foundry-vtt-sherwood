import SherwoodItemSheet from "./item-sheet.js";

export default class SherwoodItemSheetArmor extends SherwoodItemSheet {
  static get defaultOptions() {
    return foundry.utils.mergeObject(super.defaultOptions, {
      width: 400,
      height: 150,
      template: "systems/sherwood/templates/sheets/items/armor-sheet.hbs",
      resizable: false,
      classes: ["sherwood", "armor-sheet"],
    });
  }
}
