import { Migration } from '@mikro-orm/migrations';

export class Migration20201010162407 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "table" ("id" serial primary key, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "title" varchar(255) not null, "player_ids" text[] not null);');

    this.addSql('drop table if exists "post" cascade;');
  }

}
