import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateAppointmentsTable1698243116264 implements MigrationInterface {
    name = 'CreateAppointmentsTable1698243116264'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE \`appointments\` (
                \`id\` int NOT NULL AUTO_INCREMENT,
                \`description\` varchar(256) NULL,
                \`start_time\` datetime NOT NULL,
                \`end_time\` datetime NOT NULL,
                \`type\` enum ('tattoo', 'piercing') NOT NULL DEFAULT 'tattoo',
                \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
                \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
                \`client_id\` int NULL,
                \`tattooist_id\` int NULL,
                PRIMARY KEY (\`id\`)
            ) ENGINE = InnoDB
        `);
        await queryRunner.query(`
            ALTER TABLE \`appointments\`
            ADD CONSTRAINT \`FK_ccc5bbce58ad6bc96faa428b1e4\` FOREIGN KEY (\`client_id\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE \`appointments\`
            ADD CONSTRAINT \`FK_5c7c9784a5bbb47ec0193d533ef\` FOREIGN KEY (\`tattooist_id\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE \`appointments\` DROP FOREIGN KEY \`FK_5c7c9784a5bbb47ec0193d533ef\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`appointments\` DROP FOREIGN KEY \`FK_ccc5bbce58ad6bc96faa428b1e4\`
        `);
        await queryRunner.query(`
            DROP TABLE \`appointments\`
        `);
    }

}
