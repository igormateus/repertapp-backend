> ## Data
* Required:
    - username
    - password
* Optional:
    - name
    - email
    - bio

> ## Main Flow
1. Get data for new user;
2. Validate data;
3. Verify unique values (username, email);
4. Create user on data base;
5. Return new user without password;

> ## Alternative Flow: Invalid data
1. Throw error

> ## Alternative Flow: Not unique data
1. Throw error