import { useTranslation } from "react-i18next";

// import campaign creatures
import campaignCreature1 from "@images/highscore/campaignCreature1.gif";
import campaignCreature2 from "@images/highscore/campaignCreature2.gif";
import campaignCreature3 from "@images/highscore/campaignCreature3.gif";
import campaignCreature4 from "@images/highscore/campaignCreature4.png";
import campaignCreature5 from "@images/highscore/campaignCreature5.gif";
import campaignCreature6 from "@images/highscore/campaignCreature6.gif";
import campaignCreature7 from "@images/highscore/campaignCreature7.gif";
import campaignCreature8 from "@images/highscore/campaignCreature8.gif";
import campaignCreature9 from "@images/highscore/campaignCreature9.png";
import campaignCreature10 from "@images/highscore/campaignCreature10.gif";
import campaignCreature11 from "@images/highscore/campaignCreature11.png";

// import standard creatures
import standardCreature1 from "@images/highscore/standardCreature1.gif";
import standardCreature2 from "@images/highscore/standardCreature2.gif";
import standardCreature3 from "@images/highscore/standardCreature3.gif";
import standardCreature4 from "@images/highscore/standardCreature4.png";
import standardCreature5 from "@images/highscore/standardCreature5.gif";
import standardCreature6 from "@images/highscore/standardCreature6.gif";
import standardCreature7 from "@images/highscore/standardCreature7.gif";
import standardCreature8 from "@images/highscore/standardCreature8.gif";
import standardCreature9 from "@images/highscore/standardCreature9.gif";
import standardCreature10 from "@images/highscore/standardCreature10.gif";
import standardCreature11 from "@images/highscore/standardCreature11.gif";

export const useCampaignScoreListTranslated = () => {
  const { t } = useTranslation("scores");

  return [
    {
      rank: 1,
      player: t("players.campaignPlayer1"),
      land: t("lands.campaignLand1"),
      points: 1000,
      creature: campaignCreature1,
    },
    {
      rank: 2,
      player: t("players.campaignPlayer2"),
      land: t("lands.campaignLand2"),
      points: 875,
      creature: campaignCreature2,
    },
    {
      rank: 3,
      player: t("players.campaignPlayer3"),
      land: t("lands.campaignLand3"),
      points: 750,
      creature: campaignCreature3,
    },
    {
      rank: 4,
      player: t("players.campaignPlayer4"),
      land: t("lands.campaignLand4"),
      points: 625,
      creature: campaignCreature4,
    },
    {
      rank: 5,
      player: t("players.campaignPlayer5"),
      land: t("lands.campaignLand5"),
      points: 500,
      creature: campaignCreature5,
    },
    {
      rank: 6,
      player: t("players.campaignPlayer6"),
      land: t("lands.campaignLand6"),
      points: 375,
      creature: campaignCreature6,
    },
    {
      rank: 7,
      player: t("players.campaignPlayer7"),
      land: t("lands.campaignLand7"),
      points: 250,
      creature: campaignCreature7,
    },
    {
      rank: 8,
      player: t("players.campaignPlayer8"),
      land: t("lands.campaignLand8"),
      points: 225,
      creature: campaignCreature8,
    },
    {
      rank: 9,
      player: t("players.campaignPlayer9"),
      land: t("lands.campaignLand9"),
      points: 200,
      creature: campaignCreature9,
    },
    {
      rank: 10,
      player: t("players.campaignPlayer10"),
      land: t("lands.campaignLand10"),
      points: 175,
      creature: campaignCreature10,
    },
    {
      rank: 11,
      player: t("players.campaignPlayer11"),
      land: t("lands.campaignLand11"),
      points: 1,
      creature: campaignCreature11,
    },
  ];
};

export const useStandardScoreListTranslated = () => {
  const { t } = useTranslation("scores");

  return [
    {
      rank: 1,
      player: t("players.standardPlayer1"),
      land: t("lands.standardLand1"),
      days: 75,
      points: 200,
      creature: standardCreature1,
    },
    {
      rank: 2,
      player: t("players.standardPlayer2"),
      land: t("lands.standardLand2"),
      days: 100,
      points: 190,
      creature: standardCreature2,
    },
    {
      rank: 3,
      player: t("players.standardPlayer3"),
      land: t("lands.standardLand3"),
      days: 125,
      points: 180,
      creature: standardCreature3,
    },
    {
      rank: 4,
      player: t("players.standardPlayer4"),
      land: t("lands.standardLand4"),
      days: 150,
      points: 170,
      creature: standardCreature4,
    },
    {
      rank: 5,
      player: t("players.standardPlayer5"),
      land: t("lands.standardLand5"),
      days: 175,
      points: 160,
      creature: standardCreature5,
    },
    {
      rank: 6,
      player: t("players.standardPlayer6"),
      land: t("lands.standardLand6"),
      days: 200,
      points: 150,
      creature: standardCreature6,
    },
    {
      rank: 7,
      player: t("players.standardPlayer7"),
      land: t("lands.standardLand7"),
      days: 250,
      points: 140,
      creature: standardCreature7,
    },
    {
      rank: 8,
      player: t("players.standardPlayer8"),
      land: t("lands.standardLand8"),
      days: 500,
      points: 130,
      creature: standardCreature8,
    },
    {
      rank: 9,
      player: t("players.standardPlayer9"),
      land: t("lands.standardLand9"),
      days: 750,
      points: 120,
      creature: standardCreature9,
    },
    {
      rank: 10,
      player: t("players.standardPlayer10"),
      land: t("lands.standardLand10"),
      days: 1000,
      points: 100,
      creature: standardCreature10,
    },
    {
      rank: 11,
      player: t("players.standardPlayer11"),
      land: t("lands.standardLand11"),
      days: 2000,
      points: 1,
      creature: standardCreature11,
    },
  ];
};
