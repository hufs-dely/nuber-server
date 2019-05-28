import bcrypt from "bcrypt";
import { IsEmail } from "class-validator";
import { 
    BaseEntity, 
    BeforeInsert,
    BeforeUpdate,
    Column, 
    CreateDateColumn,
    Entity, 
    OneToMany,
    PrimaryGeneratedColumn,  
    UpdateDateColumn
} from "typeorm";
import Chat from "./Chat";
import Message from "./Message";
import Quest from "./Quest";
import Place from "./Place";

const BCRYPT_ROUNDS = 10;

@Entity()
class User extends BaseEntity {
    @PrimaryGeneratedColumn() id : number;

    @Column({ type : "text", nullable :true})
    @IsEmail()
    email : string | null;

    @Column({type : "boolean", default : false})
    verifiedEmail : boolean;

    @Column({type : "text"})
    firstName : string;

    @Column({type : "text"})
    lastName : string;

    @Column({type : "int", nullable : true})
    age : number;

    @Column({type : "text", nullable : true})
    password : string;

    @Column({type : "text", nullable : true})
    phoneNumber : string;

    @Column({type : "boolean", default : false})
    verifiedPhoneNumber : boolean;

    @Column({type : "text", nullable : true})
    profilePhoto : string;
    
    @Column({type : "boolean", default : false})
    isDelying : boolean;

    @Column({type : "boolean", default : false})
    isQuesting : boolean;

    @Column({type : "boolean", default : false})
    isMatched : boolean;

    @Column({type : "double precision", default : 0})
    lastLng : number;

    @Column({type : "double precision", default : 0})
    lastLat : number;

    @Column({type : "double precision", default : 0})
    lastOrientation : number;

    @Column({type : "text", nullable : true})
    fbId : string;

    @OneToMany(type => Chat, chat => chat.customer)
    chatsAsCustomer : Chat[]

    @OneToMany(type => Chat, chat => chat.deliver)
    chatsAsDeliver : Chat[]

    @OneToMany(type => Message, message => message.user)
    messages : Message[]

    @OneToMany(type => Quest, quest => quest.customer)
    questAsCustomer : Quest[]

    @OneToMany(type => Quest, quest => quest.deliver)
    questAsDeliver : Quest[]

    @OneToMany(type => Place, place => place.user)
    places : Place[];

    @CreateDateColumn() createdAt : string;
    @UpdateDateColumn() updatedAt : string;

    get fullName() : string {
        return `${this.firstName} ${this.lastName}`;
    }
    
    //처음 비밀번호를 해쉬한 값과 로그인할때 들어오는 비밀번호를 해쉬한 값을 비교해주는 함수, 저장은 하지 않는 함수다.
    public comparePassword(password : string) : Promise<boolean>{
        return bcrypt.compare(password, this.password);
    }

    @BeforeInsert()
    @BeforeUpdate()
    async savePassword() : Promise<void> {
        if(this.password){
            const hashedPassword = await this.hashPassword(this.password);
            //아래의 해쉬패스워드 함수를 기다려서 스트링값을 받는다.
            this.password = hashedPassword;
        }
    }

    private hashPassword(password : string) : Promise<string> {
        return bcrypt.hash(password, BCRYPT_ROUNDS);
        //string값으로 해쉬를 한 값을 넘겨줌
    }

}

export default User;