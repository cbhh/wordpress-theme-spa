<script
    lang="ts"
    setup
>
import SiteHeader from "./header/SiteHeader.vue";
import SiteFooter from "./footer/SiteFooter.vue";
import SitePrimaryMaskTop from "./primary/SitePrimaryMaskTop.vue";
import SitePrimaryBreadcrumb from "./primary/SitePrimaryBreadcrumb.vue";
import SiteSidebar from "./sidebar/SiteSidebar.vue";
import SiteSidebarItem from "./sidebar/SiteSidebarItem.vue";
import {
    SidebarItemFeature,
    SidebarPosition,
} from "../props";

</script>

<template>
    <!-- <SiteHeader /> -->
    <div id="primary">
        <SitePrimaryMaskTop />
        <div class="primary-content">
            <div class="site-content">
                <SitePrimaryBreadcrumb />
                <main>
                    <slot name="view" />
                </main>
            </div>
            <SiteSidebar :position="SidebarPosition.left">
                <template #top>
                    侧边栏1
                </template>
                <template #body>
                    <SiteSidebarItem
                        title="分类"
                        :feature="SidebarItemFeature['post-categories']"
                    >
                        <slot name="sidebar-category" />
                    </SiteSidebarItem>
                </template>
            </SiteSidebar>
            <SiteSidebar :position="SidebarPosition.right">
                <template #top>
                    侧边栏2
                </template>
                <template #body>
                    <SiteSidebarItem
                        title="标签云"
                        :feature="SidebarItemFeature['post-tag-cloud']"
                    >
                        <slot name="sidebar-tag" />
                    </SiteSidebarItem>
                    <SiteSidebarItem
                        title="日历"
                        :feature="SidebarItemFeature['post-calendar']"
                    >
                        <slot name="sidebar-calendar" />
                    </SiteSidebarItem>
                </template>
            </SiteSidebar>
        </div>
    </div>
    <!-- <SiteFooter /> -->
</template>

<style lang="scss">
@import "@sty/skeleton.scss";
</style>
