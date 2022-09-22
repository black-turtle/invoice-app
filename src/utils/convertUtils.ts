export function convertToDate(ms?: number) {
    if (!ms) return ''

    let date = new Date(ms)
    return date.toISOString().split('T')[0].split('-').join('/')
}
const currencyFormatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
})
export function convertToCurrency(value: number | string) {
    return currencyFormatter.format(+value)
}
