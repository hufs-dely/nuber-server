import User from "../../../entities/User";
import { ReportMovementMutationArgs, ReportMovementResponse } from "src/types/graph";
import { Resolvers } from "src/types/resolvers";
import cleanNullArgs from "../../../utils/cleanNullArg";
import privateResolver from "../../../utils/privateResolver";

const resolvers : Resolvers = {
    Mutation : {
        ReportMovement : privateResolver(async(_, args : ReportMovementMutationArgs, {req, pubSub}): Promise<ReportMovementResponse> =>{
            const user : User = req.user;
            const notNull = cleanNullArgs(args);
            try{
                await User.update({id : user.id},{...notNull});
                const updateUser = await User.findOne({ id : user.id});
                pubSub.pulish("deliverUpdate",{DeliversSubscription: updateUser} );
                return {
                    ok : true,
                    error : null
                };
                
            }catch(error){
                return {
                    ok : false,
                    error : error.message
                };
            }
        })
    }
};

export default resolvers;