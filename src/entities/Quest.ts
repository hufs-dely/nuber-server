import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { questStatus } from "../types/types";
import Chat from "./Chat";
import User from "./User";

@Entity()
class Quest extends BaseEntity{
    @PrimaryGeneratedColumn() id: number;

    @Column({type: "text",
        enum: ["ACCEPTED", "FINISHED", "CANCELED", "REQUESTING", "ONROUTE"],
        default : "REQUESTING"
    })
    status: questStatus;

    @Column({type : "text"})
    pickUpAddress : string;

    @Column({type : "double precision", default : 0})
    pickUpLat : number;

    @Column({type : "double precision", default : 0})
    pickUpLng : number;

    @Column({type : "text"})
    dropOffAddress :string;

    @Column({type : "double precision", default : 0})
    dropOffLat : number;

    @Column({type : "double precision", default : 0})
    dropOffLng :number;

    @Column({type : "double precision", default : 0})
    price : number;

    @Column({type : "text"})
    distance: string;

    @Column({type : "text"})
    duration :string;

    @Column({nullable : true})
    customerId : number;

    @ManyToOne(type => User, user => user.questAsCustomer)
    customer : User;

    @Column({nullable : true})
    deliverId : number;

    @ManyToOne(type => User, user => user.questAsDeliver, { nullable : true})
    deliver : User;

    @Column({nullable : true})
    chatId : number;

    @OneToOne(type => Chat, chat => chat.quest, {nullable : true})
    @JoinColumn()
    chat : Chat;

    @CreateDateColumn() createdAt : string;
    @UpdateDateColumn() updatedAt : string;
}

export default Quest;