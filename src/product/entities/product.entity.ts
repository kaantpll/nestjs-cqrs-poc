import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('products')
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', nullable: false })
  name: string;
  @Column({ default: 0 })
  stock: number;
  @Column({ type: 'money', nullable: false })
  price: string;
}
