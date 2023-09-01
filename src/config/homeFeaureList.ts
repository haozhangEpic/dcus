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
    Svg: React.ComponentType<React.ComponentProps<'svg'>>;
    description: JSX.Element | string;
};

export const FeatureList: FeatureItem[] = [
    {
        title: '视频播放',
        Svg: require('@site/static/img/undraw_docusaurus_mountain.svg').default,
        description: 'Docusaurus was designed from the ground up to be easily installed and used to get your website up and running quickly.'
        ,
    },
    {
        title: 'Focus on What Matters',
        Svg: require('@site/static/img/undraw_docusaurus_tree.svg').default,
        description:
            'Docusaurus lets you focus on your docs, and we&apos;ll do the chores. Go ahead and move your docs into the<code>docs</code> directory.'
        ,
    },
    {
        title: 'Powered by React',
        Svg: require('@site/static/img/undraw_docusaurus_react.svg').default,
        description:
            'Extend or customize your website layout by reusing React. Docusaurus can be extended while reusing the same header and footer.',
    },
];