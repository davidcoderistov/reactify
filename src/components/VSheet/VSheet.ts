import React from 'react'

// Styles
import './VSheet.sass'

// Utils
import classNames from 'classnames'

// Mixins
import { setBackgroundColor } from '../../mixins/colorable'
import { roundedClasses } from '../../mixins/roundable'
import { elevationClasses } from '../../mixins/elevatable'
import { measurableStyles } from '../../mixins/measurable'

// Types
import { ColorableProps } from '../../mixins/colorable'
import { ElevatableProps } from '../../mixins/elevatable'
import { MeasurableProps } from '../../mixins/measurable'
import { RoundableProps } from '../../mixins/roundable'

// VSheet props type
type VSheetProps = {
    outlined?: boolean,
    shaped?: boolean,
    tag?: string,
    children?: any,
} & ColorableProps & ElevatableProps & MeasurableProps & RoundableProps

export default function VSheet(props: VSheetProps) {
    const {
        outlined = false,
        shaped = false,
        tag = 'div',
        color,
        elevation,
        height = 100,
        maxHeight,
        maxWidth,
        minHeight,
        minWidth,
        width = 100,
        rounded,
        tile = false,
        children,
    } = props

    // Classes
    const classes: object = {
        'v-sheet': true,
        'v-sheet--outlined': outlined,
        'v-sheet--shaped': shaped,
        ...elevationClasses({ elevation }),
        ...roundedClasses({ rounded, tile }),
    }

    // Styles
    const styles = measurableStyles({
        height,
        maxHeight,
        maxWidth,
        minHeight,
        minWidth,
        width,
    })

    const data = setBackgroundColor(color, { style: styles, class: classes })
    const injProps = {
        style: data.style,
        className: classNames(data.class)
    }

    return React.createElement(tag, injProps, children)
}

