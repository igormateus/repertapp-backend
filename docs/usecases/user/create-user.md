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
4. Hash password
5. Create user on data base;
6. Return new user;

> ## Alternative Flow: Invalid data
1. Throw error

> ## Alternative Flow: Not unique data
1. Throw error