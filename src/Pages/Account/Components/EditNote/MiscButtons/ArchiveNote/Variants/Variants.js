export const overlayVariant = {
    hide: {
        opacity: 0
    },
    show: {
        opacity: 1,
        transition: {
            when: 'beforeChildren',
            staggerChildren: 0.2
        }
    },
    exit: {
        opacity: 0,
        transition: {
            when: 'afterChildren',
        }
    }
}

export const dialogVariant = {
    hide: {
        scale: 0
    },
    show: {
        scale: 1,       
        transition: {
            type: 'spring',
            stiffness: 150,
            damping: 6
        } 
    },
    exit: {
        scale: 0
    }
}

export const messageVariant = {
    hide: {
        x: -50,
        opacity: 0
    },
    show: {
        x: 0,
        opacity: 1
    },
    exit: {
        x: -50,
        opacity: 0
    }
}