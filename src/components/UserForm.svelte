<script lang="ts">
    // @ts-nocheck
    import { onMount } from 'svelte';
    import { createEventDispatcher } from 'svelte';
    import { goto } from '$app/navigation';

    declare const jQuery: any; // Declare jQuery

    const dispatcher = createEventDispatcher();

    let name = "";
    let description = "";
    let image: HTMLInputElement | null = null; 
    let htmlContent = "";

    onMount(async () => {
        // Import jQuery, Bootstrap, and Summernote
        const jQuery = (await import('jquery')).default; 
        window.jQuery = jQuery; // Make jQuery globally available
        await import('bootstrap/dist/js/bootstrap.bundle.min.js'); // Import Bootstrap JS
        await import('summernote/dist/summernote.css'); // Import Summernote CSS
        await import('summernote'); // Import Summernote JS

        // Initialize Summernote
        jQuery('#summernote').summernote({
            height: 300, // Set the height of the editor
            toolbar: [
                ['style', ['bold', 'italic', 'underline', 'clear']],
                ['font', ['strikethrough', 'superscript', 'subscript']],
                ['color', ['color']],
                ['para', ['ul', 'ol', 'paragraph']],
                ['insert', ['link', 'picture', 'video']],
                ['view', ['fullscreen', 'codeview', 'help']]
            ],
            callbacks: {
                onChange: function(contents: string) {
                    htmlContent = contents; 
                }
            }
        });
    });

    async function handleSubmit(event: Event) {
        event.preventDefault(); // Prevent default form submission

        const formData = new FormData();
        if (image && image.files && image.files[0]) {
            formData.append('image', image.files[0]);
        }
        formData.append('name', name);
        formData.append('description', description);
        formData.append('htmlContent', htmlContent);

        try {
            const response = await fetch("http://localhost:5000/users", {
                method : 'POST',
                body: formData
            });

            if (response.ok) {
                const newUser   = await response.json();
                dispatcher('userAdded', newUser  );
                resetForm();
                goto('/admin');
            } else {
                console.error('Failed to add user:', response.statusText);
            }
        } catch (error) {
            console.error('Error during form submission:', error);
        }
    }

    function resetForm() {
        name = "";
        description = "";
        if (image) {
            image.value = ""; // Clear the file input
        }
        htmlContent = "";
        jQuery('#summernote').summernote('reset'); // Reset Summernote
        jQuery('#summernote').summernote('code', ''); // Clear the Summernote content
    }
</script>

<form on:submit|preventDefault={handleSubmit} enctype="multipart/form-data" class="user-form">
    <h2 class="form-title">ADD PROJECT</h2>
    
    <label for="image">Image</label>
    <input type="file" bind:this={image} required />

    <label for="name">Name</label>
    <input type="text" bind:value={name} required class="form-control" />

    <label for="description">Description</label>
    <input type="text" bind:value={description} required class="form-control" />

    <label for="htmlContent">HTML Content</label>
    <div id="summernote" style="height: 300px;"></div>

    <button type="submit" class="btn btn-primary mt-3">Update</button>
</form>

<style>
    .user-form {
        max-width: 1000px; 
        margin: 20px auto; 
        padding: 20px; 
        border: 1px solid #ced4da; 
        border-radius: 0.25rem; 
        background-color: #fff; 
    }
    .form-title {
        margin-bottom: 20px; 
        text-align: center; 
    }
    label {
        display: block; 
        margin-bottom: 5px; 
    }
    input[type="text"], input[type="file"] {
        width: 100%; 
        padding: 10px; 
        margin-bottom: 15px; 
        border: 1px solid #ced4 da; 
        border-radius: 0.25rem; 
    }
    button {
        width: 100%; 
        padding: 10px; 
        background-color: #007bff; 
        color: white; 
        border: none; 
        border-radius: 0.25rem; 
        cursor: pointer; 
    }
    button:hover {
        background-color: #0056b3; 
    }
</style>