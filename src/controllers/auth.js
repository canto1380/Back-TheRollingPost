import jwt from 'jsonwebtoken'
import "dotenv/config"
import User from '../models/user'
import signinController from './signinUser.controller'

const auth = {
    headers: async(req,res,next)=>{
        const token = req.headers['access-token']
        console.log(req.headers['access-token'])
        if(token){
            try {
                const {_id} = jwt.verify(token, process.env.JWT_SECRET)
                req.user = _id
                console.log('catch')

            } catch (error) {
                console.log('catch')
                const newToken =  await auth.checkToken(token)
                console.log(newToken)
                req.user = newToken.user
                if(newToken.token){
                    res.set("Access-Control-Expose-Headers", "access-token")
                    res.set("access-token", newToken.token)
                }
            }
        }
        next()
    },
    checkToken: async( token) =>{
        let idUser = null;
        console.log(idUser)
        try {
            const {_id} = await jwt.decode(token);
            idUser = _id
        } catch (error) {
            return{}
        }
        console.log(idUser)
        const user = await  User.findOne({_id: idUser})
        const [newToken] = signinController.signin()
        return {
            user: user._id,
            token: newToken
        }
    }
}
export default auth;
