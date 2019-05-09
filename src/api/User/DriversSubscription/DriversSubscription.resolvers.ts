import { withFilter } from "graphql-yoga";
import User from "src/entities/User";

const resolvers  = {
    Subscription : {
        DriversSubscription: {
            //유저의 상태에 따라 공지를 받는 기능 withfilter
            //driver가 위치를 보고하면 reportmovement 함수가 실행
            subscribe : withFilter(
                (_, __, {pubSub}) => pubSub.asyncIterator("driverUpdate"),
                (payload, _, { context }) => {
                    const user : User = context.currentUser;
                    const {
                        DriversSubscription : { lastLat : driverLastLat, lastLng : driverLastLng}
                    } = payload;
                    const { lastLat : userLastLat, lastLng : userLastLng} = user;
                    return (
                        driverLastLat >= userLastLat - 0.05 &&
                        driverLastLat <= userLastLat + 0.05 &&
                        driverLastLng >= userLastLng - 0.05 &&
                        driverLastLng <= userLastLng + 0.05
                    );
                }
            )
        }
    }
};
export default resolvers;