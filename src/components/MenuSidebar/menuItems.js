import {
  MENU_TYPE_BACK,
  MENU_TYPE_CAMPAIGN,
  MENU_TYPE_CREDITS,
  MENU_TYPE_LOAD_GAME,
  MENU_TYPE_MULTI_PLAYER,
  MENU_TYPE_NEW_GAME,
  MENU_TYPE_QUIT,
  MENU_TYPE_SCORES,
  MENU_TYPE_SINGLE_SCENARIO,
  MENU_TYPE_TUTORIAL,
  STATE_DISABLED,
} from "@constants";

/**
 * Main menu items configuration
 */
export const mainMenuItems = [
  { type: MENU_TYPE_NEW_GAME },
  { type: MENU_TYPE_LOAD_GAME },
  { type: MENU_TYPE_SCORES, state: STATE_DISABLED },
  { type: MENU_TYPE_CREDITS, state: STATE_DISABLED },
  { type: MENU_TYPE_QUIT },
];

/**
 * New game menu items configuration
 */
export const newGameMenuItems = [
  { type: MENU_TYPE_SINGLE_SCENARIO, state: STATE_DISABLED },
  { type: MENU_TYPE_MULTI_PLAYER, state: STATE_DISABLED },
  { type: MENU_TYPE_CAMPAIGN, state: STATE_DISABLED },
  { type: MENU_TYPE_TUTORIAL, state: STATE_DISABLED },
  { type: MENU_TYPE_BACK },
];

/**
 * Load game menu items configuration
 */
export const loadGameMenuItems = newGameMenuItems;
