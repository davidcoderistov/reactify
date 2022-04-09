import React from 'react'

// Styles
import './VProgressCircular.sass'

// Mixins
import { setTextColor } from '../../mixins/colorable'

// Utils
import { convertToUnit } from '../../util/helpers'
import classNames from 'classnames'

// Types
import { ColorableProps } from '../../mixins/colorable'

type VProgressCircularProps = {
    button?: boolean,
    indeterminate?: boolean,
    rotate?: number | string,
    size?: number | string,
    width?: number | string,
    value?: number | string,
    children?: any,
} & ColorableProps

export function VProgressCircular(props: VProgressCircularProps) {
    // Props
    const {
        color,
        button = false,
        indeterminate = false,
        rotate = 0,
        size = 32,
        width = 4,
        value = 0,
        children
    } = props

    // Computed
    const radius = 20
    const isVisible = true
    const calculatedSize = Number(size) + (button ? 8 : 0)
    const circumference = 2 * Math.PI * radius
    const classes = {
        'v-progress-circular': true,
        'v-progress-circular--visible': isVisible,
        'v-progress-circular--indeterminate': indeterminate,
        'v-progress-circular--button': button,
    }
    const normalizedValue = value < 0 ? 0 : value > 100 ? 100 : typeof value === 'string' ? parseFloat(value) : value
    const strokeDashArray = Math.round(circumference * 1000) / 1000
    const strokeDashOffset = ((100 - normalizedValue) / 100) * circumference + 'px'
    const viewBoxSize = radius / (1 - Number(width) / + size)
    const strokeWidth = Number(width) / + size * viewBoxSize * 2
    const styles = {
        height: convertToUnit(calculatedSize),
        width: convertToUnit(calculatedSize),
    }
    const svgStyles = {
        transform: `rotate(${Number(rotate)}deg)`,
    }

    // Methods
    function genCircle (name: string, offset: string | number) {
        return React.createElement('circle', {
            key: 'uniqueCircleKey',
            className: `v-progress-circular__${name}`,
            fill: 'transparent',
            cx: 2 * viewBoxSize,
            cy: 2 * viewBoxSize,
            r: radius,
            'strokeWidth': strokeWidth,
            'strokeDasharray': strokeDashArray,
            'strokeDashoffset': offset,
        })
    }

    function genSvg () {
        const children = [
            indeterminate || genCircle('underlay', 0),
            genCircle('overlay', strokeDashOffset),
        ]

        return React.createElement('svg', {
            key: 'uniqueSvgKey',
            style: svgStyles,
            xmlns: 'http://www.w3.org/2000/svg',
            viewBox: `${viewBoxSize} ${viewBoxSize} ${2 * viewBoxSize} ${2 * viewBoxSize}`,
        }, children)
    }

    function genInfo () {
        return React.createElement('div', {
            key: 'uniqueInfoKey',
            className: 'v-progress-circular__info',
        }, children)
    }

    // Render
    const data = setTextColor(color, {
        attrs: {
            role: 'progressbar',
            'aria-valuemin': 0,
            'aria-valuemax': 100,
            'aria-valuenow': indeterminate ? undefined : normalizedValue,
        },
        class: classes,
        style: styles,
    })

    const injProps = {
        ...data.attrs,
        style: data.style,
        className: classNames(data.class),
    }

    return React.createElement('div', injProps, [
        genSvg(),
        genInfo()
    ])
}