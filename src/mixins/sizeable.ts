
export type SizeableProps = {
    large?: boolean,
    small?: boolean,
    xLarge?: boolean,
    xSmall?: boolean,
}

export function medium(props: SizeableProps): boolean {
    return Boolean(
        !props.xSmall &&
        !props.small &&
        !props.large &&
        !props.xLarge
    )
}

export function sizeableClasses(props: SizeableProps): object {
    return {
        'v-size--x-small': props.xSmall,
        'v-size--small': props.small,
        'v-size--default': medium(props),
        'v-size--large': props.large,
        'v-size--x-large': props.xLarge,
    }
}