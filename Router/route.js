// import express
const express = require('express')

const userController = require('../Controllers/UserContoller')
const projectController = require('../Controllers/projectController')

const jwtMiddleware = require("../Middlewares/jwtMiddleware")

const multerConfig = require("../Middlewares/multerMiddleware")

// craete a router object of express to define routes(paths)
const router = new express.Router()

//using router object to define paths
    //1.Register API routes
    router.post('/register',userController.register)

      //2.Login API routes
      router.post('/login',userController.login)

      //3. add user project api routes
      router.post('/project/add',jwtMiddleware,multerConfig.single('projectImage'),projectController.addUserProject)
      
      //4. get user project api routes -
      router.get('/project/all-user-projects',jwtMiddleware,projectController.getUserProject)

      //5. get all projects routes
      router.get('/project/all-projects',jwtMiddleware,projectController.getAllProjects)

      //6. get home page routes
      router.get('/project/home-projects',projectController.getHomeProject)

      //7. update project routes
      router.put('/project/update-project/:id',jwtMiddleware,multerConfig.single('projectImage'),projectController.editProject)

      //8. Delete Project routes
      router.delete('/project/delete-project/:pid',jwtMiddleware,projectController.deleteProject)

  

module.exports=router