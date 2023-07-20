import React from 'react';
import Image from 'next/image';
import classNames from 'classnames';
import s from './title.module.scss';

type PropsType = {
    icon: string,
    title: string,
    titleClass?: string
    iconClass?: string
}

export default ({ icon, title, titleClass, iconClass }: PropsType) => {

    return (
        <div className={s.header}>
            <div className={classNames(s.iconBox, iconClass)}>
                <Image src={'/images/scroll_header_icon.png'} fill alt="" quality={100} />
                <div className={s.icon}>
                    <Image src={icon} fill alt="" quality={100} />
                </div>
            </div>
            <div className={s.label}>
                <Image src={'/images/scroll_header_label.png'} fill alt="" quality={100} />
                <div className={classNames(s.title, titleClass)}>
                    {title}
                </div>
            </div>
        </div>
    );

}