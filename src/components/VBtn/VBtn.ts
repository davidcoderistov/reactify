import React from 'react'

// Styles
import './VBtn.sass'

// Components
import VProgressCircular from '../VProgressCircular/VProgressCircular'

// Types
import  { ElevatableProps } from '../../mixins/elevatable'
import { PositionableProps } from '../../mixins/positionable'
import { SizeableProps } from '../../mixins/sizeable'
import { MeasurableProps } from '../../mixins/measurable'
import { ColorableProps } from '../../mixins/colorable'

// Mixins
import { elevationClasses } from '../../mixins/elevatable'
import { sizeableClasses } from '../../mixins/sizeable'
import { measurableStyles } from '../../mixins/measurable'
import {
    setBackgroundColor,
    setTextColor
} from '../../mixins/colorable'
import classNames from "classnames";

type VBtnProps = {
    block?: boolean,
    depressed?: boolean,
    disabled?: boolean,
    fab?: boolean,
    icon?: boolean,
    loading?: boolean,
    outlined?: boolean,
    plain?: boolean,
    rounded?: boolean,
    tag?: string,
    text?: boolean,
    tile?: boolean,
    type?: string,
    children?: any,
} & ElevatableProps & PositionableProps & SizeableProps & MeasurableProps & ColorableProps

export default function VBtn(props: VBtnProps) {
    // Props
    const {
        elevation,
        absolute = false,
        bottom = false,
        fixed = false,
        left = false,
        right = false,
        top = false,
        large = false,
        small = false,
        xLarge = false,
        xSmall = false,
        block = false,
        depressed = false,
        disabled = false,
        fab = false,
        icon = false,
        loading = false,
        outlined = false,
        plain = false,
        rounded = false,
        tag = 'button',
        text = false,
        tile = false,
        height,
        maxHeight,
        maxWidth,
        minHeight,
        minWidth,
        width,
        color,
        children
    } = props

    // Computed
    const isElevated: boolean = Boolean(
        !icon &&
        !text &&
        !outlined &&
        !depressed &&
        !disabled &&
        !plain &&
        (elevation == null || Number(elevation) > 0)
    )

    const isRound: boolean =  Boolean(
        icon ||
        fab
    )

    const hasBg: boolean = Boolean(
        !text &&
        !plain &&
        !outlined &&
        !icon
    )

    // Classes
    const classes = {
        'v-btn': true,
        'v-btn--absolute': absolute,
        'v-btn--block': block,
        'v-btn--bottom': bottom,
        'v-btn--disabled': disabled,
        'v-btn--is-elevated': isElevated,
        'v-btn--fab': fab,
        'v-btn--fixed': fixed,
        'v-btn--has-bg': hasBg,
        'v-btn--icon': icon,
        'v-btn--left': left,
        'v-btn--loading': loading,
        'v-btn--outlined': outlined,
        'v-btn--plain': plain,
        'v-btn--right': right,
        'v-btn--round': isRound,
        'v-btn--rounded': rounded,
        'v-btn--text': text,
        'v-btn--tile': tile,
        'v-btn--top': top,
        ...elevationClasses({ elevation }),
        ...sizeableClasses({ large, small ,xLarge, xSmall }),
    }

    // Styles
    const styles = measurableStyles({
        height,
        maxHeight,
        maxWidth,
        minHeight,
        minWidth,
        width
    })

    // Methods
    function genContent() {
        return React.createElement('span', {
            className: 'v-btn__content'
        }, children)
    }

    function genLoader() {
        return React.createElement('span', {
            className: 'v-btn__loader',
        }, [React.createElement(VProgressCircular, {
            indeterminate: true,
            size: 23,
            width: 2,
        })])
    }

    const setColor = hasBg
        ? setBackgroundColor
        : setTextColor

    const data = disabled ? { style: styles, class: classes } : setColor(color, { style: styles, class: classes })
    const injProps = {
        style: data.style,
        className: classNames(data.class)
    }

    return React.createElement(tag, injProps, [
        genContent(),
        loading && genLoader(),
    ])
}

