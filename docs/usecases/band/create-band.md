> ## Data
* Required:
    - name
* Optional:
    - description

> ## Main Flow
1. User must be authenticated
2. Get User Auth ID and Band data
3. Validate band data;
4. Verify unique values (name);
5. Create band on repository;
6. Add user auth in new band as member;
7. Return band;

> ## Alternative Flow: User no authenticated
1. Trow error

> ## Alternative Flow: Invalid data
1. Throw error

> ## Alternative Flow: Not unique data
1. Throw error