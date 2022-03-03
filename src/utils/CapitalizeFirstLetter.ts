export function capitalizeFirstLetter(word: string) {
  return word.charAt(0)
    .toUpperCase()
    .concat(word.slice(1).toLowerCase());
}
