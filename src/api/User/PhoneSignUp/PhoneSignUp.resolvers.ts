import { Resolvers } from "src/types/resolvers";
import { PhoneSignUpMutationArgs, PhoneSignUpResponse } from "src/types/graph";
import User from "../../../entities/User";
import createJWT from "../../../utils/createJWT";
import Verification from "../../../entities/Verification";

const resolvers : Resolvers = {
    Mutation : {
        PhoneSignUp: async(_, args : PhoneSignUpMutationArgs): Promise<PhoneSignUpResponse> => {
            const { phoneNumber } = args;
            try{
                const existingUser = await User.findOne({phoneNumber});
                if(existingUser){
                    return{
                        ok : false,
                        error : "You should log in instead",
                        token : null
                    };
                }else{
                    const phoneVerification = await Verification.findOne({
                        payload : args.phoneNumber,
                        verified : true
                    });

                    if(phoneVerification){
                        const newUser = await User.create({ ...args }).save();
                        
                        const token = createJWT(newUser.id);
                        return {
                            ok : true,
                            error : null,
                            token : token
                        };
                    }else{
                        return {
                            ok : false,
                            error : "You haven't verified your phone number",
                            token : null
                        };
                    }
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