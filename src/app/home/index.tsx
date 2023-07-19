import BackgroundImage from "@/components/backgroundImage";
import s from './home.module.scss'
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDiscord, faRedditAlien } from "@fortawesome/free-brands-svg-icons";
import classNames from "classnames";
import { faGlobe } from "@fortawesome/free-solid-svg-icons";
import Title from "@/components/title";
import IconBox from "@/components/iconBox";

export default () => (
    <div className={s.container}>
        <BackgroundImage backgroundType="textured" />
        <div className={s.box}>
            <Title icon="/images/vault_rock.png" title="Community Website" />
            <div>
                Welcome to the unofficial website of the Vault Hunters Minecraft modpack!
                Here, you can find information about the game, that is constantly being kept up-to-date.
                <br /><br />
                For any questions or issues, please contact jaywithabeanie on Discord.
            </div>
            <div className={s.icons}>
                <IconBox size={48} as="a" href="https://www.discord.gg/vaulthunters">
                    <FontAwesomeIcon icon={faDiscord} className={classNames(s.logo, s.discord)} />
                </IconBox>
                <IconBox variant="1b" size={48} as='a' href="https://www.reddit.com/r/VaultHuntersMinecraft/">
                    <FontAwesomeIcon icon={faRedditAlien} className={classNames(s.logo, s.reddit)} />
                </IconBox>
                <IconBox size={48} as="a" href="https://vaulthunters.gg/">
                    <FontAwesomeIcon icon={faGlobe} className={classNames(s.logo, s.globe)} />
                </IconBox>
            </div>
        </div>
    </div>
)

