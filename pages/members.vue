<template>
	<div>
		<!-- members = {{ members[0] }}  -->
		filters1['global'] = {{ filters1['global'] }}
		<p></p>
		<div v-if="pending"><span>Pending . . </span></div>
		<div v-else>
			<DataTable
				:value="members"
				class="p-datatable-sm p-datatable-customers"
				:paginator="true"
				:rows="10"
				paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
				:rowsPerPageOptions="[10, 20, 50]"
				dataKey="id"
				v-model:filters="filters1"
				filterDisplay="menu"
				:loading="loading1"
				responsiveLayout="scroll"
				:globalFilterFields="['member_firstname, member_lastname']"
				currentPageReportTemplate="Showing {first} to {last} of {totalRecords}"
			>
				<template #header>
					<div class="flex justify-content-between">
						<Button
							type="button"
							icon="pi pi-filter-slash"
							label="Clear"
							class="p-button-outlined"
							@click="clearFilter1()"
						/>
						<span class="p-input-icon-left">
							<i class="pi pi-search" />
							<InputText
								v-model="filters1['global'].value"
								placeholder="Keyword Search"
							/>
						</span>
					</div>
				</template>
				<template #empty> No customers found. </template>
				<template #loading> Loading customers data. Please wait. </template>
				<Column
					field="member_lastname"
					header="Lastname"
					style="min-width: 12rem"
				>
					<template #body="{ data }">
						{{ data.member_lastname }}, {{ data.member_firstname }}
					</template>
					<template #filter="{ filterModel }">
						<InputText
							type="text"
							v-model="filterModel.value"
							class="p-column-filter"
							placeholder="Search by lastname"
						/>
					</template>
				</Column>
				<Column field="member_firstname" header="first name"></Column>
				<Column field="account_email" header="email"></Column>
				<Column field="account_id" header="Id"></Column>
			</DataTable>
		</div>
	</div>
</template>

<script setup>
import { FilterMatchMode, FilterOperator } from 'primevue/api'

const runtimeConfig = useRuntimeConfig()

const loading1 = ref(false)

const {
	data: members,
	pending,
	error,
	refresh,
} = await useFetch('/accounts/getall', {
	initialCache: false,
	method: 'get',
	headers: {
		firebaseapikey: runtimeConfig.apiSecret,
	},
})

const filters1 = ref({
	global: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
	member_lastname: {
		operator: FilterOperator.AND,
		constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
	},
})

const clearFilter1 = () => {
	initFilters1()
}
const initFilters1 = () => {
	filters1.value = {
		global: {
			value: null,
			matchMode: FilterMatchMode.STARTS_WITH,
		},
		member_lastname: {
			operator: FilterOperator.AND,
			constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
		},
	}
}
</script>
