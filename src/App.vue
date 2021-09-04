<template lang="pug">
div(id="app" :class="getAppClass")
    Sidebar
    Content
        router-view
</template>
<script>
    import Sidebar from '@/components/Sidebar/index.vue';
    import Content from '@/components/Content/index.vue';
    import { defineComponent, ref } from '@vue/composition-api';
    export default defineComponent({
        name: "App",
        inject: ['global'],
        components: {
            Sidebar,
            Content
        },
        computed: {
            getAppClass: function() {
                let classes = 'min-h-screen flex dark:bg-gray-1000 overflow-x-hidden'
                return this.global.state.sidebarOpen ? classes + ' sidebar-open' : classes
            }
        },
    })
</script>
<style>
#app {
    --sidebar-width: 252px;
}

#app.sidebar-open {
}

#sidebar {
    width: var(--sidebar-width);
    --tw-translate-x: calc(0px - var(--sidebar-width))
}

#content {
    --tw-translate-x: calc(0px - var(--sidebar-width))
}

#content .overlay {
    visibility: hidden;
    opacity: 0;
}

#app.sidebar-open #sidebar,
#app.sidebar-open #content{
    --tw-translate-x: 0
}
#app.sidebar-open #content .overlay,
#content.search-open .overlay{
    visibility: visible;
    opacity: 1;
}

@media (min-width: 1024px) {
    #sidebar, #content {
        --tw-translate-x: 0
    }
}

</style>
