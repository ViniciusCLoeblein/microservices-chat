import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Map {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @Column()
  houses: number;
}
