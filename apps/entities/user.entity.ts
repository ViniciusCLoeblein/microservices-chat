import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BeforeInsert,
  BeforeUpdate,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { DateOrStringOrFunction } from 'apps/generics/constants';

@Entity('user')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  name: string;

  @CreateDateColumn({
    name: 'created_at',
    type: 'date',
    default: () => 'CURRENT_DATE',
  })
  createdAt: DateOrStringOrFunction;

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'date',
    default: () => 'CURRENT_DATE',
  })
  updatedAt: DateOrStringOrFunction;

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword(): Promise<void> {
    if (this.password) {
      const saltRounds = 10;
      this.password = await bcrypt.hash(this.password, saltRounds);
    }
  }
}
