import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity('user', { schema: 'public' })
export class Areas extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'bigint', name: 'id' })
  id: string;

  @Column('character varying', { name: 'avatar_url', nullable: true })
  avatarUrl: string | null;

  @Column('character varying', { name: 'username', nullable: true })
  username: string | null;

  @Column('character varying', { name: 'open_id', nullable: true })
  openId: string | null;

  @Column('character varying', { name: 'session_id', nullable: true })
  sessionId: string | null;
}
