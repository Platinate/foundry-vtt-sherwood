import * as Dice from "./dice.js";

export function TaskCheckMacro() {
    Dice.TaskCheck(game.user.character.data.data)
}