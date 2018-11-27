module.exports = () => {
  // mapping of all connected clients
  const clients = new Map();

  function addClient(client) {
    console.log('adding client:', client.id);
    clients.set(client.id, { client });
  }

  function removeClient(client) {
    console.log('removing client:', client.id);
    clients.delete(client.id);
  }

  return {
    addClient,
    removeClient
  };
};
