<script lang="ts">
    import { onMount } from "svelte";

    let id = $state("")
    let idSet = $state(false)

    let setId = ()=>{
        console.log(id)
        idSet=true
    }
    
</script>

<div class="w-screen h-screen flex place-content-center items-center bg-gray-600">
    <div class="max-w-screen max-h-screen bg-pink-200 p-5 aspect-4/3">
        W6 (+Léna) gyilkosos játék dolog
        <form onsubmit={setId}>
            <input type="text" disabled={idSet} bind:value={id} placeholder="írd ide a kódot">
        </form>
    </div>
</div>
