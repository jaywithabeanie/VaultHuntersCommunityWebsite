import React from 'react';
import s from './title.module.scss';
import Image from 'next/image';

type PropsType = {
    icon: string,
    title: string
}

export default ({ icon, title }: PropsType) => {

    return (
        <div className={s.header}>
            <div className={s.iconBox}>
                <Image src={'/images/scroll_header_icon.png'} fill alt="" quality={100} />
                <div className={s.icon}>
                    <Image src={icon} fill alt="" quality={100} />
                </div>
            </div>
            <div className={s.label}>
                <Image src={'/images/scroll_header_label.png'} fill alt="" quality={100} />
                <div className={s.title}>
                    {title}
                </div>
            </div>
        </div>
    );

}