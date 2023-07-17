import React, { useState } from 'react';
import './Gear.scss';

// Components
import Title from '../../Title.js';
import Content from '../../content/Content.js';
import Modifier from './Modifier/Modifier';
import GearPiece from './GearPiece/GearPiece';
import Slider from '../../Slider.js';

import chestplate from '../../../images/assets/the_vault/item/gear/chestplate.png'

// Import lang file
import lang from '../../../data/lang/vault_gear.json';

const gearPieces = ['sword', 'axe', 'helmet', 'chestplate', 'leggings', 'boots', 'idol_benevolent', 'shield', 'wand', 'magnet', 'jewel'];

// brrrr
const removeDuplicateLevels = (modifiers) => {
  const arr = []
  const addedMods = []
  modifiers.map(e => {
    if (e.attribute === 'the_vault:added_ability_level') {
      const levelFilter = arr.filter(e => e.attribute === 'the_vault:added_ability_level')
      if (levelFilter.length) {
        if (addedMods && addedMods.filter(q => q.identifier === e.identifier).length) return
        // console.log(addedMods);
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

function getGearPieceModifierData(selectedGearPiece) {
  if (!selectedGearPiece) return

  // Retrieve data
  const gearPieceModifierData = require(`../../../data/the_vault/gear/modifiers/${selectedGearPiece}.json`);

  gearPieceModifierData.modifierGroup.PREFIX = removeDuplicateLevels(gearPieceModifierData.modifierGroup.PREFIX)
  gearPieceModifierData.modifierGroup.IMPLICIT = removeDuplicateLevels(gearPieceModifierData.modifierGroup.IMPLICIT)

  // Return
  return gearPieceModifierData;

}

function Home() {

  const [selectedGearPiece, setSelectedGearPiece] = useState(gearPieces[0]);
  const [level, setLevel] = useState(0);

  function handleGearPieceChange(event) {
    setSelectedGearPiece(event.target.value);
  }

  const handleLevelSliderChange = (level) => {
    setLevel(level);
  };

  function getTotalWeight(modifierGroup, modifiers) {

    // Initiate variables
    var totalWeight = 0;

    // Guard clause
    if (!['IMPLICIT', 'PREFIX', 'SUFFIX'].includes(modifierGroup)) {
      return totalWeight;
    }

    // Map modifiers
    modifiers.map((modifier) => {

      // Guard clauses
      if (modifier.tiers.length > 0
        && !(modifierGroup === 'IMPLICIT' && getExcludingModifiers(modifiers, modifier).length === 0)
        && modifier.tiers.some((tier) => (tier?.minLevel <= level && level <= (tier.maxLevel < 0 ? 100 : tier.maxLevel)))) {

        // Initiate variables
        const availableTiers = modifier.tiers.filter(tier => tier.minLevel <= level && (tier.maxLevel === -1 || tier.maxLevel >= level));

        // Loop through tiers
        availableTiers.map((tier) => {

          // Increase weight
          totalWeight += tier.weight;

        })

      }


    })

    return totalWeight;

  }


  function getModifierData(modifier) {
    // Initiate variables
    var modifierData = {
      "name": "Unknown",
      "color": "#ffffff"
    };

    if (modifier.identifier.includes("added_ability_level")) {
      return modifierData = {
        "name": "Ability Levels",
        "description": "Adds a level to an ability",
        "color": "#c1579d"
      }
    }

    console.log(modifier);
    // Check if attribute exists
    if (lang.vault_gear.modifiers[modifier.attribute] != null) {
      modifierData = lang.vault_gear.modifiers[modifier.attribute];
    }

    if (lang.vault_gear.modifiers[modifier.identifier] != null) {
      modifierData = lang.vault_gear.modifiers[modifier.identifier];
    }


    return modifierData;

  }

  function getModifierGroupDisplayName(modifierGroup) {
    var displayName = 'Unknown';

    if (lang.vault_gear.modifier_groups[modifierGroup] != null) {
      displayName = lang.vault_gear.modifier_groups[modifierGroup];
    }
    return displayName;

  }

  function getGearPieceDisplayName(gearPiece) {

    return lang.vault_gear.gear_pieces[gearPiece] !== null ? lang.vault_gear.gear_pieces[gearPiece] : 'Unknown';

  }

  function getExcludingModifiers(modifiers, modifier) {
    return modifiers
      .filter((otherModifier) => otherModifier.group === modifier.group && otherModifier != modifier)
      .map(otherModifier => getModifierData(otherModifier).name)
  }

  return (
    <>
      <Title icon={chestplate} title='Vault Gear' />

      <div className='gear-pieces'>
        {gearPieces.map((gearPiece, index) => (
          <label hoverable="true" key={index} htmlFor={`gear-piece-${index}`}>
            <input
              id={`gear-piece-${index}`}
              type='radio'
              name='gear'
              value={gearPiece}
              checked={selectedGearPiece === gearPiece}
              onChange={handleGearPieceChange} />
            <GearPiece name={gearPiece} isOddChild={index % 2 === 0} />
          </label>
        ))}
      </div>

      <Content>

        <div className="content-title">
          <h2>{`
            ${getGearPieceDisplayName(selectedGearPiece)}
          `}</h2>
          <Slider onChange={handleLevelSliderChange} />
        </div>

        {Object.entries(getGearPieceModifierData(selectedGearPiece).modifierGroup).map(([modifierGroup, modifiers]) => (
          <>
            {
              getModifierGroupDisplayName(modifierGroup) !== "Unknown"
              && modifiers.length > 0
              && modifiers.some((modifier) => modifier.tiers.some((tier) => tier.minLevel <= level))
              && (
                <div key={modifierGroup} className='gear-modifier-group'>
                  <h3>{getModifierGroupDisplayName(modifierGroup)}</h3>
                  {['PREFIX', 'SUFFIX'].includes(modifierGroup) &&
                    <p>A gear piece with an odd amount of modifier slots has a 50% chance at rolling either a prefix or suffix.</p>
                  }
                  {modifiers.map((modifier) => (
                    <>
                      {modifier.tiers.length > 0
                        && modifier.tiers.some((tier) => (tier?.minLevel <= level && level <= (tier.maxLevel < 0 ? 100 : tier.maxLevel) && tier.weight > 0)) && (
                          <Modifier
                            key={modifier.identifier}
                            gearPiece={selectedGearPiece}
                            modifierGroup={modifierGroup}
                            modifier={modifier}
                            langData={getModifierData(modifier)}
                            level={level}
                            excludingModifiers={getExcludingModifiers(modifiers, modifier)}
                            totalWeight={getTotalWeight(modifierGroup, modifiers)}
                          />
                        )}
                    </>
                  ))}
                </div>)}
          </>
        ))}

      </Content>
    </>
  );
}

export default Home;
