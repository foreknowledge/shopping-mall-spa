export function loadData(key) {
  try {
    return JSON.parse(localStorage.getItem(key));
  } catch (e) {
    console.log(e);
    return null;
  }
}

export function saveData(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}
