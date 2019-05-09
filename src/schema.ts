
import { makeExecutableSchema } from "graphql-tools";
import { fileLoader, mergeResolvers, mergeTypes } from "merge-graphql-schemas";
import path from "path";

const allTypes : any = fileLoader(
    path.join(__dirname, "./api/**/*.graphql")
);//api속 모든 graphql 타입가져오기

const allResolvers : any = fileLoader(
    path.join(__dirname, "./api/**/*.resolvers.*")//여기서는 ts지만 배포할땐 .js라서 .*
);

const mergedTypes : any = mergeTypes(allTypes, {all : true});
//가져온 타입 합치기
const mergedResolvers : any = mergeResolvers(allResolvers);
//가져온 리소버 합치기
const schema = makeExecutableSchema({
    typeDefs: mergedTypes,
    resolvers : mergedResolvers
});

export default schema;