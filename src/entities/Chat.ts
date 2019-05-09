import { BaseEntity, Column , CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn, ManyToOne, OneToOne} from "typeorm";
import Ride from "./Ride";
import Message from "./Message";
import User from "./User";

@Entity()
class Chat extends BaseEntity{
    @PrimaryGeneratedColumn() id: number;

    @OneToMany(type => Message, message => message.chat)
    messages : Message[];
    
    @ManyToOne(type => User, user => user.chatsAsPassenger)
    passenger : User;

    @Column({ nullable: true })
    passengerId: number;

    @OneToOne(type => Ride, ride => ride.chat)
    chat : Chat;

    @ManyToOne(type => User, user => user.chatsAsDriver)
    driver : User;

    @Column({nullable : true})
    driverId : number;

    @OneToOne(type => Ride, ride =>ride.chat)
    ride : Ride;

    @Column({nullable : true})
    rideId : number;

    @CreateDateColumn() createdAt : string;
    @UpdateDateColumn() updatedAt : string;
}

export default Chat;