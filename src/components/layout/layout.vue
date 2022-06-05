<script
    lang="ts"
    setup
>
import { computed } from "vue";
import SiteHeader from "./header/SiteHeader.vue";
import SiteFooter from "./footer/SiteFooter.vue";
import SitePrimaryMaskTop from "./primary/SitePrimaryMaskTop.vue";
import SiteSidebar from "./sidebar/SiteSidebar.vue";
import SiteSidebarItem from "./sidebar/SiteSidebarItem.vue";
import HomeLanding from "./landing/HomeLanding.vue";
import PostArchiveLanding from "./landing/PostArchiveLanding.vue";
import {
    SidebarItemFeature,
    SidebarPosition,
    LandingType,
} from "../props";

const props = withDefaults(
    defineProps<{ landingType?: LandingType }>(),
    {
        landingType: LandingType.home,
    }
);
const landingComponent = computed(() => {
    switch (props.landingType) {
    case LandingType.home:
        return HomeLanding;
    case LandingType.post:
    case LandingType.archive:
        return PostArchiveLanding;
    default:
        return null;
    }
});
</script>

<template>
    <SiteHeader />
    <KeepAlive>
        <Component
            :is="landingComponent"
            :landing-type="props.landingType"
        />
    </KeepAlive>
    <div id="primary">
        <SitePrimaryMaskTop />
        <div class="primary-content">
            <div class="site-content">
                <slot name="breadcrumb-nav" />
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
    <SiteFooter />
</template>

<style lang="scss">
@import "@sty/skeleton.scss";
</style>
