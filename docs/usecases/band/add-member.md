> ## Data
* Required:
    - user authenticated ID
    - band ID
    - user ID to add 

> ## Main Flow
1. User must be authenticated
2. Get data
3. Fetch band
4. Valide user auth in band;
5. Verify unique values (user ID in members);
6. Add user in new band as member;
7. Edit band on repository;
8. Return band;

> ## Alternative Flow: User no authenticated
1. Trow error

> ## Alternative Flow: User is member
1. Throw error

> ## Alternative Flow: Not unique data
1. Throw error