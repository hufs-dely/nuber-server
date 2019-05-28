import { BaseEntity, Column , CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn, ManyToOne, OneToOne} from "typeorm";
import Message from "./Message";
import User from "./User";
import Quest from "./Quest";

@Entity()
class Chat extends BaseEntity{
    @PrimaryGeneratedColumn() id: number;

    @OneToMany(type => Message, message => message.chat)
    messages : Message[];
    
    @ManyToOne(type => User, user => user.chatsAsCustomer)
    customer : User;

    @Column({ nullable: true })
    customerId: number;

    @OneToOne(type => Quest, quest => quest.chat)
    chat : Chat;

    @ManyToOne(type => User, user => user.chatsAsDeliver)
    deliver : User;

    @Column({nullable : true})
    deliverId : number;

    @OneToOne(type => Quest, quest =>quest.chat)
    quest : Quest;

    @Column({nullable : true})
    questId : number;

    @CreateDateColumn() createdAt : string;
    @UpdateDateColumn() updatedAt : string;
}

export default Chat;