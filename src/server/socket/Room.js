module.exports = function ({ name }) {
  const members = new Map()
  let chatHistory = []

  function broadcastMessage(message) {
    console.log("broadcasting message to all users in the room")
    members.forEach(m => m.emit('message', message))

  }

  function addEntry(entry) {
    chatHistory = chatHistory.concat(entry)
    console.log(chatHistory)
  }

  function getChatHistory() {
    return chatHistory.slice()
  }

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
    broadcastMessage,
    addEntry,
    getChatHistory,
    addUser,
    removeUser,
    serialize
  }
}
