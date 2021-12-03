> ## Data
* Required:
    - user ID authenticated

> ## Main Flow
1. User must by authenticated
2. Get user id;
3. Fetch user by id on repository;
4. Return new user without password;

> ## Alternative Flow: Invalid data
1. Throw error