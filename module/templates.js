/**
 * Define a set of template paths to pre-load
 * Pre-loaded templates are compiled and cached for fast access when rendering
 * @return {Promise}
 */
export const preloadHandlebarsTemplates = async function () {
  return loadTemplates([
    // Actor Partials
    "systems/sherwood/templates/sheets/actors/parts/actor-stats.hbs",
    "systems/sherwood/templates/sheets/actors/parts/actor-inventory.hbs",
    "systems/sherwood/templates/sheets/actors/parts/actor-assets.hbs",
    "systems/sherwood/templates/sheets/actors/parts/actor-description.hbs",
    "systems/sherwood/templates/sheets/actors/parts/actor-equipment.hbs",
    "systems/sherwood/templates/sheets/partials/asset-card.hbs",
    "systems/sherwood/templates/chat/task-chat.hbs",
  ]);
};
