import {
  MENU_TYPE_BACK,
  MENU_TYPE_CREDITS,
  MENU_TYPE_LOAD_GAME,
  MENU_TYPE_NEW_GAME,
  MENU_TYPE_NEW_GAME_CAMPAIGN,
  MENU_TYPE_NEW_GAME_MULTI_PLAYER,
  MENU_TYPE_NEW_GAME_SINGLE_SCENARIO,
  MENU_TYPE_NEW_GAME_TUTORIAL,
  MENU_TYPE_QUIT,
  MENU_TYPE_SCORES,
  STATE_DISABLED,
} from "@constants";

/**
 * Main menu items configuration
 */
export const mainMenuItems = [
  { type: MENU_TYPE_NEW_GAME },
  { type: MENU_TYPE_LOAD_GAME, state: STATE_DISABLED },
  { type: MENU_TYPE_SCORES, state: STATE_DISABLED },
  { type: MENU_TYPE_CREDITS, state: STATE_DISABLED },
  { type: MENU_TYPE_QUIT },
];

/**
 * New game menu items configuration
 */
export const newGameMenuItems = [
  { type: MENU_TYPE_NEW_GAME_SINGLE_SCENARIO, state: STATE_DISABLED },
  { type: MENU_TYPE_NEW_GAME_MULTI_PLAYER, state: STATE_DISABLED },
  { type: MENU_TYPE_NEW_GAME_CAMPAIGN, state: STATE_DISABLED },
  { type: MENU_TYPE_NEW_GAME_TUTORIAL, state: STATE_DISABLED },
  { type: MENU_TYPE_BACK },
];
