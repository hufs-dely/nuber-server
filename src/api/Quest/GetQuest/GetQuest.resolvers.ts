import Quest from "../../../entities/Quest";
import User from "../../../entities/User";
import { GetQuestResponse, GetQuestQueryArgs } from "src/types/graph";
import { Resolvers } from "src/types/resolvers";
import privateResolver from "../../../utils/privateResolver";

const resolvers : Resolvers = {
    Query : {
        GetQuest: privateResolver(async(_, args : GetQuestQueryArgs, {req}) : Promise<GetQuestResponse>=> {
            const user : User = req.user;
            try{
                const quest = await Quest.findOne({
                    id : args.questId
                }, { relations : ["customer", "deliver"]});
                if(quest){
                    if(quest.customerId === user.id || quest.deliverId === user.id){
                        return {
                            ok : false,
                            error : null,
                            quest
                        };
                    }else{
                        return {
                            ok : false,
                            error : "Not Authorized",
                            quest : null
                        };
                    }
                }else{
                    return {
                        ok :false,
                        error : "Quest not found",
                        quest : null
                    };
                }
            }catch(error){
                return {
                    ok : false,
                    error : error.message,
                    quest : null
                };
            }
        })
    }
};

export default resolvers;