const knex = require('../connection');
const config = require('../../config');

module.exports = {
  /**
   * @param filter A filter object of user information
   * @param withoutPassword Return user info without password, should always be true unless for verification use
   * @return An array of users that match the filter
   */
  findUser(filter, withoutPassword = true) {
    if(withoutPassword) {
      return knex(config.db.users).where(filter).select(
        'id',
        'name',
        'identify',
        'phone_number',
        'language',
        'session',
        'email',
        'school',
        'password_changed_times',
        'reputation'
      );  
    }
    return knex(config.db.users).where(filter).select();

  },

  /**
   * @param withoutPassword Return user info without password, should always be true unless for verification use
   * @return All users in the database
   */
  getAllUsers(withoutPassword = true) {
    if(withoutPassword) {
      return knex(config.db.users).select(
        'id',
        'name',
        'identify',
        'phone_number',
        'language',
        'session',
        'email',
        'school',
        'password_changed_times',
        'reputation'
      );
    }
    return knex(config.db.users).select();
  },

  addUsers(users) {
    return knex(config.db.users).insert(users);
  },

  /**
   * Delete user(s) using filter.
   * @param filter A filter object of user information.
   * @return An array of users deleted.
   */
  async deleteUsers(filter) {
    let deletedUsers = await this.findUser(filter, true);
    await knex(config.db.users).where(filter).del();
    return deletedUsers;
  },

  /**
   * Update user.
   * @return The updated user.
   */
  async updateUser(user, oldId) {
    await knex(config.db.users)
      .where({id: oldId})
      .update(user);
    return this.findUser({id: user.id});
  }
};