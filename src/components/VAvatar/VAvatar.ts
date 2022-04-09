import React from 'react'
import './VAvatar.sass'

// Utilities
import { convertToUnit } from '../../util/helpers'
import classNames from 'classnames'

// Mixins
import { setBackgroundColor } from '../../mixins/colorable'
import { measurableStyles } from '../../mixins/measurable'
import { roundedClasses } from '../../mixins/roundable'

// Types
import { ReactNode } from 'react'
import { ColorableProps } from '../../mixins/colorable'
import { MeasurableProps } from '../../mixins/measurable'
import { RoundableProps } from '../../mixins/roundable'

type VAvatarProps = {
    left?: boolean,
    right?: boolean,
    size?: number | string,
    children?: any,
} & ColorableProps & MeasurableProps & RoundableProps

export default function VAvatar(props: VAvatarProps) {
    const {
        left = false,
        right = false,
        size = 48,
        color,
        height,
        maxHeight,
        maxWidth,
        minHeight,
        minWidth,
        width,
        rounded,
        tile = false,
        children,
    } = props

    const classes: object = {
        'v-avatar': true,
        'v-avatar--left': left,
        'v-avatar--right': right,
        ...roundedClasses({ rounded: rounded, tile: tile }),
    }

    const styles: object = {
        height: convertToUnit(size),
        minWidth: convertToUnit(size),
        width: convertToUnit(size),
        ...measurableStyles({
            height: height,
            maxHeight: maxHeight,
            maxWidth: maxWidth,
            minHeight: minHeight,
            minWidth: minWidth,
            width: width,
        }),
    }

    const data = setBackgroundColor(color, { style: styles, class: classes })
    const injProps = {
        style: data.style,
        className: classNames(data.class)
    }

    return React.createElement('div', injProps, children)
}