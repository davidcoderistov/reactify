
export type ElevatableProps = {
    elevation?: string,
}

export function elevationClasses(elevationArgs: ElevatableProps) {
    const { elevation } = elevationArgs
    if (elevation == null) return {}
    if (isNaN(parseInt(elevation))) return {}
    return { [`elevation-${elevation}`]: true }
}