const { Router } = require("express")
const router = Router()

const instructorController = require("../controller/instructor.controller");

module.exports = () =>{
    router.post("/instructor/",instructorController.createInstructor);
    router.put("/instructor/:id_instructor",instructorController.updateInstructor);
    router.delete("/instructor/:id_instructor",instructorController.deleteInstructor);
    router.post("/instructor/byid/:id_instructor",instructorController.getInstructorById);
    router.post("/instructor/searchBar/:clave",instructorController.searchBarInstructor);
    router.get("/instructors/",instructorController.getInstructors);
    return router;
}