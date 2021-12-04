> ## Data
* Required:
    - name
* Optional:
    - description

> ## Main Flow
1. User must be authenticated
1. Get data for new band and user ID;
2. Validate data;
3. Verify unique values (name);
4. Create new band on repository
5. Connect user ID in new band;
6. Return new band;

> ## Alternative Flow: Invalid data
1. Throw error

> ## Alternative Flow: Not unique data
1. Throw error