export function getItemFromStorage(key) {
  try {
      return JSON.parse(localStorage.getItem(key));
    } catch (error) {
      console.log('Error when getting data from the storage: ', error);
      localStorage.removeItem(key);
    }
  }
export function setItemToStorage(key, data) {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.log("Error when setting data to the storage: ", error);
  }
}