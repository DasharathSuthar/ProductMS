import { useState } from 'react'
import { motion } from 'framer-motion'
import Links from './links/Links'
import ToggleBtn from './toggleBtn/ToggleBtn'

const Sidebar = () => {
    const [open, setOpen] = useState(false)

    const variants = {
        open: {
            clipPath: "circle(1200px at 48px 48px)",
            transition: {
                type: "spring",
                stiffness: 20,
            }
        },
        closed: {
            clipPath: "circle(30px at 36px 48px)",
            transition: {
                delay: 0.5,
                type: "spring",
                stiffness: 400,
                damping: 40
            }
        }
    }

    return (
        <motion.div className='flex justify-center items-center flex-col bg-white  text-black' animate={open ? "open" : "closed"}>
            <motion.div className='fixed z-50 top-0 left-0 bottom-0 w-[200px] bg-opacity-90  bg-white' variants={variants}>
                <Links />
            </motion.div>
            <ToggleBtn setOpen={setOpen} />
        </motion.div>
    )
}

export default Sidebar