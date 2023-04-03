import React, {useState} from 'react';
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

const gearPieces = ['sword', 'axe', 'helmet', 'chestplate', 'leggings', 'boots', 'idol', 'shield', 'magnet'];

function Home () {

  const [selectedGearPiece, setSelectedGearPiece] = useState(gearPieces[0]);
  const [level, setLevel] = useState(0);

  function handleGearPieceChange(event) {
    setSelectedGearPiece(event.target.value);
  }

  const handleLevelSliderChange = (level) => {
    setLevel(level);
  };

  function getGearPieceModifierData() {

    // Retrieve data
    const gearPieceModifierData = require(`../../../data/the_vault/gear/modifiers/${selectedGearPiece}.json`);

    // Return
    return gearPieceModifierData;

  }

  function getModifierData(modifier) {

    // Initiate variables
    var modifierData = {
      "name": "Unknown",
      "color": "#ffffff"
    };

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

  return (
    <>
      <Title icon_url={chestplate} title='Vault Gear'/>

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
            <GearPiece name={gearPiece} isOddChild={index % 2 === 0}/>
          </label>
        ))}
      </div>
      
      <Content>

        <div className="content-title">
          <h2>{`Vault ${selectedGearPiece.charAt(0).toUpperCase() + selectedGearPiece.slice(1)}`}</h2>
          <Slider onChange={handleLevelSliderChange}/>
        </div>

        {Object.entries(getGearPieceModifierData().modifierGroup).map(([modifierGroup, modifiers]) => (
          <>
            {getModifierGroupDisplayName(modifierGroup) !== "Unknown"
              && modifiers.length > 0
              && modifiers.some((modifier) => modifier.tiers.some((tier) => tier.minLevel <= level))
              && (
            <div key={modifierGroup} className='gear-modifier-group'>
              <h3>{getModifierGroupDisplayName(modifierGroup)}</h3>
              {modifiers.map((modifier) => (
                <>
                  {modifier.tiers.length > 0 && modifier.tiers.some((tier) => (tier.minLevel <= level && level <= (tier.maxLevel < 0 ? 100 : tier.maxLevel))) && (
                    <Modifier 
                      key={modifier.attribute}
                      modifierGroup={modifierGroup}
                      modifier={modifier}
                      langData={getModifierData(modifier)}
                      level={level}
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
