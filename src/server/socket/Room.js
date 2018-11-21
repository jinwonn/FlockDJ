module.exports = function ({ name}) {
  const members = new Map()
  
  function serialize() {
    return {
      name,
      numberofMembers: members.size
    }
  }

  return {
    serialize
  }
}
