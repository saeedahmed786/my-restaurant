module.exports =  {
    // MONGODB_URL: process.env.MONGODB_URL || 'mongodb://localhost/my-rest',
    MONGODB_URI: process.env.MONGODB_URI || 'mongodb+srv://saeedchachar:8ibZ15MalTlaZ09H@cluster0.ufmxj.mongodb.net/my-restaurant?retryWrites=true&w=majority',
    JWT_SECRET: process.env.JWT_SECRET || 'somethingsecret',
    REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET || 'refreshsecretssss'

    
}