module.exports = function ({ name, image }) {
  const members = new Map()
  
  function addUser(client) {
    members.set(client.id, client)
  }

  function removeUser(client) {
    members.delete(client.id)
  }

  function serialize() {
    return {
      name,
      numMembers: members.size
    }
  }

  return {
    broadcastMessage,
    addUser,
    removeUser,
    serialize
  }
}
