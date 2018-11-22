module.exports = function ({ name }) {
  const members = new Map()
  let chatHistory = []

  function broadcastMessage(message) {
    ("broadcasting: (", message, ") to ", members)
    members.forEach(m => m.emit('message', message))
  }

  function addEntry(entry) {
    console.log("adding entry", entry)
    chatHistory = chatHistory.concat(entry)
  }

  function getChatHistory() {
    console.log("getting chat history")
    return chatHistory.slice()
  }

  function addUser(client) {
    console.log("adding", client.id, "to room.", "# of members of room:", members.size)
    members.set(client.id, client)
    console.log("# of members of room:", members.size)
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
