import Image from 'next/image';
import s from './header.module.scss';
import Link from 'next/link';

export default () => <div className={s.container}>
    <Link href={'/'}>
        <Image src={'/images/logo.png'} alt='Logo' width={800} height={583} className={s.logo} loading='eager' />
    </Link>
    <div className={s.links}>
        <Link href={'/'} className={s.link}>Home</Link>
        <Link href={'/gear'} className={s.link} >Gear</Link>
        <Link href={'/guides'} className={s.link} >Guides</Link>
    </div>
</div>
