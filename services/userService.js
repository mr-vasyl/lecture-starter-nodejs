import { userRepository } from "../repositories/userRepository.js";

class UserService {
  // TODO: Implement methods to work with user

  createUser(data) {
    return userRepository.create(data);
  }
  getAllUsers() {
    return userRepository.getAll();
  }

  updateUser(userId, data) {
    const existingUser = this.search({id: userId});
    if (existingUser) {
      const updatedUser = { ...existingUser, ...data };
      userRepository.update(userId, updatedUser);
      return updatedUser;
    }
    return null
  }

  search(search) {
    const item = userRepository.getOne(search);
    if (!item) {
      return null;
    }
    return item;
  }
  deleteUser(id) {
    const deletedUser = userRepository.delete(id);
    return deletedUser;
  }
}
const userService = new UserService();
export { userService };
