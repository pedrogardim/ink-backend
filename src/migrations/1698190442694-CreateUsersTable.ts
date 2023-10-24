import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateUsersTable1698190442694 implements MigrationInterface {
    name = 'CreateUsersTable1698190442694'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE \`users\` (
                \`id\` int NOT NULL AUTO_INCREMENT,
                \`email\` varchar(254) NOT NULL,
                \`password\` varchar(60) NOT NULL,
                \`first_name\` varchar(50) NOT NULL,
                \`last_name\` varchar(50) NOT NULL,
                \`phone_number\` int NOT NULL,
                \`profile_pic_url\` varchar(2000) NULL,
                \`role\` enum ('client', 'tattooist', 'admin', 'super_admin') NOT NULL DEFAULT 'client',
                \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
                \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
                UNIQUE INDEX \`IDX_97672ac88f789774dd47f7c8be\` (\`email\`),
                PRIMARY KEY (\`id\`)
            ) ENGINE = InnoDB
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP INDEX \`IDX_97672ac88f789774dd47f7c8be\` ON \`users\`
        `);
        await queryRunner.query(`
            DROP TABLE \`users\`
        `);
    }

}
