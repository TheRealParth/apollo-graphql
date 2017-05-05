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
    posts(_,args){
      return Post.get({where: args});
    },
    postsAll(_, args){
      return Post.findAll({limit: args.limit ? args.limit : 10, skip: args.skip ? args.skip : 0, first: args.first ? args.first : 0});
    },
    postsFindAndCountAll(_, args){
      return Post.findAndCountAll();
    },
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