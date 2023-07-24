import Image from "next/image";
import s from './backgroundImage.module.scss'
import BackgroundTextured from './img/background_textured.png'
import BackgroundUntextured from './img/background_untextured.png'
type PropsType = {
    backgroundType: 'textured' | 'untextured'
}

export default ({ backgroundType }: PropsType) => {

    const PROPS = {
        className: s.background, alt: "", fill: true, priority: true, quality: 100
    }

    const getBackground = () => {
        switch (backgroundType) {
            case 'textured':
                return <Image src={BackgroundTextured}{...PROPS} placeholder="blur" />
            default:
                return <Image src={BackgroundUntextured} {...PROPS} placeholder="blur" />
        }
    }

    return <div className={s.backgroundWrapper}>{getBackground()}</div>
}