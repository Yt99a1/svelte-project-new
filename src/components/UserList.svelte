<script>
    // @ts-nocheck
    import { onMount } from "svelte"; 
    import User from "./User.svelte"
    export let users  

    onMount(async () => {
        await fetchUsers();
    });

    async function fetchUsers() {
        try {
            const response = await fetch("http://localhost:5000/users");

            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

          
            users = await response.json();
        } catch (error) {
            console.error("Failed to fetch users:", error);
            
            users = [];
        }
    }

    function handleUpdateUser(updatedUser){
        fetchUsers()

    }
</script>




{#if users.length > 0}
<div class="table-responsive">
    <table>
        <thead>
            <tr>
                <th>Image</th>
                <th>Name</th>
                <th>Description</th>
                <th>Html Content</th>
                <th>Action</th>
            </tr>
        </thead>
        <tbody>
            {#each users as user (user._id)}
                <User  {user} onUpdate={handleUpdateUser } />
            {/each}
        </tbody>
    </table>
</div>


{:else}
    <p>No users found.</p>
{/if}

<style>
    * {
    box-sizing: border-box;
}

.table-responsive {
    width: 900px; /* Full width */
    border: 1px solid black;
    background-color: #efefefee;
    padding: 15px;
    
    overflow: auto;
    margin: auto;
    border-radius: 4px;
}

table {
    width: 100%; /* Full width */
    font-size: 14px;
    color: #444;
    white-space: nowrap;
    border-collapse: collapse;
}

table > thead {
    background-color: rgb(12, 155, 155);
    color: whitesmoke;
}

table > thead th {
    padding: 15px;
    /* Remove width if set */
}

table>thead>tr{
    background-color: black;
    transition: 0.3s ease-in-out;

}
</style>




