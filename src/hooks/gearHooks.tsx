import data from "@/data/vault_gear.json";

export const gearPieces = [
  "sword",
  "axe",
  "helmet",
  "chestplate",
  "leggings",
  "boots",
  "idol_benevolent",
  "shield",
  "wand",
  "magnet",
  "jewel",
] as const;
export const groupTypes = [
  "PREFIX",
  "SUFFIX",
  "IMPLICIT",
  "CRAFTED_PREFIX",
  "CRAFTED_SUFFIX",
] as const;

export type TierType = {
  minLevel: number;
  maxLevel: number;
  weight: number;
  value: {
    min: number;
    max: number;
    step: number;
    levelChange?: number;
    minChance?: number;
    maxChance?: number;
    tooltipDisplayName?: string;
    registryKey?: string;
  };
};

export type ModifierType = {
  attribute: string;
  group: string;
  identifier: string;
  tiers: TierType[];
};

export type GearType = {
  modifierGroup: {
    IMPLICIT: ModifierType[];
    PREFIX: ModifierType[];
    SUFFIX: ModifierType[];
    CRAFTED_PREFIX: ModifierType[];
    CRAFTED_SUFFIX: ModifierType[];
  };
};

export const removeDuplicateLevels = (modifiers: ModifierType[]) => {
  const arr: ModifierType[] = [];
  const addedMods: string[] = [];
  modifiers.map((e) => {
    if (e.attribute === "the_vault:added_ability_level") {
      const levelFilter = arr.filter(
        (e) => e.attribute === "the_vault:added_ability_level"
      );
      if (levelFilter.length) {
        if (addedMods && addedMods.filter((q) => q === e.identifier).length)
          return;
        addedMods.push(e.identifier);
        levelFilter[0].tiers = levelFilter[0].tiers.map((q, count) => ({
          ...q,
          weight: q.weight + e.tiers[count].weight,
        }));
        return;
      }
      return arr.push(e);
    }
    if (e.identifier === "the_vault:base_no_soulbound") return;
    arr.push(e);
  });

  return arr;
};

export const getGearPieceModifierData = (selectedGearPiece: string) => {
  // Retrieve data
  const gearPieceModifierData: GearType = require(`../data/modifiers/${selectedGearPiece}.json`);

  gearPieceModifierData.modifierGroup.PREFIX = removeDuplicateLevels(
    gearPieceModifierData.modifierGroup.PREFIX
  );
  gearPieceModifierData.modifierGroup.IMPLICIT = removeDuplicateLevels(
    gearPieceModifierData.modifierGroup.IMPLICIT
  );

  // Return
  return gearPieceModifierData;
};

export const getModifierGroupDisplayName = (
  modifierGroup: (typeof groupTypes)[number]
) => {
  let displayName = "Unknown";

  if (data.vault_gear.modifier_groups[modifierGroup] != null) {
    displayName = data.vault_gear.modifier_groups[modifierGroup];
  }
  return displayName;
};

export const getExcludingModifiers = (
  modifiers: ModifierType[],
  modifier: ModifierType
) => {
  return modifiers
    .filter(
      (otherModifier) =>
        otherModifier.group === modifier.group && otherModifier != modifier
    )
    .map((otherModifier) => getModifierData(otherModifier).name);
};

export const getModifierData = (modifier: ModifierType) => {
  // Initiate variables
  let modifierData = {
    name: "Unknown",
    description: "",
    color: "#ffffff",
  };

  const lang = data.vault_gear.modifiers;

  // Check if attribute exists
  if (modifier.attribute in lang) {
    modifierData = lang[modifier.attribute as keyof typeof lang];
  }

  if (modifier.identifier in lang) {
    modifierData = lang[modifier.identifier as keyof typeof lang];
  }

  return modifierData;
};
