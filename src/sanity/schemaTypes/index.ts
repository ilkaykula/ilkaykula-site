import { home } from './home'
import { about } from './about'
import { project } from './project'
import { projectsPage } from './projectsPage'
import { post } from './post'
import { workItem } from './workItem'


export const schemaTypes = [home, about, project, projectsPage, post, workItem]
export const schema = { types: schemaTypes }


