<template lang="pug">
main(:id="id" :class="{'w-full min-h-screen relative transform transition-transform duration-500 flex-grow flex-shrink-0 lg:flex-shrink': true, 'search-open': searchOpen}")
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
			t-button(classes="search-toggle text-white block bg-primary-500 py-1.5 px-4 rounded flex-shrink-0 placeholder-500 dark:bg-indigo-500 lg:hidden" @click.prevent="openSearch")
				Search
			form(
				@submit="closeSearch"
				:class="{'form-search flex bg-white border border-gray-300 rounded-md shadow-sm p-0.5 pl-3 dark:bg-black dark:border-gray-350 focus-within:border-primary-500 dark:focus-within:border-primary-500 transform transition absolute z-20 inset-x-4 lg:relative lg:transform-none lg:opacity-100': true, '-translate-y-full opacity-0': !searchOpen}"
			)
				t-input(fixedClasses="" classes="block w-full h-8 pr-2 bg-transparent focus:outline-none dark:text-white" name="s" placeholder="Enter token address" )
				t-button(classes="text-white block bg-primary-500 py-1.5 px-4 rounded flex-shrink-0 placeholder-500 dark:bg-indigo-500" type="submit")
					Search
		
	slot
	div(class="overlay bg-gray-800 bg-opacity-70 absolute inset-0 lg:hidden" @click="global.closeSidebar(); closeSearch()")
</template>

<script src="./script.ts"></script>
<style src="./style.css"></style>