> ## Data
* Optional:
    - ConnectionArgs {
        - first
        - last
        - after
        - before
    }

> ## Main Flow
1. User must by authenticated
2. Fetch users by connectionArgs;
3. Map users to profile Type;
4. Return Page<profile>;

> ## Alternative Flow: Invalid data
1. Throw error