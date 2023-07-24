import Image from 'next/image'
import s from './footer.module.scss'
export default () => (
    <div className={s.container}>
        <div className={s.leftSide}>
            <div className={s.logo}>
                <Image fill quality={100} src={'/images/logo_small.png'} alt='' />
            </div>
            <a href="https://www.discord.gg/vaulthunters" className={s.link}>Discord</a>
            <a href="https://www.reddit.com/r/VaultHuntersMinecraft/" className={s.link}>Reddit</a>
            <a href="https://vaulthunters.gg/" className={s.link}>Official Website</a>
            <a href="https://docs.google.com/spreadsheets/d/1Z1WkAWLo1iTmVQB5J9TJzkiNhx27LSbG--NlZbQA3uI/edit?usp=sharing" className={s.link}>Community Sheets</a>
        </div>

        <div className={s.copyright}>
            &copy; 2023 • Website by jaywithabeanie • Additional Art by breadcrumb5550 • Additional Dev by freudplays
        </div>
    </div>
)