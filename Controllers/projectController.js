const projects =require("../Models/projectSchema")

//add projects logic
exports.addUserProject=async(req,res)=>{
        console.log("Inside addUserProject");
        // res.status(200).json("Add User Project Request")
    
//user id get
    const userId=req.payload

//get add project details
    const {title,language,github,link,overview} = req.body

//get the image 
   projectImage = req.file.filename
   console.log(projectImage);

//logic of adding new user project
    try{
        const existingProject =await projects.findOne({github})
            if(existingProject){
                res.status(406).json("Project Already Exist")
            }
            else{
                const newProject = new projects({title,language,github,link,overview,projectImage,userId})
                await newProject.save() //save prjct details to mongo
                res.status(200).json(newProject) //send response to client
            }
    }
    catch(err){
        res.status(404).json({message:err.message})
    }

    }

//get user project
exports.getUserProject = async(req,res)=>{
    //get userId
        const userId = req.payload
    //api request
    try{
    //get project Information of particular User
        const userProject = await projects.find({userId})
        console.log(userProject);
        res.status(200).json(userProject) // send response to client
    }
    catch(err){
        res.status(401).json(err.message)
    }

}

// get all projects
exports.getAllProjects = async(req,res)=>{
    const searchKey = req.query.search
    const query={
        language:{
            $regex:searchKey,
            $options:"i"
        },
        // title:{
        //     $regex:searchKey,
        //     $options:"i"
        // }
    }
    try{
            const AllProjects = await projects.find(query)
            res.status(200).json(AllProjects) 
        }
        catch(err){
            res.status(401).json(err.message)
        }
}

// get Home Projects
exports.getHomeProject = async(req,res)=>{
    try{
            const HomeProject = await projects.find().limit(3)
            res.status(200).json(HomeProject) 
        }
        catch(err){
            res.status(401).json(err.message)
        }
} 

// edit project Details
exports.editProject = async(req,res)=>{
    const {title,language,github,link,overview,projectImage} = req.body;

    const uploadImage = req.file?req.file.filename:projectImage;
    const userId = req.payload
    const {id} = req.params 

    try{
        // find particular project id in mongodb and update project details
        const updateProject = await projects.findByIdAndUpdate({_id:id},{title,language,github,link,overview,projectImage:uploadImage,userId},{new:true})
        // save updaated projectdetails
        await updateProject.save()
        // response send back to client
        res.status(200).json(updateProject)
    } 
    catch(err){
            res.status(401).json(err)
    }
}

// Delete project
exports.deleteProject = async(req,res)=>{
    const {pid} = req.params

    try{
        const deleteData = await projects.findByIdAndDelete({_id:pid})
        res.status(200).json(deleteData)

    }
    catch(err){
        res.status(401).json(err)
}
}
