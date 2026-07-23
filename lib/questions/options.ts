import type { PictureOption, ColourOption } from "./types";

export const PAIN_TIMING_OPTIONS: PictureOption[] = [
  { value: "after_eating", i18nKey: "options.afterEating", icon: "🍽️" },
  { value: "after_toilet", i18nKey: "options.afterToilet", icon: "🚽" },
  { value: "other_times", i18nKey: "options.otherTimes", icon: "⏰" },
];

export const APPETITE_OPTIONS: PictureOption[] = [
  { value: "eating_well", i18nKey: "options.eatingWell", icon: "😋" },
  { value: "eating_less", i18nKey: "options.eatingLess", icon: "😐" },
  { value: "not_eating", i18nKey: "options.notEating", icon: "😞" },
];

export const PARENT_DURATION_OPTIONS: PictureOption[] = [
  { value: "today", i18nKey: "options.today", icon: "📅" },
  { value: "few_days", i18nKey: "options.fewDays", icon: "📆" },
  { value: "week_plus", i18nKey: "options.weekPlus", icon: "🗓️" },
];

export const PARENT_MEDICATION_OPTIONS: PictureOption[] = [
  { value: "none", i18nKey: "options.noMeds", icon: "✅" },
  { value: "same", i18nKey: "options.sameMeds", icon: "💊" },
  { value: "changed", i18nKey: "options.changedMeds", icon: "🔄" },
];

export const PARENT_DIET_OPTIONS: PictureOption[] = [
  { value: "no_change", i18nKey: "options.noDietChange", icon: "🥗" },
  { value: "some_change", i18nKey: "options.someDietChange", icon: "🍎" },
  { value: "big_change", i18nKey: "options.bigDietChange", icon: "🚫" },
];

export const PARENT_SCHOOL_OPTIONS: PictureOption[] = [
  { value: "attending", i18nKey: "options.attending", icon: "🏫" },
  { value: "some_days", i18nKey: "options.someDays", icon: "📚" },
  { value: "not_attending", i18nKey: "options.notAttending", icon: "🏠" },
];

export const STOOL_COLOUR_OPTIONS: ColourOption[] = [
  { value: "brown", i18nKey: "options.brown", colour: "#8B4513" },
  { value: "yellow", i18nKey: "options.yellow", colour: "#DAA520" },
  { value: "green", i18nKey: "options.green", colour: "#228B22" },
  { value: "red", i18nKey: "options.red", colour: "#DC143C" },
  { value: "black", i18nKey: "options.black", colour: "#1a1a1a" },
  { value: "pale", i18nKey: "options.pale", colour: "#F5F5DC" },
];

export function getOptionsForQuestion(questionId: string): PictureOption[] | ColourOption[] | null {
  const map: Record<string, PictureOption[] | ColourOption[]> = {
    pain_timing: PAIN_TIMING_OPTIONS,
    appetite: APPETITE_OPTIONS,
    parent_duration: PARENT_DURATION_OPTIONS,
    parent_medications: PARENT_MEDICATION_OPTIONS,
    parent_diet: PARENT_DIET_OPTIONS,
    parent_school: PARENT_SCHOOL_OPTIONS,
    stool_colour: STOOL_COLOUR_OPTIONS,
  };
  return map[questionId] ?? null;
}
