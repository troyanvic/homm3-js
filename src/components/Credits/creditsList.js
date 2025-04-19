import { useTranslation } from "react-i18next";

export const useCreditsListTranslated = () => {
  const { t } = useTranslation("credits");

  return [
    {
      hasExtraTitle: true,
      extraTitle: t("creditsList.js.extraTitle"),
      title: t("creditsList.js.title"),
      text: t("creditsList.js.name"),
    },
    {
      hasExtraTitle: true,
      extraTitle: t("creditsList.original.extraTitle"),
      title: t("creditsList.createdBy.title"),
      text: t("creditsList.createdBy.name"),
    },
    {
      hasExtraTitle: false,
      title: t("creditsList.executiveProducer.title"),
      text: t("creditsList.executiveProducer.name"),
    },
    {
      hasExtraTitle: false,
      title: t("creditsList.producer.title"),
      text: t("creditsList.producer.name"),
    },
    {
      hasExtraTitle: false,
      title: t("creditsList.director.title"),
      text: t("creditsList.director.name"),
    },
    {
      hasExtraTitle: false,
      title: t("creditsList.designers.title"),
      text: t("creditsList.designers.name"),
    },
    {
      hasExtraTitle: false,
      title: t("creditsList.leadProgrammers.title"),
      text: t("creditsList.leadProgrammers.name"),
    },
    {
      hasExtraTitle: false,
      title: t("creditsList.programmers.title"),
      text: t("creditsList.programmers.name"),
    },
    {
      hasExtraTitle: false,
      title: t("creditsList.installerProgrammer.title"),
      text: t("creditsList.installerProgrammer.name"),
    },
    {
      hasExtraTitle: false,
      title: t("creditsList.leadArtists.title"),
      text: t("creditsList.leadArtists.name"),
    },
    {
      hasExtraTitle: false,
      title: t("creditsList.artists.title"),
      text: t("creditsList.artists.name"),
    },
    {
      hasExtraTitle: false,
      title: t("creditsList.assettCoordinator.title"),
      text: t("creditsList.assettCoordinator.name"),
    },
    {
      hasExtraTitle: false,
      title: t("creditsList.levelDesigners.title"),
      text: t("creditsList.levelDesigners.name"),
    },
    {
      hasExtraTitle: false,
      title: t("creditsList.musicProducer.title"),
      text: t("creditsList.musicProducer.name"),
    },
    {
      hasExtraTitle: false,
      title: t("creditsList.townThemes.title"),
      text: t("creditsList.townThemes.name"),
    },
    {
      hasExtraTitle: false,
      title: t("creditsList.music.title"),
      text: t("creditsList.music.name"),
    },
    {
      hasExtraTitle: false,
      title: t("creditsList.soundDesign.title"),
      text: t("creditsList.soundDesign.name"),
    },
    {
      hasExtraTitle: false,
      title: t("creditsList.voiceProduction.title"),
      text: t("creditsList.voiceProduction.name"),
    },
    {
      hasExtraTitle: false,
      title: t("creditsList.voiceTalent.title"),
      text: t("creditsList.voiceTalent.name"),
    },
    {
      hasExtraTitle: false,
      title: t("creditsList.leadTester.title"),
      text: t("creditsList.leadTester.name"),
    },
    {
      hasExtraTitle: false,
      title: t("creditsList.seniorTester.title"),
      text: t("creditsList.seniorTester.name"),
    },
    {
      hasExtraTitle: false,
      title: t("creditsList.testers.title"),
      text: t("creditsList.testers.name"),
    },
    {
      hasExtraTitle: false,
      title: t("creditsList.specialThanks.title"),
      text: t("creditsList.specialThanks.name"),
    },
    {
      hasExtraTitle: false,
      title: t("creditsList.visitWeb.title"),
      text: t("creditsList.visitWeb.name"),
    },
  ];
};
