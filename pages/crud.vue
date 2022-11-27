<template>
	<div>
		<div class="card">
			<Toolbar class="mb-4">
				<template #start>
					<Button
						label="New"
						icon="pi pi-plus"
						class="p-button-success mr-2"
						@click="openNew"
					/>
					<Button
						label="Delete"
						icon="pi pi-trash"
						class="p-button-danger"
						@click="confirmDeleteSelected"
						:disabled="!selectedProducts || !selectedProducts.length"
					/>
				</template>

				<template #end>
					<Button
						label="Export"
						icon="pi pi-upload"
						class="p-button-help"
						@click="exportCSV($event)"
					/>
				</template>
			</Toolbar>

			<DataTable
				ref="dt"
				:value="members"
				v-model:selection="selectedProducts"
				dataKey="account_id"
				:paginator="true"
				:rows="10"
				:filters="filters"
				paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
				:rowsPerPageOptions="[5, 10, 25]"
				currentPageReportTemplate="Showing {first} to {last} of {totalRecords} members"
				responsiveLayout="scroll"
			>
				<template #header>
					<div
						class="table-header flex flex-column md:flex-row md:justiify-content-between"
					>
						<h5 class="mb-2 md:m-0 p-as-md-center">Manage Members</h5>
						<span class="p-input-icon-left">
							<i class="pi pi-search" />
							<InputText
								v-model="filters['global'].value"
								placeholder="Search..."
							/>
						</span>
					</div>
				</template>

				<Column
					selectionMode="multiple"
					style="width: 3rem"
					:exportable="false"
				></Column>

				<Column
					field="member_lastname"
					header="Name"
					:sortable="true"
					style="min-width: 16rem"
				>
					<template #body="{ data }">
						{{ data.member_lastname }}, {{ data.member_firstname }}
					</template>
				</Column>

				<Column
					field="account_email"
					header="Email"
					:sortable="true"
					style="min-width: 8rem"
				>
				</Column>

				<Column :exportable="false" style="min-width: 8rem">
					<template #body="slotProps">
						<Button
							icon="pi pi-pencil"
							class="p-button-rounded p-button-success mr-2"
							@click="editProduct(slotProps.data)"
						/>
						<Button
							icon="pi pi-trash"
							class="p-button-rounded p-button-warning"
							@click="confirmDeleteProduct(slotProps.data)"
						/>
					</template>
				</Column>
			</DataTable>
		</div>

		<Dialog
			v-model:visible="productDialog"
			:style="{ width: '450px' }"
			header="Member Details"
			:modal="true"
			class="p-fluid"
		>
			productDialog = {{ productDialog }}
			<div class="field">
				<label for="lastname">Lastname</label>
				<InputText
					id="lastname"
					v-model.trim="member.member_lastname"
					required="true"
					autofocus
					:class="{ 'p-invalid': submitted && !member.member_lastname }"
				/>
				<small class="p-error" v-if="submitted && !member.member_lastname"
					>Lastname is required.</small
				>
			</div>
			<div class="field">
				<label for="firstname">Firstname</label>
				<InputText
					id="firstname"
					v-model.trim="member.member_firstname"
					required="true"
					:class="{ 'p-invalid': submitted && !member.member_firstname }"
				/>
				<small class="p-error" v-if="submitted && !member.member_firstname"
					>Firstname is required.</small
				>
			</div>

			<template #footer>
				<Button
					label="Cancel"
					icon="pi pi-times"
					class="p-button-text"
					@click="hideDialog"
				/>
				<Button
					label="Save"
					icon="pi pi-check"
					class="p-button-text"
					@click="saveProduct"
				/>
			</template>
		</Dialog>

		<!-- delete  -->
		<Dialog
			v-model:visible="deleteProductDialog"
			:style="{ width: '450px' }"
			header="Confirm"
			:modal="true"
		>
			<div class="confirmation-content">
				<i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
				<span v-if="members"
					>Are you sure you want to delete <b>{{ members.member_lastname }}</b
					>?</span
				>
			</div>
			<template #footer>
				<Button
					label="No"
					icon="pi pi-times"
					class="p-button-text"
					@click="deleteProductDialog = false"
				/>
				<Button
					label="Yes"
					icon="pi pi-check"
					class="p-button-text"
					@click="deleteProduct"
				/>
			</template>
		</Dialog>

		<!-- delete selected -->
		<Dialog
			v-model:visible="deleteProductsDialog"
			:style="{ width: '450px' }"
			header="Confirm"
			:modal="true"
		>
			<div class="confirmation-content">
				<i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
				<span v-if="members"
					>Are you sure you want to delete the selected members?</span
				>
			</div>
			<template #footer>
				<Button
					label="No"
					icon="pi pi-times"
					class="p-button-text"
					@click="deleteProductsDialog = false"
				/>
				<Button
					label="Yes"
					icon="pi pi-check"
					class="p-button-text"
					@click="deleteSelectedProducts"
				/>
			</template>
		</Dialog>
	</div>
</template>

<script setup>
import { FilterMatchMode } from 'primevue/api'

const runtimeConfig = useRuntimeConfig()
const loading1 = ref(false)

const {
	data: mems,
	pending,
	error,
	refresh,
} = await useFetch('/accounts/getall', {
	// pick: ['account_id', 'account_email', 'member_firstname', 'member_lastname'],
	initialCache: false,
	method: 'get',
	headers: {
		firebaseapikey: runtimeConfig.apiSecret,
	},
})
const dt = ref()
const members = ref(mems)
const productDialog = ref(false)
const deleteProductDialog = ref(false)
const deleteProductsDialog = ref(false)
const member = ref({})
const selectedProducts = ref()
const filters = ref({
	global: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
})
const submitted = ref(false)

const openNew = () => {
	member.value = {}
	submitted.value = false
	productDialog.value = true
}
const hideDialog = () => {
	productDialog.value = false
	submitted.value = false
}
const saveProduct = () => {
	submitted.value = true
	if (
		member.value.member_lastname.trim() &&
		member.value.member_firstname.trim()
	) {
		if (member.value.account_id) {
			// has been edited - account_id exists
			members.value[findIndexById(member.value.account_id)] = member.value
		} else {
			// new
			member.value.account_id = createId()
			members.value.push(member.value)
		} // cancelled
		productDialog.value = false
		member.value = {}
	}
}

const editProduct = (prod) => {
	member.value = { ...prod }
	productDialog.value = true
}
const confirmDeleteProduct = (prod) => {
	member.value = prod
	deleteProductDialog.value = true
}
const deleteProduct = () => {
	members.value = members.value.filter(function (val) {
		return val.account_id !== member.value.account_id
	})
	deleteProductDialog.value = false
	member.value = {}
}
const findIndexById = (id) => {
	let index = -1
	for (let i = 0; i < members.value.length; i++) {
		if (members.value[i].account_id === id) {
			index = i
			break
		}
	}

	return index
}
const createId = () => {
	let id = ''
	var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
	for (var i = 0; i < 5; i++) {
		id += chars.charAt(Math.floor(Math.random() * chars.length))
	}
	return id
}
const exportCSV = () => {
	dt.value.exportCSV()
}
const confirmDeleteSelected = () => {
	deleteProductsDialog.value = true
}
const deleteSelectedProducts = () => {
	members.value = members.value.filter(
		(val) => !selectedProducts.value.includes(val)
	)
	deleteProductsDialog.value = false
	selectedProducts.value = null
}
</script>

<style lang="scss" scoped>
.table-header {
	display: flex;
	align-items: center;
	justify-content: space-between;

	@media screen and (max-width: 960px) {
		align-items: start;
	}
}

.product-image {
	width: 50px;
	box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
}

.p-dialog .product-image {
	width: 50px;
	margin: 0 auto 2rem auto;
	display: block;
}

.confirmation-content {
	display: flex;
	align-items: center;
	justify-content: center;
}
@media screen and (max-width: 960px) {
	::v-deep(.p-toolbar) {
		flex-wrap: wrap;

		.p-button {
			margin-bottom: 0.25rem;
		}
	}
}
</style>
