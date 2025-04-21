import {
  MENU_TYPE_AB,
  MENU_TYPE_BACK,
  MENU_TYPE_CREDITS,
  MENU_TYPE_CUSTOM,
  MENU_TYPE_LOAD_GAME,
  MENU_TYPE_LOAD_GAME_CAMPAIGN,
  MENU_TYPE_LOAD_GAME_MULTI_PLAYER,
  MENU_TYPE_LOAD_GAME_SINGLE_SCENARIO,
  MENU_TYPE_LOAD_GAME_TUTORIAL,
  MENU_TYPE_NEW_GAME,
  MENU_TYPE_NEW_GAME_CAMPAIGN,
  MENU_TYPE_NEW_GAME_MULTI_PLAYER,
  MENU_TYPE_NEW_GAME_SINGLE_SCENARIO,
  MENU_TYPE_NEW_GAME_TUTORIAL,
  MENU_TYPE_QUIT,
  MENU_TYPE_ROE,
  MENU_TYPE_SCORES,
  MENU_TYPE_SOD,
  STATE_DISABLED,
} from "@constants";

/**
 * Main menu items configuration
 */
export const mainMenuItems = [
  { type: MENU_TYPE_NEW_GAME },
  { type: MENU_TYPE_LOAD_GAME },
  { type: MENU_TYPE_SCORES },
  { type: MENU_TYPE_CREDITS },
  { type: MENU_TYPE_QUIT },
];

/**
 * New game menu items configuration
 */
export const newGameMenuItems = [
  { type: MENU_TYPE_NEW_GAME_SINGLE_SCENARIO, state: STATE_DISABLED },
  { type: MENU_TYPE_NEW_GAME_MULTI_PLAYER, state: STATE_DISABLED },
  { type: MENU_TYPE_NEW_GAME_CAMPAIGN },
  { type: MENU_TYPE_NEW_GAME_TUTORIAL, state: STATE_DISABLED },
  { type: MENU_TYPE_BACK },
];

/**
 * Load game menu items configuration
 */
export const loadGameMenuItems = [
  { type: MENU_TYPE_LOAD_GAME_SINGLE_SCENARIO, state: STATE_DISABLED },
  { type: MENU_TYPE_LOAD_GAME_MULTI_PLAYER, state: STATE_DISABLED },
  { type: MENU_TYPE_LOAD_GAME_CAMPAIGN, state: STATE_DISABLED },
  { type: MENU_TYPE_LOAD_GAME_TUTORIAL, state: STATE_DISABLED },
  { type: MENU_TYPE_BACK },
];

/**
 * Campaign menu items configuration
 */
export const campaignMenuItems = [
  { type: MENU_TYPE_SOD, state: STATE_DISABLED },
  { type: MENU_TYPE_ROE, state: STATE_DISABLED },
  { type: MENU_TYPE_AB, state: STATE_DISABLED },
  { type: MENU_TYPE_CUSTOM, state: STATE_DISABLED },
  { type: MENU_TYPE_BACK },
];
