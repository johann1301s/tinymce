
/**
 * Function that insures that the provided promise either is rejected or fulfilled only if a provided timout has passed.
 * 
 * ```
 * const result = await minTime(fetch('/example'), 1000)
 * ```
 */

export const minTime = async <T>(promise: Promise<T>, timeout: number) => {
    const [result] = await Promise.allSettled([promise, new Promise<void>((resolve) => {
        setTimeout(() => resolve(), timeout)
    })])

    if (result.status === 'rejected') {
        throw new Error(result.reason)
    }

    return result.value
}
