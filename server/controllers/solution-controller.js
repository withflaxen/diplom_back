const solutionService = require("../service/solution-service");
const taskService = require("../service/task-service");
const SolutionModel = require("../models/solution-model");


// Создание контроллера для задачи
class SolutionController {
    async createSolution(req, res) {
        try {
            const {username, taskID, solution} = req.body; //
            const solutions = await solutionService.createSolution(username, taskID, solution); //
            return res.json(solutions);
        } catch (e) {
            console.error(e);
            res.status(500).send("Произошла ошибка при создании задачи");
        }
    }

  /*  async createSolution(req, res) {
        try {
            const {id, likes, users, comments, taskID} = req.body; //
            const solution = await solutionService.createSolution(id, likes, users, comments, taskID); //
            return res.json(solution);
        } catch (e) {
            console.error(e);
            res.status(500).send("Произошла ошибка при создании задачи");
        }
    }*/

    async deleteSolution(req, res) {
        try {
            const {id, taskID} = req.body; //
            const solution = await solutionService.deleteSolution(id, taskID); //
            return res.json(solution);
        } catch (e) {
            console.error(e);
            res.status(500).message("Произошла ошибка при удалении задачи");
        }
    }

    // Метод для получения задачи по id
    async setLike(req, res) {
        try {
            const {solutionID, userID} = req.body;
            const solution = await solutionService.setLike(solutionID, userID); // Находим задачу в базе данных по id

            // Если задача не найдена, выбрасываем исключение
            if (!solution) {
                throw new Error("Решение с таким id не существует");
            }

            return res.json(solution); // Отправляем решение на фронт
        } catch (e) {
            // Обработка ошибок и возврат соответствующего ответа
            console.error(e);
            res.status(404).send(e.message);
        }
    }

    // Метод для получения всех решений
    async getAllSolutions(req, res) {
        try {
            // Находим все задачи в базе данных
            const solutions = await solutionService.getAllSolutions();

            // Отправляем массив задач на фронт
            res.json(solutions);
        } catch (e) {
            // Обработка ошибок и возврат соответствующего ответа
            console.error(e);
            res.status(500).send("Произошла ошибка при получении решений");
        }
    }

    // Метод для получения всех решений
    async getAllSolutionComments(req, res) {
        try {
            const {id} = req.body;
            const comments = await solutionService.getAllSolutionComments(id);
            res.json(comments);
        } catch (e) {
            console.error(e);
            res.status(500).send("Произошла ошибка при получении комментариев");
        }
    }

    // Метод для добавления комментария
    async addComment(req, res) {
        try {
            const {solutionID, username, comment} = req.body;
            const com = await solutionService.addComment(solutionID, username, comment);
            return res.json(com);
        } catch (e) {
            console.error(e);
            res.status(404).send(e.message);
        }
    }

    // Метод для удаления комментария
    async deleteComment(req, res) {
        try {
            const {solutionID, id} = req.body;
            const comment = await solutionService.deleteComment(solutionID, id);
            return res.json(comment);
        } catch (e) {
            console.error(e);
            res.status(404).send(e.message);
        }
    }
}

// Экспорт контроллера для задачи
module.exports = new SolutionController();