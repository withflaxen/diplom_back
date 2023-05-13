const TaskModel = require("../models/task-model");
const SolutionModel = require("../models/solution-model");
const shell = require("shelljs");
const fs = require("fs");
const {log} = require("shelljs/src/common"); // Импорт модели для задачи

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

    // Метод для получения решений задачи по id
    async getTaskSolutions(id) {
        const task = await TaskModel.findOne({id: id}); // Находим задачу в базе данных по id

        // Если задача не найдена, выбрасываем исключение
        if (!task) {
            throw new Error("Задача с таким id не существует");
        }

        let solutions = [];

        for (let id of task.solutions){
            const solution = await SolutionModel.findOne({id});
            solutions.push(solution);
        }

        return solutions; // Вернуть массив объектов с решениями
    }

    async createTask(id, title, description, testName, difficulty, solutions, name, args) {
        // Создаем новую задачу в базе данных с помощью модели
        const task = await TaskModel.create({id, title, description, testName, difficulty, solutions, name, args});

        // Возвращаем созданную задачу
        return task;
    }

     // Метод для обновления существующей задачи по id
     async updateTask(id, title, description, testName, difficulty, solutions, name, args) {
         const task = await TaskModel.findOne({id: id});

         // Если задача не найдена, выбрасываем исключение
         if (!task) {
             throw new Error("Задача с таким id не существует");
         }

        if (title) task.title = title;
        if (description) task.description = description;
        if (testName) task.testName = testName;
        if (difficulty) task.difficulty = difficulty;
        if (solutions) task.solutions = solutions;
        if (name) task.name = name;
        if (args) task.solutions = args;

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

    async runTest(id, args, code){
        const task = await TaskModel.findOne({id:id}); // По id получаем задачу
        const testName = task.testName; // По id получаем имя теста
        const clientData = JSON.stringify({args,code});

        await shell.exec(`mocha run tests/${testName} --reporter mochawesome ${clientData}`);
        console.log(`File name: ${testName}`);
    }
}

// Экспорт контроллера для задачи
module.exports = new TaskService();