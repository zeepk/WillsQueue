# Will's Queue App
![Heroku](https://pyheroku-badge.herokuapp.com/?app=willsqueue)
## Small webapp that lets [WillShayhan viewers](https://www.twitch.tv/willshayhan) queue up to join into games on stream!

Users can login with Twitch to join the queue, which updates all sessions with sockets.

Admins can move users between columns, delete list entries, or clear entire lists.

![image](https://user-images.githubusercontent.com/42755431/175762952-67bc2a81-a900-4a4b-b9e6-a8986868b3f0.png)

## Branch structure
- `main` - stable, automagically deployed to heroku
- `dev` - latest code, not production ready

## Stack
### Client
- TypeScript
- React
- PrimeReact
- Auth0
- Socket.io
### Server
- TypeScript
- Node
- Mongoose
- MongoDB
- Socket.io
