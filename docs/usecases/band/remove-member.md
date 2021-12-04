> ## Data
* Required:
    - user authenticated ID
    - band ID
    - user ID to remove 

> ## Main Flow
1. User must be authenticated
2. Get data
3. Fetch band
4. Valide user auth in band;
5. Verify user to add in band;
6. Remove user in new band as member;
7. Edit band on repository;
8. Return band;

> ## Alternative Flow: Last user in member's band
1. Delete band

> ## Alternative Flow: User no authenticated
1. Trow error

> ## Alternative Flow: User is member
1. Throw error

> ## Alternative Flow: Not unique data
1. Throw error