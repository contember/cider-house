# 🍎 Cider house example project

This is example project for Cider house.

If you have any questions, we're happy to help in [Discord](https://discord.com/invite/EkhsuAK2Fg).


## How to use this project

You'll need:

- NPM version 7+ (you can check using `npm --version`)
- [Docker](https://docs.docker.com/get-docker/)

### 🚀 Run Cider house locally

1. Clone this repository (`git clone git@github.com:contember/cider-house.git`)
2. Install dependencies:

```bash
npm install
```

3. Start project:

```bash
npm start
```

This command will start Admin application and all docker containers (Contember Engine, Postgres, S3, Mailhog and Adminer). When you are done developing, you can stop docker containers by `docker-compose down`.

_Congratulations, you're done!_

Administration UI is now running at http://localhost:1480.

You are ready to go!
