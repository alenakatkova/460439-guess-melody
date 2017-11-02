

// import { initialState } from '../data/game-data'
// import { updateQuestionIndex, makeMistake, tick } from '../util'
//
// export default class GameModel {
//   constructor(state = initialState) {
//     this.state = state;
//   }
//
//   update(newState) {
//     this.state = newState;
//     return this.state;
//   }
//
//   updateQuestionIndex() {
//     this.update(updateQuestionIndex(this.state));
//   }
//
//   tick() {
//     this.update(tick(this.state));
//   }
//
//   canMakeMistakes() {
//     return this.state.mistakes < 4;
//   }
//
//   makeMistake() {
//     if (this.canMakeMistakes()) {
//       this.update(makeMistake(this.state));
//     }
//   }
// }
