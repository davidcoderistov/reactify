import { convertToUnit } from '../util/helpers'
import { NumberOrNumberString } from '../types'

export type MeasurableProps = {
    height?: NumberOrNumberString,
    maxHeight?: NumberOrNumberString,
    maxWidth?: NumberOrNumberString,
    minHeight?: NumberOrNumberString,
    minWidth?: NumberOrNumberString,
    width?: NumberOrNumberString,
}

export function measurableStyles(measurableStylesArg: MeasurableProps): object {
    const styles: Record<string, string> = {}

    const height = convertToUnit(measurableStylesArg.height)
    const minHeight = convertToUnit(measurableStylesArg.minHeight)
    const minWidth = convertToUnit(measurableStylesArg.minWidth)
    const maxHeight = convertToUnit(measurableStylesArg.maxHeight)
    const maxWidth = convertToUnit(measurableStylesArg.maxWidth)
    const width = convertToUnit(measurableStylesArg.width)

    if (height) styles.height = height
    if (minHeight) styles.minHeight = minHeight
    if (minWidth) styles.minWidth = minWidth
    if (maxHeight) styles.maxHeight = maxHeight
    if (maxWidth) styles.maxWidth = maxWidth
    if (width) styles.width = width

    return styles
}