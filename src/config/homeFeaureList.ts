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
        description: "对React源码的模仿实现，基本实现了React的大部分功能",
        color: '#087ea',
        url: 'https://github.com/haozhangEpic/awesome-react/tree/master'
    },
    {
        title: "React",
        Svg: require("@site/static/img/video.svg").default,
        description: "视频video标签使用样例",
        url: './video'
    },
    {
        title: "React",
        Svg: require("@site/static/img/github.svg").default,
        description: "个人github主页",
        color: '#087ea',
        url: 'https://github.com/haozhangEpic'
    },
    {
        title: "React",
        Svg: require("@site/static/img/niuma.svg").default,
        description: "牛马面试题",
        color: '#087ea',
        url: '/docs/category/面试题网络收集合集'
    },
];
