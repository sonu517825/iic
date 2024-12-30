const mongoose = require('mongoose')
mongoose.connect('mongodb+srv://luser-1:8Q7xTzxEs3UL9tJp@iic-clearning.yhiwn.mongodb.net/demo').then(e=>
    console.log('mongodb connected')
).catch(err=>console.error(err));
