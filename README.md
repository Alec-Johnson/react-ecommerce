# react-ecommerce

A simple ecommerce site built with React, Redux Saga, Stripe, Firebase, and GraphQL

Redux:

Async in Redux.
You can either use Thunk Middleware or Redux Saga.
Redux Thunk: Lets you handle the async code, fetch data from api inside the actions before updating the store
Redux Saga: Takes async code out of action creators, intercepts actions, calls a generator function to handle async requests, and dispatches another action before updating the store

Why add on Saga?
I could have stuck with putting the async code into the action creators, but I wanted to try out Redux-Saga as it gives you more control over your applications side effects and makes handling errors easier. It also allowed me to keep my action creators simple which helps as an application grows, despite using more boilerplate code
