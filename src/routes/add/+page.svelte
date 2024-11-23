<script>
    // @ts-nocheck
    import UserList from "../../components/UserList.svelte";
    import UserForm from "../../components/UserForm.svelte";


    let users = []; 


async function handleUserAdded() {
    let response = await fetch('http://localhost:5000/users')

    users = await response.json()
    
}
</script>

<main>
    <UserForm on:userAdded={handleUserAdded}/>
</main>

