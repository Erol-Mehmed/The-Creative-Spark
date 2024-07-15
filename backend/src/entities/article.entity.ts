import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Author } from './author.entity';

@Entity('articles')
export class Article {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Author, author => author.id)
  @JoinColumn({ name: 'authorId' })
  author: Author;

  @Column()
  title: string;

  @Column()
  content: string;

  @Column({ nullable: true })
  image: string

  @Column()
  topics: number[]

  @Column()
  createdAt: Date;

  @Column()
  updatedAt: Date;

  @Column()
  isActive: boolean;
}
