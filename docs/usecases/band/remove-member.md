> ## Data
* Required:
    - user authenticated ID
    - band ID
    - user ID to remove 

> ## Main Flow
1. User must be authenticated
2. Get data
3. Fetch band
4. Valide if user auth in band;
5. Valide if band has two or more members;
6. Valide if user to remove is a band member;
7. Remove user from member in repository;
8. Return band;

> ## Alternative Flow: User no authenticated
1. Trow error

> ## Alternative Flow: User auth is not in band
1. Throw error

> ## Alternative Flow: Band has only one user
1. Throw error

> ## Alternative Flow: User to remove is not in band
1. Throw error