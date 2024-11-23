<script>
    // @ts-nocheck
    import { onMount } from 'svelte';
    import { page } from '$app/stores';
    import { goto } from '$app/navigation';

    let user = {
        name: '',
        description: '',
        htmlContent: ''
    };

    let id;

    // Reactive statement to get the user ID from the URL parameters
    $: id = $page.params.id;

    onMount(async () => {
        await fetchUser ();
    });

    async function fetchUser () {
        const response = await fetch(`http://localhost:5000/users/${id}`);
        if (response.ok) {
            user = await response.json();
            // Initialize Summernote and set the content
            initializeSummernote();
            setSummernoteContent(user.htmlContent);
        } else {
            console.error('Failed to fetch user details');
        }
    }

    function initializeSummernote() {
        const jQuery = window.jQuery; // Ensure jQuery is available
        jQuery('#summernote').summernote({
            height: 300,
            toolbar: [
                ['style', ['bold', 'italic', 'underline', 'clear']],
                ['font', ['strikethrough', 'superscript', 'subscript']],
                ['color', ['color']],
                ['para', ['ul', 'ol', 'paragraph']],
                ['insert', ['link', 'picture', 'video']],
                ['view', ['fullscreen', 'codeview', 'help']]
            ],
            callbacks: {
                onChange: function(contents) {
                    user.htmlContent = contents; // Update user.htmlContent on change
                }
            }
        });
    }

    function setSummernoteContent(content) {
        const jQuery = window.jQuery; // Ensure jQuery is available
        jQuery('#summernote').summernote('code', content); // Set the content in Summernote
    }

    async function handleUpdateUser () {
        const response = await fetch(`http://localhost:5000/users/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user)
        });

        if (response.ok) {
            const updatedUser  = await response.json();
            console.log('User  updated:', updatedUser );
            goto('/admin'); // Redirect back to the admin page after update
        } else {
            console.error('Failed to update user');
        }
    }
</script>

<div class="header-container">
    <h1>Edit Project</h1>
    <a href="/admin" class="go-back-button">Go Back</a>
</div>

<form on:submit|preventDefault={handleUpdateUser }>
    <div class="form-group">
        <label for="name">Name:</label>
        <input type="text" id="name" bind:value={user.name} required />
    </div>
    <div class="form-group">
        <label for="description">Description:</label>
        <input type="text" id="description" bind:value={user.description} required />
    </div>
    <div class="form-group">
        <label for="htmlContent">HTML Content:</label>
        <div id="summernote"></div> <!-- Summernote editor -->
    </div>
    <button type="submit" class="submit-button">Update</button>
</form>
<style>
  
    .header-container {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 20px 40px;
        background-color: white;
        color: black;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
    }

    h1 {
        font-size: 2.2rem;
        margin: 0;
    }

    .go-back-button {
        padding: 10px 20px;
        background-color: #FF6F61;
        color: white;
        text-decoration: none;
        border-radius: 5px;
        transition: background-color 0.3s ease;
        font-weight: bold;
    }

    .go-back-button:hover {
        background-color: #FF4F3D;
    }

    form {
        max-width: 1000px;
        margin: 40px auto;
        background: white;
        padding: 30px;
        border-radius: 12px;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
    }

    .form-group {
        margin-bottom: 20px;
    }

    label {
        display: block;
        margin-bottom: 8px;
        font-weight: bold;
        color: #333;
    }

    input[type="text"] {
        width: 95%;
        padding: 12px;
        border: 1px solid #ccc;
        border-radius: 6px;
        font-size: 1rem;
        transition: border-color 0.3s ease;
        box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.1);
    }

    input[type="text"]:focus {
        border-color: #4A90E2;
        outline: none;
        box-shadow: 0 0 5px rgba(74, 144, 226, 0.5);
    }

    .submit-button {
        width: 100%;
        padding: 12px;
        background-color: #28a745;
        color: white;
        border: none;
        border-radius: 6px;
        font-size: 1.2rem;
        cursor: pointer;
        transition: background-color 0.3s ease;
        font-weight: bold;
    }

    .submit-button:hover {
        background-color: #218838;
    }

    @media (max-width: 600px) {
        .header-container {
            padding: 15px;
        }

        h1 {
            font-size: 1.8rem;
        }

        .go-back-button {
            padding: 8px 15px;
        }

        form {
            padding: 20px;
        }

        .submit-button {
            font-size: 1rem;
        }
    }
</style>