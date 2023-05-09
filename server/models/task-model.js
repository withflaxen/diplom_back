const {Schema, model} = require("mongoose"); // Импорт библиотеки mongoose

// Создание схемы задачи
const TaskSchema = new Schema({
    id: {type: Number, required: true, unique: true}, // Поле для номера задачи
    title: {type: String, required: false}, // Поле для названия задачи
    description: {type: String, required: false}, // Поле для описания задачи
    testName: {type: String, required: false}, // Поле для имени файла с тестами для задачи
    // functionName: {type: String, required: false}, // Поле для названия задачи
    // arguments: [{type: String}], // массив строк
    difficulty: {type: String, enum: ["easy", "medium", "hard"], required: false}, // Поле для сложности задачи
    examples: [String], // массив строк с примерами решений
    likes: [Number] // массив чисел для хранения id пользователей, лайкнувших задачу

    // solutions: {} // массив добавить новую модель для решений [SolutionModel]
});

// Создание модели для задачи на основе схемы
module.exports = model('Task', TaskSchema);