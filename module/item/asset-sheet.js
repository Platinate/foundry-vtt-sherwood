import SherwoodItemSheet from "./item-sheet.js";

export default class SherwoodItemSheetAsset extends SherwoodItemSheet {
  static get defaultOptions() {
    return foundry.utils.mergeObject(super.defaultOptions, {
      width: 800,
      height: 400,
      template: "systems/sherwood/templates/sheets/items/asset-sheet.hbs",
      resizable: false,
      classes: ["sherwood", "asset-sheet"],
    });
  }
}
