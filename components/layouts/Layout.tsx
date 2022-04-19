import { Box } from "@mui/material"
import Head from "next/head"
import { FC } from "react"
import { Navbar, Sidebar } from "../ui"


interface Props {
    title?: string
}

export const Layout:FC<Props> = ({ title = 'Tareas App', children }) => {
    // sx es igual que el style pero tiene acceso al theme
  return (
    <Box sx={{
        flexGrow: 1
    }}>
        <Head>
            <title>{ title }</title>
        </Head>

        <Navbar />
        <Sidebar />


        <Box sx={{
            padding: '10px 20px'
        }}>
            { children }
        </Box>
    </Box>
  )
}
