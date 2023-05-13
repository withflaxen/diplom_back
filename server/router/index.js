const Router = require('express').Router;
const userController = require('../controllers/user-controller');
const taskController = require('../controllers/task-controller');
const router = new Router();
const {body} = require('express-validator');
const authMiddleware = require('../middlewares/auth-middleware');
const UserModel = require("../models/user-model");
const ApiError = require("../exceptions/api-error");
const bcrypt = require("bcrypt");
const UserDto = require("../dtos/user-dto");
const tokenService = require("../service/token-service");
const userService = require("../service/user-service");

router.post('/registration',
    body('email').isEmail(),
    body('password').isLength({min: 3, max: 32}),
    userController.registration
);
router.post('/login', userController.login);
router.post('/logout', userController.logout);
router.get('/activate/:link', userController.activate);
router.get('/refresh', userController.refresh);
// router.get('/users', authMiddleware, userController.getUsers);
router.get('/users', userController.getUsers);


router.post('/test', taskController.runTest);
router.post('/createTask', taskController.createTask);
router.post('/updateTask', taskController.updateTask);
router.post('/deleteTask', taskController.deleteTask);
router.post('/getTask', taskController.getTaskById);
router.get('/getTasks', taskController.getAllTasks);



module.exports = router