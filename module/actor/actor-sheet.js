import { SHERWOOD } from "../../config.js";
import * as Dice from "../dice.js";

export class SherwoodActorSheet extends ActorSheet {
  /** @override */
  getData() {
    const superData = super.getData();
    const data = superData.data;
    data.config = CONFIG.sherwood;
    data.data.isGM = game.user.isGM;
    data.actor = superData.actor;
    data.items = superData.items;
    data.owner = superData.owner;
    data.options = superData.options;
    data.effects = superData.effects;
    data.config = CONFIG.sherwood;
    data.assets = data.items.filter((item) => item.type === "asset");
    data.weapons = data.items.filter((item) => item.type === "weapon");
    data.armors = data.items.filter((item) => item.type === "armor");
    data.objects = data.items.filter((item) => item.type === "object");
    data.dtypes = ["String", "Number", "Boolean"];
    this._setComputedValuesData(data);
    return data;
  }

  _setComputedValuesData(sheetData) {
    sheetData.attributes = Object.entries(
      sheetData.actor.data.data.attributes
    ).map(([key, attribute]) => {
      return {
        name: key,
        label: SHERWOOD.attributes[key],
        value: attribute,
      };
    });

    sheetData.talents = Object.entries(sheetData.actor.data.data.talents).map(
      ([key, talent]) => {
        return {
          name: key,
          label: SHERWOOD.talents[key],
          value: talent,
        };
      }
    );
    sheetData.totalBluntArmor = sheetData.armors
      .map((armor) => armor.data.blunt)
      .reduce((acc, curr) => acc + curr, 0);
    sheetData.totalSlashArmor = sheetData.armors
      .map((armor) => armor.data.slash)
      .reduce((acc, curr) => acc + curr, 0);
  }

  /**
   * Event Listeners
   */

  /** @override */
  activateListeners(html) {
    super.activateListeners(html);
    html.find(".item-create").click(this._onItemCreate.bind(this));
    html.find(".item-search").click(this._onItemSearch.bind(this));
    html.find(".item-delete").click(this._onItemDelete.bind(this));
    html.find(".roll__button").click(this._onTaskCheck.bind(this));
    html.find(".weapon .inline-edit").change(this._onWeaponEdit.bind(this));
    html.find(".asset .inline-edit").change(this._onAssetEdit.bind(this));
    html.find(".object .inline-edit").change(this._onObjectEdit.bind(this));
    html.find(".armor .inline-edit").change(this._onArmorEdit.bind(this));
    html.find(".item-description").click(this._onDescriptionClick.bind(this));
  }

  _onDescriptionClick(clickEvent) {
    const shownItem = $(clickEvent.currentTarget).parents(".item");
    const item = duplicate(this.actor.items.get(shownItem.data("itemId")));
    if (event.ctrlKey || event.metaKey) {
      let message = "";
      let brackets = "";
      let description =
        "<hr style='margin:3px 0;'><img class='description-image-chat' src='" +
        item.img +
        "' width='50' height='50'/>" +
        item.data.description;
      let name = item.name;
      message =
        "<b>" +
        item.type.capitalize() +
        ": " +
        name +
        "</b>" +
        brackets +
        description;
      ChatMessage.create({
        speaker: ChatMessage.getSpeaker(),
        content: message,
      });
    } else {
      if (item.data.showDescription === true) {
        item.data.showDescription = false;
      } else {
        item.data.showDescription = true;
      }
      this.actor.updateEmbeddedDocuments("Item", [item]);
    }
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
    const item = this.actor.items.get(itemId);

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
    Dice.TaskCheck(this.actor.data.data);
  }

  _onWeaponEdit(event) {
    event.preventDefault();
    const element = event.currentTarget;
    const itemId = element.closest(".weapon").dataset.itemId;
    const item = this.actor.items.get(itemId);
    const field = element.dataset.field;

    return item.update({ [field]: element.value });
  }

  _onArmorEdit(event) {
    event.preventDefault();
    const element = event.currentTarget;
    const itemId = element.closest(".armor").dataset.itemId;
    const item = this.actor.items.get(itemId);
    const field = element.dataset.field;

    return item.update({ [field]: element.value });
  }

  _onObjectEdit(event) {
    event.preventDefault();
    const element = event.currentTarget;
    const itemId = element.closest(".object").dataset.itemId;
    const item = this.actor.items.get(itemId);
    const field = element.dataset.field;

    return item.update({ [field]: element.value });
  }

  _onAssetEdit(event) {
    event.preventDefault();
    const element = event.currentTarget;
    const itemId = element.closest(".asset").dataset.itemId;
    const item = this.actor.items.get(itemId);
    const field = element.dataset.field;

    return item.update({ [field]: element.value });
  }
}
