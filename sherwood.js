import { SHERWOOD } from "./config.js";
import { SherwoodItem } from "./module/item/item.js";
import * as Macros from "./module/macros.js";
import { SherwoodActor } from "./module/actor/actor.js";
import SherwoodActorSheetNPC from "./module/actor/npc-sheet.js";
import SherwoodActorSheetPC from "./module/actor/pc-sheet.js";
import { preloadHandlebarsTemplates } from "./module/templates.js";
import SherwoodItemSheetWeapon from "./module/item/weapon-sheet.js";
import SherwoodItemSheetArmor from "./module/item/armor-sheet.js";
import SherwoodItemSheetAsset from "./module/item/asset-sheet.js";
import SherwoodItemSheetObject from "./module/item/object-sheet.js";

Hooks.once("init", async () => {
  console.log("sherwood | Initialising Sherwood System");
  game.sherwood = { SherwoodActor, SherwoodItem, macros: Macros };

  // CONFIG.debug.hooks = true;
  CONFIG.sherwood = SHERWOOD;

  Handlebars.registerHelper("isGM", function (options) {
    if (game.user.isGM) {
      return options.fn(this);
    }
    return options.inverse(this);
  });

  CONFIG.Actor.documentClass = SherwoodActor;
  CONFIG.Item.documentClass = SherwoodItem;

  Items.unregisterSheet("core", ItemSheet);
  Items.registerSheet("sherwood", SherwoodItemSheetWeapon, {
    types: ["weapon"],
    makeDefault: true,
  });
  Items.registerSheet("sherwood", SherwoodItemSheetArmor, {
    types: ["armor"],
    makeDefault: true,
  });
  Items.registerSheet("sherwood", SherwoodItemSheetAsset, {
    types: ["asset"],
    makeDefault: true,
  });
  Items.registerSheet("sherwood", SherwoodItemSheetObject, {
    types: ["object"],
    makeDefault: true,
  });

  Actors.unregisterSheet("core", ActorSheet);
  Actors.registerSheet("sherwood", SherwoodActorSheetPC, {
    types: ["pc"],
    makeDefault: true,
  });
  Actors.registerSheet("sherwood", SherwoodActorSheetNPC, {
    types: ["npc"],
    makeDefault: true,
  });

  await preloadHandlebarsTemplates();
});
