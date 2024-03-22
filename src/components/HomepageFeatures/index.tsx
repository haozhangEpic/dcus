import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';
import { FeatureItem, FeatureList } from '@site/src/config/homeFeaureList'
import { useLocation, useHistory } from '@docusaurus/router';

function Feature({ title, Svg, description, color = '', url = '' }: FeatureItem) {
  // const location = useLocation();
  const history = useHistory();
  const click = () => {
    if (url) {
      if (url.indexOf("http") > -1) {
        window.open(url, '_blank')
      } else {
        history.push(url)
      }
    }
  }
  return (
    <div className={clsx('col col--3')} onClick={click}>
      <div className="text--center">
        <Svg className={clsx(styles.featureSvg,styles.hover)} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): JSX.Element {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row row--justify-center">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
