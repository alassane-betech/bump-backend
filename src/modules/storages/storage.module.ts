import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { MediaEntity } from "./entities/media.entity";
import { StorageService } from "./storage.service";

@Module({
  imports: [TypeOrmModule.forFeature([MediaEntity])],
  controllers: [],
  providers: [StorageService],
  exports: [StorageService, TypeOrmModule]
})
export class StorageModule {}
