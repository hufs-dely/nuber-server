import Chat from "../../../entities/Chat";
import Message from "../../../entities/Message";
import User from "../../../entities/User";
import { SendChatMessageMutationArgs, SendChatMessageResponse } from "src/types/graph";
import { Resolvers } from "src/types/resolvers";
import privateResolver from "../../../utils/privateResolver";

const resolvers : Resolvers = {
    Mutation : {
        SendChatMessage : privateResolver(async(_,args : SendChatMessageMutationArgs,{req, pubSub}) : Promise<SendChatMessageResponse>=> {
            const user : User = req.user;
            try {
                const chat = await Chat.findOne({id : args.chatId});
                if(chat){
                    if(chat.customerId === user.id || chat.deliverId === user.id){
                        const message = await Message.create({
                            text :args.text,
                            chat,
                            user                    
                        }).save();
                        pubSub.publish("newChatMessage", {
                            MessageSubscription:message
                        });
                        return {
                            ok : true,
                            error : null,
                            message
                        };
                    }
                    else{
                        return {
                            ok : false,
                            error : "Unauthorized",
                            message : null
                        };
                    }
                }else{
                    return {
                        ok : false,
                        error : "Chat not found",
                        message : null
                    };
                }
            }catch(error){
                return {
                    ok : false,
                    error : error.message,
                    message : null
                };
            }
        })
    }
};

export default resolvers;