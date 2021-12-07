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
5. Valide band has two or more members;
6. Verify user to remove is in band;
7. Remove user in new band as member in repository;
8. Return band;

> ## Alternative Flow: User no authenticated
1. Trow error

> ## Alternative Flow: Last user in member's band
1. Throw error

> ## Alternative Flow: User is not member
1. Throw error