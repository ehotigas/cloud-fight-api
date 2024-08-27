import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";

@Module({
    imports: [
        MongooseModule.forRoot('mongodb://localhost/cloud-fight')
    ]
})
export class DatabaseModule {

}