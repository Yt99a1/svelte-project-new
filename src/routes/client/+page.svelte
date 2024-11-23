<script>
    // @ts-nocheck
    import { onMount } from "svelte";
    
    let users = []; // Initialize users as an empty array
    
    onMount(async () => {
        await fetchUsers();
    });
    
    async function fetchUsers() {
        try {
            const response = await fetch("http://localhost:5000/users");
    
            // Check if the response is okay (status 200-299)
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
    
            // Parse the JSON data
            users = await response.json();
        } catch (error) {
            console.error("Failed to fetch users:", error);
            // Optionally, you can set users to an empty array or handle the error as needed
            users = [];
        }
    }
    </script>
    
    <div class="user-container">
        {#if users.length > 0}
            {#each users as user (user._id)}
                <div class="user-box">
                    <img src={`http://localhost:5000${user.image}`} alt="{user.name} Image" class="user-image" />
                    <div class="user-info">
                        <h3>{user.name}</h3>
                        <p>{user.description}</p>
                    </div>
                </div>
            {/each}
        {:else}
            <p>No users found.</p>
        {/if}
    </div>
    
    <style>
        .user-container {
            display: flex;
            flex-wrap: wrap; 
            justify-content: flex-start; 
            max-width: 100%; 
            gap: 20px; 
        }
    
        .user-box {
            width: 180px; 
            height: 250px; 
            border: 1px solid #dddddd;
            border-radius: 10px; 
            overflow: hidden; 
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
            display: flex;
            flex-direction: column;
            align-items: center; 
            text-align: center; 
            background-color: #fff; 
            transition: transform 0.2s; 
        }
    
        .user-box:hover {
            transform: scale(1.05); 
        }
    
        .user-image {
            width: 100%; 
            height: 180px; 
            object-fit: cover;
        }
    
        .user-info {
            padding: 10px;
        }
    
        h3 {
            margin: 5px 0;
            font-size: 1.2em; 
        }
    
        p {
            margin: 0; 
            color: #555; 
        }
    
        @media (max-width: 600px) {
            .user-box {
                width: 150px; 
                height: 200px;
            }
        }
    </style>