/**
 * @param {string} txt: Text to display 
 * @param {number} max: Maximum number of characters to display
 * @returns {string}: Text after slicing
*/

export function txtSlicer(txt: string, max: number = 50) : string {
  if (txt.length > max) {
    return txt.slice(0, max) + '...';
  }
  return txt; 
}


/**
 * @param {number} num: Number to format
 * @returns {string}: Formatted number with commas
*/

export function dotesNumber(num: string): string {
  return num.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}