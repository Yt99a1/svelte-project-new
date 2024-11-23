<script>
    // @ts-nocheck
    import { updated } from "$app/stores";
    
    export let user;
    
    let isEditMode = false;
    
    // Initialize update variables with user data
    let updateName = user.name;
    let updateDescription = user.description; 
    let updateHtmlContent = user.htmlContent; 
    
    export let onUpdate;
    
    function toggleEditMode() {
        isEditMode = !isEditMode;
    
        // Reset update variables when toggling to edit mode
        if (isEditMode) {
            updateName = user.name;
            updateDescription = user.description;
            updateHtmlContent = user.htmlContent; // Initialize for editing
        }
    }
    
    function handleUpdateUser () {
        fetch(`http://localhost:5000/users/${user._id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: updateName,
                description: updateDescription, 
                htmlContent: updateHtmlContent 
            })
        })
        .then((response) => response.json())
        .then((updatedUser ) => {
            isEditMode = false;
            if (onUpdate) {
                onUpdate(updatedUser );
            }
        });
    }
    
    function handleDelete() {
        fetch(`http://localhost:5000/users/${user._id}`, {
            method: 'DELETE'
        })
        .then(() => {
            onUpdate();
        });
    }
    </script>
    
    <tr>
        <td>
            <img src={`http://localhost:5000${user.image}`} alt="UserImage" class="img-style" />
        </td>
        <td>
            {#if isEditMode}
                <input bind:value={updateName} />
            {:else}
                {user.name}
            {/if}
        </td>
        <td>
            {#if isEditMode}
                <input bind:value={updateDescription} /> 
            {:else}
                {user.description} 
            {/if}
        </td>
        <td>
            {#if isEditMode}
                <input bind:value={updateHtmlContent} /> <!-- New field for htmlContent -->
            {:else}
                {user.htmlContent} <!-- Display htmlContent -->
            {/if}
        </td>
        <td>
            <span class="action_btn">
            {#if isEditMode}
           
                <button on:click={toggleEditMode}>Cancel</button>
                <button on:click={handleUpdateUser }>Update</button>
            {:else}
            <a href={`/admin/edit/${user._id}`}>
                <button>Edit</button>
            </a>
                <a href={`/admin/${user._id}`} >
                    <button>view</button>
                </a>
                <button on:click={handleDelete}>Delete</button>
            
            {/if}
        </span>
        </td>
    </tr>


    <style>
        tr, td {
            border: 1px solid rgb(200, 199, 199);
            padding: 7px 10px;
        }
    
        tr > td > .img-style {
            display: inline-block;
            width: 60px;
            height: 60px;
            object-fit: cover;
            border-radius: 50%;
            border: 4px solid whitesmoke;
            box-shadow: 0 2px 6px #0003;
        }
    
        .action_btn {
            display: flex;
            justify-content: center; /* Center the buttons */
            gap: 3px; /* Space between buttons */
        }
    
        .action_btn > button, a > button {
            text-decoration: none;
            color: #444;
            background: whitesmoke;
            
            padding: 5px 15px; /* Ensure padding is correctly specified */
            font-weight: bold;
            cursor: pointer; /* Change cursor to pointer */
            transition: background-color 0.3s; /* Add transition for hover effect */
        }
    
        .action_btn > button:hover {
            background-color: black; /* Change background on hover */
            color: white; /* Change text color on hover */
        }

        
        .action_btn > a > button:hover {
            background-color: black; /* Change background on hover */
            color: white; /* Change text color on hover */
        }
    </style>