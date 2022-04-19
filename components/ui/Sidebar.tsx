import { useContext } from "react";
import InboxOutlinedIcon  from "@mui/icons-material/InboxOutlined";
import { Divider, Drawer, List, ListItem, ListItemIcon, ListItemText, Typography } from "@mui/material"
import { Box } from "@mui/system"
import { UIContext } from "../../context/ui";


const menuItems: string[] = [
    'Inbox',
    'Starred',
    'Send Email'
]

export const Sidebar = () => {


    const { sidemenuOpen, closeSidemenu } = useContext( UIContext )


  return (
    <Drawer
        anchor="left"
        open={ sidemenuOpen }
        onClose={ closeSidemenu }>

        <Box sx={{
            width: 250
        }}>
            <Box sx={{
                padding: '5px 10px'
            }}>
                <Typography variant="h4">Menú</Typography>
            </Box>


            <List>
                {
                    menuItems.map( (item, index) => (
                        <ListItem button key={ index }>
                            <ListItemIcon>
                                <InboxOutlinedIcon />
                            </ListItemIcon>
                            <ListItemText 
                                primary={ item } 
                            />
                        </ListItem>
                    ))
                }
            </List>

            <Divider />

            <List>
                {
                    menuItems.map( (item, index) => (
                        <ListItem button key={ index }>
                            <ListItemIcon>
                                <InboxOutlinedIcon />
                            </ListItemIcon>
                            <ListItemText 
                                primary={ item } 
                            />
                        </ListItem>
                    ))
                }
            </List>
                
        </Box>

    </Drawer>
  )
}
