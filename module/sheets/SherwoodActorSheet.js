import { SHERWOOD } from "../../config.js";
import * as Dice from "../dice.js";

export default class SherwoodActorSheet extends ActorSheet {

  static get defaultOptions() {
    return mergeObject(super.defaultOptions, {
      width: 800,
      height: 700,
      classes: ["sherwood", "pc-sheet"],
      tabs: [
        {
          navSelector: ".tabs",
          contentSelector: ".content",
          initial: "desc",
        },
      ],
    });
  }

  /**
   * SPECIFY THE TEMPALTE WHO WILL BE USED
   */
  get template() {
    return `systems/sherwood/templates/sheets/actors/${this.actor.data.type}-sheet.hbs`;
  }

  getData() {
    const data = super.getData();
    data.config = CONFIG.sherwood;
    data.assets = data.items.filter((item) => item.type === "asset");
    data.weapons = data.items.filter((item) => item.type === "weapon");
    data.objects = data.items.filter((item) => item.type === "object");
    this._setComputedValuesData(data);
    return data;
  }

  _setComputedValuesData(sheetData) {
    sheetData.attributes = Object.entries(sheetData.actor.data.data.attributes).map(
      ([key, attribute]) => {
        return {
          name: key,
          label: SHERWOOD.attributes[key],
          value: attribute,
        };
      }
    );

    sheetData.talents = Object.entries(sheetData.actor.data.data.talents).map(
      ([key, talent]) => {
        return {
          name: key,
          label: SHERWOOD.talents[key],
          value: talent,
        };
      }
    );
  }

  activateListeners(html) {
    html.find(".item-create").click(this._onItemCreate.bind(this));
    html.find(".item-search").click(this._onItemSearch.bind(this));
    html.find(".item-delete").click(this._onItemDelete.bind(this));
    html.find(".roll__button").click(this._onTaskCheck.bind(this));
    html.find(".weapon .inline-edit").change(this._onWeaponEdit.bind(this));
    html.find(".asset .inline-edit").change(this._onAssetEdit.bind(this));
    html.find(".object .inline-edit").change(this._onObjectEdit.bind(this));
    html.find(".weapon .inline-edit").change(this._onWeaponEdit.bind(this));
    super.activateListeners(html);
  }

  _onItemCreate(event) {
    event.preventDefault();
    const element = event.currentTarget;

    const itemData = {
      name: game.i18n.localize("sherwood.sheet.newItem"),
      type: element.dataset.type,
    };

    return this.actor.createOwnedItem(itemData);
  }

  _onItemSearch(event) {
    event.preventDefault();
    const element = event.currentTarget;
    const itemId = element.dataset.itemId;
    const item = this.actor.getOwnedItem(itemId);

    item.sheet.render(true);
  }

  _onItemDelete(event) {
    event.preventDefault();
    const element = event.currentTarget;
    const itemId = element.dataset.itemId;

    return this.actor.deleteOwnedItem(itemId);
  }

  _onTaskCheck(event) {
    event.preventDefault();
    Dice.TaskCheck(this.actor.data.data)
  }

  _onWeaponEdit(event) {
    event.preventDefault();
    const element = event.currentTarget;
    const itemId = element.closest(".weapon").dataset.itemId;
    const item = this.actor.getOwnedItem(itemId);
    const field = element.dataset.field;

    return item.update({ [field]: element.value });
  }

  _onObjectEdit(event) {
    event.preventDefault();
    const element = event.currentTarget;
    const itemId = element.closest(".object").dataset.itemId;
    const item = this.actor.getOwnedItem(itemId);
    const field = element.dataset.field;

    return item.update({ [field]: element.value });
  }

  _onAssetEdit(event) {
    event.preventDefault();
    const element = event.currentTarget;
    const itemId = element.closest(".asset").dataset.itemId;
    const item = this.actor.getOwnedItem(itemId);
    const field = element.dataset.field;

    return item.update({ [field]: element.value });
  }
}
