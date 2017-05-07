import { Author, Post, voteUpPost, voteDownPost, createPost} from './connectors';

const resolvers = {
  Mutation:{
    createPost(_, args){
      return createPost(args);
    },
    voteUpPost(_, args){
      return voteUpPost(args.id);
    },
    voteDownPost(_, args){
      return voteDownPost(args.id);
    }
  },
  Query: {
    author(_, args) {
      return Author.find({ where: args });
    },
    posts(_,args){
      return Post.find({where: args});
    },
    allPosts(_, args){
      return Post.findAll({limit: args.first ? args.first + args.skip : 10, skip: args.skip ? args.skip : 0});
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