# MyMovies
1. npm i
2. start postgres server
3. Create Database mymovie and tables - movies and users
                                                                   Table "public.users"
     Column     |          Type           | Collation | Nullable |              Default              | Storage  | Compression | Stats target | Description 
----------------+-------------------------+-----------+----------+-----------------------------------+----------+-------------+--------------+-------------
 id             | integer                 |           | not null | nextval('users_id_seq'::regclass) | plain    |             |              | 
 email          | character varying(30)   |           | not null |                                   | extended |             |              | 
 password       | character varying(300)  |           | not null |                                   | extended |             |              | 
 fullname       | character varying(30)   |           | not null |                                   | extended |             |              | 
 salt           | character varying(1000) |           | not null |                                   | extended |             |              | 
 secret         | character varying(1000) |           | not null |                                   | extended |             |              | 
 passwordsecret | character varying(1000) |           | not null |                                   | extended |             |              | 

  Column    |         Type          | Collation | Nullable |              Default               | Storage  | Compression | Stats target | Description 
-------------+-----------------------+-----------+----------+------------------------------------+----------+-------------+--------------+-------------
 name        | character varying(30) |           | not null |                                    | extended |             |              | 
 id          | integer               |           | not null | nextval('movies_id_seq'::regclass) | plain    |             |              | 
 casts       | text[]                |           | not null |                                    | extended |             |              | 
 rating      | numeric               |           | not null |                                    | main     |             |              | 
 genre       | character varying(30) |           | not null |                                    | extended |             |              | 
 releasedate | date                  |           | not null |                                    | plain    |             |              | 
 userid      | integer               |           | not null |                                    | plain    |             |              | 

4. npm run dev