import SherwoodItemSheet from "./item-sheet.js";

export default class SherwoodItemSheetWeapon extends SherwoodItemSheet {
  static get defaultOptions() {
    return foundry.utils.mergeObject(super.defaultOptions, {
      width: 400,
      height: 150,
      template: "systems/sherwood/templates/sheets/items/weapon-sheet.hbs",
      resizable: false,
      classes: ["sherwood", "weapon-sheet"],
    });
  }
}
