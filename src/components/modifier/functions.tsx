import { ModifierType, TierType } from "@/hooks/gearHooks";

export const getModifierWeight = (
  modifierGroup: string,
  excludingModifiers: string[],
  availableTiers: TierType[]
) => {
  if (modifierGroup === "IMPLICIT" && excludingModifiers.length === 0) {
    return 0;
  }
  const modifierWeight = availableTiers.reduce(
    (sum, tier) => sum + tier.weight,
    0
  );
  return Math.round(modifierWeight * 100) / 100;
};

export const getTierDisplayForModifier = (
  modifier: ModifierType,
  tier: TierType,
  gearPiece: string
) => {
  if (modifier.attribute === "the_vault:added_ability_level")
    return `+${tier.value.levelChange}`;

  // Initiate variables
  let tierDisplay = "";

  // Tier doesn't have values
  if (tier.value.min !== undefined || tier.value.minChance !== undefined) {
    // Tier values are integers
    if (
      (Number.isInteger(tier.value.min) && Number.isInteger(tier.value.max)) ||
      (Number.isInteger(tier.value.minChance) &&
        Number.isInteger(tier.value.maxChance))
    ) {
      // Minimum and maximum values are the same
      if (tier.value.min === tier.value.max) tierDisplay = `${tier.value.min}`;
      // Minimum and maximum values are different
      else tierDisplay = `${tier.value.min} - ${tier.value.max}`;

      if (
        tier.value.maxChance &&
        tier.value.minChance &&
        tier.value.maxChance === tier.value.minChance
      ) {
        tierDisplay = `${tier.value.minChance * 100}%`;
      }

      return tierDisplay;
    }

    // Tier values are floats

    // Modifier is implicit 'Attack Speed'
    if (modifier.identifier === "the_vault:base_attack_speed") {
      tierDisplay = `${(4.0 + tier.value.min).toFixed(1)} - ${(
        4.0 + tier.value.max
      ).toFixed(1)}`;
    }

    // Modifier is "Reach", "Range" or "Speed"
    else if (
      modifier.attribute === "the_vault:reach" ||
      modifier.attribute === "the_vault:range" ||
      modifier.attribute === "the_vault:mining_speed"
    ) {
      tierDisplay = `${tier.value.min} - ${tier.value.max}`;
    }

    // Modifier is "Velocity"
    else if (modifier.attribute === "the_vault:velocity") {
      tierDisplay = `${(tier.value.min * 100).toFixed(0)} - ${(
        tier.value.max * 100
      ).toFixed(0)}`;
    }

    // Modifier is "Copiously" or ("Item Quantity" or "Item Rarity" for Jewels)
    else if (
      modifier.attribute === "the_vault:copiously" ||
      ((modifier.attribute === "the_vault:item_quantity" ||
        modifier.attribute === "the_vault:item_rarity") &&
        gearPiece === "jewel")
    ) {
      tierDisplay = `${(tier.value.min * 100).toFixed(1) + "%"} - ${
        (tier.value.max * 100).toFixed(0) + "%"
      }`;
    }

    // Modifier is "x Avoidance"
    else if (
      modifier.attribute.endsWith("avoidance") &&
      tier.value.minChance &&
      tier.value.maxChance
    ) {
      tierDisplay = `${(tier.value.minChance * 100).toFixed(0) + "%"} - ${
        (tier.value.maxChance * 100).toFixed(0) + "%"
      }`;
    }

    // Default modifier
    else {
      tierDisplay = `${(tier.value.min * 100).toFixed(0) + "%"} - ${
        (tier.value.max * 100).toFixed(0) + "%"
      }`;
    }
  }

  // Return displayed data
  return tierDisplay;
};

export const getTierDisplayForModifiers = (
  modifier: ModifierType,
  lowestTier: TierType,
  highestTier: TierType,
  gearPiece: string
) => {
  // Initiate variables
  let tierDisplay = "";
  if (modifier.attribute === "the_vault:added_ability_level") {
    return (tierDisplay = `+${lowestTier.value?.levelChange}${
      highestTier.value?.levelChange && highestTier.value?.levelChange > 1
        ? ` - ${highestTier.value.levelChange}`
        : ""
    }`);
  }

  // Tier doesn't have values
  if (
    lowestTier.value.min !== undefined ||
    lowestTier.value.minChance !== undefined
  ) {
    // Tier values are integers
    if (
      (Number.isInteger(lowestTier.value.min) &&
        Number.isInteger(highestTier.value.max)) ||
      (Number.isInteger(lowestTier.value.minChance) &&
        Number.isInteger(highestTier.value.maxChance))
    ) {
      // Minimum and maximum values are the same
      if (lowestTier.value.min === highestTier.value.max)
        tierDisplay = `${lowestTier.value.min}`;
      // Minimum and maximum values are different
      else tierDisplay = `${lowestTier.value.min} - ${highestTier.value.max}`;

      return tierDisplay;
    }
    // Tier values are floats
    // Modifier is implicit 'Attack Speed'
    if (modifier.identifier === "the_vault:base_attack_speed")
      tierDisplay = `${(4.0 + lowestTier.value.min).toFixed(1)} - ${(
        4.0 + highestTier.value.max
      ).toFixed(1)}`;
    // Modifier is "Reach", "Range" or "Speed"
    else if (
      modifier.attribute === "the_vault:reach" ||
      modifier.attribute === "the_vault:range" ||
      modifier.attribute === "the_vault:mining_speed"
    )
      tierDisplay = `${lowestTier.value.min} - ${highestTier.value.max}`;
    // Modifier is "Velocity"
    else if (modifier.attribute === "the_vault:velocity")
      tierDisplay = `${(lowestTier.value.min * 100).toFixed(0)} - ${(
        highestTier.value.max * 100
      ).toFixed(0)}`;
    // Modifier is "Copiously" or ("Item Quantity" or "Item Rarity" for Jewels)
    else if (
      modifier.attribute === "the_vault:copiously" ||
      ((modifier.attribute === "the_vault:item_quantity" ||
        modifier.attribute === "the_vault:item_rarity") &&
        gearPiece === "jewel")
    )
      tierDisplay = `${(lowestTier.value.min * 100).toFixed(1) + "%"} - ${
        (highestTier.value.max * 100).toFixed(0) + "%"
      }`;
    // Modifier is "x Avoidance"
    else if (
      modifier.attribute.endsWith("avoidance") &&
      lowestTier.value.minChance &&
      highestTier.value.maxChance
    )
      tierDisplay = `${(lowestTier.value.minChance * 100).toFixed(0) + "%"} - ${
        (highestTier.value.maxChance * 100).toFixed(0) + "%"
      }`;
    // Default modifier
    else
      tierDisplay = `${(lowestTier.value.min * 100).toFixed(0) + "%"} - ${
        (highestTier.value.max * 100).toFixed(0) + "%"
      }`;
  }

  // Return displayed data
  return tierDisplay;
};

export const getModifierDisplayForTier = (
  tier: TierType,
  langData: {
    name: string;
    description: string;
    color: string;
  }
) => {
  // Initiate variables
  let modifierDisplay = "";

  // Tier has tooltip display name (Cloud Modifiers)
  if (tier.value.tooltipDisplayName != null) {
    modifierDisplay = `${tier.value.tooltipDisplayName} Cloud`;
  }

  // Tier has registry key (Immunity Modifiers)
  else if (tier.value.registryKey != null) {
    modifierDisplay = `${tier.value.registryKey
      .replace("minecraft:", "")
      .replace("the_vault:", "")
      .replace("_", " ")
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ")} Immunity`;
  }

  // Default modifier
  else {
    modifierDisplay = `${langData.name}`;
  }

  // Return displayed data
  return modifierDisplay;
};

export const getWeight = (modifiers: TierType[], tier: TierType) => {
  const totalWeight = modifiers.reduce((a, b) => a + b.weight, 0);
  return Math.round((tier.weight / totalWeight) * 100);
};
