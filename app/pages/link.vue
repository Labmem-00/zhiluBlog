<script setup lang="ts">
import { feedEntry } from '~~/blog.config'
import friends from '~/friends'
import subscriptions from '~/subscriptions'

// FIXME: 数据无法传入 ContentRenderMarkdown 组件
const postExtraData = ref({ feedEntry })

const layoutStore = useLayoutStore()
layoutStore.setAside([])

const { data: postLink } = await useAsyncData('/link', () => queryContent('/link').findOne())
postLink.value && useContentHead(postLink.value)
</script>

<template>
    <header class="link-reminder">
        <div class="content">
            <p><Icon name="ph:newspaper-clipping-bold" /> 我会通过订阅源阅读友链文章。</p>
            <p>
                欢迎加入 QQ 群 <Tip copy>
                    169994096
                </Tip> 闲聊或技术交流。
            </p>
            <p>
                我制作了本站的
                <!-- eslint-disable-next-line vue/singleline-html-element-content-newline -->
                <ProseA href="/zhilu.opml">友链源 OPML 聚合</ProseA>，可导入阅读器或
                <!-- eslint-disable-next-line vue/singleline-html-element-content-newline -->
                <ProseA href="https://app.follow.is/share/lists/72840182614552576">订阅 Follow List</ProseA>。
            </p>
        </div>
        <div class="operations">
            <ProseA href="/atom.xml" icon="ph:rss-simple-bold">
                订阅源
            </ProseA>
            <ProseA href="https://app.follow.is/share/feeds/62533754566736896" icon="ph:list-plus-bold">
                在 Follow 上订阅
            </ProseA>
        </div>
    </header>

    <FeedGroup label="友链" :feeds="friends" />
    <FeedGroup label="订阅" :feeds="subscriptions" />

    <ContentRendererMarkdown
        v-if="postLink"
        :data="postExtraData"
        :value="postLink"
        class="article"
        tag="article"
    />
    <p v-else class="text-center">
        可于 link.md 配置友链补充说明。
    </p>

    <PostComment key="/link" />
</template>

<style lang="scss" scoped>
.link-reminder {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 0.8rem 2rem;
    margin: 1rem;
    padding: 0.8rem 1rem;
    border-radius: 1rem;
    background: var(--c-primary-soft);

    .content {
        flex-basis: 20em;
        flex-grow: 3;

        p + p {
            margin-top: 0.2em;
        }
    }

    .operations {
        display: flex;
        flex-basis: 10em;
        flex-grow: 1;
        justify-content: end;
        gap: 0.2em 1rem;
        flex-wrap: wrap;
    }
}
</style>
