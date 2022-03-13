import { formatNumberCurrency } from './FormatNumberCurrency';

export function calculatePriceRoudingDown(price: number) {
  return formatNumberCurrency(price - price * 0.1);
}
