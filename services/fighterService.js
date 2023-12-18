import { fighterRepository } from "../repositories/fighterRepository.js";

class FighterService {
  getAllFighters() {
    return fighterRepository.getAll();
  }

  search(search) {
    const item = fighterRepository.getOne(search);
    if (!item) {
      return null;
    }
    return item;
  }

  createFighter(data) {
    return fighterRepository.create(data);
  }

  updateFighter(fighterId, data) {
    const existingFighter = this.search({id: fighterId});
    if (existingFighter) {
      const updatedFighter = { ...existingFighter, ...data };
      fighterRepository.update(fighterId, updatedFighter);
      return updatedFighter;
    }
    return null
  }

  deleteFighter(id) {
    const deletedFighter = fighterRepository.delete(id);
    return deletedFighter;
  }  
}

const fighterService = new FighterService();

export { fighterService };
