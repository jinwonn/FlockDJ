'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

      return queryInterface.bulkInsert('Users', [{
        name: 'Adi Bakija',
        oauth: '1F2a3k4e5o6auth7key',
        profilePic: 'picOfAdiCrying.png',
        createdAt: new Date(),
        updatedAt: new Date(),
        roomId: 1
      },
      {
        name: 'Jai Rajan',
        oauth: 'th15is91883R15h123fak3',
        profilePic: 'https://media.licdn.com/dms/image/C4D03AQGxHYnjg0iM6w/profile-displayphoto-shrink_200_200/0?e=1544659200&v=beta&t=I9eBzeNRTJAjgTXzjvkAa1hUED6Qk6vWEWbtCln9T2A',
        createdAt: new Date(),
        updatedAt: new Date(),
        roomId: 2
      },
      {
        name: 'Daniel Nguyen',
        oauth: '123sickdude123dope',
        profilePic: 'somethingShouldprobablygoHere.png',
        createdAt: new Date(),
        updatedAt: new Date(),
        roomId: 2
      },
      {
        name: 'Landen Danyluk',
        oauth: '123sickdudealso123',
        profilePic: 'picOfLandenPickingNoseGotcha.jpg',
        createdAt: new Date(),
        updatedAt: new Date(),
        roomId: 1
      },
      {
        name: 'Fake Person',
        oauth: '123boring123123',
        profilePic: 'apicturegoeshere.png',
        createdAt: new Date(),
        updatedAt: new Date(),
        roomId: 1
      }], {});

  },

  down: (queryInterface, Sequelize) => {

      return queryInterface.bulkDelete('Users', null, {});

  }
};
