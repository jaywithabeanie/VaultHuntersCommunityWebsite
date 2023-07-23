import React, { useEffect, useState } from "react";
import s from "./modifier.module.scss";
import {
  getTierDisplayForModifiers,
  getModifierWeight,
  getTierDisplayForModifier,
  getModifierDisplayForTier,
  getWeight,
} from "./functions";
import classNames from "classnames";
import { ModifierType } from "@/pages/gear/functions";

type PropsType = {
  gearPiece: string;
  modifierGroup: string;
  modifier: ModifierType;
  langData: {
    name: string;
    description: string;
    color: string;
  };
  level: number;
  excludingModifiers: string[];
  totalWeight: number;
};

export default ({
  gearPiece,
  modifierGroup,
  modifier,
  langData,
  level,
  excludingModifiers,
  totalWeight,
}: PropsType) => {
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    setExpanded(false);
  }, [gearPiece]);

  const availableTiers = modifier.tiers.filter(
    (tier) =>
      tier.minLevel <= level && (tier.maxLevel === -1 || tier.maxLevel >= level)
  );
  const lowestTier = availableTiers.reduce((min, tier) =>
    tier.minLevel < min.minLevel ? tier : min
  );
  const highestTier = availableTiers.reduce((max, tier) =>
    tier.minLevel > max.minLevel ? tier : max
  );

  // Find up to 2 legendary tiers above the highest tier in availableTiers
  const availableLegendaryTiers = ["PREFIX", "SUFFIX"].includes(modifierGroup)
    ? modifier.attribute === "the_vault:effect_immunity"
      ? []
      : modifier.tiers
        .filter(
          (_, index) =>
            index > modifier.tiers.indexOf(highestTier) &&
            index <= modifier.tiers.indexOf(highestTier) + 2
        )
        .sort((a, b) => a.minLevel - b.minLevel)
    : [];

  const name = getTierDisplayForModifiers(
    modifier,
    lowestTier,
    highestTier,
    gearPiece
  );
  const hasWeight =
    totalWeight === 0 ||
    getModifierWeight(modifierGroup, excludingModifiers, availableTiers) === 0;

  return (
    <div
      key={modifier.identifier}
      className={classNames(s.container, { [s.expanded]: expanded })}
    >
      <h3 onClick={() => setExpanded(!expanded)} className={s.headerContainer}>
        <div className={classNames(s.headerData, s.tooltipParent)}>
          {Boolean(name.length) && <span className={s.modifiers}>{name}</span>}
          <div className={s.gap}>
            <span style={{ color: langData.color }}>{langData.name}</span>
            {langData.description !== undefined && (
              <span className={s.tooltip}>{langData.description}</span>
            )}
            {modifier.tiers.some(
              (tier) => level - tier.minLevel <= 3 && tier.minLevel <= level
            ) && <span className={s.new}>(New)</span>}
          </div>
        </div>
        <div className={s.headerData}>
          {hasWeight ? (
            <></>
          ) : (
            <span className={s.odds}>{`${(
              (getModifierWeight(
                modifierGroup,
                excludingModifiers,
                availableTiers
              ) /
                totalWeight) *
              100
            ).toFixed(2)} %`}</span>
          )}
          <span className={s.icon}>{expanded ? "-" : "+"}</span>
        </div>
      </h3>
      <div className={s.data}>
        {[...availableTiers, ...availableLegendaryTiers].map((tier) => (
          <div key={tier.minLevel} className={s.innerData}>
            <div className={s.headerData}>
              {availableLegendaryTiers.includes(tier) ? (
                <span className={s.tooltipParent}>
                  <span className={s.legendaryDot}>◆</span>
                  <span className={s.tooltip}>Legendary Modifier</span>
                </span>
              ) : (
                <></>
              )}
              {getTierDisplayForModifier(modifier, tier, gearPiece) ? (
                <span className={s.modifiers}>
                  {getTierDisplayForModifier(modifier, tier, gearPiece)}
                </span>
              ) : (
                <></>
              )}
              <div className={s.gap}>
                {availableLegendaryTiers.includes(tier) ? (
                  <span className={s.mobileOnly}>
                    <span className={s.legendaryDot}>◆</span>
                    <span className={s.tooltip}>Legendary Modifier</span>
                  </span>
                ) : (
                  <></>
                )}
                <div style={{ color: langData.color }}>
                  {getModifierDisplayForTier(tier, langData)}
                </div>
                {level - tier.minLevel <= 3 && tier.minLevel <= level && (
                  <span className={s.new}>(New)</span>
                )}
              </div>
            </div>
            <div className={s.sideData}>
              {availableLegendaryTiers.includes(tier) ||
                modifierGroup.includes("CRAFTED") ? (
                <></>
              ) : (
                <div className={s.weight}>
                  {getWeight(availableTiers, tier)}%
                </div>
              )}
              <div>
                {tier.minLevel <= 100
                  ? `${`Lvl ${tier.minLevel <= 100 ? tier.minLevel : '-'}${tier.maxLevel === -1 ? ' +' : ` - ${tier.maxLevel}`}`}`
                  : '-'}
              </div>
            </div>
          </div>
        ))}
        {excludingModifiers.length > 0 && (
          <div className={s.excluding}>
            <div className={s.excludingTitle}>Can not roll alongside:</div>
            <div className={s.excludingItems}>
              {excludingModifiers.join(", ")}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
