# API-Proxy-Server
A proxy server that intercepts requests to OpenWeatherMap and implements rate limiting and caching

### What is Rate Limiting A.K.A Throttling
Rate Limiting is a technique which allows a service to control consumption of its resources, used by an individual user or any other service.

### Why use Rate Limiting
- To prevent service from crashing due to a denial of service attack.
- To implement quotas for different tiers of API service (free, pro).
- To implement budgeting (AWS, GCP limit services once costs exceed the set budget).
- To ensure performance doesn't degrade when load from some user overwhelms.

### Algorithms
- Token Bucket
  - A in-memory data base is used that stores user_id as key and last_requested_time, tokens_left as values.
  - Let's say we wish to serve X requests/min.
  - Whenever a new request arrives, we check if last_requested_time happened in same minute or not.
  - If it happened during the same minute then and tokens_left is greater than 0, we fulfill request and decrement tokens_left.
  - If it is happening at a newer minute then we first update tokens_left to X and then proceed like above.
  - This algorithm is fast and memory efficient as data stored per user is very less.
  - It might not be a good choice for a distributed system as racearound condition may exist, where two server try to access/update tokens_left at the same time.

- Leaky Bucket
  - A queue like datastructure is used with max size equal to 'X'.
  - A request handling system regularly pops out requests from this queue to respond to them.
  - If the queue is not full, then the new arriving requests simply get enqueued.
  - If the queue is full, then the incomming requests are discarded.
  - Speciality of this algorithm is its ability to spread bursts of request that happens.

 - Fixed Window
  


### Identity
Requests can be identified with the help of `API_KEYS, IP_ADDRESS, USER_ID, SERVICE_ID, GEO LOCATION`.

### Error Code
Error Code 429 - `TOO MANY REQUESTS`
