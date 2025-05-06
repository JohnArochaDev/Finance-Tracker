1. [DOME] find a solution to a user logging in and storing the users ID. 
2. [DONE] Make sure when a user logs in a JWT token AND a user ID are saved.
3. [DONE] Make context to store both of those states
4. [DONE] use /user/{userId} route to gather finance data, and autopopulate the context from there.
5. the post in the finance form needs to have logic to incriment the debt and the savings based off the finance data before sending the update
6. make sure the update both updates the data, but also hits a custom hook to re-populate the data on a successful DB save.
7. make a slideshow for a user to create an account. Might need to do that relatively soon in order to save data on a login. OR make sure the user can login without temporarily(Probably a better option).