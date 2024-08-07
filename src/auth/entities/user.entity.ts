import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "users" })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false, type: "varchar" })
  name: string;

  @Column({ nullable: true, type: "varchar" })
  avatarURL: string;

  @Column({ nullable: false, type: "varchar" })
    email: string;
    
    
}
