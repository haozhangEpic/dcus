/*
 * @Author: zhanghao
 * @Date: 2023-07-21 11:16:31
 * @LastEditors: zhanghao
 * @LastEditTime: 2023-07-21 11:23:14
 * @Description:
 * @FilePath: \dcus\src\config\homeFeaureList.ts
 */
export type FeatureItem = {
    title: string;
    Svg: React.ComponentType<React.ComponentProps<"svg">> | string;
    description: JSX.Element | string;
    color?: string;
    url?: string
};

export const FeatureList: FeatureItem[] = [
    {
        title: "React",
        Svg: require("@site/static/img/React.svg").default,
        description: "对React源码的模仿实现，基本实现了React的基础部分功能",
        color: '#087ea',
        url: 'https://github.com/haozhangEpic/awesome-react/tree/master'
    },
    {
        title: "Video",
        Svg: require("@site/static/img/video.svg").default,
        description: "视频video标签使用样例（施工中）",
        url: './video'
    },
    {
        title: "GitHub",
        Svg: require("@site/static/img/github.svg").default,
        description: "全国最大的同性交友网站",
        color: '#087ea',
        url: 'https://github.com/haozhangEpic'
    },
    {
        title: "面试题",
        Svg: require("@site/static/img/niuma.svg").default,
        description: "牛马面试题，收集网络以及身边人遇到的面试题",
        color: '#087ea',
        url: '/docs/category/面试题网络收集合集'
    },
];
