import jwt from "jsonwebtoken";
import "dotenv/config";
import User from "../models/user";
import signinController from "./signinUser.controller";

export const validJWT = async (req, res, next) => {
  try {
    const token = req.header("Authorization");
    res.header("Access-Control-Expose-Headers", "Token-Refresh");
    if (!token) {
      res.status(401).send({
        ok: false,
        message: "Token inexistente",
      });
      return false
    }
    let id;
    try {
      const obj = jwt.verify(token, process.env.JWT_SECRET);
      id = obj;
    } catch (verifyError) {
      res.status(401).json( {mensaje:'Authentication failed! Invalid token'});
      return false
    }
    next()
  } catch (err) {
    next(err);
  }
};
export const validToken = async (token) => {
    // validar que token venga como parametro
    if (!token) {
      throw new AppError('Authentication failed! Token required', 401);
    }
  
    logger.info(`Token received: ${token}`);
  
    // validar que token sea integro
    let id;
    try {
      const obj = jwt.verify(token, process.env.JWT_SECRET);
      id = obj;
    } catch (verifyError) {
      throw new AppError('Authentication failed! Invalid token', 401, token);
    }
    logger.info(`User id in the token: ${id}`);
  
    // validar si hay usuario en bd
    const user = await userService.findUserById(id);
    if (!user) {
      throw new AppError(
        'Authentication failed! Invalid Token - User not found',
        401,
      );
    }
    // retornar el usaurio
    return user;
  };
// export const auth = {
//   headers: async (req, res, next) => {
//     const token = req.headers["access-token"];
//     console.log(req.headers["access-token"]);
//     if (token) {
//       try {
//         const { _id } = jwt.verify(token, process.env.JWT_SECRET);
//         req.user = _id;
//       } catch (error) {
//         const newToken = await auth.checkToken(token);
//         console.log(newToken);
//         req.user = newToken.user;
//         if (newToken.token) {
//           res.set("Access-Control-Expose-Headers", "access-token");
//           res.set("access-token", newToken.token);
//         }
//       }
//     }
//     next();
//   },
//   checkToken: async (token) => {
//     let idUser = null;
//     console.log(idUser);
//     try {
//       const { _id } = await jwt.decode(token);
//       idUser = _id;
//     } catch (error) {
//       return {};
//     }
//     console.log(idUser);
//     const user = await User.findOne({ _id: idUser });
//     const [newToken] = signinController.signin();
//     return {
//       user: user._id,
//       token: newToken,
//     };
//   },
// };

