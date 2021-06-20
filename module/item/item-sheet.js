
/**
* Extend the basic ItemSheet with some very simple modifications
* @extends {ItemSheet}
*/
export default class SherwoodItemSheet extends ItemSheet {

    /** @override */
    static get defaultOptions() {
      return foundry.utils.mergeObject(super.defaultOptions, {
        classes: ["sherwood", "sheet", "item", "item-sheet"],
        template: "systems/sherwood/templates/item-sheet.html",
        width: 550,
        height: 630,
        resizable: false,
        tabs: [{navSelector: ".sheet-tabs", contentSelector: ".sheet-body", initial: "description"}],
      });
    }
  
    /* -------------------------------------------- */
  
    /** @override */
    getData() {
      const superData = super.getData();
      const data = superData.data;
      data.config = CONFIG.sherwood;
      data.item = superData.item;
      data.data.isGM = game.user.isGM;
      data.dtypes = ["String", "Number", "Boolean"];
      return data;
    }
  
    /** @override */
    activateListeners(html) {
      super.activateListeners(html);
  
      // Everything below here is only needed if the sheet is editable
      if (!this.options.editable) return;
    }
  }
  