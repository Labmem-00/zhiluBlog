import type { BundledLanguage, BundledTheme } from 'shiki'
import type { FeedEntry } from '~/types/feed'

// 存储 nuxt.config 和 app.config 共用的配置
const blogConfig = {
    title: '纸鹿摸鱼处',
    subtitle: '纸鹿至麓不知路，支炉制露不止漉',
    description: '纸鹿本鹿的个人博客，分享技术与生活。折腾不止，摸鱼生活——摸门🙏🏻',
    author: {
        name: '纸鹿本鹿',
        avatar: 'https://www.zhilu.cyou/api/avatar.png',
        email: 'hi@zhilu.cyou',
        homepage: 'https://www.zhilu.cyou/',
    },
    copyright: {
        abbr: 'CC BY-NC-SA 4.0',
        name: '署名-非商业性使用-相同方式共享 4.0 国际',
        url: 'https://creativecommons.org/licenses/by-nc-sa/4.0/deed.zh-hans',
    },
    favicon: 'https://www.zhilu.cyou/api/icon.png',
    language: 'zh-CN',
    timeEstablished: '2019-07-20',
    timezone: 'Asia/Shanghai',
    url: 'https://blog.zhilu.cyou/',

    feed: {
        limit: 50,
    },

    hideContentPrefixes: ['/posts'],

    imageDomains: [
        // 自动启用本域名的 Nuxt Image
        // 'www.zhilu.cyou',
        // '7.isyangs.cn',
    ],

    robotsNotIndex: ['/preview', '/previews/*'],

    scripts: [
        { 'src': 'https://zhi.zhilu.cyou/zhi.js', 'data-website-id': 'a1997c81-a42b-46f6-8d1d-8fbd67a8ef41', 'defer': true },
        { 'src': 'https://static.cloudflareinsights.com/beacon.min.js', 'data-cf-beacon': '{"token": "97a4fe32ed8240ac8284e9bffaf03962"}', 'defer': true },
    ],

    // 用于 Shiki、Plain Shiki 引入代码高亮
    // 同时用于显示代码块语言对应的 Iconify Catppuccin 图标
    shiki: {
        langs: <BundledLanguage[]>['bat', 'c', 'cpp', 'css', 'diff', 'html', 'ini', 'java', 'js', 'json', 'log', 'makefile', 'matlab', 'md', 'mdc', 'powershell', 'python', 'sh', 'ssh-config', 'toml', 'ts', 'tsx', 'vb', 'vue', 'xml', 'yaml'],
        themes: <BundledTheme[]>['catppuccin-latte', 'one-dark-pro'],
        defaultTheme: <BundledTheme>'catppuccin-latte',
        darkTheme: <BundledTheme>'one-dark-pro',
    },

    twikoo: {
        js: 'https://gcore.jsdelivr.net/npm/twikoo@1.6.39/dist/twikoo.all.min.js',
        envId: 'https://twikoo.zhilu.cyou/',
        preload: 'https://twikoo.zhilu.cyou/',
    },
}

// 用于生成 OPML 和友链页面配置
export const feedEntry = <FeedEntry>{
    author: blogConfig.author.name,
    sitenick: '摸鱼处',
    title: blogConfig.title,
    desc: blogConfig.subtitle || blogConfig.description,
    link: blogConfig.url,
    feed: new URL('/atom.xml', blogConfig.url).toString(),
    icon: blogConfig.favicon,
    avatar: blogConfig.author.avatar,
    archs: ['Nuxt', 'Vercel'],
    date: blogConfig.timeEstablished,
    comment: '这是我自己',
}

export default blogConfig
