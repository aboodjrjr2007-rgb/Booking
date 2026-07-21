import z, { optional } from "zod";

const Valdtaion = z.object({
    firstName :z.string().min(1),
    lastName :z.string().min(1),
    email : z.string().email(),
    password : z.string().min(8).max(128).regex(/[A-Z]/)
    .regex(/[0-9]/)
    .regex(/[!@#$%^&*()=_|~/-]/),
    phoneNumber : z.string().max(10).optional(),

})

export default Valdtaion