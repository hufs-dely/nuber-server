import User from "../../../entities/User";
import { ToggleDeliveringModeResponse } from "src/types/graph";
import { Resolvers } from "src/types/resolvers";
import privateResolver from "../../../utils/privateResolver";

const resolvers : Resolvers = {
    Mutation : {
        ToggleDeliveringMode : privateResolver(async(_, __, { req }) : Promise<ToggleDeliveringModeResponse> => {
            const user : User = req.user;
            user.isDelying = !user.isDelying;
            user.save();
            return {
                ok : true,
                error : null
            };
        })
    }
};

export default resolvers;