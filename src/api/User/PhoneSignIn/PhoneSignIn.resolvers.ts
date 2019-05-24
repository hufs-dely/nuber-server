import { Resolvers } from "src/types/resolvers";
import { PhoneSignInMutationArgs, PhoneSignInResponse } from "src/types/graph";
import User from "../../../entities/User";
import createJWT from "../../../utils/createJWT";

const resolvers : Resolvers = {
    Mutation : {
        PhoneSignIn : async(_, args : PhoneSignInMutationArgs): Promise<PhoneSignInResponse> =>{
            const { phoneNumber, password } = args;

            try {
                const user = await User.findOne({phoneNumber});
                if(!user){
                    return {
                        ok : false,
                        error : "No user found with that phoneNumber",
                        token : null
                    };
                }

                const checkPassword = await user.comparePassword(password);
                if(checkPassword){
                    const token = createJWT(user.id);
                    return {
                        ok : true,
                        error : null,
                        token : token
                    };
                }else{
                    return{
                        ok : false,
                        error : "Wrong password",
                        token : null
                    };
                }
            }catch(error){
                return {
                    ok : false,
                    error : error.message,
                    token : null
                };
            }
        }
    }
};

export default resolvers;