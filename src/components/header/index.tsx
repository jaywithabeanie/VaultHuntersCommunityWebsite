import Image from 'next/image';
import s from './header.module.scss';
import Link from 'next/link';

export default () => {

    const width = typeof window === 'undefined' ? 0 : window.innerWidth

    return <div className={s.container}>
        <Link href={'/'}>
            <Image src={width > 768 ? '/images/logo.png' : '/images/logo_small.png'} alt='Logo' width={800} height={583} className={s.logo} loading='eager' />
        </Link>
        <nav className={s.nav}>
            <ul className={s.links}>
                <li>
                    <Link href={'/'} className={s.link}>Home</Link>
                </li>
                <li>
                    <Link href={'/gear'} className={s.link} >Gear</Link>
                </li>
                <li>
                    <Link href={'/guides'} className={s.link} >Guides</Link>
                </li>
            </ul>
        </nav>
    </div>
}
