function generateID(): string {
  function generateRandomDigits() {
    return Math.floor(1000 + Math.random() * 900000);
  }

  return generateRandomDigits().toString();
}

export default generateID;
