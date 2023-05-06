import { IconButton, Typography } from "@mui/material"
import { JournalLayout } from "../layout/JournalLayout"
import { NoteView, NothingSelectedView } from "../views"
import { AddOutlined } from "@mui/icons-material"

export const JournalPage = () => {
    return (
        <JournalLayout>
            {/* <Typography> Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet neque nesciunt repellat vel impedit tenetur quasi eveniet, consequuntur tempora quam adipisci dolore laudantium officia fuga deserunt molestiae error assumenda quisquam repudiandae totam. Velit sed, laborum, esse nemo officiis rem porro consectetur, optio quasi aperiam labore. Repellat corporis illo hic architecto ipsa amet eveniet nesciunt inventore nobis non. Neque inventore rem possimus, eveniet ut quo odit. Dolorum eius ad atque maiores odio, ex ipsa magni quos alias. Ratione rem adipisci explicabo blanditiis, molestias non sint totam natus! Inventore blanditiis culpa eligendi, vel in ab quae dolore et tempora voluptas facilis iste.</Typography> */}

            <NothingSelectedView />
            {/* <NoteView /> */}

            <IconButton size="large" sx={{color: 'white', backgroundColor: 'error.main', ':hover': {backgroundColor: 'error.main', opacity: 0.9}, position:'fixed', right: 50, bottom: 50}}>
                <AddOutlined sx={{fontSize: 30}}/>
            </IconButton>
        </JournalLayout>
    )
}
