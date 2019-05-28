import { Between, getRepository } from "typeorm";
import User from "../../../entities/User";
import { Resolvers } from "src/types/resolvers";
import privateResolver from "../../../utils/privateResolver";
import { GetNearbyDeliversResponse } from "src/types/graph";

const resolvers : Resolvers = {
    Query : {
        GetNearbyDelivers: privateResolver(async(_, __, {req}) :Promise<GetNearbyDeliversResponse>=> {
            const user : User = req.user;
            const { lastLat, lastLng } = user;
            try{
                const delivers : User[] = await getRepository(User).find({
                    isDelying :true,
                    lastLat : Between(lastLat - 0.05, lastLat + 0.05),
                    lastLng : Between(lastLng - 0.05, lastLng + 0.05)
                });
                return {
                    ok : true,
                    error : null,
                    delivers
                };
            }catch(error){
                return {
                    ok : false,
                    error : error.message,
                    delivers : null
                };
            }
        })
    }
};

export default resolvers;