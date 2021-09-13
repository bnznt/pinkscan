<template lang="pug">
t-card(
	:fixedClasses="{ wrapper: 'border rounded-lg shadow-sm bg-gray-50 border-gray-250 dark:border-gray-350 dark:bg-gray-950', body: 'p-5 overflow-x-auto', header: 'border-b px-3 rounded-t-lg', footer: 'p-3 rounded-b-lg'}"
	:classes="{ wrapper: 'bg-white border-gray-100', body: '', header: 'border-gray-250 dark:border-gray-350', footer: '' }"
)
	template(v-slot:header)
		.nav-tab.flex.space-x-5.-m-px.overflow-x-auto
			.tab-item.p-3.text-gray-500(
				v-for="item, index in navItems"
				:class="{'hover:text-primary-500 dark:text-gray-500': index != navItemActive, 'active text-primary-500 dark:text-gray-200': index == navItemActive}"
				@click="activateTabItem(index)"
			) {{item.title}}
	template
		t-table(
			:headers="tableHeaders"
			:data="getTableRows"
			:classes="{ table: 'transaction-table min-w-full divide-y divide-gray-100 rounded-sm shadow-sm dark:divide-gray-350', theadTh: 'px-3 py-2 text-sm font-medium text-left text-gray-500 bg-gray-260 border-t border-b dark:border-gray-350 dark:bg-gray-780', tbody: 'divide-y divide-gray-100 dark:divide-gray-350', td: 'px-3 py-2 text-sm whitespace-nowrap'}"
		)
			template(slot="row" slot-scope="props")
				tr(:class="[props.trClass, props.rowIndex % 2 === 0 ? 'bg-white dark:bg-gray-950' : 'bg-gray-100 dark:bg-gray-850']")
					td(:class="props.tdClass")
						span.block(class="text-gray-900 dark:text-gray-200") {{ props.row.time.value }}
						span.label(class="text-gray-500 dark:text-gray-400") {{ props.row.time.label }}
					td(:class="props.tdClass")
						span(:class="['inline-flex px-2.5 py-1 items-center justify-center leading-none text-xs border rounded', props.row.trade.value ? 'text-green-450 bg-green-150 border-green-450 dark:text-green-100 dark:bg-green-900' : 'text-red-500 bg-red-200 border-red-400 dark:text-red-100 dark:bg-red-950' ]") {{ props.row.trade.label }}
					td(:class="props.tdClass")
						span.block(class="text-green-500") {{ props.row.price.value }}
						span.label(class="text-green-500") {{ props.row.price.label ? '' : '' }}
					td(:class="props.tdClass")
						span.block(class="text-green-500") {{ props.row.quantity.value }}
						span.label(class="text-green-500") {{ props.row.quantity.label ? '' : '' }}
					td(:class="props.tdClass")
						span.block(class="text-green-500") {{ props.row.value.value }}
						span.label(class="text-green-500") {{ props.row.value.label }}
					td(:class="props.tdClass")
						span.block(class="text-blue-500" :title="props.row.walletMaker.value") {{ truncateAddress(props.row.walletMaker.value) }}
						span.label(class="text-blue-500") {{ props.row.walletMaker.label }}
					td(:class="[props.tdClass, 'text-blue-500']")
						a(class="hover:underline" :href="`https://bscscan.com/tx/${props.row.TxHash.value}`" target="_blank") {{ truncateTx(props.row.TxHash.value) }}
	template(slot="footer")
		.flex.flex-wrap
			t-pagination(
				v-if="totalItems > 0"
				:total-items="totalItems"
				:per-page="perPage"
				v-model="currentPage"
				@change="onChangePage"
				prevLabel='<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 20 20"><path fill="currentColor" fill-rule="evenodd" d="M12.7 5.3a1 1 0 010 1.4L9.42 10l3.3 3.3a1 1 0 01-1.42 1.4l-4-4a1 1 0 010-1.4l4-4a1 1 0 011.42 0z" clip-rule="evenodd"/></svg>'
				nextLabel='<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 20 20"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7.5 5l5 5-5 5"/></svg>'
			)
				
</template>
<script src="./script.ts"></script>
<style scoped src="./style.css"></style>