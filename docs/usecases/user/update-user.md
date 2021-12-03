> ## Data
* Optional:
    - username
    - password
    - name
    - email
    - bio

> ## Main Flow
1. Get data for update and user id authenticated;
2. Validate data;
3. Verify unique values (username, email);
4. Update user on repository;
5. Return user without password;

> ## Alternative Flow: Invalid data
1. Throw error

> ## Alternative Flow: Not unique data
1. Throw error