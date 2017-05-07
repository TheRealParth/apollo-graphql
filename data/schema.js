const typeDefinitions = `
type Author {
  id: Int
  firstName: String
  lastName: String
  username: String
  posts: [Post]
}
type Post {
  id: Int
  title: String
  body: String
  latitude: Int
  longitude: Int
  url: String
  votes: Int
  count: Int
  author: Author
}
type Query {
  author(firstName: String, lastName: String, username: String!): Author
  posts(limit: Int, id: Int, latitude: Int, longitude: Int, url: String): Post
  allPosts(first: Int, skip: Int, id: [Int], latitude: Int, longitude: Int, url: String): [Post]
  postsFindAndCountAll(limit: Int, id: [Int]): [Post]
}
type Mutation {
  createPost(username: String!, title: String!, body: String!, latitude: Int, longitude: Int, url: String!): Post
  voteUpPost(id: Int!): Post
  voteDownPost(id: Int!): Post
}
schema {
  query: Query
  mutation: Mutation
}
`;

export default [typeDefinitions];