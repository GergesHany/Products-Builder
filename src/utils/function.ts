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