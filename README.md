# BlogQL (naming convention bland until proper title is given)

- A foray into creating a website using **`React.js`**, **`MongoDB`**, **`Express`**, **`GraphQL`**, **`Node`**, etc.

### Current Issues / Future Features / Hurdles

#### **CURRENT ISSUES** 
---
- ~~TOKEN not created storing with onClick. Successful on the backend~~
- ~~When admin is logged in succesfully CRUD operations are still locked~~
- ~~token is created but the signing is not working properly~~
- ~~logout functionality **UNUSABLE**~~
- ~~entire login function is **UNUSABLE**~~

 

#### **HURDLES**
---
- Decide trade-off between HttpOnly cookies and localStorage before deployment (need refactoring if HttpOnly )
- learning not to verify express and apollo/server together
- as easy as a logout seemed it fought a good battle
    - it seems as though a logout button is not necessary as this does not need to return server side to remove a token 



#### **FUTURE FEATURE TODOS**
---
- [x] create login for admin role
- [x] logout button 
- [x] move posting features (add, delete, edit ) to /profile page
- [x] when admin creates, deletes, edits post -- render to the /posts page
- [ ] create some sort of landing page ( I think ) 
- [ ] idea generator 


### Available Scripts

In the project directory, you can run:
- *npm run dev* for `server` generation
- *npm start* for `client` generation

### What I've learned

- Apollo Server renders the need for grapql-express null (backend and frontend talk with this implementation)
    - I was running express server and apollo server simultaneously causing conflicts 

- It is crucial to run new features through a feature branch.
    - However, running directly onto my main branch force me to keep moving forward

### Future of the Blog 

- I am currently toying with **`GraphQL`** and **`JWT`** for authenticating an admin role to create and delete posts. 
- Would like for **upvoting** and **downvoting** features, also likes and hearts, etc. The usual suspects in *modern* approval ratings.
- This will be a fully functional blog I will use for **professional** measures. 

