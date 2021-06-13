export default class SherwoodItemSheet extends ItemSheet {
  static get defaultOptions() {
    return mergeObject(super.defaultOptions, {
      width: 400,
      height: 150,
      classes: ["sherwood", "sheet", "item"],
    });
  }

  /**
   * SPECIFY THE TEMPALTE WHO WILL BE USED
   */
  get template() {
    return `systems/sherwood/templates/sheets/items/${this.item.data.type}-sheet.hbs`;
  }

  getData() {
    const data = super.getData();
    data.config = CONFIG.sherwood;
    return data;
  }
}
