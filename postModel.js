const mongoose = require('mongoose');
const schema = mongoose.Schema({
    title: 'String',
    content: 'String',
});

const Post = mongoose.model('Post', schema);
module.exports = Post;
