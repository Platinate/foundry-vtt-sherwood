import { SherwoodActorSheet } from "./actor-sheet.js";

export default class SherwoodActorSheetPC extends SherwoodActorSheet {

  static get defaultOptions() {
    return foundry.utils.mergeObject(super.defaultOptions, {
      width: 800,
      height: 700,
      template: "systems/sherwood/templates/sheets/actors/pc-sheet.hbs",
      resizable: false,
      classes: ["sherwood", "pc-sheet"],
      tabs: [
        {
          navSelector: ".tabs",
          contentSelector: ".content",
          initial: "stats",
        },
      ],
    });
  }

  
}
