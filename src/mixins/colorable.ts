import { VNodeData } from '../types'
import { isCssColor } from '../util/colorUtils'

export type ColorableProps = {
    color?: string,
}

export function setBackgroundColor(color?: string | false, data: VNodeData = {}): VNodeData {
    if (isCssColor(color)) {
        data.style = {
            ...data.style as object,
            'backgroundColor': `${color}`,
            'borderColor': `${color}`,
        }
    } else if (color) {
        data.class = {
            ...data.class,
            [color]: true,
        }
    }
    return data
}

export function setTextColor (color?: string | false, data: VNodeData = {}): VNodeData {
    if (isCssColor(color)) {
        data.style = {
            ...data.style as object,
            color: `${color}`,
            'caretColor': `${color}`,
        }
    } else if (color) {
        const [colorName, colorModifier] = color.toString().trim().split(' ', 2) as (string | undefined)[]
        data.class = {
            ...data.class,
            [colorName + '--text']: true,
        }
        if (colorModifier) {
            data.class = {
                ...data.class,
                ['text--' + colorModifier]: true,
            }
        }
    }
    return data
}