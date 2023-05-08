// Импорт модели для задачи
var shell = require("shelljs");
const taskService = require("../service/task-service");
const TaskModel = require("../models/task-model");
const exec = require("nodemon/lib/config/exec");
const fs = require("fs"); // Импорт модели для задачи


// Создание контроллера для задачи
class TaskController {

    // Метод для получения всех задач
    async getAllTasks(req, res) {
        try {
            // Находим все задачи в базе данных
            const tasks = await taskService.getAllTasks();

            // Отправляем массив задач на фронт
            res.json(tasks);
        } catch (error) {
            // Обработка ошибок и возврат соответствующего ответа
            console.error(error);
            res.status(500).send("Произошла ошибка при получении задач");
        }
    }

    // Метод для получения задачи по id
    async getTaskById(req, res) {
        try {
            const {id} = req.body;
            const task = await taskService.getTaskById(id); // Находим задачу в базе данных по id

            // Если задача не найдена, выбрасываем исключение
            if (!task) {
                throw new Error("Задача с таким id не существует");
            }

            return res.json(task); // Отправляем задачу на фронт
        } catch (error) {
            // Обработка ошибок и возврат соответствующего ответа
            console.error(error);
            res.status(404).send(error.message);
        }
    }

    // Метод для обработки HTTP запроса на создание новой задачи
    async createTask(req, res) {
        try {
            // Получаем данные для новой задачи из тела запроса
            const {id, title, description, testName, difficulty, examples} = req.body;

            // Вызываем метод createTask из сервиса taskService и получаем объект task
            const task = await taskService.createTask(id, title, description, testName, difficulty, examples);

            // Отправляем объект task в ответе
            return res.json(task);
        } catch (error) {
            // Обработка ошибок и возврат соответствующего ответа
            console.error(error);
            res.status(500).send("Произошла ошибка при создании задачи");
        }
    }

    // Метод для обновления существующей задачи по id
    async updateTask(req, res) {
        try {
            // Получаем данные для обновления задачи из тела запроса
            const {id, title, description, testName, difficulty} = req.body;
            const task = await taskService.updateTask(id, title, description, testName, difficulty);

            // Если задача не найдена, выбрасываем исключение
            if (!task) {
                throw new Error("Задача с таким id не существует");
            }

            // Отправляем обновленную задачу на фронт
            return res.json(task);
        } catch (error) {
            // Обработка ошибок и возврат соответствующего ответа
            console.error(error);
            res.status(404).send(error.message);
        }
    }

    // Метод для удаления существующей задачи по id
    async deleteTask(req, res) {
        try {
            // Получаем id задачи из параметров запроса
            const {id} = req.body;

            // Находим и удаляем задачу в базе данных по id с помощью модели
            const task = await taskService.deleteTask(id);

            // Если задача не найдена, выбрасываем исключение
            if (!task) {
                throw new Error("Задача с таким id не существует");
            }

            // Отправляем удаленную задачу на фронт
            return res.json(task);
        } catch (error) {
            // Обработка ошибок и возврат соответствующего ответа
            console.error(error);
            res.status(404).send(error.message);
        }
    }

    async runTest(req, res) {
        try {
            const {id, args, code} = req.body;
            const task = taskService.runTest(id, args, code);

            const clientData = JSON.stringify({
                args, // аргументы функции в задаче
                code, // код задачи, вводимый пользователем
            });

            await fs.readFile("mochawesome-report/mochawesome.html", "utf8", (err, data) => {
                if (err) { throw err; } // Если произошла ошибка при чтении файла, выбрасываем исключение
                res.send(data); // Если нет ошибки при чтении файла, отправляем его содержимое на фронт
            });
        } catch (e) {
            console.error(error);
            res.status(500).send("Произошла ошибка при запуске тестов");
        }
    }
}

// Экспорт контроллера для задачи
module.exports = new TaskController();