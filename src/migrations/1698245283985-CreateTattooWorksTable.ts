import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTattooWorksTable1698245283985 implements MigrationInterface {
    name = 'CreateTattooWorksTable1698245283985'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE \`tattoo_works\` (
                \`id\` int NOT NULL AUTO_INCREMENT,
                \`description\` varchar(256) NOT NULL,
                \`image_url\` varchar(2000) NULL,
                \`role\` enum ('tatto', 'piercing') NOT NULL DEFAULT 'tattoo',
                \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
                \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
                \`tattooist_id\` int NULL,
                PRIMARY KEY (\`id\`)
            ) ENGINE = InnoDB
        `);
        await queryRunner.query(`
            ALTER TABLE \`tattoo_works\`
            ADD CONSTRAINT \`FK_029ef60c64d39126cee1977a169\` FOREIGN KEY (\`tattooist_id\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE \`tattoo_works\` DROP FOREIGN KEY \`FK_029ef60c64d39126cee1977a169\`
        `);
        await queryRunner.query(`
            DROP TABLE \`tattoo_works\`
        `);
    }

}
