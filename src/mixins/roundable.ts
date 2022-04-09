

export type RoundableProps = {
    rounded?: boolean | string,
    tile?: boolean,
}

export function roundedClasses(roundableArgs: RoundableProps): Record<string, boolean> {
    const composite = []
    const rounded = typeof roundableArgs.rounded === 'string'
        ? String(roundableArgs.rounded)
        : roundableArgs.rounded

    if (roundableArgs.tile) {
        composite.push('rounded-0')
    } else if (typeof rounded === 'string') {
        const values = rounded.split(' ')

        for (const value of values) {
            composite.push(`rounded-${value}`)
        }
    } else if (rounded) {
        composite.push('rounded')
    }

    return composite.length > 0 ? {
        [composite.join(' ')]: true,
    } : {}
}