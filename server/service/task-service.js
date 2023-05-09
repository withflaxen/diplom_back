const TaskModel = require("../models/task-model");
const shell = require("shelljs");
const fs = require("fs"); // Импорт модели для задачи

// Создание сервиса для задачи
class TaskService {

    // Метод для получения всех задач
    async getAllTasks() {
        const tasks = await TaskModel.find(); // Находим все задачи в базе данных
        return tasks; // Возвращаем массив задач
    }

    // Метод для получения задачи по id
    async getTaskById(id) {
        const task = await TaskModel.findOne({id: id}); // Находим задачу в базе данных по id

        // Если задача не найдена, выбрасываем исключение
        if (!task) {
            throw new Error("Задача с таким id не существует");
        }
        return task; // Отправляем задачу
    }

    async createTask(id, title, description, testName, difficulty, examples) {
        // Создаем новую задачу в базе данных с помощью модели
        const task = await TaskModel.create({id, title, description, testName, difficulty, examples});

        // Возвращаем созданную задачу
        return task;
    }

     // Метод для обновления существующей задачи по id
     async updateTask(id, title, description, testName, difficulty) {
         const task = await TaskModel.findOne({testNameid: id});

         // Если задача не найдена, выбрасываем исключение
         if (!task) {
             throw new Error("Задача с таким id не существует");
         }

        if (title) task.title = title;
        if (description) task.description = description;
        if (testName) task.testName = testName;
        if (difficulty) task.difficulty = difficulty;

         return await task.save(); // Возвращаем обновленную задачу
     }

    // Метод для удаления существующей задачи по id
    async deleteTask(id) {
        // Находим и удаляем задачу в базе данных по id с помощью модели
        const task = await TaskModel.deleteOne({id: id});

        // Если задача не найдена, выбрасываем исключение
        if (!task) {
            throw new Error("Задача с таким id не существует");
        }

        return task; // Возвращаем удаленную задачу
    }

   /* async runTest(testName){
        const abc = async () => {
            await shell.exec(`npm run ${testName}`);
            console.log(`NEW NEW NEW File name: ${testName}`);
        }
        abc();
    }*/

    async runTest(id, args, code){
        const task = await TaskModel.findOne({id:id}); // По id получаем задачу
        const testName = task.testName; // По id получаем имя теста
        const clientData = JSON.stringify({args,code});

        await shell.exec(`mocha run tests/${testName} --reporter mochawesome ${clientData}`);
        console.log(`File name: ${testName}`);
    }

 /* OLD

  async runTest(id, args, code){
        const task = await TaskModel.findOne({id:id}); // По id получаем задачу
        // const testName = task.testName; // По id получаем имя файла с тестами
        const clientData = JSON.parse(args + code); // Из args и code создаем строку

        // Выполняем тесты
        const abc = async () => {
            await shell.exec(`npm ${testName}`);
            console.log(`NEW NEW NEW File name: ${testName}`);
        }
        abc();

        // shell.exec(`npm run ${task.testName}`); // Запускаем тесты
    }*/
}

// Экспорт контроллера для задачи
module.exports = new TaskService();