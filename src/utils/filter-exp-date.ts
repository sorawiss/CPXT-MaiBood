export function filterExpDate(items: any) {
    const today = new Date()
    const threeDays = new Date()
    threeDays.setDate(today.getDate() + 3)

    const expSoon = items.filter((item: any) => {
        const itemExpDate = new Date(item.exp_date)
        return itemExpDate <= threeDays
    })

    return expSoon.length
}