import { Migration } from '@mikro-orm/migrations';

export class Migration20201013203122 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "table" drop constraint if exists "table_owner_id_check";');
    this.addSql('alter table "table" alter column "owner_id" type int4 using ("owner_id"::int4);');
  }

}
