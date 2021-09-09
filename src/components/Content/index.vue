<template lang="pug">
main(:id="id" :class="{'w-full min-h-screen relative transform transition-transform duration-500 flex-grow flex-shrink-0 lg:flex-shrink': true, 'search-open': global.state.searchOpen}")
	Header
	slot
	div(class="overlay bg-gray-800 bg-opacity-70 absolute inset-0 lg:hidden" @click="global.closeSidebar(); global.closeSearch()")
</template>

<script src="./script.ts"></script>
<style src="./style.css"></style>