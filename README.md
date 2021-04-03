# Nodejs: Testing and Code Quality

A Node.js maintainable codebase with clean and easy-to-manage code.

Let's build the Nadia's Garden Reservations app.

Repo author: [Francis Rodrigues](https://github.com/francisrod01)

## Nadia’s Garden Restaurant

This is a Node.js and Express website that accepts and lists restaurant reservations. Improve it with the lynda.com course, "Node.js: Testing and Code Quality" by Jon Peck.

The backend contains intentional mistakes, like weak validation on email addresses. Inconsistencies in coding style are also intentional.

## Resources reached

- code quality?
- Testing and code quality fundamentals
- Coding conventions and standards
- Creating and enforcing coding standards
- Unit, integration, and functional testing
- Test-driven development test specificatons
- Behavior-driven development test specifications
- Finding errors with linting
- Extending an ESLint shareable config
- Validating correctness with unit testing
- Replacing and inspecting with stubs, spies, and mocks
- Code coverage and why it matters
- Coverage with continuous integration

## Getting Started

```bash
npm install
npm start
```

The server runs on port 3000.

There are three routes:

- http://localhost:3000/ - homepage
- http://localhost:3000/reservations - submit a reservation booking request
- http://localhost:3000/admin - view all booking requests; basic auth login/password `admin`

The server persists using a SQLite3 database named `database.sqlite` in the site root.

## Development

This project uses EditorConfig to standardize text editor configuration.  
Visit http://editorconfig.org for details.

### Debugging

This project uses https://www.npmjs.com/package/debug for development logging. To start `nodemon` and enable logging:

```bash
npm run debug
```

## FAQ

- Q: Why didn't you store the time submitted?
  - A: I wanted to reduce the number of fields and simplify testing.
- Q: Wouldn't it be easier if the form submitted a datetime string instead of building and parsing one?
  - A: Yes, it would, but the form logic is simpler. Either way, someone has to do the work.
- Q: Why did you mix a callback and a Promise in `lib/reservations.js`?
  - A: `Joi` doesn't support Promises, but it does support callbacks. I wanted to show how to test both kinds of asynchronous code.
- Q: How'd you handle cross-platform support?
  - A: Avoided relative directories, used `cross-env` to transform environmental variables.

## Credits

This is an adaptation of a WordPress site hosted at http://587672.youcanlearnit.net/

The conversion:

- Archive original with wget
- Strip out unrelated functionality
- Reorganize JavaScript and Stylesheets into logical directories
- Converted HTML into Jade / Pug templates using http://html2jade.org/

The front end should be mostly unchanged from the original.

## License

MIT
