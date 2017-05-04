import { Author, Post, createPost} from './connectors';

const resolvers = {
  Mutation:{
    createPost(_, args){
      return createPost(args);
    },
  },
  Query: {
    author(_, args) {
      return Author.find({ where: args });
    },
    posts(_, args){
      return Post.find({where: args});
    }
  },
  Author: {
    posts(author) {
      return author.getPosts();
    },
  },
  Post: {
    author(post) {
      return post.getAuthor();
    },
  },
};

export default resolvers;