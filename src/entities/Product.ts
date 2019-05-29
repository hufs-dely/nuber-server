import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn, OneToOne, ManyToOne } from "typeorm";
import Quest from "./Quest";
import User from "./User";

@Entity()
class Product extends BaseEntity{
    @PrimaryGeneratedColumn() id : number;

    @Column({type : "text"})
    product : string;

    @Column({type : "boolean", default: false})
    fragile : boolean;

    @Column({type : "double precision", default : 0})
    product_price : number;

    @Column({type : "double precision", default : 0})
    weight_estimated : number;

    @OneToOne(type => Quest, quest => quest.product)
    quest : Quest

    @ManyToOne(type => User, user => user.product)
    user : User

    @CreateDateColumn() createdAt : string;
    @UpdateDateColumn() updatedAt : string;

}

export default Product;