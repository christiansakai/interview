# Steps on Answer

1. Clarifying Questions
   - Ask more directions
   - What it should do
     - REST API
     - User flow
   - Scalability and Capacity
     - How many users total / per day / per year / etc
     - Traffic per second / minute / etc

2. High Level Diagrams
   - Boxes as main components
     - User
     - Load Balancer
     - Application Server
     - Caching Layer
     - Database Layer
     - etc

   - Choices of components
     - Properties
     - Trade offs

3. Critical Parts

4. Details
   - Should feel like a conversation
     - If the interview goes well, will naturally go to a specific detail
     - If the interview does not go well, ask "What specific details do we need to talk about?"
   - Optimizations
     - Handle highly popular resources
   - Edge cases
   - Cache
   - Precomputation
   - CDN
   - Operational
     - Logging
     - Metric
     - Failure handling
     - Replication

# Overview
1. Ask good questions 
   - Features
   - Scalability
2. Don't use buzzwords without knowing 
3. Clear and organized thinking
4. Drive discussions (80 - 20 role)

# Things to Think About

- Features
- Define APIs
- Availability
- Latency Performance
- Scalability
- Durability
- Class Diagrams
- Security & Privacy
- Cost Effective

# Terms to Know

- Vertical & Horizontal Scaling
- Cap Theorem
- ACID (Atomicity, Consistency, Isolation, Durability) & BASE (Basicly Availble Soft State Eventual Consistency)
- Partitioning / Sharding Data
  - Consistent Hashing
- Optimistic vs Pessimistic Locking
- Strong vs Eventual Consistency
- Relational DB vs NoSQL
  - Types of NoSQL
    - Key Value
    - Wide Column
    - Document Based
    - Graph Based
- Caching
- Data Center / Racks / Hosts
- CPU / Memory / Hard Drive / Network Bandwith
  - Limited Resources
- Random vs Sequential Read/Write on Disk
- HTTP vs HTTP2 vs Web Sockets
- TCP / IP Model
- IPV4 vs IPV6
- TCP vs UDP
- HTTPS & TLS
- Public Key Infrastructure & Certificate Authority
- Symmetric vs Asymmetric Key
- Load Balancer
  - L4
  - L7
- CDN (Content Delivery Network) & EDGE
- Bloom Filters & Count Min Sketch
- Paxos - Consensus Over Distributed Hosts
  - Leader Election
- Design Patterns & Object Oriented Design
- Vertical Machines & Containers
- Map Reduce
- Multi Threading, Concurrency, Locks, Synchronization, CAS

# Technology to Know

- Cassandra
- MongoDB / Couchbase
- MySQL
- Memcached
- Redis
- ZooKeeper
- Kafka
- NGINX
- HAProxy
- Solr, Elastic Search
- Blobstore, Amazon S3
- Docker
  - Kubernetes
  - Mesos
- Hadoop/Spark
  - HDFS


# Take Note
- If get stuck, never say I don't know what to do
- Keep engaging with the interviewer, run again through things that we discussed
- If still stuck, ask for a hint, thats fine
- Take 2 - 3 core features
- If the interviewer wants to push you to a direction, it is to know more about you

# Examples
- Designing a logging system
  - 500 million active users
  - What does it mean? Maybe 70% of that is actually active? so 350 million users
  - Peak hour take 70% again, so 245 million users
  - 70k users per second on peak hours,
  - Assuming 1 NodeJs instanc takes 1000 concurrent users, we need 70 node servers
  - Now how many bandwith uptake from the user?
    - Assuming user is a mobile
      - Estimate, say 500kb/sec upload bandwith, this is not a good answer
      - Estimate on how many actions we need to log, strings, integers, this is better answer
      - What is the upper bound of kb what we can take? 25kb/sec? This is the best answer, this is emphatetic to user

- Design a Twitter
  - Features
    - User can send a tweet
    - Timeline
      - User's timeline
        - User's own tweets / retweets
      - Home timeline
        - Tweets / retweets of users whom the user follows
      - Merged all of above in a chronological fashion
    -  User can follow

  - Naive solution
    - Using relational database
      - Users table
        - ID
        - Name
      - Tweets table
        - ID
        - Content
        - UserID
    - To represent timeline
      - User's timeline
        - Select all of tweets that belong to that user
      - Home timeline
        - Select all of users that this user follows and find all the tweets that belong to those users
      - Merge all of them in chronological order

  - Point out bottlenecks
    - Tweet table gets huge
    - Select and join statements are huge
    - Huge amounts of requests per second 

  - What are the characteristics of the system
    - Read heavy
    - Latency vs availability?
      - Latency / consistency = one person reads a tweet 30 seconds later than another person
      - Availability = users cannot access the tweets
      - We choose availability, and just lower the consistency to eventual consistency

  - Redesign the system
    - User can tweet and see the timeline
      - Think from a user's perspective
      - User has a dialog box, types tweet and initiate POST/PUT request
      - Goes to load balancer closer to the region of the user
      - Load balancer distributes it to the next processing stage
      - Which is a Redis (in memory database) cluster
        - Side note: Twitter precompute the Home timeline (everybody that the user follows) and put it into Redis regardless whether that user is active or not. Everytime a user who follows this user updates a tweet, then Twitter recomputes it.
        - Due to availability, every precomputed data is replicated 3 times (so 3 Redis instances)
        - Mention to the interviewer that the Redis machines need to have large memory.
          - This can be mitigated by not precomputing the home timeline of user's who are not active (maybe 2 weeks inactive)
          - Once the user revisits Twitter, it will take some time to compute it at the moment
        - The Redis list contains
          - The followers of this user's home timeline
            - Follower id as the key
            - Follower's home timeline as the value, which are rows that contain columns:
              - TweetID
              - SenderID
          - This is replicated 3 times. So every user's data should be available in that 3 machines eventually (eventual consistency).
        - Say that Alice has 100 followers, that means for every Alice's tweet, this act is replicated 3 x 100 = 300 times.
        - What are the problems with this architecture?
          - What if someone very famous, millions of followers?
          - This could be a huge computational load
          - An example of edge case: The person who has a million followers could have its tweet being replicated slower than a person with 10 followers. What if the person with a 10 followers follow the person that has a million followers and react to that tweet. The person who has 10 followers might see the reaction first before the actual tweet.
        - Approach of the problem 
          - Mixed approach of Redis and SQL
          - Alice and Bob follow Lady Gaga. Alice and Bob still gets precomputed, except tweets from Lady Gaga, which will be inserted at query time

    - User can follow
      - User clicks to follow another user
      - The request goes to a load balancer
      - Load balancer sends it to a table that contains the followers for the users
        - It will insert this user as a follower of the user that this user follows
      - During the tweet process described above, the loab balancer can query this followers table to get the list of followers of this user, and tell some other server to precompute the timeline.

    - How does a user see the timeline
      - A user goes to the browser, initiates GET request
      - Request goes to load balancer
      - Load balancer forwards it to the Redis clusters
      - The fastest Redis machine that responds will get the data redirected back to the user
      - This data will populate the user's timeline

  - Tradeoffs of This Architecture
    - Read heavy, need to have fast reads
    - Eventual consistency
    - Space
      - Tweet only 140 characters (no other media form)
      - So space is not a big of a problem.
      - Sacrifice a lot of memory to have heavy fast reads

  - Some other notes
    - When the Redis clusters get big (hundreds of thousands machines), the loab balancer needs to know which 3 out of hundreds of thousands of Redis machine to query because only those three contains the wanted data.
    - Can be done with hash lookups
    - With other features, such as search, it can be done using a totally different architecture separate from this one.


- Design WhatsApp
  - Features
    - One to one text
    - Sent/Delivered/Read
    - Push notifications










 



