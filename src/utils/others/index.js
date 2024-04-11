class Store {
  constructor() {
    this.data = new Map();
    this.linsters = new Map();
  }
  addKey(key, value) {
    this.data.set(key, value);
  }
  update(key, value) {
    let originValue = this.data.get(key);
    this.data.set(key, value);
    const linsters = this.linsters.get(key) || [];
    if (linsters.length > 0) {
      linsters.forEach((callback) => {
        callback(originValue, value);
      });
    }
  }
  addUpdateLinsters(key, callback) {
    let linsters = this.linsters.get(key) || [];
    linsters.push(callback);
    this.linsters.set(key, linsters);
  }
  delete(key) {
    this.data.delete(key);
    this.linsters.delete(key);
  }
}
