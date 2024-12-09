import React from 'react';
import {ClipLoader} from 'react-spinners';
import {useTheme} from '~/Hooks';
import { AnimatePresence, motion } from 'framer-motion';
import { overlayVariant, dialogVariant } from './Variants';
import * as styles from './styles.module.css';

function Dialog({open, handleOpen, loading, handleAction, title, desc, icon, confirm, confirmButtonColor, confimrButtonColorHover}){
    const [,changeClass] = useTheme(styles);

    const handleMouseEnter = (e) => {
        e.target.style.backgroundColor = confimrButtonColorHover;
    }

    const handleMouseLeave = (e) => {
        e.target.style.backgroundColor = confirmButtonColor;
    }

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
                <section className={styles.dialog_header}>
                    <div className={changeClass('dialog_box')}>
                        <img className={changeClass('dialog_icon')} style={{maskImage: `url(/icons/${icon})`}}/>
                    </div>
                    <h2 className={changeClass('dialog_title')}>
                        {title}
                    </h2>
                    <p className={changeClass('dialog_desc')}>
                        {desc}
                    </p>                        
                </section>
                <hr className={changeClass('dialog_line')}/>
                <section className={styles.dialog_buttons}>
                    <button type='button' className={changeClass('dialog_cancel')} onClick={handleOpen}>
                        Cancel
                    </button>
                    <button 
                        type='button' 
                        className={styles.dialog_action} 
                        onClick={handleAction} 
                        onMouseEnter={handleMouseEnter} 
                        onMouseLeave={handleMouseLeave} 
                        style={{backgroundColor: confirmButtonColor}}>
                            {loading ? <ClipLoader size='30px' color='#FFF'/> : confirm}
                    </button>
                </section>
            </motion.dialog>
        </motion.div>}                
    </AnimatePresence> 
    )
}

export default Dialog;