> ## Data
* Required:
    - user ID authenticated
    - band ID 

> ## Main Flow
1. User must by authenticated
2. Get user ID and band ID;
3. Fetch band by id on repository;
4. Valid if user is a band's member;
5. Return band with members;

> ## Alternative Flow: Band not found
1. Throw Bad Request error

> ## Alternative Flow: User is not in band
1. Throw Forbidden error