import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Joke {
  @Field()
  id: string;
  @Field()
  value: string;
  @Field()
  created_at: string;
  @Field()
  icon_url: string;
  @Field()
  updated_at: string;
  @Field()
  url: string;
  @Field(() => [String])
  categories: string[];
}
