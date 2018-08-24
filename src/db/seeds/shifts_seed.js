const config = require('../../config');

exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex(config.db.shifts).del()
    .then(function() {
      // Inserts seed entries
      return knex(config.db.shifts).insert([
        {
          id: 'Z003',
          month: 8,
          day: 11,
          morning: true,
          status: 'working'
        },
        {
          id: 'L004',
          month: 8,
          day: 11,
          morning: true,
          status: 'waiting'
        },
        {
          id: 'W005',
          month: 8,
          day: 11,
          morning: true,
          status: 'studying'
        },
        {
          id: 'Z006',
          month: 8,
          day: 11,
          morning: true,
          status: 'studying'
        },

        {
          id: 'Z003',
          month: 8,
          day: 11,
          morning: false,
          status: 'studying'
        },
        {
          id: 'L004',
          month: 8,
          day: 11,
          morning: false,
          status: 'studying'
        },
        {
          id: 'W005',
          month: 8,
          day: 11,
          morning: false,
          status: 'studying'
        },
        {
          id: 'Z006',
          month: 8,
          day: 11,
          morning: false,
          status: 'studying'
        },

        {
          id: 'Z003',
          month: 8,
          day: 12,
          morning: true,
          status: 'studying'
        },
        {
          id: 'L004',
          month: 8,
          day: 12,
          morning: true,
          status: 'working'
        },
        {
          id: 'W005',
          month: 8,
          day: 12,
          morning: true
        },
        {
          id: 'Z006',
          month: 8,
          day: 12,
          morning: true,
          status: 'waiting'
        },

        {
          id: 'Z003',
          month: 8,
          day: 12,
          morning: false
        },
        {
          id: 'L004',
          month: 8,
          day: 12,
          morning: false
        },
        {
          id: 'W005',
          month: 8,
          day: 12,
          morning: false
        },
        {
          id: 'Z006',
          month: 8,
          day: 12,
          morning: false,
          status: 'working'
        },

        {
          id: 'Z003',
          month: 8,
          day: 13,
          morning: true
        },
        {
          id: 'L004',
          month: 8,
          day: 13,
          morning: true
        },
        {
          id: 'W005',
          month: 8,
          day: 13,
          morning: true
        },
        {
          id: 'Z006',
          month: 8,
          day: 13,
          morning: true
        },

        {
          id: 'Z003',
          month: 8,
          day: 13,
          morning: false
        },
        {
          id: 'L004',
          month: 8,
          day: 13,
          morning: false,
          status: 'working'
        },
        {
          id: 'W005',
          month: 8,
          day: 13,
          morning: false,
          status: 'waiting'
        },
        {
          id: 'Z006',
          month: 8,
          day: 13,
          morning: false
        },

        {
          id: 'Z003',
          month: 8,
          day: 4,
          morning: true
        },
        {
          id: 'L004',
          month: 8,
          day: 4,
          morning: true
        },
        {
          id: 'W005',
          month: 8,
          day: 4,
          morning: true
        },
        {
          id: 'Z006',
          month: 8,
          day: 4,
          morning: true
        },

        {
          id: 'Z003',
          month: 8,
          day: 4,
          morning: false
        },
        {
          id: 'L004',
          month: 8,
          day: 4,
          morning: false
        },
        {
          id: 'W005',
          month: 8,
          day: 4,
          morning: false
        },
        {
          id: 'Z006',
          month: 8,
          day: 4,
          morning: false
        },

        {
          id: 'Z003',
          month: 8,
          day: 14,
          morning: true
        },
        {
          id: 'L004',
          month: 8,
          day: 14,
          morning: true
        },
        {
          id: 'W005',
          month: 8,
          day: 14,
          morning: true
        },
        {
          id: 'Z006',
          month: 8,
          day: 14,
          morning: true,
          status: 'studying'
        },

        {
          id: 'Z003',
          month: 8,
          day: 14,
          morning: false
        },
        {
          id: 'L004',
          month: 8,
          day: 14,
          morning: false
        },
        {
          id: 'W005',
          month: 8,
          day: 14,
          morning: false
        },
        {
          id: 'Z006',
          month: 8,
          day: 14,
          morning: false,
          status: 'waiting'
        },

        {
          id: 'Z003',
          month: 8,
          day: 15,
          morning: true
        },
        {
          id: 'L004',
          month: 8,
          day: 15,
          morning: true
        },
        {
          id: 'W005',
          month: 8,
          day: 15,
          morning: true
        },
        {
          id: 'Z006',
          month: 8,
          day: 15,
          morning: true
        },

        {
          id: 'Z003',
          month: 8,
          day: 15,
          morning: false,
          status: 'working'
        },
        {
          id: 'L004',
          month: 8,
          day: 15,
          morning: false
        },
        {
          id: 'W005',
          month: 8,
          day: 15,
          morning: false
        },
        {
          id: 'Z006',
          month: 8,
          day: 15,
          morning: false
        },

        {
          id: 'Z003',
          month: 8,
          day: 16,
          morning: true
        },
        {
          id: 'L004',
          month: 8,
          day: 16,
          morning: true,
        },
        {
          id: 'W005',
          month: 8,
          day: 16,
          morning: true,
          status: 'waiting'
        },
        {
          id: 'Z006',
          month: 8,
          day: 16,
          morning: true
        },

        {
          id: 'Z003',
          month: 8,
          day: 16,
          morning: false,
          status: 'studying'
        },
        {
          id: 'L004',
          month: 8,
          day: 16,
          morning: false
        },
        {
          id: 'W005',
          month: 8,
          day: 16,
          morning: false
        },
        {
          id: 'Z006',
          month: 8,
          day: 16,
          morning: false
        },

        {
          id: 'Z003',
          month: 8,
          day: 17,
          morning: true
        },
        {
          id: 'L004',
          month: 8,
          day: 17,
          morning: true
        },
        {
          id: 'W005',
          month: 8,
          day: 17,
          morning: true
        },
        {
          id: 'Z006',
          month: 8,
          day: 17,
          morning: true
        },

        {
          id: 'Z003',
          month: 8,
          day: 17,
          morning: false
        },
        {
          id: 'L004',
          month: 8,
          day: 17,
          morning: false
        },
        {
          id: 'W005',
          month: 8,
          day: 17,
          morning: false
        },
        {
          id: 'Z006',
          month: 8,
          day: 17,
          morning: false
        },

        {
          id: 'Z003',
          month: 8,
          day: 18,
          morning: true
        },
        {
          id: 'L004',
          month: 8,
          day: 18,
          morning: true
        },
        {
          id: 'W005',
          month: 8,
          day: 18,
          morning: true
        },
        {
          id: 'Z006',
          month: 8,
          day: 18,
          morning: true
        },

        {
          id: 'Z003',
          month: 8,
          day: 18,
          morning: false
        },
        {
          id: 'L004',
          month: 8,
          day: 18,
          morning: false
        },
        {
          id: 'W005',
          month: 8,
          day: 18,
          morning: false
        },
        {
          id: 'Z006',
          month: 8,
          day: 18,
          morning: false
        },

        {
          id: 'Z003',
          month: 8,
          day: 19,
          morning: true
        },
        {
          id: 'L004',
          month: 8,
          day: 19,
          morning: true
        },
        {
          id: 'W005',
          month: 8,
          day: 19,
          morning: true
        },
        {
          id: 'Z006',
          month: 8,
          day: 19,
          morning: true
        },

        {
          id: 'Z003',
          month: 8,
          day: 19,
          morning: false
        },
        {
          id: 'L004',
          month: 8,
          day: 19,
          morning: false
        },
        {
          id: 'W005',
          month: 8,
          day: 19,
          morning: false
        },
        {
          id: 'Z006',
          month: 8,
          day: 19,
          morning: false
        }
      ]);
    });
};
