<template lang="pug">
.menu.space-y-3
	.menu-item(v-for="item, index in menuItems")
		router-link(
			v-if="item.type != 'external'"
			class="block transition duration-100 ease-in-out focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed text-gray-600 border border-transparent rounded-10 hover:bg-primary-200 hover:border-primary-500 dark:text-white dark:hover:bg-primary-900",
			exactActiveClass="text-gray-900 bg-primary-200 border-primary-500 dark:bg-primary-900 active router-link-exact-active"
			:key="item.link + index"
			:href="item.link"
			:to="item.link"
		)
			span(
				class="link-inner flex items-center h-11 px-4"
				@click="global.closeSidebar"
			)
				component(:is="item.icon" v-if="item.hasOwnProperty('icon')")
				| {{item.name}}
		a(
			v-else
			class="block transition duration-100 ease-in-out focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed text-gray-600 border border-transparent rounded-10 hover:bg-primary-200 hover:border-primary-500 dark:text-white dark:hover:bg-primary-900",
			target="_blank"
			:key="item.link + index"
			:href="item.link"
		)
			span(
				class="link-inner flex items-center h-11 px-4"
				@click="global.closeSidebar"
			)
				component(:is="item.icon")
				| {{item.name}}
				span.sub-menu-toggle(v-if="item.hasOwnProperty('child')" @click.prevent="toggleSubMenu(index)" :class="{'active transform rotate-90 transition-transform': item.active}")
					chevron-right



		.sub-menu.space-y-3.pt-3.transform.origin-top.transition-transform(v-if="item.hasOwnProperty('child')" :class="{'scale-y-0 h-0': !item.active }")
			.menu-item(v-for="child, index in item.child")
				router-link(
					v-if="child.type != 'external'"
					class="block transition duration-100 ease-in-out focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed text-gray-600 border border-transparent rounded-10 hover:bg-primary-200 hover:border-primary-500 dark:text-white dark:hover:bg-primary-900",
					exactActiveClass="text-gray-900 bg-primary-200 border-primary-500 dark:bg-primary-900 active router-link-exact-active"
					:target="child.type == 'external' ? '_blank' : ''"
					:key="child.link + index"
					:href="child.link"
					:to="child.type == 'external' ? '' : 'child.link'"
				)
					span(
						class="link-inner flex items-center h-11 px-4"
						@click="global.closeSidebar"
					)
						component(:is="child.icon" v-if="child.hasOwnProperty('icon')")
						| {{child.name}}
				a(
					v-else
					class="block transition duration-100 ease-in-out focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed text-gray-600 border border-transparent rounded-10 hover:bg-primary-200 hover:border-primary-500 dark:text-white dark:hover:bg-primary-900",
					target="_blank"
					:key="child.link + index"
					:href="child.link"
				)
					span(
						class="link-inner flex items-center h-11 px-4"
						@click="global.closeSidebar"
					)
						component(:is="child.icon" v-if="child.hasOwnProperty('icon')")
						| {{child.name}}
</template>
<script src="./script.ts"></script>
<style scoped src="./style.css"></style>