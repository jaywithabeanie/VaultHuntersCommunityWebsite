"use client"
import Image from 'next/image';
import s from './header.module.scss';
import Link from 'next/link';
import { Dimensions } from '@/hooks';

export default () => {
    return <div className={s.container}>
        <Link href={'/'}>
            <Image sizes='' src={'/images/logo.png'} alt='Logo' width={800} height={583} className={s.logo} loading='eager' priority />
            <Image sizes='' src={'/images/logo_small.png'} alt='Logo' width={800} height={583} className={s.mobileLogo} loading='eager' priority />
        </Link>
        <nav className={s.nav}>
            <ul className={s.links}>
                <li>
                    <Link href={'/'} className={s.link}>Home</Link>
                </li>
                <li>
                    <Link href={'/gear'} className={s.link} >Gear</Link>
                </li>
                {/* <li>
                    <Link href={'/guides'} className={s.link} >Guides</Link>
                </li> */}
            </ul>
        </nav>
    </div>
}
