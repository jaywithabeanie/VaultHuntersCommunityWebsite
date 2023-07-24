"use client";
import React, { useState } from "react";
import GearPiece from "@/components/gearPiece";
import BackgroundImage from "@/components/backgroundImage";
import Title from "@/components/title";
import data from "@/data/vault_gear.json";
import s from "./gear.module.scss";
import Modifier from "@/components/modifier";
import {
  getExcludingModifiers,
  getGearPieceModifierData,
  getModifierGroupDisplayName,
  getModifierData,
  ModifierType,
  gearPieces,
  groupTypes,
} from "../../hooks/gearHooks";
import Slider from "@/components/slider";

export default () => {
  const [activeTab, setActiveTab] =
    useState<(typeof gearPieces)[number]>("sword");
  const [level, setLevel] = useState(0);
  const getGearPieceDisplayName = (gearPiece: (typeof gearPieces)[number]) =>
    data.vault_gear.gear_pieces[gearPiece];

  const getTotalWeight = (
    modifierGroup: (typeof groupTypes)[number],
    modifiers: ModifierType[]
  ) => {
    // Initiate variables
    let totalWeight = 0;

    // Guard clause
    if (!["IMPLICIT", "PREFIX", "SUFFIX"].includes(modifierGroup)) {
      return totalWeight;
    }

    // Map modifiers
    modifiers.map((modifier) => {
      // Guard clauses
      if (
        modifier.tiers.length > 0 &&
        !(
          modifierGroup === "IMPLICIT" &&
          getExcludingModifiers(modifiers, modifier).length === 0
        ) &&
        modifier.tiers.some(
          (tier) =>
            tier?.minLevel <= level &&
            level <= (tier.maxLevel < 0 ? 100 : tier.maxLevel)
        )
      ) {
        // Initiate variables
        const availableTiers = modifier.tiers.filter(
          (tier) =>
            tier.minLevel <= level &&
            (tier.maxLevel === -1 || tier.maxLevel >= level)
        );

        // Loop through tiers
        availableTiers.map((tier) => {
          // Increase weight
          totalWeight += tier.weight;
        });
      }
    });

    return totalWeight;
  };

  return (
    <>
      <BackgroundImage backgroundType="untextured" />
      <div className={s.container}>
        <Title icon="/images/chestplate.png" title="Vault Gear" />
        <div className={s.gearPieces}>
          {gearPieces.map((gearPiece, index) => (
            <GearPiece
              key={index}
              name={gearPiece}
              isOddChild={index % 2 === 0}
              active={activeTab === gearPiece}
              onClick={() => setActiveTab(gearPiece)}
            />
          ))}
        </div>
        <div className={s.content}>
          <div className={s.gearHeader}>
            <h2 className={s.gearTitle}>{`${getGearPieceDisplayName(
              activeTab
            )}`}</h2>
            <Slider onChange={(e) => setLevel(e)} />
          </div>
          <div className={s.groups}>
            {Object.entries(
              getGearPieceModifierData(activeTab).modifierGroup
            ).map(
              ([modifierGroup, modifiers]) =>
                getModifierGroupDisplayName(
                  modifierGroup as (typeof groupTypes)[number]
                ) !== "Unknown" &&
                modifiers.length > 0 &&
                modifiers.some((modifier) =>
                  modifier.tiers.some((tier) => tier.minLevel <= level)
                ) && (
                  <div key={modifierGroup}>
                    <h3 className={s.subtitle}>
                      {getModifierGroupDisplayName(
                        modifierGroup as (typeof groupTypes)[number]
                      )}
                    </h3>
                    {["PREFIX", "SUFFIX"].includes(modifierGroup) && (
                      <div className={s.flavourText}>
                        A gear piece with an odd amount of modifier slots has a
                        50% chance at rolling either a prefix or suffix.
                      </div>
                    )}
                    {modifiers.map(
                      (modifier) =>
                        modifier.tiers.length > 0 &&
                        modifier.tiers.some(
                          (tier) =>
                            tier?.minLevel <= level &&
                            level <=
                            (tier.maxLevel < 0 ? 100 : tier.maxLevel) &&
                            tier.weight > 0
                        ) && (
                          <Modifier
                            key={modifier.identifier}
                            gearPiece={activeTab}
                            modifierGroup={modifierGroup}
                            modifier={modifier}
                            langData={getModifierData(modifier)}
                            level={level}
                            excludingModifiers={getExcludingModifiers(
                              modifiers,
                              modifier
                            )}
                            totalWeight={getTotalWeight(
                              modifierGroup as (typeof groupTypes)[number],
                              modifiers
                            )}
                          />
                        )
                    )}
                  </div>
                )
            )}
          </div>
        </div>
      </div>
    </>
  );
};
