import { motion, stagger } from "framer-motion"

const variants = {
    open: {
        transition: {
            staggerChildren: 0.1
        }
    },
    closed: {
        transition: {
            staggerChildren: 0.05,
            staggerDirection: -1
        }
    }
}
const itemVariants = {
    open: {
        y: 0,
        opacity: 1
    },
    closed: {
        y: 50,
        opacity: 0
    }
}

const Links = () => {
    const items = [
        {
            name: "Dashboard",
            to: "/admin/dashboard"
        },
        {
            name: "Products List",
            to: "/admin/productList"
        },
        {
            name: "Users",
            to: "/admin/users"
        },
    ]
    return (
        <motion.div className='flex absolute flex-col w-full h-full justify-center items-center gap-5' variants={variants}>
            {
                items.map(item => (
                    <motion.a href={item.to} className='text-2xl' key={item.name} variants={itemVariants} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>{item.name}</motion.a>
                ))
            }
        </motion.div>
    )
}

export default Links