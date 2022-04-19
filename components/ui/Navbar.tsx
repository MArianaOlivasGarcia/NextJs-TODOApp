import { AppBar, IconButton, Link, Toolbar, Typography } from "@mui/material"
import MenuOpenOutlined from "@mui/icons-material/MenuOpenOutlined";
import { useContext } from "react";
import { UIContext } from "../../context/ui";
import NextLink from "next/link";

export const Navbar = () => {

  const { openSidemenu } = useContext( UIContext )

  return (
    <AppBar position='sticky' elevation={ 0 }>
      <Toolbar>
        <IconButton 
          size="large"
          edge='start'
          onClick={ openSidemenu }>
          <MenuOpenOutlined />
        </IconButton>

        <NextLink href='/' passHref>
          <Link underline='none' color='white'>
            <Typography variant="h6">TODO APP</Typography>
          </Link>
        </NextLink>

      </Toolbar>
    </AppBar>
  )
}
