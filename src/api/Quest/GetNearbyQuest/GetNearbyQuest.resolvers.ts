import { Between, getRepository } from "typeorm";
import Quest from "../../../entities/Quest";
import User from "../../../entities/User";
import { GetNearbyQuestResponse } from "src/types/graph";
import { Resolvers } from "src/types/resolvers";
import privateResolver from "../../../utils/privateResolver";

const resolvers: Resolvers = {
    Query : {
        GetNearbyQuest: privateResolver(async(_, __, {req}): Promise<GetNearbyQuestResponse>=> {
            const user : User =req.user;
            if(user.isDelying){
                const {lastLat, lastLng} = user;
                try{
                    const quest = await getRepository(Quest).findOne({
                        status : "REQUESTING",
                        pickUpLat : Between(lastLat - 0.05, lastLat + 0.05),
                        pickUpLng : Between(lastLng - 0.05, lastLng + 0.05)
                    });
                    if(quest){
                        return {
                            ok : true,
                            error : null,
                            quest
                        };
                    }else{
                        return{
                            ok : true,
                            error : null,
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
            }else{
                return {
                    ok : false,
                    error : "you are not a deliver",
                    quest : null
                };
            }
        })
    }
};

export default resolvers;