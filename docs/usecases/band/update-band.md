> ## Data
* Optional:
    - name
    - description

> ## Main Flow
1. User must by authenticated
2. Get data for update and user id authenticated;
3. Validate data;
4. Verify unique values (name);
5. Update band on repository;
6. Return band;

> ## Alternative Flow: Invalid data
1. Throw error

> ## Alternative Flow: Not unique data
1. Throw error

> ## Alternative Flow: User is not in band
1. Throw Forbidden error