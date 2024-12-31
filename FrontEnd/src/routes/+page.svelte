<script lang="ts">
  import { IPADRESS, otherUsers, thisUser, type user } from "../store.js";

  let id = $state("");
  let idSet = $state(false);

  let setId = async (event: Event) => {
    event.preventDefault();

    if (id.length == 16) {
      let resp = await fetch(IPADRESS + "id/" + id);

      if (resp.ok) {
        let respText = await resp.text();
        idSet = true;

        thisUser.set(JSON.parse(respText));

        resp = await fetch(IPADRESS + "players");
        if (resp.ok) {
          respText = await resp.text();

          otherUsers.set(JSON.parse(respText));

          if ($otherUsers) {
            for (let i = 0; i < $otherUsers.length; i++) {
              if ($thisUser?.publicID == $otherUsers[i].publicID) {
                $otherUsers.splice(i, 1);
              }
            }
          }

          console.log($otherUsers);
        }
      }
    }
  };

  let refresh = async (event: Event) => {
    event.preventDefault()

    let resp = await fetch(IPADRESS + "players");
    if (resp.ok) {
      let respText = await resp.text();

      otherUsers.set(JSON.parse(respText));

      if ($otherUsers) {
        for (let i = 0; i < $otherUsers.length; i++) {
          if ($thisUser?.publicID == $otherUsers[i].publicID) {
            $otherUsers.splice(i, 1);
          }
        }
      }

      console.log($otherUsers);
    }
  };


  let kill = async (event: Event, userToKill : user) =>{
    event.preventDefault()

    let resp = await fetch(IPADRESS + "kill/" + userToKill.publicID, {
      method: "POST",
      body: $thisUser?.id
    })

    if(resp.ok){
      console.log(`${userToKill.name} has been killed.`)
    }
    else{
      console.error(`error killing ${userToKill.name}`)
    }

    await refresh(event)
  }
</script>

<div
  class="w-screen h-screen flex place-content-center items-center bg-gray-600"
>
  <div class="max-w-screen max-h-screen bg-pink-200 p-5 aspect-4/3">
    W6 (+Léna) gyilkosos játék dolog
    <form onsubmit={setId}>
      <input
        type="text"
        disabled={idSet}
        bind:value={id}
        maxlength={16}
        placeholder="írd ide a kódot"
      />
    </form>

    {#if $thisUser}
      <button onclick={refresh}>Frissítés</button>
      Szia {$thisUser.name}
      {#if !$thisUser.alive}
        halott vagy:(
      {/if}
      <br />

      {#if !$thisUser.isKiller}
        NEM te vagy a gyilkos
      {:else}
        TE VAGY A GYILKOS
      {/if}
      <hr />
      {#if $otherUsers}
        {#each $otherUsers as user}
          {user.name}
          {#if user.alive}
            él
            {#if $thisUser.isKiller}
              <button onclick={(event)=>{kill(event, user)}}>megölés</button>
            {/if}
          {:else}
            HALOTT
          {/if}

          <br />
        {/each}
      {/if}
    {/if}
  </div>
</div>
