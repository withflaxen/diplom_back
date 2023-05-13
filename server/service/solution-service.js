const SolutionModel = require('../models/solution-model');

/*
 * в задачах хранится массив с айди решений для этой задачи
 * в решениях хранится массив с айди пользователей, лайкнувших это решение, и массив с комментариями
 */
class SolutionService {

    // Метод для получения всех решений
    async getAllSolutions() {
        const solutions = await SolutionModel.find();
        return solutions;
    }

    // Метод для получения всех комментариев решения
    async getAllSolutionComments(id) {
        const solution = await SolutionModel.findOne({id: id});
        if (!solution) {
            throw new Error("Решение с таким id не существует");
        }

        const comments = solution.comments;
        return comments;
    }

    // Создание решения и добавление к задаче
    async createSolution(id, likes, users, comments, taskID) {

        const findSolution = await SolutionModel.findOne({id: id});
        if (findSolution) {
            throw new Error("Решение с таким id уже существует");
        }

        const solution = await SolutionModel.create({id, likes, users, comments, taskID});
        const task = await TaskModel.findOne({id: taskID});

        await task.solutions.push(solution.id); // Пушим id решения в массив к задаче
        await task.save()

        return solution;
    }

    // Удаление решения и удаление из задачи
    async deleteSolution(id, taskID) {

        const findSolution = await SolutionModel.findOne({id: id});
        if (!findSolution) {
            throw new Error("Решение с таким id не существует");
        }

        const solution = await SolutionModel.deleteOne({id: id});
        const task = await TaskModel.findOne({id: taskID}); // Находим задачу

        if (!task) {
            throw new Error("Задачи с таким id не существует");
        }

        const solutionIndex = task.solutions.indexOf(id);
        if (solutionIndex !== -1) {
            await task.solutions.splice(solutionIndex, 1); // Удаляем id решения из задачи
            await task.save()
        }
        return solution; // Возвращаем удаленное решение
    }

    // Поставить/удалить лайк
    async setLike(solutionID, userID) {

        const solution = await SolutionModel.findOne({id: solutionID});

        // Если решение не найдено, выбрасываем исключение
        if (!solution) {
            throw new Error("Решение с таким id не существует");
        }

        // Проверяем, есть ли пользователь в списке лайкнувших решение
        const user = solution.users.find(element => element === userID);

        // Если пользователя нет в списке лайкнувших решение
        if (!user) {
            solution.users.push(userID); // Добавляем его айди
            solution.likes++; // Инкрементируем лайки
            solution.isActive = true; // Устанавливаем флаг
        } else {
            solution.users.pop(userID);
            solution.likes--;
            solution.isActive = false;
        }

        await solution.save();

        return solution; // Отправляем задачу
    }

    // Метод добавления комментария к решению
    async addComment(id, solutionID, userID, comment) {
        const solution = await SolutionModel.findOne({id: solutionID});
        if (!solution) {
            throw new Error("Решения с таким id не существует");
        }
        const isExisted = solution.comments.find(element => element.id === id)

        if (isExisted) {
            throw new Error("Комментарий с таким id уже существует");
        }

        const com = {id, solutionID, userID, comment};
        await solution.comments.push(com);
        await solution.save();

        return com;
    }

    // Метод удаления комментария
    async deleteComment(solutionID, id) {
        const solution = await SolutionModel.findOne({id: solutionID});
        if (!solution) {
            throw new Error("Решения с таким id не существует");
        }

        const commentIndex = solution.comments.indexOf(id);
        if (commentIndex !== -1) {
            await solution.comments.splice(commentIndex, 1);
            await solution.save();
        }
        return solution;
    }
}

module.exports = new SolutionService();
