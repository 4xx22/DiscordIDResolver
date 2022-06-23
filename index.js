const {REST} = require('@discordjs/rest')
const {Routes} = require('discord-api-types/v9')
const express = require('express');

const { token, port } = require('./config.json');
const app = express();
const rest = new REST().setToken(token)

const fetchUser = async id => { 
        return rest.get(Routes.user(id)).catch(e => {
            console.error(e)
            return "An error occured, please send a correct user id."
        })
}
app.get('/', async (request, response) => {
    if(request.query.id){
        console.log(`Resolving ${request.query.id}`)
        let user = await fetchUser(request.query.id)
        console.log(user)
        response.send(user);
    } else {
        response.send('Please send an id.');
    }

})

app.listen(port, () => console.log(`App listening at http://localhost:${port}`));
