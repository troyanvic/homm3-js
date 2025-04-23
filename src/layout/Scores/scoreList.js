import { useTranslation } from "react-i18next";

export const useScoreListTranslated = () => {
  const { t } = useTranslation("scores");

  return [
    {
      rank: 1,
      player: t("players.player1"),
      land: t("lands.land1"),
      days: 75,
      points: 200,
      creature: "",
    },
    {
      rank: 2,
      player: t("players.player2"),
      land: t("lands.land2"),
      days: 100,
      points: 190,
      creature: "",
    },
    {
      rank: 3,
      player: t("players.player3"),
      land: t("lands.land3"),
      days: 125,
      points: 180,
      creature: "",
    },
    {
      rank: 4,
      player: t("players.player4"),
      land: t("lands.land4"),
      days: 150,
      points: 170,
      creature: "",
    },
    {
      rank: 5,
      player: t("players.player5"),
      land: t("lands.land5"),
      days: 175,
      points: 160,
      creature: "",
    },
    {
      rank: 6,
      player: t("players.player6"),
      land: t("lands.land6"),
      days: 200,
      points: 150,
      creature: "",
    },
    {
      rank: 7,
      player: t("players.player7"),
      land: t("lands.land7"),
      days: 250,
      points: 140,
      creature: "",
    },
    {
      rank: 8,
      player: t("players.player8"),
      land: t("lands.land8"),
      days: 500,
      points: 130,
      creature: "",
    },
    {
      rank: 9,
      player: t("players.player9"),
      land: t("lands.land9"),
      days: 750,
      points: 120,
      creature: "",
    },
    {
      rank: 10,
      player: t("players.player10"),
      land: t("lands.land10"),
      days: 1000,
      points: 100,
      creature: "",
    },
    {
      rank: 11,
      player: t("players.player11"),
      land: t("lands.land11"),
      days: 2000,
      points: 1,
      creature: "",
    },
  ];
};
