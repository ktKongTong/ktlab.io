import { faker} from "@faker-js/faker/locale/zh_CN";

export function createRandomArticle() {
  return {
    title: faker.lorem.words(),
    description: faker.word.words({count: {max: 20, min: 10}}),
    tags: faker.helpers.multiple(faker.word.adjective, {
      count: faker.number.int({max: 3})
    }),
    link: faker.internet.url(),
    image: faker.image.url(),
    date: faker.date.past(),
    hit: faker.number.int({max: 100000}),
    like: faker.number.int({max:999, min:0}),
    dislike: faker.number.int({max:99, min:0}),
    comments: faker.number.int({max:50, min:0}),
  };
}

export const mockedArticles = faker.helpers.multiple(createRandomArticle, {
  count: 5,
});


export default mockedArticles;