Case 1: Using App Router + Server Actions (recommended way)

Example:

<form action={calculateSum}>
What happens on submit?

Form submits → Server Action runs on the server

Server computes result

Next.js re-renders only the Server Components that depend on that data

The browser updates only that part of the UI

 No full page reload
 No losing scroll
 No resetting everything

This is called partial rendering.

-------------------------------------------------

What happens when the form is submitted?
Step-by-step flow

[ Form Submit ]
       ↓
[ Server Action ]
       ↓
[ DB Insert ]
       ↓
[ Re-render components that READ this data ]
       ↓
[ result-list.tsx updates ]