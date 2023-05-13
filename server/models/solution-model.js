const {Schema, model} = require('mongoose');

const SolutionSchema = new Schema({
    id: {type: Number, required: true, unique: true},
    likes: {type: Number, default: 0}, // количество лайков у задачи
    users: [String], // массив айдишников пользователей, лайкнувших задачу
    comments: [{id: Number, solutionID: Number, userID: String, comment: String}], // id, комментарий
    taskID: {type: Number},
    author: {type: String},
    isActive: {type: Boolean, default: false} // активна ли кнопка лайка
})

module.exports = model('Solution', SolutionSchema);