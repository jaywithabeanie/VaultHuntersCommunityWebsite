import React, { ReactNode, createElement } from 'react';
import s from './iconBox.module.scss';
import Image from 'next/image';
import classNames from 'classnames';

type PropsType = {
    variant?: '1a' | '1b'
    size?: number
    children: ReactNode
    as?: React.ElementType
    href?: string
    className?: string,
    onClick?: () => void
}

export default ({ variant, children, size, as = "div", className, ...rest }: PropsType) => createElement(as,
    { className: classNames(s.container, className), style: { width: size, height: size }, ...rest }, <>
    <Image alt='' fill src={`/images/${variant === '1a' ? 'icon_small_variant1_a' : 'icon_small_variant1_b'}.png`} priority />
    {children}
</>
)


