import Image from 'next/image';
import s from './header.module.scss';
import Link from 'next/link';

export default () => {

    return <div className={s.container}>
        <Image src={'/images/logo.png'} alt='Logo' width={800} height={583} className={s.logo} loading='eager' />
        <div className={s.links}>
            <Link href={'/'} children="Home" className={s.link} />
            <Link href={'/gear'} children="Gear" className={s.link} />
            <Link href={'/guides'} children="Guides" className={s.link} />
        </div>
    </div>
}