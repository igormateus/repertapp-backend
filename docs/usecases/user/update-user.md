> ## Data
* Optional:
    - username
    - password
    - name
    - email
    - bio

> ## Main Flow
1. User must by authenticated
2. Get data for update and user id authenticated;
3. Validate data;
4. Verify unique values (username, email);
5. Update user on repository;
6. Return user without password;

> ## Alternative Flow: Invalid data
1. Throw error

> ## Alternative Flow: Not unique data
1. Throw error