> ## Data
* Optional:
    - ConnectionArgs {
        - first
        - last
        - after
        - before
    }

> ## Main Flow
1. Fetch users by connectionArgs;
2. Map users to profile Type;
3. Return Page<profile>;

> ## Alternative Flow: Invalid data
1. Throw error