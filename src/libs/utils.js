exports.uniqString = async array => {
  let returnArray = []
  for (let data of array) {
    if (!returnArray.includes(data)) {
      returnArray.push(data)
    }
  }
  return returnArray
}
