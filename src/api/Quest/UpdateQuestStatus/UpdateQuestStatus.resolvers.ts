import Chat from "../../../entities/Chat";
import Quest from "../../../entities/Quest";
import User from "../../../entities/User";
import { UpdateQuestStatusMutationArgs, UpdateQuestStatusResponse } from "src/types/graph";
import { Resolvers } from "src/types/resolvers";
import privateResolver from "../../../utils/privateResolver";

const resolvers : Resolvers = {
    Mutation : {
        UpdateQuestStatus : privateResolver(async(_, args: UpdateQuestStatusMutationArgs, {req, pubSub}): Promise<UpdateQuestStatusResponse>=>{
            const user: User = req.user;
            if(user.isDelying){//이상있으면 여기
                try{
                    let quest : Quest | undefined;
                    if(args.status === "ACCEPTED"){
                        quest = await Quest.findOne({
                            id : args.questId,
                            status : "REQUESTING"
                        }, {relations : ["customer"]});
                        if(quest){
                            quest.deliver = user;
                            user.isMatched = true;
                            user.save();
                            const chat = await Chat.create({
                                deliver : user,
                                customer : quest.customer
                            }).save();
                            quest.chat = chat;
                            quest.save();
                        }
                    }else{
                        quest = await Quest.findOne({
                            id : args.questId,
                            deliver : user
                        });
                    }
                    if(quest){
                        quest.status = args.status;
                        quest.save();
                        pubSub.publish("questUpdate", { QuestStatusSubscription: quest});
                        return {
                            ok: true,
                            error :null
                        };
                    }else{
                        return {
                            ok : false,
                            error : "Cant update quest"
                        };
                    }
                }catch(error){
                    return {
                        ok : false,
                        error : error.message
                    };
                }
            }else{
                return {
                    ok : false,
                    error : "you are not delivering"
                };
            }
        })
    }
};

export default resolvers;