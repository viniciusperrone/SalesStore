import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ICustomer } from '@modules/customers/domain/model/ICustomer';

@Entity('customers')
class Customer implements ICustomer {
  @PrimaryColumn('uuid')
  uuid: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Customer;
