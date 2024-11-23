<script>
    // @ts-nocheck
    import UserList from "../../components/UserList.svelte";
    import UserForm from "../../components/UserForm.svelte";


    let users = []; 
</script>

<nav class="navbar">
   <h1 class="title-top">ADMIN PANEL</h1>
   <div class="button-container">
   <a class="b-1" href="/add"> Add new Project</a>
   <a class="b-2" href="/">LogOut</a>
</div>
</nav>

<main>


    <UserList {users} />
</main>

<style>
    main {
        max-width: 900px;
        margin: 2em auto;
    }
    
    .navbar {
        display: flex; 
        align-items: center; 
    }

    .title-top {
        color: red;
        font-size: 40px;
        margin: 0 20px 0 0; 
        font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
    }

    .b-1, .b-2 {
        display: inline-block; 
        text-decoration: none; 
        color: white; 
        background-color: grey; 
        padding: 12px 20px; 
        border: none; 
        border-radius: 0; 
        transition: background-color 0.3s, transform 0.2s; 
        font-size: 16px; 
        text-align: center; 
        margin-right: 10px; 
    }

    .b-1:hover {
        background-color: black; 
        transform: scale(1.05); 
    }

    .b-2:hover {
        background-color: red; 
        transform: scale(1.08);
    }

    /* Responsive styles */
    @media (max-width: 600px) {
        .b-1, .b-2 {
            width: 100%; 
            box-sizing: border-box; 
        }
    }
</style>

