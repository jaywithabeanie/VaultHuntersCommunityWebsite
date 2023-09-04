import React from 'react';
import s from './gearPiece.module.scss';
import Image from 'next/image';
import IconBox from '../iconBox';
import classNames from 'classnames';

type PropsType = {
    name: string
    active?: boolean
    isOddChild?: boolean
    onClick?: () => void
}

export default ({ name, isOddChild, active, onClick }: PropsType) => {

    return (
        <IconBox className={classNames(s.container, { [s.active]: active })} variant={isOddChild === true ? '1a' : '1b'} onClick={onClick}>
            <div className={s.gearContainer}>
                <Image src={`/images/${name}.png`} key={name} fill alt='' quality={100} className={s.gearPiece} />
            </div>
        </IconBox>
    )
}


