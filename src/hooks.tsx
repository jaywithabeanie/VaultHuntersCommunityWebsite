import { useEffect, useState } from "react"

export const Dimensions = () => {
    const [dimensions, setDimensions] = useState({ width: typeof window !== 'undefined' ? window.innerWidth : 1440, height: typeof window !== 'undefined' ? window.innerHeight : 1280 })

    useEffect(() => {
        let i: () => void;
        if (typeof window !== 'undefined') setDimensions({ width: window.innerWidth, height: window.innerHeight })
        window.addEventListener('resize', i = () => setDimensions({ width: window.innerWidth, height: window.innerHeight }))
        return () => window.removeEventListener('resize', i)
    }, [])

    return dimensions
}