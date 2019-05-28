import Quest from "../../../entities/Quest";
import User from "../../../entities/User";
import { RequestQuestMutationArgs, RequestQuestResponse } from "src/types/graph";
import { Resolvers } from "src/types/resolvers";
import privateResolver from "../../../utils/privateResolver";

const resolvers : Resolvers = {
    Mutation : {
        RequestQuest : privateResolver(async(_, args : RequestQuestMutationArgs, { req, PubSub }): Promise<RequestQuestResponse> => {
            const user : User = req.user;
            if(!user.isQuesting && !user.isDelying){
                try{
                    const quest = await Quest.create({...args, customer : user}).save();
                    PubSub.publish("questRequest", { NearbyQuestSubscription: quest});
                    user.isQuesting = true;
                    user.save();
                    return {
                        ok : true,
                        error : null,
                        quest
                    }
                }catch(error){
                    return {
                        ok : false,
                        error : error.message,
                        quest : null
                    };
                }
            }else{
                return {
                    ok :false,
                    error : "you cant request two quests or delivery and request",
                    quest : null
                };
            }
        })
    }
};

export default resolvers;