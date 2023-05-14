const {Schema, model} = require("mongoose"); // Импорт библиотеки mongoose

// Создание схемы задачи
const TaskSchema = new Schema({
    id: {type: Number, required: true, unique: true}, // Поле для номера задачи
    title: {type: String, required: false}, // Поле для названия задачи
    description: {type: String, required: false}, // Поле для описания задачи
    testName: {type: String, required: false}, // Поле для имени файла с тестами для задачи
    difficulty: {type: String, enum: ["easy", "medium", "hard"], required: false}, // Поле для сложности задачи
    solutions: [Number], // массив айди с решениями к задаче
    users: [String], // массив айдишников пользователей, решивших задачу
    name: {type: String}, // имя функции
    args: [String] // аргументы функции
});

// Создание модели для задачи на основе схемы
module.exports = model('Task', TaskSchema);