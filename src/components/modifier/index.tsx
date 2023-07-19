import React, { useState } from "react";
import s from "./modifier.module.scss";
import { ModifierType } from "@/app/gear/page";
import { getTierDisplayForModifiers, getModifierWeight, getTierDisplayForModifier, getModifierDisplayForTier } from "./functions";
import classNames from "classnames";

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

    const name = getTierDisplayForModifiers(modifier, lowestTier, highestTier, gearPiece)
    const hasWeight = totalWeight === 0 || getModifierWeight(modifierGroup, excludingModifiers, availableTiers) === 0

    return (
        <div
            key={modifier.identifier}
            className={classNames(s.container, { [s.expanded]: expanded })}
        >
            <h3 onClick={() => setExpanded(!expanded)} className={s.headerContainer}>
                <div className={classNames(s.headerData, s.tooltipParent)}>
                    {Boolean(name.length) && <span className={s.modifiers}>{name}</span>}
                    <span style={{ color: langData.color }}>{langData.name}</span>
                    {langData.description !== undefined && (
                        <span className={s.tooltip}>{langData.description}</span>
                    )}
                    {modifier.tiers.some(
                        (tier) => level - tier.minLevel <= 3 && tier.minLevel <= level
                    ) && <span className={s.new}>(New)</span>}
                </div>
                <div className={s.headerData}>
                    {hasWeight ? (<></>) : (<span className={s.odds}>{`${(
                        (getModifierWeight(modifierGroup, excludingModifiers, availableTiers) / totalWeight) *
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
                                    <span style={{ fontSize: "14px", color: "gold" }}>◆</span>
                                    <span className={s.tooltip}>Legendary Modifier</span>
                                </span>
                            ) : (
                                ""
                            )}
                            {getTierDisplayForModifier(modifier, tier, gearPiece) ? (<span>{getTierDisplayForModifier(modifier, tier, gearPiece)}</span>) : <></>}
                            <span
                                className="modifier-display-for-tier"
                                style={{ color: langData.color }}
                            >
                                {getModifierDisplayForTier(tier, langData)}
                            </span>
                            {level - tier.minLevel <= 3 && tier.minLevel <= level && (
                                <span className={s.new}>(New)</span>
                            )}
                        </div>
                        <p className="gear-modifier-levels">
                            {tier.minLevel < 100 && `Lvl ${tier.minLevel} `}
                            {tier.maxLevel === -1 && tier.minLevel < 100 ? '+' : '-'}
                        </p>
                    </div>
                ))}
                {excludingModifiers.length > 0 && (
                    <div className={s.excluding}>
                        <div className={s.excludingTitle}>Can not roll alongside:</div>
                        <div className={s.excludingItems}>
                            {excludingModifiers.join(', ')}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};
