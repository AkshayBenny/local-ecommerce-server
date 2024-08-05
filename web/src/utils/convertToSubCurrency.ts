export const convertToSubCurrency = (
	amount: number | undefined,
	factor = 100
) => {
	if (amount !== undefined) {
		return Math.round(amount * factor)
	}
}
