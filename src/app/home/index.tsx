import BackgroundImage from "@/components/header/backgroundImage";
import s from './home.module.scss'
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDiscord, faRedditAlien } from "@fortawesome/free-brands-svg-icons";
import classNames from "classnames";
import { faGlobe } from "@fortawesome/free-solid-svg-icons";

export default () => {
    return (
        <div className={s.container}>
            <BackgroundImage backgroundType="textured" />
            <div className={s.box}>
                <div className={s.header}>
                    <div className={s.iconBox}>
                        <Image src={'/images/scroll_header_icon.png'} fill alt="" quality={100} />
                        <div className={s.icon}>
                            <Image src={'/images/vault_rock.png'} fill alt="" quality={100} />
                        </div>
                    </div>
                    <div className={s.label}>
                        <Image src={'/images/scroll_header_label.png'} fill alt="" quality={100} />
                        <div className={s.title}>
                            Community Website
                        </div>
                    </div>
                </div>
                <div>
                    Welcome to the unofficial website of the Vault Hunters Minecraft modpack!
                    Here, you can find information about the game, that is constantly being kept up-to-date.
                    <br /><br />
                    For any questions or issues, please contact jaywithabeanie on Discord.
                </div>
                <div className={s.icons}>
                    <a href="https://www.discord.gg/vaulthunters" className={s.iconBox}>
                        <Image src={'/images/icon_small_variant1_a.png'} fill alt="" quality={100} />
                        <FontAwesomeIcon icon={faDiscord} className={classNames(s.logo, s.discord)} />
                    </a>
                    <a href="https://www.reddit.com/r/VaultHuntersMinecraft/" className={s.iconBox}>
                        <Image src={'/images/icon_small_variant1_b.png'} fill alt="" quality={100} />
                        <FontAwesomeIcon icon={faRedditAlien} className={classNames(s.logo, s.reddit)} />
                    </a>
                    <a href="https://vaulthunters.gg/" className={s.iconBox}>
                        <Image src={'/images/icon_small_variant1_a.png'} fill alt="" quality={100} />
                        <FontAwesomeIcon icon={faGlobe} className={classNames(s.logo, s.globe)} />
                    </a>
                </div>
            </div>
        </div>
    )
}
