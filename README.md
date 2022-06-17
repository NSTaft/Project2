# MyFace Blog

For my second project in my Software Engineering Immersive bootcamp, I've created a simple blog for users to login with a unique username to post about anything their hearts desire. With full CRUD capability, users can create, read, update, and delete any post specific to their username.

Posts are displayed on the homepage. From there, users can select an article to view on its own page to see more details.

---
# User Stories

AAU, I would like to visit this site to post interesting memoirs and tidbits about daily life and subjects I care about.

AAU, I would like to leave comments on articles and share thoughts with a community.

---
# Entity Relationship Diagram

User 1:M Posts

---
CRUD Routes


| Method | Path |
| ----------- | ----------- |
| GET | /posts |
| GET | /posts/new |
| POST | /posts |
| GET | /posts/:id/edit |
| PUT | /posts/:id |
| GET | /posts/:id |
| DELETE | /posts |
| GET | /user/signup |
| POST | /user/signup |
| GET | /user/login |
| POST | /user/login |
| GET | / |



---
# Future Updates

Future updates will include commenting on posts, favoriting posts so they're readily available to revisit, and increased styling for user experience.

