import { GearType, ModifierType, groupTypes } from "./page"
import data from "@/data/vault_gear.json";

export const removeDuplicateLevels = (modifiers: ModifierType[]) => {
    const arr: ModifierType[] = []
    const addedMods: string[] = []
    modifiers.map(e => {
        if (e.attribute === 'the_vault:added_ability_level') {
            const levelFilter = arr.filter(e => e.attribute === 'the_vault:added_ability_level')
            if (levelFilter.length) {
                if (addedMods && addedMods.filter(q => q === e.identifier).length) return
                addedMods.push(e.identifier)
                levelFilter[0].tiers = levelFilter[0].tiers.map((q, count) => ({ ...q, weight: q.weight + e.tiers[count].weight }))
                return
            }
            return arr.push(e)
        }
        arr.push(e)
    })

    return arr
}

export const getGearPieceModifierData = (selectedGearPiece: string) => {

    // Retrieve data
    const gearPieceModifierData: GearType = require(`../../data/modifiers/${selectedGearPiece}.json`);

    gearPieceModifierData.modifierGroup.PREFIX = removeDuplicateLevels(gearPieceModifierData.modifierGroup.PREFIX)
    gearPieceModifierData.modifierGroup.IMPLICIT = removeDuplicateLevels(gearPieceModifierData.modifierGroup.IMPLICIT)

    // Return
    return gearPieceModifierData;

}

export const getModifierGroupDisplayName = (modifierGroup: (typeof groupTypes)[number]) => {
    let displayName = 'Unknown';

    if (data.vault_gear.modifier_groups[modifierGroup] != null) {
        displayName = data.vault_gear.modifier_groups[modifierGroup];
    }
    return displayName;
}

export const getExcludingModifiers = (modifiers: ModifierType[], modifier: ModifierType) => {
    return modifiers
        .filter((otherModifier) => otherModifier.group === modifier.group && otherModifier != modifier)
        .map(otherModifier => getModifierData(otherModifier).name)
}

export const getModifierData = (modifier: ModifierType) => {
    // Initiate variables
    let modifierData = {
        "name": "Unknown",
        "description": '',
        "color": "#ffffff"
    };

    const lang = data.vault_gear.modifiers

    // Check if attribute exists
    if (modifier.attribute in lang) {
        modifierData = lang[modifier.attribute as keyof typeof lang];
    }

    if (modifier.identifier in lang) {
        modifierData = lang[modifier.identifier as keyof typeof lang];
    }

    return modifierData;

}