import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { Joke } from './jokes.interface';
import { JokeService } from './jokes.service';
import axios from 'axios';
@Resolver(() => Joke)
export class JokesResolver {
  constructor(private readonly jokeService: JokeService) {}

  @Mutation(() => String)
  async addToFavorite(@Args('jokeId', { type: () => String }) jokeId: string) {
    return this.jokeService.saveToFavorite(jokeId);
  }

  @Query(() => [String])
  async getJokeCats() {
    const { data: cats } = await axios.get(
      'https://api.chucknorris.io/jokes/categories',
    );
    return cats;
  }

  @Query(() => [Joke])
  async getFavoriteJokes() {
    return this.jokeService.getFavoriteJokes();
  }

  @Query(() => Joke)
  async getJoke() {
    const { data: jokeRemote } = await axios.get(
      'https://api.chucknorris.io/jokes/random',
    );

    return jokeRemote;
  }

  @Query(() => [Joke])
  async getJokeByAmount(
    @Args('amount', { type: () => Number }) amount: number,
  ) {
    const all = [];

    for (let i = 0; i < amount; i++) {
      const { data: joke } = await axios.get(
        'https://api.chucknorris.io/jokes/random',
      );
      all.push(joke);
    }

    return all;
  }

  @Query(() => [Joke])
  async getJokeByQuery(@Args('query', { type: () => String }) query: string) {
    const { data: jokes } = await axios.get(
      `https://api.chucknorris.io/jokes/search?query=${query}`,
    );
    return jokes.result;
  }

  @Query(() => Joke)
  async getJokeByCat(@Args('catName', { type: () => String }) catName: string) {
    const { data: jokeRemote } = await axios.get(
      `https://api.chucknorris.io/jokes/random?category=${catName}`,
    );
    return jokeRemote;
  }
}
