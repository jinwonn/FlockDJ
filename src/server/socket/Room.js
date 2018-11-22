module.exports = function ({ name }) {
  const members = new Map()
  let chatHistory = []

  function broadcastMessage(message) {
    console.log("broadcasting: (", message, ") to members")
    members.forEach(m => m.emit('message', message))
  }

  function addEntry(entry) {
    console.log("adding entry", entry)
    chatHistory = chatHistory.concat(entry)
    console.log("chat histtory:", chatHistory)
  }

  function getChatHistory() {
    console.log("getting chat history, got:", chatHistory.slice())
    return chatHistory.slice()
  }

  function addUser(client) {
    // console.log("adding", client.id, "to room.", "# of members of room:", members.size)
    members.set(client.id, client)
    console.log("addUser(client). now # of members of room:", members.size)
  }

  function removeUser(client) {
    // console.log("removing user from room:", client.id)
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
