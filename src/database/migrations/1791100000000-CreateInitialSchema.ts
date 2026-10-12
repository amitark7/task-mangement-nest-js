import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateInitialSchema1791100000000 implements MigrationInterface {
  name = 'CreateInitialSchema1791100000000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`users\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`email\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, \`role\` enum ('USER', 'ADMIN') NOT NULL DEFAULT 'USER', \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, \`refreshTokenHash\` varchar(255) NULL, \`refreshTokenExpiresAt\` datetime NULL, UNIQUE INDEX \`IDX_97672ac88f789774dd47f7c8be\` (\`email\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`tasks\` (\`id\` int NOT NULL AUTO_INCREMENT, \`title\` varchar(255) NOT NULL, \`description\` varchar(255) NOT NULL, \`status\` enum ('TODO', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED') NOT NULL DEFAULT 'TODO', \`priority\` enum ('LOW', 'MEDIUM', 'HIGH') NOT NULL DEFAULT 'MEDIUM', \`dueDate\` datetime NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, \`userId\` int NOT NULL, \`remarks\` varchar(500) NULL, \`estimatedMinutes\` int NULL, \`version\` int NOT NULL, INDEX \`IDX_b51eb9b6f0f8fb6f5acd06b5ca\` (\`userId\`, \`priority\`), INDEX \`IDX_834b57735f213c3c2d642baf98\` (\`userId\`, \`status\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`attachments\` (\`id\` int NOT NULL AUTO_INCREMENT, \`taskId\` int NOT NULL, \`originalName\` varchar(255) NOT NULL, \`fileName\` varchar(255) NOT NULL, \`mimeType\` varchar(255) NOT NULL, \`size\` int NOT NULL, \`path\` varchar(255) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`notification\` (\`id\` int NOT NULL AUTO_INCREMENT, \`userId\` int NOT NULL, \`taskId\` int NOT NULL, \`message\` varchar(255) NOT NULL, \`isRead\` tinyint NOT NULL DEFAULT 0, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), INDEX \`IDX_a7bd8c3a3432332819504723cb\` (\`userId\`, \`isRead\`, \`createdAt\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`tasks\` ADD CONSTRAINT \`FK_166bd96559cb38595d392f75a35\` FOREIGN KEY (\`userId\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`attachments\` ADD CONSTRAINT \`FK_65152e15d915ebe1294160bd1d3\` FOREIGN KEY (\`taskId\`) REFERENCES \`tasks\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`attachments\` DROP FOREIGN KEY \`FK_65152e15d915ebe1294160bd1d3\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`tasks\` DROP FOREIGN KEY \`FK_166bd96559cb38595d392f75a35\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_a7bd8c3a3432332819504723cb\` ON \`notification\``,
    );
    await queryRunner.query(`DROP TABLE \`notification\``);
    await queryRunner.query(`DROP TABLE \`attachments\``);
    await queryRunner.query(
      `DROP INDEX \`IDX_834b57735f213c3c2d642baf98\` ON \`tasks\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_b51eb9b6f0f8fb6f5acd06b5ca\` ON \`tasks\``,
    );
    await queryRunner.query(`DROP TABLE \`tasks\``);
    await queryRunner.query(
      `DROP INDEX \`IDX_97672ac88f789774dd47f7c8be\` ON \`users\``,
    );
    await queryRunner.query(`DROP TABLE \`users\``);
  }
}
