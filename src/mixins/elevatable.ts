
export type ElevatableProps = {
    elevation?: string,
}

export function getElevationClasses(elevation: string) {
    if (elevation == null) return {}
    if (isNaN(parseInt(elevation))) return {}
    return { [`elevation-${elevation}`]: true }
}