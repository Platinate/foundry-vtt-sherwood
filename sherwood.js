import { SHERWOOD } from "./config.js";
import * as Macros from "./module/macros.js";
import SherwoodActorSheet from "./module/sheets/SherwoodActorSheet.js";
import SherwoodItemSheet from "./module/sheets/SherwoodItemSheet.js";

const preloadHandlebarsTemplates = async () => {
  const templatePaths = [
    "systems/sherwood/templates/sheets/partials/asset-card.hbs",
    "systems/sherwood/templates/chat/task-chat.hbs"
  ];
  return loadTemplates(templatePaths);
};

Hooks.once("init", async () => {
  console.log("sherwood | Initialising Sherwood System");

  // CONFIG.debug.hooks = true;
  CONFIG.sherwood = SHERWOOD;

  Handlebars.registerHelper("isGM", function (options) {
    if (game.user.isGM) {
      return options.fn(this);
    }
    return options.inverse(this);
  });

  game.sherwood = { macros: Macros };

  Items.unregisterSheet("core", ItemSheet);
  Items.registerSheet("sherwood", SherwoodItemSheet, { makeDefault: true });

  Actors.unregisterSheet("core", ActorSheet);
  Actors.registerSheet("sherwood", SherwoodActorSheet, {
    types: ["pc"],
    makeDefault: true,
    label: "Joueur"
  });

  // game.settings.register("sherwood", "showDC", {
  //   name: "Show DC window",
  //   hint: "If checked a DC box will appear at the bottom of the screen",
  //   scope: "world",
  //   config: true,
  //   default: true,
  //   type: Boolean,
  // });

  // game.settings.register("sherwood", "diff", {
  //   name: "GM difficulty",
  //   hint: "This is linked to the DC Box at the bottom of the screen",
  //   scope: "world",
  //   config: false,
  //   default: 0,
  //   type: Number,
  // });

  await preloadHandlebarsTemplates();
});

// const loadDifficultyPanel = async () => {
//   if(!game.user.isGM) return;
//   game.data.rolldc = 3;
//   let hotbar = document.getElementById("hotbar");
//   let backgr = document.createElement("DIV");
//   backgr.className = "dc-input";
//   let header = document.createElement("DIV");
//   header.className = "dc-header";
//   header.textContent = game.i18n.localize("sherwood.chat.difficulty");
//   let form = document.createElement("FORM");
//   let sInput = document.createElement("INPUT");
//   sInput.setAttribute("type", "number");
//   sInput.setAttribute("name", "dc");
//   sInput.setAttribute("min", "0");
//   sInput.setAttribute("max", "10");
//   sInput.setAttribute("step", "1");
//   sInput.setAttribute("value", "0");
//   sInput.setAttribute("data-dtype", "Number");
//   if (!hasProperty(SHERWOOD.diff, game.data.world.name)) {
//     setProperty(SHERWOOD.diff, game.data.world.name, 0);
//   }
//   sInput.value = game.settings.get("sherwood", "diff");
//   sInput.addEventListener("keydown", async (event) => {
//     event.preventDefault();
//     event.stopPropagation();
//     if (event.key == "Backspace" || event.key == "Delete") {
//       sInput.value = 0;
//     } else if (event.key == "Enter") {
//       //SHERWOOD.diff[game.data.world.name] = sInput.value;
//       await game.settings.set("sherwood", "diff", sInput.value);
//     } else if (event.key == "-") {
//       //SHERWOOD.diff[game.data.world.name] = sInput.value;
//       sInput.value = "-";
//     } else {
//       if (!isNaN(event.key)) sInput.value += event.key;
//     }
//     if (!isNaN(sInput.value)) {
//       sInput.value = parseInt(sInput.value);
//     }
//   });
//   sInput.addEventListener("focusout", async (event) => {
//     event.preventDefault();
//     event.stopPropagation();
//     await game.settings.set("sherwood", "diff", sInput.value);
//     ChatMessage.create({
//       user:  game.user._id,
//       speaker : game.user,
//       content : await renderTemplate("systems/sherwood/templates/chat/difficulty-chat.hbs", {difficulty: sInput.value })
//     })
//   });
//   form.appendChild(sInput);
//   backgr.appendChild(header);
//   backgr.appendChild(form);
//   await hotbar.appendChild(backgr);
// };

// Hooks.once("ready", async () => {
//   await loadDifficultyPanel();
// })