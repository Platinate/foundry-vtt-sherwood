import { SHERWOOD } from "../config.js";

export async function TaskCheck(actorData) {
  const values = await GetTaskCheckOptions();
  
  const { difficulty, attribute, talent, bonus } = values;
  const attributeValue = actorData.attributes[attribute] > 0 ? `1d${actorData.attributes[attribute]}x` : "1";
  const talentValue = actorData.talents[talent] > 0 ? `1d${actorData.talents[talent]}x` : "1";
  const rollFormula = `{{${attributeValue},${talentValue}}kh+${bonus}}ge${difficulty}`;
  console.log(rollFormula);
  const messageTemplate = "systems/sherwood/templates/chat/task-chat.hbs";

  const rollResult = new Roll(rollFormula).evaluate();
  
  const diceResult = rollResult.result;

  const flavorData = {
    message: "",
    success: true,
    extra: "",
    result : diceResult
  };
  
  if(diceResult > difficulty) {
    flavorData.message = "Succès"
    flavorData.extra = `+${Math.floor((diceResult - difficulty) / 4)} degré(s) de réussite`
  }
  else if(diceResult === difficulty) {
    flavorData.message = "Semi-succès"
    flavorData.extra = "Réussite mais avec conséquences"
  }
  else if(diceResult < difficulty && diceResult > 1) {
    flavorData.message = "Échec"
    flavorData.success = false;
    flavorData.extra = "Vous avez échoué"
  }
  else {
    flavorData.message = "Échec critique"
    flavorData.success = false;
    flavorData.extra = "Vous avez échoué. Des têtes vont tomber."
  }


  const renderRoll = await rollResult.render({
    template: messageTemplate,
    isPrivate: false,
    flavor: flavorData,
  });

  const messageData = {
    speaker: ChatMessage.getSpeaker(),
    content: renderRoll,
  };

  rollResult.toMessage(messageData);
}

async function GetTaskCheckOptions() {
  const template = "systems/sherwood/templates/chat/task-check-dialog.hbs";
  const html = await renderTemplate(template, { config: SHERWOOD });

  return new Promise((resolve) => {
    const data = {
      title: game.i18n.localize("sherwood.chat.taskCheck"),
      content: html,
      buttons: {
        normal: {
          label: game.i18n.localize("sherwood.chat.roll"),
          callback: (html) =>
            resolve(_processTaskCheckOptions(html[0].querySelector("form"))),
        },
        cancel: {
          label: game.i18n.localize("sherwood.chat.cancel"),
          callback: (html) => resolve({ cancelled: true }),
        },
      },
      default: "normal",
      close: () => resolve({ cancelled: true }),
    };

    new Dialog(data, null).render(true);
  });
}

function _processTaskCheckOptions(form) {
  
  return {
    difficulty: parseInt(form.diff.value),
    attribute: form.attribute.value,
    talent: form.talent.value,
    bonus: parseInt(form.bonus.value),
  };
}
