- clsx let us apply/ toggle class easily
- font - next download it and host with other static assets no addn req for font
- Any UI you add to the root layout will be shared across all pages in your application. You can use the root layout to modify your <html> and <body> tags, and add metadata 
- <a> -- reloads page completely and <Link> dont
- request waterfalls - A "waterfall" refers to a sequence of network requests that depend on the completion of previous requests. In the case of data fetching, each request can only begin once the previous request has returned data.
- parallel data fetching - make a promise
    const data = await Promise.all([
      invoiceCountPromise,
      customerCountPromise, // all 3 are the sql db queries
      invoiceStatusPromise,
    ]);

- Streaming is a data transfer technique that allows you to break down a route into smaller "chunks" and progressively stream them from the server to the client as they become ready.
    There are two ways you implement streaming in Next.js:
        At the page level, with the loading.tsx file (which creates <Suspense> for you).
        At the component level, with <Suspense> for more granular control.

- adding loading skeleton

- Suspense allows you to defer rendering parts of your application until some condition is met (e.g. data is loaded). You can wrap your dynamic components in Suspense. Then, pass it a fallback component to show while the dynamic component loads.

    <Suspense fallback={<RevenueChartSkeleton />}>
        <RevenueChart />
    </Suspense>

- use of route groups --> 
    right now loading skeleton apply to /dashboard and /dashboard/invoices and /dashboard/custormers also
    also use route group to group a separate section of the a one parent route

- grouping component
    need to wrap the <Card> components in Suspense. You can fetch data for each individual card, but this could lead to a popping effect as the cards load in, this can be visually jarring for the user.

QUESTION: what is considered good practice when working with Suspense and data fetching?
ANSWER: Move data fetches down to the components that need it

- Debouncing is a programming practice that limits the rate at which a function can fire. In our case, you only want to query the database when the user has stopped typing.

    How Debouncing Works:
        Trigger Event: When an event that should be debounced (like a keystroke in the search box) occurs, a timer starts.
        Wait: If a new event occurs before the timer expires, the timer is reset.
        Execution: If the timer reaches the end of its countdown, the debounced function is executed.

QUESTION - What problem does debouncing solve in the search feature?
ANSWER - It prevents a new database query on every keystroke

- Next.js has a client-side router cache that stores the route segments in the  user's browser for a time. Along with prefetching, this cache ensures that users can quickly navigate between routes while reducing the number of requests made to the server.

    Since you're updating the data displayed in the invoices route, you want to clear this cache and trigger a new request to the server. You can do this with the revalidatePath function from Next.js:

- notFound will take precedence over error.tsx, so you can reach out for it when you want to handle more specific errors!