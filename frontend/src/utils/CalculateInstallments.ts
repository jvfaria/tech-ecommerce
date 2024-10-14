import { formatNumberCurrency } from './FormatNumberCurrency';

export function calculateInstallments(price: number) {
  return formatNumberCurrency(price / 12);
}
