<template lang="pug">
.pair
	.pair-header(class="grid py-7 px-2 gap-6 lg:grid-cols-3 pb-7 border-b border-gray-250 lg:pl-2 dark:border-gray-750")
		.pair-info(class="flex flex-wrap mb-6 lg:col-span-2 lg:mb-0")
			.pair-img(class="flex-shrink-0 mr-4")
				img(:src="require('../../assets/ilayer.png')")
			.pair-content(class="space-y-1 pb-3 lg:pr-6 lg:pb-0")
				.pair-name(class="pl-20 font-semibold text-gray-900 transform -translate-y-10 sm:pl-0 sm:transform-none dark:text-white") iLayer (iLayer/BNB)
				.pair-contract
					span(class="label text-gray-600 dark:text-gray-400") Contract: 
					a(class="text-blue-500 break-all" href="#" target="_blank") 0x603c7f932ed1fc6575303d8fb018fdcbb0f39a95
					button(class="copy ml-2 text-gray-400 dark:text-gray-300" @click.prevent)
						copy
				.pair-price(class="text-green-500 break-all") $0.00000000123582 (24H Change: +24.54%)
			a(class="flex px-4 h-8 self-center items-center flex-shrink-0 text-gray-900 bg-indigo-100 border border-indigo-200 rounded-md dark:text-gray-300 dark:bg-gray-760 dark:border-gray-760 hover:text-white hover:bg-primary-500 hover:border-primary-500 dark:hover:bg-primary-500 dark:hover:border-primary-500" href="#")
				Trade(class="mr-1.5 flex-shrink-0")
				| Trade
		.pair-contact(class="w-full space-y-2.5")
			.pair-contact-line
				.label(class="mb-2.5 lg:inline-block lg:w-1/4 text-gray-600 dark:text-gray-400") Website
				.buttons(class="space-x-2.5 space-y-2.5 lg:inline-block lg:space-y-0")
					a(class="inline-flex px-4 h-8 self-center items-center flex-shrink-0 text-gray-500 bg-indigo-50 border border-indigo-50 rounded-md dark:text-gray-300 dark:bg-gray-760 dark:border-gray-760 hover:text-white hover:bg-primary-500 hover:border-primary-500 dark:hover:bg-primary-500 dark:hover:border-primary-500")
						GlobeAlt(class="mr-1.5 flex-shrink-0")
						| ilayer.io
			.pair-contact-line
				.label(class="text-gray-600 lg:inline-block lg:w-1/4 dark:text-gray-400") Community
				.buttons(class="space-x-2.5 space-y-2.5 lg:inline-block lg:space-y-0")
					a(class="inline-flex px-4 h-8 self-center items-center flex-shrink-0 text-gray-500 bg-indigo-50 border border-indigo-50 rounded-md dark:text-gray-300 dark:bg-gray-760 dark:border-gray-760 hover:text-white hover:bg-primary-500 hover:border-primary-500 dark:hover:bg-primary-500 dark:hover:border-primary-500" href="#" target="_blank")
						Twitter(class="mr-1.5 flex-shrink-0")
						| Twitter
					a(class="inline-flex px-4 h-8 self-center items-center flex-shrink-0 text-gray-500 bg-indigo-50 border border-indigo-50 rounded-md dark:text-gray-300 dark:bg-gray-760 dark:border-gray-760 hover:text-white hover:bg-primary-500 hover:border-primary-500 dark:hover:bg-primary-500 dark:hover:border-primary-500" href="#" target="_blank")
						Telegram(class="mr-1.5 flex-shrink-0")
						| Telegram

	.pair-summary(class="grid py-7 px-2 gap-6 lg:grid-cols-3")
		.pair-summary-col
			.summary-title(class="text-sm mb-1 text-gray-600 dark:text-gray-300") Total Supply:
			.summary-content(class="text-gray-900 dark:text-gray-100") 1,000,000,000,000,000
		.pair-summary-col
			.summary-title(class="text-sm mb-1 text-gray-600 dark:text-gray-300") Market Cap: (In cludes locked, excludes burned)
			.summary-content(class="text-green-500") $1,211,368
		.pair-summary-col
			.summary-title(class="text-sm mb-1 text-gray-600 dark:text-gray-300") Total Holders:
			.summary-content(class="text-gray-900 dark:text-gray-100") 3023 Wallets
		.pair-summary-col
			.summary-title(class="text-sm mb-1 text-gray-600 dark:text-gray-300") 24H Volume:
			.summary-content(class="text-green-500") $1,799,312.01
		.pair-summary-col
			.summary-title(class="text-sm mb-1 text-gray-600 dark:text-gray-300") Total Liquidity: (Includes all DEXs)
			.summary-content(class="text-gray-900 dark:text-gray-100") $40,230,836.49
		.pair-summary-col
			.summary-title(class="text-sm mb-1 text-gray-600 dark:text-gray-300") 
				span(class="text-blue-500") Pancake v2 
				| | iLayer/BNB LP Holdings:
			.summary-content(class="text-green-500") 851.83 BNB ($347,583)
		.pair-summary-col
			.summary-title(class="text-sm mb-1 text-gray-600 dark:text-gray-300") 
				span(class="text-blue-500") Apeswap 
				| | BANANA / BUSD LP Holdings:
			.summary-content(class="text-green-500") 7,443,874.19 BUSD ($7,443,874)
		.pair-summary-col
			.summary-title(class="text-sm mb-1 text-gray-600 dark:text-gray-300") 
				| Liquidity Locked: 
				span(class="text-blue-500") Unicrypt 
			.summary-content(class="text-green-500") 300 Days
		.pair-summary-col
			.summary-title(class="text-sm mb-1 text-gray-600 dark:text-gray-300") Total Transactions:
			.summary-content(class="text-gray-900 dark:text-gray-100")
				| 2,462,749 
				span(class="text-blue-500") (BSCScan)
		

</template>
<script src="./script.ts"></script>
<style scoped src="./style.css"></style>