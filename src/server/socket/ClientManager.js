module.exports = () => {
  // mapping of all connected clients
  const clients = new Map();

  function addClient(client) {
    console.log('Connecting client:', client.id);
    clients.set(client.id, { client });
  }

  function removeClient(client) {
    console.log('Disconnecting client:', client.id);
    clients.delete(client.id);
  }

  return {
    addClient,
    removeClient
  };
};
