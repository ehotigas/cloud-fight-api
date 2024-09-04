import { DatabaseModule } from './DatabaseModule/DatabaseModule';
import { Module } from '@nestjs/common';

@Module({
  imports: [
    DatabaseModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
  
}
