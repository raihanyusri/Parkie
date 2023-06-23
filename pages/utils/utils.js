export function toTitleCase(str) {
    const titleCase = str
    .toString()
    .toLowerCase()
    .split(' ')
    .map(word => {
    return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(' ');
  
    return titleCase;
}
