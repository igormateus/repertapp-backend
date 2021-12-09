> ## Data
* Required:
    - user authenticated ID
    - band ID

> ## Main Flow
1. User must be authenticated
2. Get data
3. Fetch band
4. Valide if user auth in band;
7. Delete band in repository;
8. Return nocontent

> ## Alternative Flow: User no authenticated
1. Trow error

> ## Alternative Flow: User auth is not in band
1. Throw error