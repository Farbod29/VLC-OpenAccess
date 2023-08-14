import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { VotesModule } from './votes/votes.module';
import { MongooseModule } from '@nestjs/mongoose';

const connectionString =
  'mongodb+srv://Farbod:9PXXXXXXXXXREMOVEDInPublicMode@cluster0.ir9e6.mongodb.net/COMPANION?retryWrites=true&w=majority';
//'mongodb+srv://menugoo:9PXXXXXXXXXREMOVEDInPublicMode@cluster0.nxyk6.mongodb.net/restaurant';

@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [MongooseModule.forRoot(connectionString), VotesModule],
})
export class AppModule {}
