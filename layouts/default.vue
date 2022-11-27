<template>
	<div>
		<Menubar :model="menuitems" />
		<div class="content">
			<slot />
		</div>
		<div class="footer">footer hello there</div>
	</div>
</template>

<script setup>
const menuitems = ref([
	{
		label: 'Pages',
		icon: 'pi pi-fw',
		items: [
			{
				label: 'Home',
				icon: 'pi pi-fw pi-bookmark',
				to: '/',
			},
			{
				label: 'Autocomplete',
				icon: 'pi pi-fw pi-bookmark',
				to: '/autocomplete',
			},
			{
				label: 'Examples',
				icon: 'pi pi-fw pi-bookmark',
				to: '/examples',
			},
			{
				label: 'Members',
				icon: 'pi pi-fw pi-bookmark',
				to: '/members',
			},
			{
				label: 'CRUD',
				icon: 'pi pi-fw pi-bookmark',
				to: '/crud',
			},
		],
	},
])
</script>

<style>
body {
	background-color: rgb(183, 134, 134);
}
.header {
	margin: 0 auto;
	padding: 2rem;
	margin-top: 3rem;
	border: solid thick green;
	border-radius: 20px;
	background-color: rgba(245, 245, 245, 0.528);
}
.content {
	margin: 0 auto;
	padding: 2rem;
	margin-top: 3rem;
	border: solid thick rgb(0, 0, 0);
	border-radius: 20px;
	background-color: rgb(252, 252, 252);
}
.footer {
	margin: 0 auto;
	padding: 2rem;
	margin-top: 3rem;
	border: solid thick green;
	border-radius: 20px;
	background-color: rgba(245, 245, 245, 0.528);
}
</style>
