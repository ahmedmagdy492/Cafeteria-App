namespace CafetreiaApi.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class changeIsAvailablePropInProductToNotNull : DbMigration
    {
        public override void Up()
        {
            AlterColumn("dbo.Products", "IsAvailable", c => c.Boolean(nullable: false));
        }
        
        public override void Down()
        {
            AlterColumn("dbo.Products", "IsAvailable", c => c.Boolean());
        }
    }
}
