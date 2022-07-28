// import pool from '../configs/connectDB';
import db from '../models/index';
import CRUDService from '../services/CRUDService';


let getHomepage = async (req, res) => {
    // let data = 'hello';

    try {
        let data = await db.User.findAll();
        return res.send(JSON.stringify(data));
    } catch (e) {
        console.log(e);
    }


}

let getDetailPage = async (req, res) => {


    let userId = req.params.userId;
    // let [user] = await pool.execute('SELECT * FROM users where id = ?', [userId]);

    // return res.send(user);
    // console.log(userId);
    return res.send('hello');
}

let postCRUD = async (req, res) => {
    console.log(req.body);
    let mess = await CRUDService.createNewUser(req.body);
    console.log(mess);
    return res.send('post crud from server');
}



module.exports = {
    getHomepage, getDetailPage, postCRUD, 
}
