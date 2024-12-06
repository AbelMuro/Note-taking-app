import React from 'react';
import {useTheme} from '~/Hooks';
import { AnimatePresence, motion } from 'framer-motion';
import { overlayVariant, dialogVariant } from './Variants';
import * as styles from './styles.module.css';

function Dialog({open, children}){
    const [,changeClass] = useTheme(styles);

    return(
        <AnimatePresence>
        {open && <motion.div 
            className={styles.overlay}
            initial={'hide'}
            animate={'show'}
            exit={'exit'}
            variants={overlayVariant}
            >
            <motion.dialog 
                className={changeClass('dialog')} 
                initial={'hide'}
                animate={'show'}
                exit={'exit'}
                variants={dialogVariant}
                open={true}>
                    {children}
            </motion.dialog>
        </motion.div>}                
    </AnimatePresence> 
    )
}

export default Dialog;