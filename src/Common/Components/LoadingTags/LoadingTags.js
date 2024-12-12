import React from 'react';
import {useTheme} from '~/Hooks';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import * as styles from './styles.module.css';

function LoadingTags() {
    const [theme] = useTheme(styles);

    const handleColor = () => {
        return theme === 'light' ? '#ebebeb' : '#2B303B';
    }

    const handleHighlight = () => {
        return theme === 'light' ? '#f5f5f5' : '#3c414e';
    }

    return(
        <section className={styles.container}>
            <Skeleton containerClassName={styles.loading_tag} baseColor={handleColor()} highlightColor={handleHighlight()}/>
            <Skeleton containerClassName={styles.loading_tag} baseColor={handleColor()} highlightColor={handleHighlight()}/>
            <Skeleton containerClassName={styles.loading_tag} baseColor={handleColor()} highlightColor={handleHighlight()}/>
            <Skeleton containerClassName={styles.loading_tag} baseColor={handleColor()} highlightColor={handleHighlight()}/>
            <Skeleton containerClassName={styles.loading_tag} baseColor={handleColor()} highlightColor={handleHighlight()}/>
            <Skeleton containerClassName={styles.loading_tag} baseColor={handleColor()} highlightColor={handleHighlight()}/>
        </section>
    )
}

export default LoadingTags;