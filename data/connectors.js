import Sequelize from 'sequelize';
import casual from 'casual';
import _ from 'lodash';

const db = new Sequelize('newTest', null, null, {
  dialect: 'sqlite',
  storage: './newTest.sqlite',
});

const AuthorModel = db.define('author', {
  firstName: { type: Sequelize.STRING },
  lastName: { type: Sequelize.STRING },
  username: { type: Sequelize.STRING },
});

const PostModel = db.define('post', {
  title: { type: Sequelize.STRING },
  body: { type: Sequelize.STRING },
  url: {type: Sequelize.STRING},
  votes: {
    type: Sequelize.INTEGER,
    defaultValue: 0 
  },
  latitude: {
    type: Sequelize.INTEGER,
    allowNull: true,
    defaultValue: null,
    validate: { min: -90, max: 90 }
  },
  longitude: {
    type: Sequelize.INTEGER,
    allowNull: true,
    defaultValue: null,
    validate: { min: -180, max: 180 }
  },
});



AuthorModel.hasMany(PostModel, {
   foreignKey: 'post_id',
   constraints: false,
});

PostModel.belongsTo(AuthorModel, {
  foreignKey: 'post_id',
  constraints: false
});


// create mock data with a seed, so we always get the same
casual.seed(123);

db.sync({ force: true }).then(() => {
  _.times(10, () => {
    return AuthorModel.create({
      firstName: casual.first_name,
      lastName: casual.last_name,
      username: "psyrotix"
    }).then((author) => {
      return author.createPost({
        title: `A post by ${author.firstName}`,
        body: casual.sentences(3),
        url: casual.url,
      });
    });
  });
});
db.sync({ force: true }).then(() => {
  _.times(10, () => {
    return PostModel.create({
      title: casual.title,
      body: casual.text,
      url: casual.url,
      longitude: casual.longitude,
      latitude: casual.latitude
    }).then((post)=>{
        PostModel.findAndCountAll().then((authors)=>{
    })

    })
  });
});

const createPost = (args) => {
  if(args.count > 1){
    return 
  }else {
    return AuthorModel.create({
      firstName: args.firstName ? args.firstName : undefined,
      lastName: args.lastName ? args.lastName : undefined,
      username: args.username
    }).then((author)=>{
      return author.createPost({
          title: args.title,
          body: args.body,
          url: args.url,
          latitude: args.latitude ? args.latitude : null,
          longitude: args.longitude ? args.longitude : null
      })
    })
  }
}

const voteUpPost = (postId) =>{
  return PostModel.findById(postId).then((post)=>{
    post.votes++;
    return post.save().then((post)=>{
       return post;
    });
  })
}

const voteDownPost = (postId) =>{
  return PostModel.findById(postId).then((post)=>{
    post.votes--;
    return post.save().then((post)=>{
      return post;
    });
  })
}


const Author = db.models.author;
const Post = db.models.post;

export { Author, Post, createPost, voteUpPost, voteDownPost};
// import Sequelize from 'sequelize';
// import casual from 'casual';
// import _ from 'lodash';

// const db = new Sequelize('test', 'parth', 'lolTroll1', {
//   dialect: 'postgres',
//   storage: './test.pg',
// });

// const AuthorModel = db.define('author', {
//   firstName: { type: Sequelize.STRING },
//   lastName: { type: Sequelize.STRING },
// });

// const PostModel = db.define('post', {
//   title: { type: Sequelize.STRING },
//   text: { type: Sequelize.STRING },
//   hashtags: { type: Sequelize.ARRAY(Sequelize.STRING) },
//   url: {type: Sequelize.STRING},
//   votes: {type: Sequelize.INTEGER},
//   latitude: {
//     type: Sequelize.INTEGER,
//     allowNull: true,
//     defaultValue: null,
//     validate: { min: -90, max: 90 }
//   },
//   longitude: {
//     type: Sequelize.INTEGER,
//     allowNull: true,
//     defaultValue: null,
//     validate: { min: -180, max: 180 }
//   },
// });


// AuthorModel.hasMany(PostModel);
// PostModel.belongsTo(AuthorModel);

// // create mock data with a seed, so we always get the same
// casual.seed(123);
// db.sync({ force: true }).then(() => {
//   _.times(10, () => {
//     return AuthorModel.create({
//       firstName: casual.first_name,
//       lastName: casual.last_name,
//     }).then((author) => {
//       return author.createPost({
//         title: `A post by ${author.firstName}`,
//         text: casual.sentences(3),
//       });
//     });
//   });
// });

// const Author = db.models.author;
// const Post = db.models.post;

// export { Author, Post };