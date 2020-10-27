import { Migration } from '@mikro-orm/migrations';

export class Migration20201027232107 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "table" ("id" serial primary key, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "owner_id" int4 not null);');

    this.addSql('create table "user" ("id" serial primary key, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "username" text not null, "password" text not null);');
    this.addSql('alter table "user" add constraint "user_username_unique" unique ("username");');

    this.addSql('create table "player" ("id" serial primary key, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "table_id" int4 null, "name" varchar(255) not null, "score" int4 not null);');

    this.addSql('alter table "player" add constraint "player_table_id_foreign" foreign key ("table_id") references "table" ("id") on update cascade on delete set null;');
  }

}
