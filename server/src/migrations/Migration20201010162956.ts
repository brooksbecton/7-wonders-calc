import { Migration } from '@mikro-orm/migrations';

export class Migration20201010162956 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "table" add column "owner_id" varchar(255) not null;');
  }

}
