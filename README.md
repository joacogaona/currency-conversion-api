## Description

La API usa NestJS un framework para NodeJs que nos plantea una estructura de Modules, Controllers y Services para la correcta separación de responsabilidades y facilitar la escalabilidad.

La API posee un endpoint para obtener la conversión entre las monedas EUR, USD, MXN, BRL. La conversión se realiza en base a el mejor rate entre la api de fixer.io y los datos almacenados de manera local. Además tenemos un segundo endpoint que sirve para recibir requests desde un webhook para actualizar los datos locales.

Para ver la documentación de la API correr yarn run start:dev y acceder a esta url: http://localhost:3000/api/ (swagger)

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ yarn install
```

## Running the app

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```

## Test

```bash
# unit tests
$ yarn run test

# e2e tests
$ yarn run test:e2e

# test coverage
$ yarn run test:cov
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).
