<template lang="pug">
aside(:id="id" :class="getClasses")
	.sidebar-inner.p-6.min-h-screen.h-full
		router-link.block.mt-5.mb-10(
			:to="`/`"
			href="/"
		)
			Logo
		Menu
				
</template>

<script src="./script.ts"></script>
<style scoped src="./style.css"></style>