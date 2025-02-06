<script lang="ts">
    let {number, text} : {number: number, text:string} = $props()
</script>

<div class="min-h-full aspect-4/5 rounded-xl bg-gray-400 flex flex-col mx-1">
    <div class="flex-1 bg-gray-600 rounded-2xl mx-3 mt-2 flex place-content-center items-center text-5xl *:bg-gray-900 *:m-1 *:p-1 *:py-3 *:rounded">
        <div>
        {Math.abs(Math.floor((number%100)/10))}
        </div>
    <div>
        {Math.abs(number%10)}
    </div>
    </div>
    <div class=" text-center p-1">
        {text}
    </div>
</div>