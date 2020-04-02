<script>
	import { createEventDispatcher } from 'svelte';

	let keyValue = '';

	const dispatch = createEventDispatcher();

	const keypress = () => {
		dispatch('keypress', {
			text: keyValue
		});
	};
	const select = key => () => {
		keyValue = key;
		keypress();
	};
</script>

<style>

</style>

<stackLayout orientation="vertical">
<gridLayout columns="*,*,*,*" rows="*,*,*,*,*" class="darkgrey">
		<button class="btn charcoal"                text="AC"         row=0 col=0 on:tap={select("AC")} />
		<button class="btn charcoal"                text="+/-"        row=0 col=1 on:tap={select("+/-")} />
		<button class="btn charcoal fas fa-percent" text="&#xf295;"   row=0 col=2 on:tap={select("%")} />
		<button class="btn orange fas fa-divide"  text="&#xf529;"   row=0 col=3 on:tap={select("/")} />
		
		<button class="btn silver"                text="7"          row=1 col=0 on:tap={select("7")} />
		<button class="btn silver"                text="8"          row=1 col=1 on:tap={select("8")} />
		<button class="btn silver"                text="9"          row=1 col=2 on:tap={select("9")} />
		<button class="btn orange fas fa-times"   text="&#xf00d;"   row=1 col=3 on:tap={select("x")} />
		
		<button class="btn silver"                text="4"          row=2 col=0 on:tap={select("4")} />
		<button class="btn silver"                text="5"          row=2 col=1 on:tap={select("5")} />
		<button class="btn silver"                text="6"          row=2 col=2 on:tap={select("6")} />
		<button class="btn orange fas fa-minus"   text="&#xf068;"   row=2 col=3 on:tap={select("-")} />
		
		<button class="btn silver"                text="1"          row=3 col=0 on:tap={select("1")} />
		<button class="btn silver"                text="2"          row=3 col=1 on:tap={select("2")} />
		<button class="btn silver"                text="3"          row=3 col=2 on:tap={select("3")} />
		<button class="btn orange fas fa-plus"    text="&#xf067;"   row=3 col=3 on:tap={select("+")} />
		
		<button class="btn silver"                text="0"          row=4 col=0 on:tap={select("0")} colSpan=2 />

		<button class="btn silver"                text="."          row=4 col=2 on:tap={select(".")} />
		<button class="btn orange fas fa-equals"  text="&#xf52c;"   row=4 col=3 on:tap={select("=")} />
</gridLayout>
</stackLayout>