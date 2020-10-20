import { Migration } from '@mikro-orm/migrations';

export class Migration20201013205005 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "player" add column "table_id" int4 null;');

    this.addSql('alter table "player" add constraint "player_table_id_foreign" foreign key ("table_id") references "table" ("id") on update cascade on delete set null;');
  }

}
