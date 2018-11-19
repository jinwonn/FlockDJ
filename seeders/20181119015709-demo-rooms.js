'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('Rooms', [{
        roomName: 'LandenFM',
        queue: '["4jtyUzZm9WLc2AdaJ1dso7", "5J5PXmMdQ2nh1lZOal8KmK", "00BnfL75e8vHSGCmwUWbEk"]',
        staged: '{songuri: "5InOp6q2vvx0fShv3bzFLZ", duration: "4:35"}',
        playing: '{songuri: "5MYFw4T2gy52pOGBN4EYHS", started_at: "timeInUTC", duration: "3:56"}',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        roomName: 'DanielFM',
        queue: '["34x6hEJgGAOQvmlMql5Ige", "15MJ5NThPjj6xhPcts8MiY", "1QEEqeFIZktqIpPI4jSVSF"]',
        staged: '{songuri: "52AnIIw8DR1eP8ZB2tAXfK", duration: "4:39"}',
        playing: '{songuri: "1FosdTKXsQFtV8RGDyWZuO", started_at: "timeInUTC", duration: "6:20"}',
        createdAt: new Date(),
        updatedAt: new Date()
      }], {});
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('Rooms', null, {});
  }
};
