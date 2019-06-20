import users from '../dummy/users.js';
class usersController {
    // Get all students
    static getAllusers(req, res) {
          return res.status(200).json({

                users,
                message: "All users",
          });
    }
    // Get a single student
    static getSingleuser(req, res) {
           const finduser = users.find(user => user.id_user === parseInt(req.params.id, 10));
           if (finduser) {
               return res.status(200).json({
                     user: finduser,
                     message: "A single user record",
               });
           }
           return res.status(404).json({
                 message: "user record not found",
           });
    }
}
export default usersController;
