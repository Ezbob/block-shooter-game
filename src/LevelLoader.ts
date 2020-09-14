import AjvValidator from './jsonValidators/AjvValidator';
import LevelSchema from './jsonValidators/LevelSchema.json';

export default class LevelLoader {
  private levelValidator = AjvValidator.compile(LevelSchema);

  async loadFromJson(_filename: string) {
    let data = await fetch('data/map1.json').then(response => response.json());

    let isVector = this.levelValidator(data);

    console.log(isVector);
    if (!isVector) {
      console.log(this.levelValidator.errors)
    }

    return data;
  }
};