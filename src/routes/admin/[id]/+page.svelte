<script>
   
    // @ts-nocheck
    import { page } from '$app/stores';
    import { onMount } from 'svelte';

    let user = {}; 
    let id;

  
    $: id = $page.params.id;

    onMount(async () => {
        await fetchUser ();
    });

    async function fetchUser () {
        const response = await fetch(`http://localhost:5000/users/${id}`);
        if (response.ok) {
            user = await response.json(); 
        } else {
            console.error('Failed to fetch user details');
        }
    }
</script>
<div class="header-container">
    <h1>PROJECT VIEW</h1>
    <a href="/admin" class="go-back-button">Go back</a>
</div>

<div class="dive-ancent">
    <img src={`http://localhost:5000${user.image}`} alt="UserImage" style="width: 100%; height: 100%; object-fit: contain;" />
</div>
<div class="dive-new">
    <h2>Name: {user.name}</h2>
    <p><b>Description: {user.description}</b></p>
</div>
<div class="dive-unknonw">
    <div><b>HTML Content: {user.htmlContent}</b></div>
</div>




<style>
h1{
    font-size: 40px;
    font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
    color: red;
}
.dive-ancent{
    width: 350px;
    height: 180px;
    background-color: 	white;
    margin-left: 350px;
}
.dive-new {
    width: 410px;
    height: 180px;
    background-color: white;
    margin-left: 730px;
    margin-top: -180px;
    display: flex; /* Use flexbox */
    flex-direction: column; /* Stack items vertically */
    align-items: center; /* Center items horizontally */
    justify-content: center; /* Center items vertically */
    font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
    text-align: left; /* Align text to the left */
    padding: 10px; /* Optional: Add some padding */
}
.dive-unknonw {
    max-width: 810px; /* Set maximum width */
    height: 400px; /* Set height */
    background-color: white; /* Background color */
    margin: 20px auto; /* Center the div horizontally with auto margins */
    display: flex; /* Use flexbox for layout */
    justify-content: center; /* Center content horizontally */
    align-items: center; /* Center content vertically */
    text-align: center; /* Center text within the inner div */
    padding: 20px; /* Optional: add some padding */
    font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
    box-sizing: border-box; /* Include padding in width and height calculations */
}

.header-container {
    display: flex; /* Use flexbox for layout */
    align-items: center; /* Align items vertically in the center */
}

h1 {
    font-size: 40px; /* Font size for the heading */
    font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif; /* Match font family */
    color: red; /* Color for the heading */
    margin: 0; /* Remove default margin */
    margin-right: 60px; /* Space between heading and button */
}

.go-back-button {
    padding: 10px 20px; /* Add padding for the button */
    background-color: black; /* Button background color */
    color: white; /* Text color */
    text-decoration: none; /* Remove underline from the link */
   /* Rounded corners */
    font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif; /* Match font family */
}

.go-back-button:hover {
    background-color: grey; /* Darker background on hover */
    color: black;
}
</style>