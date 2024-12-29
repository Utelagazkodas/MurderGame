<script lang="ts">

  let id = $state("");
  let idSet = $state(false);

  let setId = async (event: Event) => {

    event.preventDefault()
    console.log(id)

    if (id.length == 16) {
      
      let resp = await fetch("http://0.0.0.0:8000/id/" + id)
      if(resp != "id doesnt exist"){

      }
    }
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
  </div>
</div>
