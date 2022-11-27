<template>
	<div>
		<p>runtimeConfig.apiBase= {{ runtimeConfig.apiBase }}></p>
		<p>
			<Button>button</Button>
		</p>
		<Calendar
			v-model="value"
			dateFormat="mm-dd-yy"
			:showTime="true"
			hourFormat="12"
		/>
		<h5>Default</h5>
		<Editor v-model="value1" editorStyle="height: 320px" />

		<!-- 		<h5>Customized</h5>
		<Editor v-model="value2" editorStyle="height: 320px">
			<template v-slot:toolbar>
				<span class="ql-formats">
					<button class="ql-bold" v-tooltip.bottom="'Bold'"></button>
					<button class="ql-italic" v-tooltip.bottom="'Italic'"></button>
					<button class="ql-underline" v-tooltip.bottom="'Underline'"></button>
				</span>
			</template>
		</Editor> -->
	</div>
</template>

<script setup>
const runtimeConfig = useRuntimeConfig()
const value = ref(null)
const value1 = ref(
	'<div>Welcome to PrimeVue <b>Editor</b></div><div><br></div>'
)
const value2 = ref('')
</script>
