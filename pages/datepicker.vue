<template>
	<div>
		<h3>Date picker</h3>
		<Calendar v-model="value" />
		<p>{{ value }}</p>
	</div>
</template>

<script setup>
const value = ref(null)
</script>

<style lang="scss" scoped></style>
