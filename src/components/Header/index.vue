<template lang="pug">
header.site-header.relative
	.header-inner.flex.p-4.items-center.justify-between(
		class="lg:pt-10 lg:px-6 lg:pb-9"
	)
		t-button(
			fixedClasses="block relative z-10 px-2 py-2 transition duration-100 ease-in-out select-none focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
			variant="none"
			class="flex text-primary-500 dark:text-white lg:hidden"
			@click="global.toggleSidebar"
		)
			span.sidebar-toggle.flex.flex-col.w-5.h-4.justify-between
				- for (i = 0; i < 3; i++)
					span(class="line-menu h-0.5 block bg-current")
		
		router-link.block.mx-auto(
			class="lg:hidden"
			fixedClasses=""
			:to="`/`"
			href="/"
		)
			Logo
		t-button(classes="search-toggle text-white block bg-primary-500 py-1.5 px-4 rounded flex-shrink-0 placeholder-500 dark:bg-indigo-500 lg:hidden" @click.prevent="global.openSearch")
			Search
		form(
			@submit.prevent="global.closeSearch"
			:class="{'form-search flex flex-col lg:flex-row bg-white space-y-2 lg:space-y-0 rounded-md dark:bg-black dark:border-gray-350 focus-within:border-primary-500 dark:focus-within:border-primary-500 transform transition absolute z-20 inset-4 lg:inset-0 lg:space-x-3 lg:relative lg:transform-none lg:opacity-100 lg:visible': true, '-translate-y-full opacity-0 invisible': !global.state.searchOpen}"
		)
			t-rich-select(
				placeholder="Enter token name/address"
				value-attribute="address"
				text-attribute="name"
				:minimum-input-length="1"
				:fetch-options="fetchSymbol"
				@change="onChangeSymbol"
			)
				template(
					slot="option"
					slot-scope="{ index, isHighlighted, isSelected, className, option, query }"
				)
					div(:class="className")
						div(class="flex flex-col w-full ml-2 hover:text-white")
							span.font-medium {{ option.raw.name }} ({{option.raw.symbol}})
							span(class="text-sm leading-tight truncate" :title="option.raw.address") {{ option.raw.address }}
			t-rich-select(
				placeholder="Enter pair"
				value-attribute="address"
				text-attribute="name"
				:options="pairsOptions",
				@change="onChangePair"
			)
				template(
					slot="option"
					slot-scope="{ index, isHighlighted, isSelected, className, option, query }"
				)
					div(:class="className")
						div(class="flex flex-col w-full ml-2 hover:text-white")
							strong 
								| {{ option.raw.name }}
								span(v-if="isSelected") 
							span(class="text-sm leading-tight truncate" :title="option.raw.address") {{ option.raw.address }}
</template>

<script src="./script.ts"></script>
<style src="./style.css"></style>