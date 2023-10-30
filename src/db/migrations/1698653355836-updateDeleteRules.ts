import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateDeleteRules1698653355836 implements MigrationInterface {
    name = 'UpdateDeleteRules1698653355836'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE \`appointments\` DROP FOREIGN KEY \`FK_5c7c9784a5bbb47ec0193d533ef\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`appointments\` DROP FOREIGN KEY \`FK_ccc5bbce58ad6bc96faa428b1e4\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`tattoo_works\` DROP FOREIGN KEY \`FK_029ef60c64d39126cee1977a169\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`appointments\`
            ADD CONSTRAINT \`FK_ccc5bbce58ad6bc96faa428b1e4\` FOREIGN KEY (\`client_id\`) REFERENCES \`users\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE \`appointments\`
            ADD CONSTRAINT \`FK_5c7c9784a5bbb47ec0193d533ef\` FOREIGN KEY (\`tattooist_id\`) REFERENCES \`users\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE \`tattoo_works\`
            ADD CONSTRAINT \`FK_029ef60c64d39126cee1977a169\` FOREIGN KEY (\`tattooist_id\`) REFERENCES \`users\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE \`tattoo_works\` DROP FOREIGN KEY \`FK_029ef60c64d39126cee1977a169\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`appointments\` DROP FOREIGN KEY \`FK_5c7c9784a5bbb47ec0193d533ef\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`appointments\` DROP FOREIGN KEY \`FK_ccc5bbce58ad6bc96faa428b1e4\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`tattoo_works\`
            ADD CONSTRAINT \`FK_029ef60c64d39126cee1977a169\` FOREIGN KEY (\`tattooist_id\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION
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

}
