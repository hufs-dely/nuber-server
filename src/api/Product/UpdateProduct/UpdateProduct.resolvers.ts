import Product from "../../../entities/Product";
import User from "../../../entities/User";
import { UpdateProductMutationArgs, UpdateProductResponse } from "src/types/graph";
import { Resolvers } from "src/types/resolvers";
import privateResolver from "../../../utils/privateResolver";

const resolvers : Resolvers = {
    Mutation : {
        UpdateProduct : privateResolver(async(_, args : UpdateProductMutationArgs, { req }) : Promise<UpdateProductResponse> => {
            const user : User = req.user;
            if(user.isQuesting && !user.isDelying){//사용자가 요청했을 때 isquesting이 트루가 되므로 신청하고 난 후의 경우.
                try{
                    const product = await Product.create({...args}).save();
                    return {
                        ok : true,
                        error : null,
                        product
                    }
                }catch(error){
                    return {
                        ok : false,
                        error : error.message,
                        product : null
                    }
                };
            }
            else{
                return {
                    ok : false,
                    error :"you cant update product or delivery and request",
                    product : null
                };
            }
        })
    }
};

export default resolvers;