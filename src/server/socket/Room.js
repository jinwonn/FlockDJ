module.exports = function ({ name }) {
  const members = new Map()
  
  function addUser(client) {
    console.log("adding user to room:", client.id)
    members.set(client.id, client)
  }

  function removeUser(client) {
    console.log("removing user from room:", client.id)
    members.delete(client.id)
  }

  function serialize() {
    return {
      name,
      numberofMembers: members.size
    }
  }

  return {
    addUser,
    removeUser,
    serialize
  }
}
