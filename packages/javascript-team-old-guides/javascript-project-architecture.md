# JavaScript Project Architecture

Architecture we use on JavaScript projects is based on these concepts:

* Application store as a single source of truth
* Unidirectional data flow
* Component-based UI


### Application store as a single source of truth

The state of application is stored in an object tree within a single store. We achieve this using [*Redux*](https://redux.js.org/).

Single store makes it easy to create universal apps, as the state from server can be serialized and hydrated into the 
client with no extra coding effort. A single state tree also makes it easier to debug or inspect an application.


### Unidirectional data flow

The only way to change the state is to emit an action, an object describing what happened. 

This ensures that neither the views nor the network callbacks will ever write directly to the state. Instead, they 
express an intent to transform the state. Because all changes are centralized and happen one by one in a strict order, 
there are no subtle race conditions to watch out for. As actions are just plain objects, they can be logged, serialized, 
stored, and later replayed for debugging or testing purposes.

Figure 1: [Redux / Unidirectional data flow](./images/redux-unidirectional-data-flow.gif)

Read more about Redux architecture at official website [https://redux.js.org/](https://redux.js.org/).


### Component-based UI

A software component can be defined as a unit of composition with a contractually specified interface and explicit 
context dependencies only. That is, a software component can be deployed independently and is subject to composition 
by third parties.

[*React*](https://reactjs.org/) is component based. It allows us to build encapsulated components that manage their 
own state, then compose them to make complex UIs.

When writing UI in React we follow these principles: 

* **Re-usability** − components are usually designed to be reused in different situations in different applications. However, 
some components may be designed for a specific task.

* **Replaceable** − components may be freely substituted with other similar components. Components are designed to 
operate in different environments and contexts.

* **Composability** − a component can be composed from existing components to provide new behavior.

* **Encapsulated** − a component provides interfaces, which allow the caller to use its functionality, and do not expose 
details of the internal processes or any internal variables or state.

* **Independent** − components are designed to have minimal dependencies on other components.
