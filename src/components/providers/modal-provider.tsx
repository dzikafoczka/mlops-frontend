import React from 'react'
import CreateProjectModal from '@/components/modals/projects/create-project-modal'
import EditProjectModal from '@/components/modals/projects/edit-project-modal'
import DeleteProjectModal from '@/components/modals/projects/delete-project-modal'
import ArchiveRestoreProjectModal from '@/components/modals/projects/archive-restore-project-modal'

const ModalProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
        {children}
        <CreateProjectModal />
        <EditProjectModal />
        <DeleteProjectModal />
        <ArchiveRestoreProjectModal />
    </>
  )
}

export default ModalProvider