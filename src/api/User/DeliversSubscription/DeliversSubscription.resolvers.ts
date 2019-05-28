import { withFilter } from "graphql-yoga";
import User from "src/entities/User";

const resolvers  = {
    Subscription : {
        DeliversSubscription: {
            //유저의 상태에 따라 공지를 받는 기능 withfilter
            //driver가 위치를 보고하면 reportmovement 함수가 실행
            subscribe : withFilter(
                (_, __, {pubSub}) => pubSub.asyncIterator("deliverUpdate"),
                (payload, _, { context }) => {
                    const user : User = context.currentUser;
                    const {
                        DeliversSubscription : { lastLat : deliverLastLat, lastLng : deliverLastLng}
                    } = payload;
                    const { lastLat : userLastLat, lastLng : userLastLng} = user;
                    return (
                        deliverLastLat >= userLastLat - 0.05 &&
                        deliverLastLat <= userLastLat + 0.05 &&
                        deliverLastLng >= userLastLng - 0.05 &&
                        deliverLastLng <= userLastLng + 0.05
                    );
                }
            )
        }
    }
};
export default resolvers;