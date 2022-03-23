import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
// import { Joke } from './jokes.interface';
import axios from 'axios';

@Injectable()
export class JokeService {
  constructor(private prisma: PrismaService) {}

  async saveToFavorite(jokeId: string): Promise<string> {
    try {
      const candidate = await this.prisma.favorites.findFirst({
        where: { jokeId },
      });
      if (candidate) {
        return `Joke id=${jokeId} already saved!`;
      }

      await this.prisma.favorites.create({
        data: { jokeId },
      });
      return `Joke id=${jokeId} saved to favorite!`;
    } catch (err) {
      return 'Cant save favorite joke ;(';
    }
  }

  async getFavoriteJokes(): Promise<any> {
    try {
      const allJokes = [];
      const jokesIds = await this.prisma.favorites.findMany();
      for (let i = 0; i < jokesIds.length; i++) {
        try {
          const { data: joke } = await axios.get(
            `https://api.chucknorris.io/jokes/${jokesIds[i].jokeId}`,
          );
          allJokes.push(joke);
        } catch {}
      }
      return allJokes;
    } catch (err) {
      return [];
    }
  }
}
