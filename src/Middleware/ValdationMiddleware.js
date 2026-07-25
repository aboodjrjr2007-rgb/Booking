
import Valdation from "../Valdation/Valdation.js";

const valdation = async (req,res,next) => {
    const result = await Valdation.safeParse(req.body)

    if(!result.success){
        const errorTree = result.error.format()
    
        return res.status(400).send({
            success :false,
            message : "Valdation failed",
            errors : errorTree
        })
    
    }
    req.body = result.data
    next()
}

export default valdation