# Tic Tac Toe

The same react tutorial app built in different ways.

### [Basic](./basic)

Follows tutorial instructions in the [official React docs](https://reactjs.org/tutorial/tutorial.html). App-level state, mix of class and functional components.

### [Redux](./redux)

Uses [`redux`](https://redux.js.org/) and [`react-redux`](https://react-redux.js.org/). The state of the app lives in a single _store_. To change state, components emit an _action_ object which have corresponding _reducers_—functions which transform the application state.

### [Context](./context)

Uses React's [`Context API`](https://reactjs.org/docs/context.html) for state management. Three methods of giving a component access to the app's context are demonstrated:

1. `Game` uses assigns its [`contextType`](https://reactjs.org/docs/context.html#classcontexttype) property to the Context object.

```
class Game extends React.Component {
  render() {
    …
    <button onClick={() => this.context.toggleAscending()}>
        {this.context.ascending ? 'ascending' : 'descending'}
    </button>
    …
  }
}

Game.contextType = Context;
```

2. `Board` uses a static class field to initialize its `contextType`.
```
class Board extends React.Component {
  static contextType = Context;
  render() {
    …
  }
}
```

3. `Square` (a function component) is wrapped in a [`Context.Consumer`](https://reactjs.org/docs/context.html#contextconsumer) to subscribe to Context changes.
```
function Square({ squareId }) {
  return (
    <Context.Consumer>
      {context => … }
    </Context.Consumer>
  );
}
```

The contextType property on a class can be assigned a Context object created by React.createContext()
