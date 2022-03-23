import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { JokesResolver } from './jokes.resolver';
import { JokeService } from './jokes.service';

@Module({
  controllers: [],
  providers: [JokesResolver, JokeService, PrismaService],
})
export class JokesModule {}
