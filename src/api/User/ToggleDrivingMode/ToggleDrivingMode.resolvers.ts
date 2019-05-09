import User from "../../../entities/User";
import { ToggleDrivingModeResponse } from "src/types/graph";
import { Resolvers } from "src/types/resolvers";
import privateResolver from "../../../utils/privateResolver";

const resolvers : Resolvers = {
    Mutation : {
        ToggleDrivingMode : privateResolver(async(_, __, { req }) : Promise<ToggleDrivingModeResponse> => {
            const user : User = req.user;
            user.isDriving = !user.isDriving;
            user.save();
            return {
                ok : true,
                error : null
            };
        })
    }
};

export default resolvers;