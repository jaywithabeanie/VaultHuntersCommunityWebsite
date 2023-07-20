import React from 'react';
import s from './gearPiece.module.scss';
import Image from 'next/image';
import IconBox from '../iconBox';
import classNames from 'classnames';

type PropsType = {
    name: string
    active?: boolean
    isOddChild?: boolean
    onClick: () => void
}

export default ({ name, isOddChild, active, onClick }: PropsType) => {
    const width = typeof window === 'undefined' ? 0 : window.innerWidth

    return (
        <IconBox size={width < 768 ? 64 : 80} className={classNames({ [s.active]: active })} variant={isOddChild === true ? '1a' : '1b'} onClick={onClick}>
            <div className={s.gearContainer}>
                <Image src={`/images/${name}.png`} key={name} fill alt='' quality={100} className={s.gearPiece} />
            </div>
        </IconBox>
    )
}


