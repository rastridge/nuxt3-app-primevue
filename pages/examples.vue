<template>
	<div>
		<div class="grid">
			<div
				class="col-2 block bg-blue-500 font-bold text-center p-4 border-round mb-3"
			></div>
			<div class="col-6">
				<Card>
					<template #header> header </template>
					<template #title> Advanced Card </template>
					<template #content
						><div
							class="block bg-yellow-500 font-bold text-center p-4 border-round mb-3"
						>
							Lorem ipsum dolor sit amet, consectetur adipisicing elit.
							Inventore sed consequuntur error repudiandae numquam deserunt
							quisquam repellat libero asperiores earum nam nobis, culpa ratione
							quam perferendis esse, cupiditate neque quas!
						</div>
					</template>
					<template #footer>
						<Button icon="pi pi-check" label="Save" />
						<Button
							icon="pi pi-times"
							label="Cancel"
							class="p-button-secondary"
							style="margin-left: 0.5em"
						/>
					</template>
				</Card>
			</div>
			<div class="col-4">
				<div class="grid">
					<div
						class="col-2 block bg-yellow-500 font-bold text-center p-4 border-round mb-3"
					>
						1
					</div>
					<div
						class="col-2 block bg-yellow-500 font-bold text-center p-4 border-round mb-3"
					>
						2
					</div>
					<div
						class="col-2 block bg-yellow-500 font-bold text-center p-4 border-round mb-3"
					>
						3
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
const runtimeConfig = useRuntimeConfig()
</script>
