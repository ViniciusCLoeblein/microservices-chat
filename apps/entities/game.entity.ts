import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Map } from './map.entity';

@Entity()
export class Game {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  player1Name: string;

  @Column()
  player2Name: string;

  @Column({ default: 0 })
  player1Position: number;

  @Column({ default: 0 })
  player2Position: number;

  @Column({ default: 0 })
  currentPlayerIndex: number;

  @Column({ nullable: true })
  winnerId: number | null;

  @ManyToOne(() => Map)
  @JoinColumn({ name: 'mapId' })
  map: Map;

  @Column()
  mapId: number;
}
