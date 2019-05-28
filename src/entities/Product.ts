import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
class Product extends BaseEntity{
    @PrimaryGeneratedColumn() id : number;

    @Column({type : "text"})
    product : string;

    @Column({type : "boolean", default : false})
    money_usage : boolean;

    @Column({type : "boolean", default: false})
    fragile : boolean;

    @Column({type : "double precision", default : 0})
    product_price : number;

    @Column({type : "double precision", default : 0})
    weight_estimated : number;

    @Column({type : "text"})
    volume_estimated : string;

    @CreateDateColumn() createdAt : string;
    @UpdateDateColumn() updatedAt : string;

}

export default Product;