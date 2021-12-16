> ## Data
* Required:
    - user authenticated ID
    - band ID

> ## Main Flow
1. User must be authenticated
2. Get data
3. Fetch band
4. Valide if band has only one member;
5. Valide if user auth in band;
6. Delete band in repository;
7. Return nocontent

> ## Alternative Flow: User no authenticated
1. Throw error

> ## Alternative Flow: Band has two or more users
4. Throw error

> ## Alternative Flow: User auth is not in band
5. Throw error