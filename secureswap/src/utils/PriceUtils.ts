export const StrToPrice = (str: string): number => {
    // Remove any non-numeric characters (e.g., commas, currency symbols)
    const numericStr = str.replace(/[^0-9.]/g, '');

    // Parse the numeric string to a floating-point number
    const price = parseFloat(numericStr);

    // Return the parsed price
    return price;
};

export const PricetoStr = (price: number): string => {
    // Convert the numeric price to a string
    const priceStr = price.toString();

    // Return the string representation of the price
    return priceStr;
};
