class PersistentStorege {
  get(key) {
    return window.localStorage.getItem(key);
  }

  save(key, value) {
    return window.localStorage.setItem(key, value);
  }
  
  remove(key) {
    return window.localStorage.removeItem(key);
  }
}

export default PersistentStorege;
